import { expectTypeOf } from 'expect-type';

import {
    isAnyArrayBuffer,
    isArgumentsObject,
    isArray,
    isArrayBuffer,
    isArrayBufferView,
    isAsyncFunction,
    isAsyncGenerator,
    isAsyncGeneratorFunction,
    isAsyncIterable,
    isBigInt,
    isBigInt64Array,
    isBigIntObject,
    isBigUint64Array,
    isBoolean,
    isBooleanObject,
    isBoxedPrimitive,
    isBuffer,
    isDataView,
    isDate,
    isDefined,
    isEmptyArray,
    isEmptyObject,
    isEmptyString,
    isError,
    isFinite,
    isFloat32Array,
    isFloat64Array,
    isFunction,
    isGenerator,
    isGeneratorFunction,
    isInt8Array,
    isInt16Array,
    isInt32Array,
    isInteger,
    isIterable,
    isIterator,
    isMap,
    isMapIterator,
    isNaN,
    isNativeError,
    isNonEmptyArray,
    isNonEmptyString,
    isNotNull,
    isNotNullish,
    isNull,
    isNullish,
    isNumber,
    isNumberObject,
    isObject,
    isPlainObject,
    isPromise,
    isRecord,
    isRegExp,
    isSafeInteger,
    isSet,
    isSetIterator,
    isSharedArrayBuffer,
    isString,
    isStringObject,
    isSymbol,
    isSymbolObject,
    isTypedArray,
    isUint8Array,
    isUint8ClampedArray,
    isUint16Array,
    isUint32Array,
    isUndefined,
    isUnion,
    isWeakMap,
    isWeakSet,
    TypeGuard,
} from '../src';

const asyncFunction = async () => null;
const regularFunction = () => null;
const generatorFunction = function* () {
    yield true;
};
const asyncGeneratorFunction = async function* () {
    yield await asyncFunction();
};
const generator = generatorFunction();
const asyncGenerator = asyncGeneratorFunction();
const stringArray = ['xyz', 'abc', '123'];
const numberArray = [1, 2, 3];
const symbolArray = [Symbol(), Symbol(), Symbol()];
const recordArray = [{ name: 1 }, { name: 2 }, { name: 3 }];
const stringMap = new Map([['xzy', 'abc']]);
const numberMap = new Map([[100, 100]]);
const symbolMap = new Map([[Symbol('x'), Symbol('y')]]);
const booleanMap = new Map([[false, true]]);
const recordMap = new Map([[{ key: 1 }, { value: 1 }]]);

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class CustomClass {}
const stringRecord = { name: 'xyz' };
const numberRecord = { 1: 100 };
const symbolRecord = { [Symbol('a')]: Symbol('b') };
const promise = new Promise((resolve) => {
    resolve(null);
});
const primitiveValues = [true, false, 0, 1, '', undefined, Symbol()];
const iterableObjects = [new Map(), new Set(), new String(''), []];
const buffers = [new ArrayBuffer(8), Buffer.alloc(8), new SharedArrayBuffer(8)];
const errors = [
    new Error(),
    new TypeError(),
    new RangeError(),
    new SyntaxError(),
    new URIError(),
    new ReferenceError(),
    new EvalError(),
];
const typedArrays = [
    new Int8Array(),
    new Uint8Array(),
    new Uint8ClampedArray(),
    new Int16Array(),
    new Uint16Array(),
    new Int32Array(),
    new Uint32Array(),
    new Float32Array(),
    new Float64Array(),
    new BigInt64Array(),
    new BigUint64Array(),
];
const objectValues = [
    {},
    new Number(0),
    new Boolean(false),
    new WeakMap(),
    new WeakSet(),
    ...iterableObjects,
    ...errors,
    ...buffers,
    ...typedArrays,
];
const functionValues = [
    regularFunction,
    asyncFunction,
    asyncGeneratorFunction,
    generatorFunction,
];

describe('isArray', () => {
    it('returns true for positively tested array values', () => {
        expect(
            isArray<string>(stringArray, {
                valueValidator: (v) => isString(v),
            }),
        ).toBeTruthy();
        expect(
            isArray<number>(numberArray, {
                valueValidator: (v) => isNumber(v),
            }),
        ).toBeTruthy();
        expect(
            isArray<symbol>(symbolArray, {
                valueValidator: (v) => isSymbol(v),
            }),
        ).toBeTruthy();
        expect(
            isArray<object>(recordArray, {
                valueValidator: (v) => isObject(v),
            }),
        ).toBeTruthy();
        expect(
            isArray<number | string>([...stringArray, ...numberArray], {
                valueValidator: (v) =>
                    isUnion<number | string>(isString, isNumber)(v),
            }),
        ).toBeTruthy();
    });
    it('returns false for negatively tested array values', () => {
        expect(
            isArray<string>(stringArray, {
                valueValidator: (v) => isNumber(v),
            }),
        ).toBeFalsy();
        expect(
            isArray<number>(numberArray, {
                valueValidator: (v) => isString(v),
            }),
        ).toBeFalsy();
        expect(
            isArray<symbol>(symbolArray, {
                valueValidator: (v) => isObject(v),
            }),
        ).toBeFalsy();
        expect(
            isArray<object>(recordArray, {
                valueValidator: (v) => isSymbol(v),
            }),
        ).toBeFalsy();
        expect(
            isArray<number | string>([...symbolArray, ...recordArray], {
                valueValidator: (v) =>
                    isUnion<number | string>(isString, isNumber)(v),
            }),
        ).toBeFalsy();
    });
    it('returns false for non-array values', () => {
        expect(
            isArray<string>('', { valueValidator: (v) => isString(v) }),
        ).toBeFalsy();
        expect(
            isArray<string>(null, { valueValidator: (v) => isString(v) }),
        ).toBeFalsy();
        expect(
            isArray<string>(123, { valueValidator: (v) => isString(v) }),
        ).toBeFalsy();
        expect(
            isArray<string>(Symbol(), { valueValidator: (v) => isString(v) }),
        ).toBeFalsy();
        expect(
            isArray<string>({}, { valueValidator: (v) => isString(v) }),
        ).toBeFalsy();
    });

    it('guards type correctly', () => {
        const unknownArray: unknown = [...stringArray];
        if (
            isArray<string>(unknownArray, {
                valueValidator: (v) => isString(v),
            })
        ) {
            expect(unknownArray).toEqual(stringArray);
            expectTypeOf(unknownArray).toEqualTypeOf<string[]>();
        } else {
            throw new Error('Expected array to pass type guard');
        }
    });
});

describe('isSet', () => {
    it('returns true for positively tested set values', () => {
        expect(isSet(new Set(stringArray))).toBeTruthy();
        expect(
            isSet<string>(new Set(stringArray), {
                valueValidator: (v) => isString(v),
            }),
        ).toBeTruthy();
        expect(
            isSet<number>(new Set(numberArray), {
                valueValidator: (v) => isNumber(v),
            }),
        ).toBeTruthy();
        expect(
            isSet<symbol>(new Set(symbolArray), {
                valueValidator: (v) => isSymbol(v),
            }),
        ).toBeTruthy();
        expect(
            isSet<object>(new Set(recordArray), {
                valueValidator: (v) => isObject(v),
            }),
        ).toBeTruthy();
        expect(
            isSet<number | string>(new Set([...numberArray, ...stringArray]), {
                valueValidator: (v) =>
                    isUnion<number | string>(isString, isNumber)(v),
            }),
        ).toBeTruthy();
    });
    it('returns false for negatively tested set values', () => {
        expect(
            isSet<string>(new Set(stringArray), {
                valueValidator: (v) => isNumber(v),
            }),
        ).toBeFalsy();
        expect(
            isSet<number>(new Set(numberArray), {
                valueValidator: (v) => isString(v),
            }),
        ).toBeFalsy();
        expect(
            isSet<symbol>(new Set(symbolArray), {
                valueValidator: (v) => isObject(v),
            }),
        ).toBeFalsy();
        expect(
            isSet<object>(new Set(recordArray), {
                valueValidator: (v) => isSymbol(v),
            }),
        ).toBeFalsy();
        expect(
            isSet<number | string>(new Set([...recordArray, ...symbolArray]), {
                valueValidator: (v) =>
                    isUnion<number | string>(isString, isNumber)(v),
            }),
        ).toBeFalsy();
    });
    it('returns false for non-set values', () => {
        expect(
            isSet<string>('', { valueValidator: (v) => isString(v) }),
        ).toBeFalsy();
        expect(
            isSet<string>(null, { valueValidator: (v) => isString(v) }),
        ).toBeFalsy();
        expect(
            isSet<string>(123, { valueValidator: (v) => isString(v) }),
        ).toBeFalsy();
        expect(
            isSet<string>(Symbol(), { valueValidator: (v) => isString(v) }),
        ).toBeFalsy();
        expect(
            isSet<string>({}, { valueValidator: (v) => isString(v) }),
        ).toBeFalsy();
    });
    it('guards type correctly', () => {
        const unknownSet: unknown = new Set(stringArray);
        if (isSet(unknownSet)) {
            expect([...unknownSet]).toEqual(stringArray);

            const typedSet = unknownSet;
            expect(typedSet).toBeInstanceOf(Set);
        }
        if (
            isSet<string>(unknownSet, {
                valueValidator: (v: unknown) => isString(v),
            })
        ) {
            const typedSet = unknownSet;
            expect(typedSet).toBeInstanceOf(Set);
        }
    });
});

describe('isMap', () => {
    it('returns true for positively tested map values', () => {
        expect(
            isMap<string, string>(stringMap, {
                keyValidator: (v) => isString(v),
                valueValidator: (v) => isString(v),
            }),
        ).toBeTruthy();
        expect(
            isMap<number, number>(numberMap, {
                keyValidator: (v) => isNumber(v),
                valueValidator: (v) => isNumber(v),
            }),
        ).toBeTruthy();
        expect(
            isMap<symbol, symbol>(symbolMap, {
                keyValidator: (v) => isSymbol(v),
                valueValidator: (v) => isSymbol(v),
            }),
        ).toBeTruthy();
        expect(
            isMap<number | string | symbol, number | string | symbol>(
                new Map<number | string | symbol, number | string | symbol>([
                    ...stringMap,
                    ...numberMap,
                    ...symbolMap,
                ]),
                {
                    keyValidator: (v) =>
                        isUnion<number | string | symbol>(
                            isString,
                            isNumber,
                            isSymbol,
                        )(v),
                    valueValidator: (v) =>
                        isUnion<number | string | symbol>(
                            isString,
                            isNumber,
                            isSymbol,
                        )(v),
                },
            ),
        ).toBeTruthy();
        expect(
            isMap<boolean | object, boolean | object>(
                new Map<boolean | object, boolean | object>([
                    ...recordMap,
                    ...booleanMap,
                ]),
                {
                    keyValidator: (v) =>
                        isUnion<boolean | object>(isObject, isBoolean)(v),
                    valueValidator: (v) =>
                        isUnion<boolean | object>(isObject, isBoolean)(v),
                },
            ),
        ).toBeTruthy();
    });
    it('returns false for negatively tested map values', () => {
        expect(
            isMap<number, number>(stringMap, {
                keyValidator: (v: unknown): v is number => isNumber(v),
                valueValidator: (v: unknown): v is number => isNumber(v),
            }),
        ).toBeFalsy();
        expect(
            isMap<string, string>(numberMap, {
                keyValidator: (v: unknown): v is string => isString(v),
                valueValidator: (v: unknown): v is string => isString(v),
            }),
        ).toBeFalsy();
    });
    it('returns false for non-map values', () => {
        expect(isMap('')).toBeFalsy();
        expect(isMap(true)).toBeFalsy();
        expect(isMap(new Set())).toBeFalsy();
        expect(isMap([])).toBeFalsy();
        expect(isMap(new WeakMap())).toBeFalsy();
    });
    it('guards type correctly', () => {
        const unknownMap: unknown = new Map<unknown, unknown>([
            ...recordMap,
            ...stringMap,
        ]);
        if (
            isMap<object | string, object | string>(unknownMap, {
                keyValidator: (v) =>
                    isUnion<object | string>(isObject, isString)(v),
                valueValidator: (v) =>
                    isUnion<object | string>(isObject, isString)(v),
            })
        ) {
            expect([...unknownMap.entries()]).toEqual(
                expect.arrayContaining([...recordMap, ...stringMap]),
            );

            expectTypeOf(unknownMap).toMatchObjectType(
                // @ts-ignore
                new Map<object | string, object | string>(),
            );
        } else {
            throw new Error('Expected map to pass type guard');
        }
    });
});

describe('isRecord', () => {
    it('returns true for positively tested record values', () => {
        expect(
            isRecord<string, string>(stringRecord, {
                keyValidator: (v) => isString(v),
                valueValidator: (v) => isString(v),
            }),
        ).toBeTruthy();
        expect(
            isRecord<string, number>(numberRecord, {
                keyValidator: (v) => isString(v),
                valueValidator: (v) => isNumber(v),
            }),
        ).toBeTruthy();
        expect(
            isRecord<symbol, symbol>(symbolRecord, {
                keyValidator: (v) => isSymbol(v),
                valueValidator: (v) => isSymbol(v),
            }),
        ).toBeTruthy();
        expect(
            isRecord<string | symbol, string | symbol>(
                {
                    ...stringRecord,
                    ...numberRecord,
                    ...symbolRecord,
                },
                {
                    keyValidator: (v) =>
                        isUnion<number | string | symbol>(
                            isString,
                            isNumber,
                            isSymbol,
                        )(v),
                    valueValidator: (v) =>
                        isUnion<number | string | symbol>(
                            isString,
                            isNumber,
                            isSymbol,
                        )(v),
                },
            ),
        ).toBeTruthy();
    });
    it('returns false for negatively tested record values', () => {
        expect(
            isRecord<string, number>(stringRecord, {
                keyValidator: (v: unknown): v is string => isString(v),
                valueValidator: (v: unknown): v is number => isNumber(v),
            }),
        ).toBeFalsy();
        expect(
            isRecord<string, string>(numberRecord, {
                keyValidator: (v: unknown): v is string => isString(v),
                valueValidator: (v: unknown): v is string => isString(v),
            }),
        ).toBeFalsy();
    });
    it('returns false for non-record values', () => {
        expect(isRecord(CustomClass)).toBeFalsy();
        expect(isRecord(new Map())).toBeFalsy();
        expect(isRecord(new Set())).toBeFalsy();
        expect(isRecord([])).toBeFalsy();
        expect(isRecord(new WeakMap())).toBeFalsy();
    });
    it('guards type correctly', () => {
        const unknownRecord: unknown = {
            ...numberRecord,
            ...stringRecord,
        };
        if (
            isRecord<string, number | string>(unknownRecord, {
                keyValidator: (v) =>
                    isUnion<number | string>(isNumber, isString)(v),
                valueValidator: (v) =>
                    isUnion<number | string>(isNumber, isString)(v),
            })
        ) {
            expect(unknownRecord).toMatchObject({
                ...numberRecord,
                ...stringRecord,
            });

            // @ts-ignore
            expectTypeOf(unknownRecord).toMatchObjectType({
                ...numberRecord,
                ...stringRecord,
            });
        } else {
            throw new Error('Expected record to pass type guard');
        }
    });
});

describe.each([
    [
        'Union',
        isUnion<number | string | symbol>(isString, isNumber, isSymbol),
        ['abc', 1, Symbol()],
        [undefined, true, ...objectValues, ...functionValues],
    ],
    [
        'string',
        isString,
        ['abc'],
        [1, true, null, ...objectValues, ...functionValues],
    ],
    [
        'number',
        isNumber,
        [0, 1],
        ['abc', true, null, ...objectValues, ...functionValues],
    ],
    [
        'bigint',
        isBigInt,
        [9_007_199_254_740_991n, BigInt(9_007_199_254_740_991)],
        [0, 1, 'abc', true, null, ...objectValues, ...functionValues],
    ],
    [
        'boolean',
        isBoolean,
        [true, false],
        ['', 0, null, ...objectValues, ...functionValues],
    ],
    [
        'symbol',
        isSymbol,
        [Symbol()],
        ['', 0, null, true, ...objectValues, ...functionValues],
    ],
    [
        'object',
        isObject,
        objectValues,
        [null, ...primitiveValues, ...functionValues],
    ],
    [
        'undefined',
        isUndefined,
        [undefined],
        ['', 0, null, false, ...objectValues, ...functionValues],
    ],
    [
        'null',
        isNull,
        [null],
        ['', 0, undefined, false, ...objectValues, ...functionValues],
    ],
    [
        'Nullish',
        isNullish,
        [null, undefined],
        ['', 0, false, ...objectValues, ...functionValues],
    ],
    [
        'Defined',
        isDefined,
        ['', 0, null, false, ...objectValues, ...functionValues],
        [undefined],
    ],
    [
        'notNull',
        isNotNull,
        ['', 0, undefined, false, ...objectValues, ...functionValues],
        [null],
    ],
    [
        'notNullish',
        isNotNullish,
        ['', 0, false, ...objectValues, ...functionValues],
        [null, undefined],
    ],
    [
        'Error',
        isError,
        errors,
        [
            ...primitiveValues,
            ...objectValues.filter((v) => !(v instanceof Error)),
            ...functionValues,
        ],
    ],
    [
        'Buffer',
        isBuffer,
        [Buffer.alloc(8), Buffer.alloc(16)],
        [
            ...primitiveValues,
            ...objectValues.filter((v) => !(v instanceof Buffer)),
            ...functionValues,
        ],
    ],
    [
        'ArrayBuffer',
        isArrayBuffer,
        [new ArrayBuffer(8), new ArrayBuffer(16)],
        [
            ...primitiveValues,
            ...objectValues.filter((v) => !(v instanceof ArrayBuffer)),
            ...functionValues,
        ],
    ],
    [
        'SharedArrayBuffer',
        isSharedArrayBuffer,
        [new SharedArrayBuffer(8), new SharedArrayBuffer(16)],
        [
            ...primitiveValues,
            ...objectValues.filter((v) => !(v instanceof SharedArrayBuffer)),
            ...functionValues,
        ],
    ],
    [
        'AnyArrayBuffer',
        isAnyArrayBuffer,
        [new SharedArrayBuffer(8), new ArrayBuffer(16)],
        [
            ...primitiveValues,
            ...objectValues.filter(
                (v) =>
                    !(v instanceof SharedArrayBuffer) &&
                    !(v instanceof ArrayBuffer),
            ),
            ...functionValues,
        ],
    ],
    [
        'RegExp',
        isRegExp,
        [new RegExp('test'), /'test'/],
        [...primitiveValues, ...objectValues, ...functionValues],
    ],
    [
        'Date',
        isDate,
        [new Date()],
        [...primitiveValues, ...objectValues, ...functionValues],
    ],
    [
        'String',
        isStringObject,
        [new String('x')],
        [
            ...primitiveValues,
            ...objectValues.filter(
                (v) => Object.prototype.toString.call(v) !== '[object String]',
            ),
            ...functionValues,
        ],
    ],
    [
        'Boolean',
        isBooleanObject,
        [new Boolean(true)],
        [
            ...primitiveValues,
            ...objectValues.filter(
                (v) => Object.prototype.toString.call(v) !== '[object Boolean]',
            ),
            ...functionValues,
        ],
    ],
    [
        'Number',
        isNumberObject,
        [new Number(1)],
        [
            ...primitiveValues,
            ...objectValues.filter(
                (v) => Object.prototype.toString.call(v) !== '[object Number]',
            ),
            ...functionValues,
        ],
    ],
    [
        'Promise',
        isPromise,
        [promise],
        [...objectValues, ...functionValues, ...primitiveValues],
    ],
    [
        'Function',
        isFunction,
        [regularFunction],
        [
            asyncFunction,
            generatorFunction,
            asyncGeneratorFunction,
            ...primitiveValues,
            ...objectValues,
        ],
    ],
    [
        'AsyncFunction',
        isAsyncFunction,
        [asyncFunction],
        [
            regularFunction,
            generatorFunction,
            asyncGeneratorFunction,
            ...primitiveValues,
            ...objectValues,
        ],
    ],
    [
        'GeneratorFunction',
        isGeneratorFunction,
        [generatorFunction],
        [
            regularFunction,
            asyncFunction,
            asyncGeneratorFunction,
            ...primitiveValues,
            ...objectValues,
        ],
    ],
    [
        'AsyncGeneratorFunction',
        isAsyncGeneratorFunction,
        [asyncGeneratorFunction],
        [
            regularFunction,
            asyncFunction,
            generatorFunction,
            ...objectValues,
            ...primitiveValues,
        ],
    ],
    [
        'Generator',
        isGenerator,
        [generator],
        [
            asyncGenerator,
            ...objectValues,
            ...functionValues,
            ...primitiveValues,
        ],
    ],
    [
        'AsyncGenerator',
        isAsyncGenerator,
        [asyncGenerator],
        [generator, ...objectValues, ...functionValues, ...primitiveValues],
    ],
    [
        'Iterable',
        isIterable,
        [...iterableObjects, generator, '', ...typedArrays],
        [
            ...errors,
            {},
            ...functionValues,
            ...primitiveValues.filter((v) => typeof v !== 'string'),
        ],
    ],
    [
        'AsyncIterable',
        isAsyncIterable,
        [asyncGenerator],
        [...errors, ...typedArrays, {}, ...functionValues, ...primitiveValues],
    ],
    [
        'Iterator',
        isIterator,
        [asyncGenerator, generator, new Map().values(), new Set().values()],
        [
            ...errors,
            {},
            ...objectValues,
            ...typedArrays,
            ...functionValues,
            ...primitiveValues,
        ],
    ],
    [
        'TypedArray',
        isTypedArray,
        typedArrays,
        [
            ...objectValues.filter(
                (v) => ![...buffers, ...typedArrays].includes(v as any),
            ),
            ...functionValues,
            ...primitiveValues,
        ],
    ],
    [
        'Int8Array',
        isInt8Array,
        [new Int8Array()],
        [
            ...objectValues.filter(
                (v) => ![...buffers, ...typedArrays].includes(v as any),
            ),

            ...functionValues,
            ...primitiveValues,
        ],
    ],
    [
        'Uint8Array',
        isUint8Array,
        [new Uint8Array()],
        [
            ...objectValues.filter(
                (v) => ![...buffers, ...typedArrays].includes(v as any),
            ),

            ...functionValues,
            ...primitiveValues,
        ],
    ],
    [
        'Uint8ClampedArray',
        isUint8ClampedArray,
        [new Uint8ClampedArray()],
        [
            ...objectValues.filter(
                (v) => ![...buffers, ...typedArrays].includes(v as any),
            ),

            ...functionValues,
            ...primitiveValues,
        ],
    ],
    [
        'Int16Array',
        isInt16Array,
        [new Int16Array()],
        [
            ...objectValues.filter(
                (v) => ![...buffers, ...typedArrays].includes(v as any),
            ),

            ...functionValues,
            ...primitiveValues,
        ],
    ],
    [
        'Uint16Array',
        isUint16Array,
        [new Uint16Array()],
        [
            ...objectValues.filter(
                (v) => ![...buffers, ...typedArrays].includes(v as any),
            ),

            ...functionValues,
            ...primitiveValues,
        ],
    ],
    [
        'Int32Array',
        isInt32Array,
        [new Int32Array()],
        [
            ...objectValues.filter(
                (v) => ![...buffers, ...typedArrays].includes(v as any),
            ),

            ...functionValues,
            ...primitiveValues,
        ],
    ],
    [
        'Uint32Array',
        isUint32Array,
        [new Uint32Array()],
        [
            ...objectValues.filter(
                (v) => ![...buffers, ...typedArrays].includes(v as any),
            ),

            ...functionValues,
            ...primitiveValues,
        ],
    ],
    [
        'Float32Array',
        isFloat32Array,
        [new Float32Array()],
        [
            ...objectValues.filter(
                (v) => ![...buffers, ...typedArrays].includes(v as any),
            ),

            ...functionValues,
            ...primitiveValues,
        ],
    ],
    [
        'Float64Array',
        isFloat64Array,
        [new Float64Array()],
        [
            ...objectValues.filter(
                (v) => ![...buffers, ...typedArrays].includes(v as any),
            ),

            ...functionValues,
            ...primitiveValues,
        ],
    ],
    [
        'BigInt64Array',
        isBigInt64Array,
        [new BigInt64Array()],
        [
            ...objectValues.filter(
                (v) => ![...buffers, ...typedArrays].includes(v as any),
            ),

            ...functionValues,
            ...primitiveValues,
        ],
    ],
    [
        'BigUint64Array',
        isBigUint64Array,
        [new BigUint64Array()],
        [
            ...objectValues.filter(
                (v) => ![...buffers, ...typedArrays].includes(v as any),
            ),

            ...functionValues,
            ...primitiveValues,
        ],
    ],
    [
        'DataView',
        isDataView,
        [new DataView(new ArrayBuffer(8))],
        [...objectValues, ...primitiveValues, ...functionValues],
    ],
    [
        'WeakMap',
        isWeakMap,
        [new WeakMap([[stringRecord, '123']])],
        [
            ...objectValues.filter((v) => !(v instanceof WeakMap)),
            ...primitiveValues,
            ...functionValues,
        ],
    ],
    [
        'WeakSet',
        isWeakSet,
        [new WeakSet([stringRecord, numberRecord])],
        [
            ...objectValues.filter((v) => !(v instanceof WeakSet)),
            ...primitiveValues,
            ...functionValues,
        ],
    ],
    [
        'PlainObject',
        isPlainObject,
        [
            {},
            { a: 1 },
            Object.create(null),
            Object.create(Object.prototype),
            Object.create(Object.create(null)),
        ],
        [
            new Date(),
            [],
            null,
            undefined,
            new CustomClass(),
            ...functionValues,
            ...primitiveValues.filter(
                (v): v is boolean | number | string | symbol =>
                    Boolean(v) || v === false || v === 0 || v === '',
            ),
        ],
    ],
    [
        'ArgumentsObject',
        isArgumentsObject,
        [
            (function () {
                // @ts-ignore
                return arguments;
                // @ts-ignore
            })(1, 2, 3),
        ],
        [{}, [], null, undefined, ...functionValues, ...primitiveValues],
    ],
    [
        'ArrayBufferView',
        isArrayBufferView,
        [
            new Uint8Array(),
            new Uint16Array(),
            new Uint32Array(),
            new Int8Array(),
            new Int16Array(),
            new Int32Array(),
            new Float32Array(),
            new Float64Array(),
            new DataView(new ArrayBuffer(8)),
        ],
        [
            new ArrayBuffer(8),
            [],
            {},
            null,
            undefined,
            ...functionValues,
            ...primitiveValues,
        ],
    ],
    [
        'BigIntObject',
        isBigIntObject,
        [new Object(BigInt(123))],
        [
            BigInt(123),
            123,
            '123',
            null,
            undefined,
            ...objectValues.filter(
                (v) =>
                    !(Object.prototype.toString.call(v) === '[object BigInt]'),
            ),
            ...functionValues,
        ],
    ],
    [
        'BoxedPrimitive',
        isBoxedPrimitive,
        [
            new Object('string'),
            new Object(123),
            new Object(true),
            new Object(Symbol('test')),
            new Object(BigInt(123)),
        ],
        [
            'string',
            123,
            true,
            Symbol('test'),
            BigInt(123),
            null,
            undefined,
            {},
            [],
            ...functionValues,
        ],
    ],
    [
        'EmptyArray',
        isEmptyArray,
        [[]],
        [
            [1],
            ['a'],
            {},
            '',
            null,
            undefined,
            ...objectValues.filter((v) => !Array.isArray(v)),
            ...functionValues,
        ],
    ],
    [
        'EmptyObject',
        isEmptyObject,
        [{}],
        [
            { a: 1 },
            [],
            '',
            null,
            undefined,
            ...objectValues.filter((v) => Object.keys(v as object).length > 0),
            ...functionValues,
        ],
    ],
    [
        'EmptyString',
        isEmptyString,
        [''],
        [
            'a',
            ' ',
            [],
            {},
            null,
            undefined,
            ...objectValues.filter((v) => typeof v !== 'string'),
            ...functionValues,
        ],
    ],
    [
        'Finite',
        isFinite,
        [0, 1, -1, 1.5, Number.MAX_VALUE, -Number.MAX_VALUE],
        [
            Infinity,
            -Infinity,
            Number.NaN,
            '1',
            true,
            null,
            undefined,
            ...objectValues,
            ...functionValues,
        ],
    ],
    [
        'Integer',
        isInteger,
        [0, 1, -1, Number.MAX_SAFE_INTEGER, -Number.MAX_SAFE_INTEGER],
        [1.5, '1', true, null, undefined, ...objectValues, ...functionValues],
    ],
    [
        'MapIterator',
        isMapIterator,
        [new Map().entries()],
        [
            new Map(),
            new Set(),
            [],
            {},
            null,
            undefined,
            ...functionValues,
            ...primitiveValues,
        ],
    ],
    [
        'NaN',
        isNaN,
        [Number.NaN, Number.NaN],
        [0, 'NaN', null, undefined, ...objectValues, ...functionValues],
    ],
    [
        'NativeError',
        isNativeError,
        [new Error(), new TypeError(), new RangeError()],
        [
            { message: 'error', name: 'Error' },
            null,
            undefined,
            ...objectValues.filter((v) => !(v instanceof Error)),
            ...functionValues,
        ],
    ],
    [
        'NonEmptyArray',
        isNonEmptyArray,
        [[1], ['a'], [{}], [null], [undefined]],
        [
            [],
            {},
            '',
            null,
            undefined,
            ...objectValues.filter((v) => !Array.isArray(v)),
            ...functionValues,
        ],
    ],
    [
        'NonEmptyString',
        isNonEmptyString,
        ['a', ' ', 'test', '0', 'false'],
        [
            '',
            [],
            {},
            null,
            undefined,
            ...objectValues.filter((v) => typeof v !== 'string'),
            ...functionValues,
        ],
    ],
    [
        'SafeInteger',
        isSafeInteger,
        [0, 1, -1, Number.MAX_SAFE_INTEGER, -Number.MAX_SAFE_INTEGER],
        [
            Number.MAX_SAFE_INTEGER + 1,
            -Number.MAX_SAFE_INTEGER - 1,
            1.5,
            '1',
            true,
            null,
            undefined,
            ...objectValues,
            ...functionValues,
        ],
    ],
    [
        'SetIterator',
        isSetIterator,
        [new Set().values()],
        [
            new Set(),
            new Map(),
            [],
            {},
            null,
            undefined,
            ...functionValues,
            ...primitiveValues,
        ],
    ],
    [
        'SymbolObject',
        isSymbolObject,
        [new Object(Symbol('test'))],
        [
            Symbol('test'),
            'symbol',
            {},
            [],
            null,
            undefined,
            ...objectValues.filter(
                (v) =>
                    !(Object.prototype.toString.call(v) === '[object Symbol]'),
            ),
            ...functionValues,
        ],
    ],
])(
    '%s',
    (
        _: string,
        guard: TypeGuard<unknown>,
        expected: unknown[],
        failed: unknown[],
    ) => {
        it.each(expected)(`returns true for expected values`, (value) => {
            expect(guard(value)).toBeTruthy();
        });
        it.each(failed)(`returns false for non-expected values`, (value) => {
            expect(guard(value)).toBeFalsy();
        });
    },
);
