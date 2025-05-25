# @tool-belt/type-predicates

[![npm version](https://img.shields.io/npm/v/@tool-belt/type-predicates.svg)](https://www.npmjs.com/package/@tool-belt/type-predicates)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Test Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen.svg)](https://github.com/tool-belt/type-predicates)

A comprehensive collection of performant type guards and assertions with excellent TypeScript support. This library serves as a drop-in replacement for Node.js's `util/types` module, while offering significantly better type inference, more extensive functionality, and cross-platform compatibility.

## Features

- 🚀 **Better TypeScript Support**: Advanced type inference with generics and precise type narrowing
- 📦 **Zero Dependencies**: Lightweight and self-contained
- 🌳 **Tree-Shakeable**: Full ESM support for optimal bundle sizes
- 🌐 **Cross-Platform**: Works in browsers, Node.js, and any JavaScript environment
- ✅ **100% Test Coverage**: Thoroughly tested with over 5,000 tests including type tests
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

## Key Differences from `node:util/types`

### 1. Superior TypeScript Support

```typescript
// node:util/types
import { isArray } from 'util/types';
const arr: unknown = ['a', 'b', 'c'];
if (isArray(arr)) {
    // arr is typed as "any[]" - not very useful
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
import {
    createTypeGuard,
    createTypeAssertion,
    isUnion,
} from '@tool-belt/type-predicates';

// Create custom guards
const isNonEmptyString = createTypeGuard<string>(
    (value) => isString(value) && value.length > 0,
);

// Create custom assertions
const assertIsNonEmptyString = createTypeAssertion(isNonEmptyString);

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

### Number Utilities

- `isNaN` / `assertIsNaN` - Check if value is NaN
- `isFinite` / `assertIsFinite` - Check if number is finite
- `isInteger` / `assertIsInteger` - Check if number is an integer
- `isSafeInteger` / `assertIsSafeInteger` - Check if number is a safe integer

### String Utilities

- `isEmptyString` / `assertIsEmptyString` - Check if string is empty (`''`)
- `isNonEmptyString` / `assertIsNonEmptyString` - Check if string has content

### Objects and Functions

- `isObject` / `assertIsObject`
- `isPlainObject` / `assertIsPlainObject` - Check for plain objects (not class instances)
- `isEmptyObject` / `assertIsEmptyObject` - Check if object has no properties
- `isRecord` / `assertIsRecord`
- `isFunction` / `assertIsFunction`
- `isAsyncFunction` / `assertIsAsyncFunction`
- `isGeneratorFunction` / `assertIsGeneratorFunction`
- `isAsyncGeneratorFunction` / `assertIsAsyncGeneratorFunction`

### Collections

- `isArray` / `assertIsArray`
- `isEmptyArray` / `assertIsEmptyArray` - Check if array is empty
- `isNonEmptyArray` / `assertIsNonEmptyArray` - Check if array has elements
- `isMap` / `assertIsMap`
- `isSet` / `assertIsSet`
- `isWeakMap` / `assertIsWeakMap`
- `isWeakSet` / `assertIsWeakSet`

### Iterables and Generators

- `isIterable` / `assertIsIterable`
- `isAsyncIterable` / `assertIsAsyncIterable`
- `isIterator` / `assertIsIterator`
- `isGenerator` / `assertIsGenerator`
- `isAsyncGenerator` / `assertIsAsyncGenerator`
- `isMapIterator` / `assertIsMapIterator` - Check for Map iterators
- `isSetIterator` / `assertIsSetIterator` - Check for Set iterators

### Typed Arrays and Buffers

- `isTypedArray` / `assertIsTypedArray`
- `isArrayBuffer` / `assertIsArrayBuffer`
- `isSharedArrayBuffer` / `assertIsSharedArrayBuffer`
- `isAnyArrayBuffer` / `assertIsAnyArrayBuffer`
- `isArrayBufferView` / `assertIsArrayBufferView` - Check for TypedArray or DataView
- `isDataView` / `assertIsDataView`
- `isBuffer` / `assertIsBuffer`
- `isInt8Array` / `assertIsInt8Array`
- `isUint8Array` / `assertIsUint8Array`
- `isUint8ClampedArray` / `assertIsUint8ClampedArray`
- `isInt16Array` / `assertIsInt16Array`
- `isUint16Array` / `assertIsUint16Array`
- `isInt32Array` / `assertIsInt32Array`
- `isUint32Array` / `assertIsUint32Array`
- `isFloat32Array` / `assertIsFloat32Array`
- `isFloat64Array` / `assertIsFloat64Array`
- `isBigInt64Array` / `assertIsBigInt64Array`
- `isBigUint64Array` / `assertIsBigUint64Array`

### Boxed Primitives

- `isStringObject` / `assertIsStringObject` - Check for `new String()`
- `isNumberObject` / `assertIsNumberObject` - Check for `new Number()`
- `isBooleanObject` / `assertIsBooleanObject` - Check for `new Boolean()`
- `isBigIntObject` / `assertIsBigIntObject` - Check for BigInt objects
- `isSymbolObject` / `assertIsSymbolObject` - Check for Symbol objects
- `isBoxedPrimitive` / `assertIsBoxedPrimitive` - Check for any boxed primitive

### Other Built-in Types

- `isDate` / `assertIsDate`
- `isError` / `assertIsError`
- `isNativeError` / `assertIsNativeError` - Check for native Error types
- `isRegExp` / `assertIsRegExp`
- `isPromise` / `assertIsPromise`
- `isArgumentsObject` / `assertIsArgumentsObject` - Check for `arguments` object

### Utility Functions

- `createTypeGuard` - Create custom type guards
- `createTypeAssertion` - Create custom type assertions
- `isUnion` - Combine multiple type guards with OR logic

## TypeScript Types and Interfaces

This library exports several TypeScript types and interfaces that you can use in your own code:

### Core Types

```typescript
// Type guard function signature
type TypeGuard<T, O extends TypeGuardOptions | undefined = undefined> = (
    input: unknown,
    options?: O,
) => input is T;

// Type assertion function signature
type TypeAssertion<
    T,
    O extends TypeAssertionOptions | undefined = undefined,
> = (input: unknown, options?: O) => asserts input is T;

// General validator function
type TypeValidator = (input: unknown, ...args: any[]) => boolean;
```

### Option Interfaces

```typescript
// For custom error messages in assertions
interface ErrorMessage {
    message: string | undefined;
}

// For validating object/array values
interface ValueValidator {
    valueValidator: TypeValidator;
}

// For validating object keys
interface KeyValidator {
    keyValidator: TypeValidator;
}

// Combined options for type guards
type TypeGuardOptions = Partial<KeyValidator & ValueValidator>;

// Combined options for type assertions
type TypeAssertionOptions = Partial<ErrorMessage> & TypeGuardOptions;
```

### Utility Types

```typescript
// Union of all typed array types
type TypedArray =
    | BigInt64Array
    | BigUint64Array
    | Float32Array
    | Float64Array
    | Int16Array
    | Int32Array
    | Int8Array
    | Uint16Array
    | Uint32Array
    | Uint8Array
    | Uint8ClampedArray;
```

## Type Guard Options

Many type guards accept an optional second parameter for additional validation:

### ValueValidator

For collections like arrays and objects, you can validate individual elements:

```typescript
import {
    isArray,
    isObject,
    isString,
    isNumber,
} from '@tool-belt/type-predicates';

// Validate array elements
const data: unknown = [1, 2, 3, 4];
if (isArray(data, { valueValidator: isNumber })) {
    // data is number[]
}

// Validate object values
const config: unknown = { host: 'localhost', port: '3000' };
if (isObject(config, { valueValidator: isString })) {
    // config is Record<string, string>
}
```

### KeyValidator

For objects, you can also validate keys:

```typescript
import { isObject, isString } from '@tool-belt/type-predicates';

const headers: unknown = { 'Content-Type': 'application/json' };
if (
    isObject(headers, {
        keyValidator: (key) => key.startsWith('Content-'),
        valueValidator: isString,
    })
) {
    // headers has string keys starting with 'Content-' and string values
}
```

### Custom Error Messages

All assertions accept custom error messages:

```typescript
import { assertIsString, assertIsArray } from '@tool-belt/type-predicates';

assertIsString(username, {
    message: 'Username must be a string',
});

assertIsArray(items, {
    message: 'Items must be an array',
    valueValidator: isString,
    validatorMessage: 'All items must be strings',
});
```

## Usage Examples

### Basic Type Checking

```typescript
import { isString, isNumber, isObject } from '@tool-belt/type-predicates';

function processValue(value: unknown) {
    if (isString(value)) {
        console.log(value.toUpperCase());
    } else if (isNumber(value)) {
        console.log(value.toFixed(2));
    } else if (isObject(value)) {
        console.log(Object.keys(value));
    }
}
```

### Type Assertions in Functions

```typescript
import {
    assertIsObject,
    assertIsString,
    assertIsNumber,
} from '@tool-belt/type-predicates';

interface Config {
    host: string;
    port: number;
}

function parseConfig(input: unknown): Config {
    assertIsObject(input);
    assertIsString(input.host, { message: 'Config host must be a string' });
    assertIsNumber(input.port, { message: 'Config port must be a number' });

    return {
        host: input.host,
        port: input.port,
    };
}
```

### Working with Arrays

```typescript
import { isArray, assertIsArray, isString } from '@tool-belt/type-predicates';

// Filter mixed arrays
const mixed = [1, 'hello', true, 'world', 42];
const strings = mixed.filter(isString); // ['hello', 'world']

// Validate entire arrays
function processStringList(input: unknown): string[] {
    assertIsArray(input, {
        valueValidator: isString,
        message: 'Expected an array of strings',
    });
    return input; // TypeScript knows this is string[]
}
```

### Custom Type Guards

```typescript
import {
    createTypeGuard,
    createTypeAssertion,
    isObject,
    isString,
    isNumber,
} from '@tool-belt/type-predicates';

// Custom interface
interface User {
    id: number;
    name: string;
    email: string;
}

// Create a type guard for User
const isUser = createTypeGuard<User>(
    (value): value is User =>
        isObject(value) &&
        isNumber(value.id) &&
        isString(value.name) &&
        isString(value.email),
);

// Create corresponding assertion
const assertIsUser = createTypeAssertion(isUser);

// Use them
function processUser(data: unknown) {
    if (isUser(data)) {
        console.log(`User ${data.name} has ID ${data.id}`);
    }
}
```

### Union Types

```typescript
import {
    isUnion,
    isString,
    isNumber,
    isBoolean,
} from '@tool-belt/type-predicates';

// Simple union
const isStringOrNumber = isUnion(isString, isNumber);

// Multiple types
const isPrimitive = isUnion(isString, isNumber, isBoolean);

// Use in filtering
const values = ['hello', 42, true, null, 'world'];
const primitives = values.filter(isPrimitive); // ['hello', 42, true, 'world']
```

### Async Functions and Promises

```typescript
import {
    isPromise,
    isAsyncFunction,
    assertIsPromise,
} from '@tool-belt/type-predicates';

async function fetchData() {
    return { data: 'result' };
}

// Check if function is async
if (isAsyncFunction(fetchData)) {
    const result = await fetchData();
}

// Check if value is a promise
const maybePromise = fetchData();
if (isPromise(maybePromise)) {
    maybePromise.then(console.log);
}

// Assert promise
function handleAsync(value: unknown) {
    assertIsPromise(value);
    return value.then((result) => console.log(result));
}
```

### Error Handling

```typescript
import { isError, assertIsError } from '@tool-belt/type-predicates';

try {
    // some operation
} catch (error) {
    // TypeScript types catch blocks as 'unknown'
    if (isError(error)) {
        console.error(error.message);
        console.error(error.stack);
    }
}

// Or use assertion
function handleError(error: unknown): void {
    assertIsError(error);
    // Now TypeScript knows error is Error type
    logger.error({
        message: error.message,
        stack: error.stack,
        name: error.name,
    });
}
```

### TypedArrays and Buffers

```typescript
import {
    isTypedArray,
    isArrayBuffer,
    isBuffer,
} from '@tool-belt/type-predicates';

// Check for any typed array
const data = new Uint8Array([1, 2, 3]);
if (isTypedArray(data)) {
    console.log(data.byteLength);
}

// Check for specific typed arrays
import { isUint8Array, isFloat32Array } from '@tool-belt/type-predicates';

if (isUint8Array(data)) {
    // Process bytes
}

// Node.js Buffer (when available)
if (isBuffer(data)) {
    console.log(data.toString('utf8'));
}
```

### Working with Empty Values

```typescript
import {
    isEmptyString,
    isEmptyArray,
    isEmptyObject,
    isNonEmptyString,
    isNonEmptyArray,
} from '@tool-belt/type-predicates';

// String checks
const name = getUserInput();
if (isNonEmptyString(name)) {
    // name is guaranteed to have content
    console.log(`Hello, ${name}!`);
}

// Array checks
const items = getItems();
if (isNonEmptyArray(items)) {
    // items has at least one element
    const [first, ...rest] = items;
}

// Object checks
const config = loadConfig();
if (isEmptyObject(config)) {
    console.log('Using default configuration');
}
```

### Number Validation

```typescript
import {
    isNaN,
    isFinite,
    isInteger,
    isSafeInteger,
} from '@tool-belt/type-predicates';

function calculateAverage(values: unknown[]): number {
    const numbers = values.filter(isFinite);
    if (numbers.length === 0) return 0;
    
    const sum = numbers.reduce((a, b) => a + b, 0);
    const avg = sum / numbers.length;
    
    if (isNaN(avg)) {
        throw new Error('Invalid calculation');
    }
    
    return avg;
}

// Safe integer operations
function processId(id: unknown) {
    if (isSafeInteger(id)) {
        // Safe to use for array indices, etc.
        return data[id];
    }
}
```

### Boxed Primitives and Special Types

```typescript
import {
    isBoxedPrimitive,
    isStringObject,
    isArgumentsObject,
    isNativeError,
    isPlainObject,
} from '@tool-belt/type-predicates';

// Detect boxed primitives
const value = new String('hello');
if (isBoxedPrimitive(value)) {
    // value is a boxed primitive (String, Number, Boolean, etc.)
    console.log(value.valueOf());
}

// Plain object check (not class instances)
function merge(target: unknown, source: unknown) {
    if (isPlainObject(target) && isPlainObject(source)) {
        return { ...target, ...source };
    }
    throw new Error('Can only merge plain objects');
}

// Native error handling
catch (error) {
    if (isNativeError(error)) {
        // It's a built-in error type (Error, TypeError, etc.)
        logError(error.name, error.message, error.stack);
    }
}
```

## Browser Support

This library works in all modern browsers and Node.js environments. It's compiled to ES modules and CommonJS, with full support for tree-shaking to minimize bundle size.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © Na'aman Hirschfeld
