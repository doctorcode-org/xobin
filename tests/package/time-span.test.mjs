import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createRequire} from 'node:module';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import test from 'node:test';
import {build} from 'esbuild';
import {TimeSpan} from '@xobin/globalization';
import {TimeSpan as DirectTimeSpan} from '@xobin/globalization/time-span';
const require=createRequire(import.meta.url),root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
test('TimeSpan exact factories and arithmetic resolve from ESM and CommonJS',()=>{
    assert.equal(TimeSpan,DirectTimeSpan);
    for(const Type of [DirectTimeSpan,require('@xobin/globalization/time-span').TimeSpan]){
        assert.equal(Type.fromSeconds(101n,832n).ticks,1018320000n);
        assert.equal(Type.fromMicroseconds(1n).ticks,10n);
        assert.equal(Type.fromMicroseconds(1.5).ticks,15n);
        assert.equal(new Type(3n).multiply(0.5).ticks,2n);
        assert.equal(new Type(3n).divide(2).ticks,2n);
        assert.equal(new Type(3n).divide(new Type(2n)),1.5);
        assert.equal(Type.ticksPerDay,864000000000n);
    }
});
for(const entry of ['@xobin/globalization','@xobin/globalization/time-span'])test(`TimeSpan browser excludes date, calendar and culture data/${entry}`,async()=>{
    const result=await build({stdin:{contents:`import {TimeSpan} from '${entry}'; console.log(TimeSpan.fromMicroseconds(15n).multiply(0.5).ticks);`,resolveDir:root,loader:'js'},bundle:true,format:'esm',platform:'browser',treeShaking:true,write:false,metafile:true,logLevel:'silent'});
    const inputs=Object.values(result.metafile.outputs).flatMap(output=>Object.entries(output.inputs).filter(([,info])=>info.bytesInOutput>0).map(([input])=>input));
    for(const input of new Set(inputs)){if(input==='<stdin>')continue;const map=JSON.parse(await readFile(path.resolve(root,input+'.map'),'utf8'));assert.ok(!map.sources.some(source=>/calendar_data\.ts$|\/locales\//.test(source)),input);}
    for(const name of ['DateTime','DateOnly','TimeOnly','CultureInfo','HebrewCalendar','ChineseLunisolarCalendar','UmAlQuraCalendar'])assert.ok(!new RegExp('class\\s+_?'+name+'\\b').test(result.outputFiles[0].text),name);
});
