# @tool-belt/type-predicates

[![npm version](https://img.shields.io/npm/v/@tool-belt/type-predicates.svg)](https://www.npmjs.com/package/@tool-belt/type-predicates)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A comprehensive collection of performant type guards and assertions with excellent TypeScript support. This library serves as a drop-in replacement for Node.js's `util/types` module, while offering significantly better type inference, more extensive functionality, and cross-platform compatibility.

## Features

- 🚀 **Better TypeScript Support**: Advanced type inference with generics and precise type narrowing
- 📦 **Zero Dependencies**: Lightweight and self-contained
- 🌳 **Tree-Shakeable**: Full ESM support for optimal bundle sizes
- 🌐 **Cross-Platform**: Works in browsers, Node.js, and any JavaScript environment
- ✅ **Thorough Testing**: Comprehensive test coverage for both runtime behavior and type safety
- 🔧 **Extensive API**: More comprehensive than Node.js built-in utilities
- 🎯 **Type Guards & Assertions**: Every type check is available in both guard and assertion forms

## Installation

```bash
npm install @tool-belt/type-predicates
```

```bash
pnpm add @tool-belt/type-predicates
```

```bash
yarn add @tool-belt/type-predicates
```

## Browser Support

This library works in all modern browsers and Node.js environments. It's compiled to ES modules and CommonJS, with full support for tree-shaking to minimize bundle size.

## Key Differences from `node:util/types`

### 1. Superior TypeScript Support

```typescript
// node:util/types
import { isArray } from 'util/types';
const arr: unknown = ['a', 'b', 'c'];
if (isArray(arr)) {
    // arr is typed as "unknown[]" - not very useful
}

// @tool-belt/type-predicates
import { isArray } from '@tool-belt/type-predicates';
const arr: unknown = ['a', 'b', 'c'];
if (isArray<string>(arr)) {
    // arr is typed as "string[]" - much better!
}
```

### 2. Type Assertions

```typescript
import { assertIsString, assertIsArray } from '@tool-belt/type-predicates';

// Throws TypeError if not a string
assertIsString(value);
// After this line, TypeScript knows 'value' is a string

// With custom error messages
assertIsArray(data, { message: 'Configuration must be an array' });

// With nested validation
assertIsArray<number>(data, {
    valueValidator: (item) => typeof item === 'number',
    message: 'Expected array of numbers',
});
```

### 3. Composable Type Guards

```typescript
import {
    isUnion,
    isString,
    isNumber,
    createTypeGuard,
} from '@tool-belt/type-predicates';

// Combine multiple type guards
const isStringOrNumber = isUnion(isString, isNumber);

// Create custom type guards
const isPositiveNumber = createTypeGuard<number>(
    (value) => isNumber(value) && value > 0,
);
```

## API Overview

### Type Guards

Every guard returns a type predicate for TypeScript type narrowing:

```typescript
import {
    isArray,
    isObject,
    isString,
    isNumber,
    isBoolean,
    isFunction,
    isPromise,
    isMap,
    isSet,
    isDate,
    isRegExp,
    isError,
    isNull,
    isUndefined,
    isNullish,
    isDefined,
    // ... and many more
} from '@tool-belt/type-predicates';

// Use in conditionals
if (isString(value)) {
    // TypeScript knows 'value' is a string here
    console.log(value.toUpperCase());
}

// Use with array methods
const strings = mixedArray.filter(isString);
// strings is typed as string[]
```

### Type Assertions

Every guard has a corresponding assertion that throws on failure:

```typescript
import {
    assertIsArray,
    assertIsObject,
    assertIsString,
    // ... all guards have assertion versions
} from '@tool-belt/type-predicates';

function processConfig(config: unknown) {
    assertIsObject(config);
    // TypeScript now knows config is an object

    assertIsString(config.name, { message: 'Config name must be a string' });
    // config.name is now typed as string
}
```

### Advanced Features

#### Deep Validation

```typescript
import { isArray, isObject, isString } from '@tool-belt/type-predicates';

// Validate array elements
const isStringArray = (value: unknown): value is string[] =>
    isArray(value, { valueValidator: isString });

// Validate object values
const isStringRecord = (value: unknown): value is Record<string, string> =>
    isObject(value, { valueValidator: isString });
```

#### Utility Functions

```typescript
import { createTypeGuard, isUnion } from '@tool-belt/type-predicates';

// Create custom guards
const isNonEmptyString = createTypeGuard<string>(
    (value) => isString(value) && value.length > 0,
);

// Union types
const isNumberOrString = isUnion(isNumber, isString);
```

## Complete API Reference

### Basic Types

- `isString` / `assertIsString`
- `isNumber` / `assertIsNumber`
- `isBoolean` / `assertIsBoolean`
- `isBigInt` / `assertIsBigInt`
- `isSymbol` / `assertIsSymbol`
- `isUndefined` / `assertIsUndefined`
- `isNull` / `assertIsNull`
- `isNullish` / `assertIsNullish`
- `isDefined` / `assertIsDefined`
- `isNotNull` / `assertIsNotNull`
- `isNotNullish` / `assertIsNotNullish`

### Object Types

- `isObject` / `assertIsObject` - Checks if value is an object (not null)
- `isPlainObject` / `assertIsPlainObject` - Checks if value is a plain object (not a class instance)
- `isRecord` / `assertIsRecord` - Validates an object with specific key and value types
- `isEmptyObject` / `assertIsEmptyObject` - Checks if object has no own properties
- `isBoxedPrimitive` / `assertIsBoxedPrimitive` - Checks if value is a boxed primitive

### Collection Types

- `isArray` / `assertIsArray` - Validates arrays with optional element type checking
- `isEmptyArray` / `assertIsEmptyArray` - Checks if array has length of 0
- `isNonEmptyArray` / `assertIsNonEmptyArray` - Checks if array has length > 0
- `isMap` / `assertIsMap` - Validates Map objects with optional key/value type checking
- `isSet` / `assertIsSet` - Validates Set objects with optional value type checking
- `isWeakMap` / `assertIsWeakMap` - Checks if value is a WeakMap
- `isWeakSet` / `assertIsWeakSet` - Checks if value is a WeakSet

### Function Types

- `isFunction` / `assertIsFunction` - Checks if value is a function
- `isAsyncFunction` / `assertIsAsyncFunction` - Checks if value is an async function
- `isGeneratorFunction` / `assertIsGeneratorFunction` - Checks if value is a generator function
- `isAsyncGeneratorFunction` / `assertIsAsyncGeneratorFunction` - Checks if value is an async generator function

### Iterator Types

- `isIterable` / `assertIsIterable` - Validates iterable objects
- `isIterator` / `assertIsIterator` - Validates iterator objects
- `isGenerator` / `assertIsGenerator` - Checks if value is a generator
- `isAsyncGenerator` / `assertIsAsyncGenerator` - Checks if value is an async generator
- `isAsyncIterable` / `assertIsAsyncIterable` - Validates async iterable objects
- `isMapIterator` / `assertIsMapIterator` - Checks if value is a Map iterator
- `isSetIterator` / `assertIsSetIterator` - Checks if value is a Set iterator

### Error Types

- `isError` / `assertIsError` - Checks if value is an Error
- `isNativeError` / `assertIsNativeError` - Checks if value is a native Error type

### Number Utilities

- `isNaN` / `assertIsNaN` - Checks if value is NaN
- `isFinite` / `assertIsFinite` - Checks if value is a finite number
- `isInteger` / `assertIsInteger` - Checks if value is an integer
- `isSafeInteger` / `assertIsSafeInteger` - Checks if value is a safe integer

### String Utilities

- `isEmptyString` / `assertIsEmptyString` - Checks if string has length of 0
- `isNonEmptyString` / `assertIsNonEmptyString` - Checks if string has length > 0

### Buffer and TypedArray Types

- `isBuffer` / `assertIsBuffer` - Checks if value is a Buffer
- `isArrayBuffer` / `assertIsArrayBuffer` - Checks if value is an ArrayBuffer
- `isSharedArrayBuffer` / `assertIsSharedArrayBuffer` - Checks if value is a SharedArrayBuffer
- `isAnyArrayBuffer` / `assertIsAnyArrayBuffer` - Checks if value is any kind of ArrayBuffer
- `isArrayBufferView` / `assertIsArrayBufferView` - Checks if value is an ArrayBufferView
- `isDataView` / `assertIsDataView` - Checks if value is a DataView
- `isTypedArray` / `assertIsTypedArray` - Checks if value is any TypedArray
- Various specific TypedArray checkers (Int8Array, Uint8Array, etc.)

### Other Built-in Types

- `isDate` / `assertIsDate` - Checks if value is a Date
- `isRegExp` / `assertIsRegExp` - Checks if value is a RegExp
- `isPromise` / `assertIsPromise` - Checks if value is a Promise
- `isArgumentsObject` / `assertIsArgumentsObject` - Checks if value is an arguments object

## Creating Custom Type Guards

You can create your own type guards using the `createTypeGuard` utility:

```typescript
import { createTypeGuard, isNumber } from '@tool-belt/type-predicates';

// Create a type guard for positive numbers
const isPositiveNumber = createTypeGuard<number>(
    (value) => isNumber(value) && value > 0,
);

// Use it like any other guard
if (isPositiveNumber(value)) {
    // TypeScript knows value is a number here
    // Runtime has verified value > 0
}
```

## Error Handling Examples

```typescript
import { isError } from '@tool-belt/type-predicates';

try {
    // Your code that might throw
} catch (error) {
    // TypeScript types catch blocks as 'unknown'
    if (isError(error)) {
        console.error(error.message);
        console.error(error.stack);
    }
}
```

## License

MIT
