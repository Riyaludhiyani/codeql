import * as dummy from "./dummy";

var numVar: number;

var num1 = numVar;
var num2 = 5;
var num3 = num1 + num2;

var strVar: string;
var hello = "hello";
var world = "world";
var msg = hello + " " + world;

function concat(x: string, y: string): string { return x + y; }

function add(x: number, y: number): number { return x + y; }

function untyped(x, y) { return x + y; }

function partialTyped(x, y: string) { return x + y; }

for (let numFromLoop of [1, 2]) {}

let array: number[];

let voidType: () => void;
let undefinedType: undefined;
let nullType: null = null;
let neverType: () => never;
let symbolType: symbol;
const uniqueSymbolType: unique symbol = null;
let objectType: object;
let intersection: string & {x: string};
let tuple: [number, string];

let tupleWithOptionalElement: [number, string, number?];
let emptyTuple: [];
let tupleWithRestElement: [number, ...string[]];
let tupleWithOptionalAndRestElements: [number, string?, ...number[]];
let unknownType: unknown;

let constArrayLiteral = [1, 2] as const;
let constObjectLiteral = { foo: "foo" } as const;


try { }
catch (e: unknown) {
  if (typeof e === "string") {
      let b : string = e;
  }
}


interface NonAbstractDummy {
  getArea(): number;
}

interface HasArea {
  getArea(): number;
}

// abstract construct signature!
let Ctor: abstract new () => HasArea = Shape;

type MyUnion = {myUnion: true} | {stillMyUnion: true};
let union1: MyUnion = {myUnion: true};

type MyUnion2 = MyUnion | {yetAnotherType: true};
let union2: MyUnion2 = {yetAnotherType: true};

module TS43 {
  // TypeScript 4.3 setter/getter types
  interface ThingI {
    get size(): number
    set size(value: number | string | boolean);
  }

  export class Thing implements ThingI {
    #size = 0;

    get size(): number {
      return this.#size;
    }

    set size(value: string | number | boolean) {
      this.#size = Number(value);
    }
  }

  // overrides
  class Super {
    random(): number {
      return 4;
    }
  }

  class Sub extends Super {
    override random(): number {
      return super.random() * 10;
    }
  }

  // inference of template strings.
  function bar(s: string): `hello ${string}` {
    // Previously an error, now works!
    return `hello ${s}`;
  }

  declare let s1: `${number}-${number}-${number}`;
  declare let s2: `1-2-3`;
  declare let s3: `${number}-2-3`;
  s1 = s2;
  s1 = s3;

  // private methods
  class Foo {
    #someMethod(): number {
      return 42;
    }

    get #someValue(): number {
      return 100;
    }

    publicMethod() {
      this.#someMethod();
      return this.#someValue;
    }
  } 
}

module TS44 {
  function foo(arg: unknown) {
    const argIsString = typeof arg === "string";
    if (argIsString) {
        const upper = arg.toUpperCase();
    }
  }

  type Shape =
      | { kind: "circle", radius: number }
      | { kind: "square", sideLength: number };

  function side(shape: Shape): number {
      const { kind } = shape;

      if (kind === "circle") { return shape.radius;}
      else { return shape.sideLength; }
  }

  function symbolIndex() {
    interface Colors {
      [sym: symbol]: number;
      [key: string]: string;
      [num: number]: boolean;
    }
    
    let colors: Colors = {};
    const red = colors[Symbol("red")];
    const green = colors["green"];
    const blue = colors[2];
  }

  function stringPatternIndex() {
    interface Foo {
      [key: `foo-${number}`]: number;
    }
    var bla : Foo = {};
    const bar = bla[`foo-1`];

    interface Data {
      [optName: string | symbol]: boolean;
    }

    const data: Data = {};
    const baz = data["foo"];
  }

  class Foo {
    static #count = 0;

    get count() {
        return Foo.#count;
    }
    static {
      Foo.#count += 3;
    }
    static {
      var count = Foo.#count;
    }
    
  }
}

module TS45 {
  // A = string
  type A = Awaited<Promise<string>>;

  // B = number
  type B = Awaited<Promise<Promise<number>>>;

  // C = boolean | number
  type C = Awaited<boolean | Promise<number>>;

  export interface Success {
    type: `${string}Success`;
    body: string;
  }

  export interface Error {
      type: `${string}Error`;
      message: string;
  }

  export function handler(r: Success | Error) {
      if (r.type === "HttpSuccess") {
          // 'r' has type 'Success'
          let token = r.body;
      }
  }

  class Person {
    #name: string;
    constructor(name: string) {
        this.#name = name;
    }

    equals(other: unknown) {
        return other &&
            typeof other === "object" &&
            #name in other && // <- this is new!
            this.#name === other.#name; // <- other has type Person here.
    }
  }
}

import * as Foo3 from "./something.json" with { type: "json" };
var foo = Foo3.foo;

module TS46 {
  class Base {}

  class Derived extends Base {
    myProp = true;

    constructor() {
      console.log("Doing something before super()");
      super();
    }
  }

  type Action =
    | { kind: "NumberContents"; payload: number }
    | { kind: "StringContents"; payload: string };

  function processAction(action: Action) {
    const { kind, payload } = action;
    if (kind === "NumberContents") {
      console.log(payload.toFixed()); // <- number
    } else if (kind === "StringContents") {
      console.log(payload.toLowerCase()); // <- string
    }
  }

  interface TypeMap {
    number: number;
    string: string;
    boolean: boolean;
  }

  type UnionRecord<P extends keyof TypeMap> = {
    [K in P]: {
      kind: K;
      f: (p: TypeMap[K]) => void;
    };
  }[P];

  function processRecord<K extends keyof TypeMap>(record: UnionRecord<K>) {
    record.f(record.v);
  }

  processRecord({
    kind: "string",
    f: (val) => {
      console.log(val.toUpperCase()); // <- string
    },
  });

  type Func = (...args: ["a", number] | ["b", string]) => void;

  const f1: Func = (kind, payload) => {
    if (kind === "a") {
      payload.toFixed(); // <- number
    }
  };
}

const key = Symbol();

const numberOrString = Math.random() < 0.5 ? 42 : "hello";

let obj = {
  [key]: numberOrString,
};

if (typeof obj[key] === "string") {
  let str = obj[key]; // <- string
  str.toUpperCase();
}

//////////

function f<T>(arg: {
  produce: (n: string) => T,
  consume: (x: T) => void }
): void {};

f({
  produce: n => n, // <- (n: string) => string
  consume: x => x.toLowerCase()
});

///////////

const ErrorMap = Map<string, Error>;

const errorMap = new ErrorMap(); // <- Map<string, Error>

////////////

type FirstString<T> =
  T extends [infer S extends string, ...unknown[]]
      ? S
      : never;

type F = FirstString<['a' | 'b', number, boolean]>;

const a: F = 'a'; // <- 'a' | 'b'

////////////

interface State<in out T> {
  get: () => T;
  set: (value: T) => void;
}

const state: State<number> = {
  get: () => 42,
  set: (value) => { }
}

const fortyTwo = state.get(); // <- number

/////////////////

import tstModuleES from './tstModuleES.mjs';

console.log(tstModuleES());

import { tstModuleCJS } from './tstModuleCJS.cjs';

console.log(tstModuleCJS());

/////////////////

// test file resolution order (see tsconfig: moduleSuffixes setting)

import * as A from './tstSuffixA';

console.log(A.resolvedFile()); // <- 'tstSuffixA.ts'

import * as B from './tstSuffixB';

console.log(B.resolvedFile()); // <- 'tstSuffixB.ios.ts'


/////////////////

module TS48 {
    // SomeNum used to be 'number'; now it's '100'.
    type SomeNum = "100" extends `${infer U extends number}` ? U : never;

    declare function chooseRandomly<T>(x: T, y: T): T;

    let [a, b, c] = chooseRandomly([42, true, "hi!"], [0, false, "bye!"]);    
}

/////////////////

module TS49 {
  type Colors = "red" | "green" | "blue";

  type RGB = [red: number, green: number, blue: number];

  const palette = {
    red: [255, 0, 0],
    green: "#00ff00",
    bleu: [0, 0, 255],
  } satisfies Record<Colors, string | RGB>;

  // Both of these methods are still accessible!
  const redComponent = palette.red.at(0);

  interface RGBObj {
    red: number;
  }

  interface HSVObj {
    hue: number;
  }

  function setColor(color: RGBObj | HSVObj) {
    if ("hue" in color) {
      let h = color; // <- HSVObj
    }
  }

  // auto-accessors
  class Person {
    accessor name: string; // behaves as a normal field for our purposes

    constructor(name: string) {
      this.name = name;
    }
  }
}

/////////////////

module TS50 {
    function loggedMethod<This, Args extends any[], Return>(
        target: (this: This, ...args: Args) => Return,
        context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>
    ) {
        const methodName = String(context.name);
    
        function replacementMethod(this: This, ...args: Args): Return {
            console.log(`LOG: Entering method '${methodName}'.`)
            const result = target.call(this, ...args);
            console.log(`LOG: Exiting method '${methodName}'.`)
            return result;
        }
    
        return replacementMethod;
    }

    class Person {
        name: string;
        constructor(name: string) {
            this.name = name;
        }
    
        @loggedMethod("")
        greet() {
            console.log(`Hello, my name is ${this.name}.`);
            return 2;
        }
    }

    const p = new Person("John").greet(); // <- number, part of well-typed decorators in TS 5.0.

    declare function myConstIdFunction<const T extends readonly string[]>(args: T): T;

    // foo is readonly ["a", "b", "c"]
    const foo = myConstIdFunction(["a", "b" ,"c"]);
    
    const b = foo[1]; // <- "b"
}

/////////////////

module TS52 {
    class SomeClass {
        @((_target, _context) => {})
        foo = 123;
    }
    
    console.log(SomeClass[Symbol.metadata]); // <- has type DecoratorMetadataObject

    // named and anonymous tuple elements. 
    type Pair3<T> = [first: T, T];

    console.log(["hello", "world"] satisfies Pair3<string>);
}

module TS54 {
  function createStreetLight<C extends string>(colors: C[], defaultColor?: NoInfer<C>) {
    return colors[0];
  }

  createStreetLight(["red", "yellow", "green"], "yellow");

  const myObj = Object.groupBy([0, 1, 2, 3, 4, 5], (num, index) => {
    return num % 2 === 0 ? "even": "odd";
  });
}

module TS55 {
  const strings = (["foo", 123])
    .filter(s => typeof s === "string");

  for (const str of strings) {
    str.toLowerCase(); // <- string in 5.5, string | number in 5.4
  }

  function f1(obj: Record<string, unknown>, key: string) {
    if (typeof obj[key] === "string") {
      var str = obj[key].toUpperCase(); // Now okay, previously was error
    }
  }
}

namespace TS57{
  declare const a: symbol;
  export class A {
      [a]() { return 1 };
  }

  declare const e1: A[typeof a]; // Now okay, previously was compilation error TS2538: Type 'symbol' cannot be used as an index type.
}
