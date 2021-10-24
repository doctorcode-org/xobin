import { rollup, Plugin, RollupOptions } from 'rollup';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';
import * as fs from 'fs';
import glob from 'glob';
import * as path from 'path';
import globals from 'rollup-plugin-node-globals';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import builtins from 'rollup-plugin-node-builtins';
import { Server, ConfigOptions as KarmaConfigOptions, constants, FilePattern } from 'karma';
const sucrase = require('@rollup/plugin-sucrase');

type TaskFunction = (error?: any) => void;

interface PackageInfo {
    name: string;
    path: string;
    content: any;
    dir: string;
    banner: string;
}

class TopologicalSort<TVertex> {
    readonly vertices: { [key: string]: TVertex } = {};
    readonly edges: { [key: string]: string[] } = {};

    addVertex(id: string, vertex: TVertex, edges: string[]): this {
        this.vertices[id] = vertex;
        edges.forEach(edge => this.addEdge(edge, id));
        return this;
    }

    addEdge(from: string, to: string): void {
        if (!this.edges[from]) {
            this.edges[from] = [];
        }

        this.edges[from].push(to);
    }

    sort(): TVertex[] {
        const self = this;
        const sorted: TVertex[] = [];
        const visited: { [key: string]: boolean } = {};
        //Object.keys(this.edges).forEach(key => visit(key, []));
        Object.keys(this.vertices).forEach(key => visit(key, []));

        function visit(key: string, ancestors: string[]) {
            if (visited[key]) return;

            if (!self.vertices[key]) {
                throw new Error(`The vertex '${key}' not exist in graph.`);
            }

            ancestors.push(key);
            visited[key] = true;

            if (self.edges[key]) {
                self.edges[key].forEach(edge => {
                    if (ancestors.indexOf(edge) != -1)
                        throw new Error(`Closed chine: ${edge} is in ${key}`);
                    visit(edge, ancestors.slice(0));
                });
            }

            sorted.unshift(self.vertices[key]);
        }

        return sorted;
    }
}

const XOBIN_MODULE_RX = /^@xobin\//;

export async function build() {
    console.log(`-------------- build packages started at: ${process.cwd()} ---------------------`);
    const packages = await getPackages();
    console.log(`-------------- ${packages.length} packages found -------------------------------`);

    for (let pkg of packages) {
        const compressFlags = 2 | 8;
        const isModuleFlags = 4 | 8;
        const time = Date.now();
        for (let i = 1; i <= 8; i = i * 2) {
            const compress = !!(i & compressFlags);
            const isModule = !!(i & isModuleFlags);
            const startTime = Date.now();
            console.log(`Build package '${pkg.name}' started. compress = ${compress} and isModule=${isModule}`);
            await buildEntry(pkg, isModule, compress);
            console.log(`Build package '${pkg.name}' completed at ${(Date.now() - startTime) / 1000} seconds.`);
        }

        console.log(`-------------- ${(Date.now() - time) / 1000} seconds ------------------------------------------`);
    }
}

async function buildEntry(packageInfo: PackageInfo, isModule: boolean, compress: boolean): Promise<void> {
    const fileNamePostfix = compress ? '.min' : '';
    const plugins: Plugin[] = [
        typescript({
            target: isModule ? 'es2015' : 'es5',
            tsconfig: `${packageInfo.dir}/tsconfig.lib.json`,
        })
    ];

    if (compress) {
        plugins.push(terser({
            ecma: isModule ? 2015 : 5
        }));
    }

    const bundle = await rollup({
        input: `${packageInfo.dir}/src/index.ts`,
        plugins: plugins,
        external: (name) => {
            XOBIN_MODULE_RX.lastIndex = 0;
            return XOBIN_MODULE_RX.test(name);
        }
    });

    await bundle.write({
        format: isModule ? 'esm' : 'umd',
        sourcemap: true,
        amd: { id: packageInfo.name },
        name: isModule ? undefined : globalXobinName(packageInfo.name),
        banner: packageInfo.banner,
        dir: `${packageInfo.dir}/dist`,
        globals: (name) => {
            if (name.startsWith('@xobin')) {
                return globalXobinName(name);
            }

            //TODO: Read from xobin.config.json
            return name;
        },
        entryFileNames: isModule ? `module${fileNamePostfix}.js` : `main${fileNamePostfix}.js`
    });
}

export function buildLocalesSource(done: TaskFunction): void {
    const cultures = JSON.parse(fs.readFileSync('./data/cultures.json', { encoding: 'utf-8' }));
    Object.keys(cultures)
        .forEach(cultureName => {
            if (!cultureName) {
                return;
            }

            const cultureData = cultures[cultureName];
            let content = `import { CultureData, ${cultureData.calendar} } from '@xobin/globalization';\r\n`;
            content += `export const cultureData: CultureData = ${serilize(cultureData, 0)};`;
            fs.writeFileSync(`./packages/globalization/locales/${cultureName}.ts`, content, { encoding: 'utf-8' });
        });

    done();

    function serilize(value: any, indent: number): string {
        if (Array.isArray(value)) {
            return `[${value.map(item => serilize(item, 0)).join(', ')}]`;
        }
        else if (typeof value == 'object') {
            return '{\r\n' +
                `${Object.keys(value).map(prop => {
                    const propertyValue = value[prop];
                    let content = indention(indent + 4) + prop + ': ';
                    if (prop == 'calendar') {
                        content += `new ${propertyValue}()`;
                    }
                    else {
                        content += serilize(propertyValue, indent + 4);
                    }
                    return content;
                }).join(', \r\n')}` +
                '\r\n' + indention(indent) + '}';
        }
        else {
            return `${JSON.stringify(value)}`;
        }
    }

    function indention(count: number): string {
        let content = '';
        for (var i = 0; i < count; i++) {
            content += ' ';
        }
        return content;
    }
}

export async function buildLocales(): Promise<void> {
    const files = glob.sync('./packages/globalization/locales/*.ts');
    for (let file of files) {
        await buildLocaleModule(file);
    }
    //const tasks = glob.sync('./packages/globalization/locales/*.ts')
    //    .map(file => buildLocaleModule(file));

    //await Promise.all(tasks);
}

export async function test(done: TaskFunction) {
    const packages = (await getPackages())
        .map<FilePattern>(pkg => ({ pattern: `${pkg.dir}/dist/main.js` }));

    const options: KarmaConfigOptions & { rollupPreprocessor: RollupOptions } = {
        basePath: '.',
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: packages.concat([
            { pattern: 'packages/**/dist/locales/en.js' },
            { pattern: 'packages/**/dist/**/*.js.map', included: false },
            { pattern: 'packages/**/tests/**/*.ts', watched: false },
            { pattern: 'packages/**/src/**/*.ts', served: true, included: false }
        ]),

        preprocessors: {
            "packages/**/tests/**/*.ts": ["rollup"]
        },

        rollupPreprocessor: {
            plugins: [
                globals(),
                builtins(),
                resolve(),
                commonjs(),
                sucrase({
                    exclude: ["node_modules/**"],
                    transforms: ["typescript"]
                })
            ],
            external: (name) => {
                XOBIN_MODULE_RX.lastIndex = 0;
                return XOBIN_MODULE_RX.test(name);
            },
            output: {
                format: 'umd',
                name: 'xobinTest',
                globals: (name) => {
                    if (name.startsWith('@xobin')) {
                        return globalXobinName(name);
                    }

                    //TODO: Read from xobin.config.json
                    return name;
                }
            }
        },

        plugins: ['karma-*'],
        reporters: ['progress', 'kjhtml'],
        client: {
            clearContext: false,
            captureConsole: true
        },
        port: 9876,
        colors: true,
        logLevel: constants.LOG_INFO,
        autoWatch: true,
        customLaunchers: {
            ChromeDebugging: {
                base: 'Chrome',
                flags: ['--remote-debugging-port=9222'/*, '--user-data-dir=C:\chrome-dev-profile', '--auto-open-devtools-for-tabs'*/]
            }
        },
        browsers: ['ChromeDebugging'],
        concurrency: Infinity,
        singleRun: false,
        mime: {
            'text/plain': ['map'],
            'text/x-typescript': ['ts']
        }
    };
    const server = new Server(options, done);
    server.start();
}

async function getPackages(): Promise<PackageInfo[]> {
    return new Promise((resolve, reject) => {
        glob('./packages/**/package.json', { ignore: './packages/**/node_modules/**' }, (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                const packages = result.map<PackageInfo>(entry => {
                    const pkgJson = fs.readFileSync(entry, { encoding: 'utf-8' });
                    const pkg = JSON.parse(pkgJson);
                    return {
                        name: pkg.name,
                        path: entry,
                        content: pkg,
                        banner: buildBanner(pkg),
                        dir: path.dirname(entry)
                    };
                });

                var topologicalSort = new TopologicalSort<PackageInfo>();
                packages.forEach(pack => {
                    const dependencies: string[] = [];

                    if (pack.content.dependencies) {
                        Object.keys(pack.content.dependencies)
                            .forEach(deps => dependencies.push(deps));
                    }

                    if (pack.content.devDependencies) {
                        Object.keys(pack.content.devDependencies)
                            .forEach(deps => dependencies.push(deps));
                    }

                    if (pack.content.peerDependencies) {
                        Object.keys(pack.content.peerDependencies)
                            .forEach(deps => dependencies.push(deps));
                    }

                    topologicalSort.addVertex(
                        pack.name,
                        pack,
                        dependencies.filter(key => XOBIN_MODULE_RX.test(key))
                    );
                });

                resolve(topologicalSort.sort());
            }
        });
    });
}

async function buildLocaleModule(file: string): Promise<void> {
    const fileName = path.basename(file).split('.').slice(0, -1).join('.');
    const moduleName = `@xobin/globalization/locales/${fileName}`;

    console.log(`Start build module: ${moduleName}`);

    const bundle = await rollup({
        input: file,
        cache: false,
        plugins: [
            typescript({
                tsconfig: `./packages/globalization/tsconfig.locales.json`,
                include: [file]
            })
        ],
        external: (id) => {
            return true;
        }
    });

    await bundle.write({
        format: 'umd',
        sourcemap: false,
        amd: { id: moduleName },
        name: globalXobinName(moduleName),
        //banner: packageInfo.banner,
        dir: `./packages/globalization/dist/locales`,
        globals: (name) => {
            if (name.startsWith('@xobin')) {
                return globalXobinName(name);
            }
            return name;
        }
    });

    console.log(`Complete build module: ${moduleName}`);
}

function buildBanner(pkg: any): string {
    const text = `
/*!
 * @license Xobin v${pkg.version}
 * (c) 2020-${(new Date()).getFullYear()} The ${pkg.author} - ${pkg.homepage}
 * License: MIT
 */
`;
    return text;
}

function globalXobinName(name: string): string {
    return name
        .replace('@xobin', 'xobin')
        .replace(/\\/g, '.')
        .replace(/\//g, '.')
        .replace(/\-/g, '_');
}
