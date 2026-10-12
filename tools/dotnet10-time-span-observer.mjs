import {execFileSync} from 'node:child_process';
import fs from 'node:fs';
const runtime=process.argv[2],mode=process.argv[3]??'--check';
if(!runtime||!['--write','--check'].includes(mode))throw new Error('Pass runtime path and mode.');
const git=(...a)=>execFileSync('git',['-C',runtime,...a],{encoding:'utf8'}).replaceAll('\r\n','\n');
if(git('rev-parse','v10.0.7^{commit}').trim()!=='7706f546bac1a99b3d891afe3591dc88c67f0cc4')throw new Error('Reference changed.');
const raw=git('show','v10.0.7:src/libraries/System.Private.CoreLib/src/System/TimeSpan.cs');let s=`// Derived from the official .NET 10.0.7 TimeSpan API.
// Licensed to the .NET Foundation under the MIT license.
#nullable enable
using RealTimeSpan = System.TimeSpan;
internal readonly struct ObservedTimeSpan : IComparable {
    internal readonly RealTimeSpan Value;
    private ObservedTimeSpan(RealTimeSpan value) { Value=value; }
    private static ObservedTimeSpan Wrap(string operation, object?[] args, Func<RealTimeSpan> invoke) => new((RealTimeSpan)TimeSpanArithmeticOracle.Observe(operation,args,()=>invoke())!);
`;
for(const args of ['', 'long ticks','int hours, int minutes, int seconds','int days, int hours, int minutes, int seconds','int days, int hours, int minutes, int seconds, int milliseconds','int days, int hours, int minutes, int seconds, int milliseconds, int microseconds']){const names=args?args.split(', ').map(x=>x.split(' ')[1]):[];s+=`public ObservedTimeSpan(${args}) { Value=(RealTimeSpan)TimeSpanArithmeticOracle.Observe("ctor",[${names.join(',')}],()=>new RealTimeSpan(${names.join(',')}))!; }\n`;}
for(const name of ['MaxValue','MinValue','Zero'])s+=`public static ObservedTimeSpan ${name} => Wrap("${name}",[],()=>RealTimeSpan.${name});\n`;
for(const match of raw.matchAll(/public const (long|int) (\w+) = ([^;]+);/g))s+=`public const ${match[1]} ${match[2]} = RealTimeSpan.${match[2]};\n`;
for(const [type,names]of [['long',['Ticks']],['int',['Days','Hours','Minutes','Seconds','Milliseconds','Microseconds','Nanoseconds']],['double',['TotalDays','TotalHours','TotalMinutes','TotalSeconds','TotalMilliseconds','TotalMicroseconds','TotalNanoseconds']]])for(const name of names)s+=`public ${type} ${name} { get { var self=this;return (${type})TimeSpanArithmeticOracle.Observe("${name}",[self],()=>self.Value.${name})!; } }\n`;
for(const match of raw.matchAll(/public static TimeSpan (From\w+)\(([^)]*)\)/g)){const name=match[1],args=match[2];if(!['FromDays','FromHours','FromMinutes','FromSeconds','FromMilliseconds','FromMicroseconds','FromTicks'].includes(name))continue;const names=args.split(', ').map(x=>x.split(' ')[1]);const tag=args.startsWith('double')?'D':'I';s+=`public static ObservedTimeSpan ${name}(${args}) => Wrap("${name}:${tag}",[${names.join(',')}],()=>RealTimeSpan.${name}(${names.join(',')}));\n`;}
for(const name of ['Add','Subtract'])s+=`public ObservedTimeSpan ${name}(ObservedTimeSpan other) { var self=this;return Wrap("${name}",[self,other],()=>self.Value.${name}(other.Value)); }\n`;
for(const name of ['Duration','Negate'])s+=`public ObservedTimeSpan ${name}() { var self=this;return Wrap("${name}",[self],()=>self.Value.${name}()); }\n`;
s+=`public ObservedTimeSpan Multiply(double factor) {var self=this;return Wrap("Multiply",[self,factor],()=>self.Value.Multiply(factor));}
public ObservedTimeSpan Divide(double divisor) {var self=this;return Wrap("Divide",[self,divisor],()=>self.Value.Divide(divisor));}
public double Divide(ObservedTimeSpan divisor) {var self=this;return (double)TimeSpanArithmeticOracle.Observe("Divide",[self,divisor],()=>self.Value.Divide(divisor.Value))!;}
public int CompareTo(object? other) {var self=this;return (int)TimeSpanArithmeticOracle.Observe("CompareTo",[self,other],()=>self.Value.CompareTo(other is ObservedTimeSpan span?span.Value:other))!;}
public static int Compare(ObservedTimeSpan a,ObservedTimeSpan b)=>(int)TimeSpanArithmeticOracle.Observe("Compare",[a,b],()=>RealTimeSpan.Compare(a.Value,b.Value))!;
public override bool Equals(object? other) {var self=this;return (bool)TimeSpanArithmeticOracle.Observe("Equals",[self,other],()=>self.Value.Equals(other is ObservedTimeSpan span?span.Value:other))!;}
public static bool Equals(ObservedTimeSpan a,ObservedTimeSpan b)=>(bool)TimeSpanArithmeticOracle.Observe("StaticEquals",[a,b],()=>RealTimeSpan.Equals(a.Value,b.Value))!;
public override int GetHashCode() {var self=this;return (int)TimeSpanArithmeticOracle.Observe("GetHashCode",[self],()=>self.Value.GetHashCode())!;}
`;
for(const [op,method]of [['+','Add'],['-','Subtract']])s+=`public static ObservedTimeSpan operator ${op}(ObservedTimeSpan a,ObservedTimeSpan b)=>a.${method}(b);\n`;
s+='public static ObservedTimeSpan operator +(ObservedTimeSpan a)=>Wrap("UnaryPlus",[a],()=>+a.Value);\npublic static ObservedTimeSpan operator -(ObservedTimeSpan a)=>a.Negate();\n';
for(const op of ['==','!=','<','>','<=','>='])s+=`public static bool operator ${op}(ObservedTimeSpan a,ObservedTimeSpan b)=>(bool)TimeSpanArithmeticOracle.Observe("Operator${op}",[a,b],()=>a.Value ${op} b.Value)!;\n`;
s+='public static ObservedTimeSpan operator *(ObservedTimeSpan a,double b)=>a.Multiply(b);\npublic static ObservedTimeSpan operator *(double a,ObservedTimeSpan b)=>b.Multiply(a);\npublic static ObservedTimeSpan operator /(ObservedTimeSpan a,double b)=>a.Divide(b);\npublic static double operator /(ObservedTimeSpan a,ObservedTimeSpan b)=>a.Divide(b);\n}\n';
const path='tools/dotnet10-calendar-oracle/ObservedTimeSpan.g.cs';
if(mode==='--write')fs.writeFileSync(path,s);else if(fs.readFileSync(path,'utf8')!==s)throw new Error('Generated TimeSpan observer differs.');
