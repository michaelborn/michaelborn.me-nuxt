+++
date = '2026-09-02T16:13:57-04:00'
tags = [ 'javascript', 'typescript' ]
draft = false
title = "Basic Typescript"
+++

I recently began taking a simple Typescript course, and I thought I'd share my notes here in blog form. Typescript, if you've been living under a rock, is a Javascript superset which implements strict typing and transpiles to normal Javascript. Utilizing strict typing gives developers much better tooling for catching typing errors sooner in the development cycle.

## Typescript Syntax

First off, all Javascript programs are valid Typescript! This is by design, so typescript can be gently introduced into a system without requiring a full rewrite.

To begin declaring variable types, we use the `: type` syntax:

```ts
let name: string = "Michael";
let IQ: number = 215;
```

This also works with function argument and return types:

```ts
function processThing(thingId: string ): string{
    // do something
    return "output";
}
```

There are 7 primitive types available:

1. `string`
2. `number`
3. `boolean`
4. `bigint`
5. `undefined`
6. `null`
7. `symbol` (ES6+)

As well as other, more special types:

1. `object`
2. `any` see [gradual typing](#gradual-typing)

There are many more special types available, but I'll let you [read those for yourself](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html).

## Object Typing

We can use the `object` type for more complex values:

```ts
let myFoo: object = {};
```

And we can specify the object with fields itself:

```ts
let myFoo: object = {
    name: string;
    rank: number;
    createDate: Date;
};
```

## Type Inference

Not all types must be manually declared. If we are assigning values from type locations such as variables or function returns, Typescript can "infer" the type automatically:

```ts
function getItem(): string {
    return "hi!";
}
// type is automatically inferred to be a String
let myItem = getItem();
```

This gives us the benefit of static typing on the `myItem` variable without any additional effort.

## Gradual Typing

Gradual typing allows you to choose how and when types are applied by using the `any` type:

```ts
// basically, fall back to dynamic javascript typing
let cost: any = 425;
// alternate syntax
let cost = 425 as any;
```

Using the `any` type is essentially "opting out" of typescript static typing features. Not recommended, but can be useful in some cases.

## Conclusion

Typescript is easy to learn, can be introduced into an existing codebase without requiring major refactoring, and catches a TON of bugs that would be easy to miss otherwise. I'm a fan!