import { expectTypeOf } from 'expect-type';

import {
    isAnyArrayBuffer,
    isArray,
    isArrayBuffer,
    isAsyncFunction,
    isAsyncGenerator,
    isAsyncGeneratorFunction,
    isAsyncIterable,
    isBigInt,
    isBigInt64Array,
    isBigUint64Array,
    isBoolean,
    isBooleanObject,
    isBuffer,
    isDataView,
    isDate,
    isDefined,
    isError,
    isFloat32Array,
    isFloat64Array,
    isFunction,
    isGenerator,
    isGeneratorFunction,
    isInt8Array,
    isInt16Array,
    isInt32Array,
    isIterable,
    isIterator,
    isMap,
    isNotNull,
    isNotNullish,
    isNull,
    isNullish,
    isNumber,
    isNumberObject,
    isObject,
    isPromise,
    isRecord,
    isRegExp,
    isSet,
    isSharedArrayBuffer,
    isString,
    isStringObject,
    isSymbol,
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
class CustomClass {}
const stringRecord = { name: 'xyz' };
const numberRecord = { 1: 100 };
const symbolRecord = { [Symbol('a')]: Symbol('b') };
const promise = new Promise((resolve) => {
    resolve(null);
});
const primitiveValues = [true, false, 0, 1, '', undefined, Symbol()];
const iterableObjects = [new Map(), new Set(), new String(), []];
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
    new Number(),
    new Boolean(),
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
            isArray<string>(stringArray, { valueValidator: isString }),
        ).toBeTruthy();
        expect(
            isArray<number>(numberArray, { valueValidator: isNumber }),
        ).toBeTruthy();
        expect(
            isArray<symbol>(symbolArray, { valueValidator: isSymbol }),
        ).toBeTruthy();
        expect(
            isArray<object>(recordArray, { valueValidator: isObject }),
        ).toBeTruthy();
        expect(
            isArray<number | string>([...stringArray, ...numberArray], {
                valueValidator: isUnion<number | string>(isString, isNumber),
            }),
        ).toBeTruthy();
    });
    it('returns false for negatively tested array values', () => {
        expect(
            isArray<string>(stringArray, { valueValidator: isNumber }),
        ).toBeFalsy();
        expect(
            isArray<number>(numberArray, { valueValidator: isString }),
        ).toBeFalsy();
        expect(
            isArray<symbol>(symbolArray, { valueValidator: isObject }),
        ).toBeFalsy();
        expect(
            isArray<object>(recordArray, { valueValidator: isSymbol }),
        ).toBeFalsy();
        expect(
            isArray<number | string>([...symbolArray, ...recordArray], {
                valueValidator: isUnion<number | string>(isString, isNumber),
            }),
        ).toBeFalsy();
    });
    it('returns false for non-array values', () => {
        expect(isArray<string>('', { valueValidator: isString })).toBeFalsy();
        expect(isArray<string>(null, { valueValidator: isString })).toBeFalsy();
        expect(isArray<string>(123, { valueValidator: isString })).toBeFalsy();
        expect(
            isArray<string>(Symbol(), { valueValidator: isString }),
        ).toBeFalsy();
        expect(isArray<string>({}, { valueValidator: isString })).toBeFalsy();
    });

    it('guards type correctly', () => {
        const unknownArray: unknown = [...stringArray];
        if (isArray<string>(unknownArray, { valueValidator: isString })) {
            expectTypeOf(unknownArray).toMatchTypeOf(stringArray);
        }
    });
});

describe('isSet', () => {
    it('returns true for positively tested set values', () => {
        expect(isSet(new Set(stringArray))).toBeTruthy();
        expect(
            isSet<string>(new Set(stringArray), { valueValidator: isString }),
        ).toBeTruthy();
        expect(
            isSet<number>(new Set(numberArray), { valueValidator: isNumber }),
        ).toBeTruthy();
        expect(
            isSet<symbol>(new Set(symbolArray), { valueValidator: isSymbol }),
        ).toBeTruthy();
        expect(
            isSet<object>(new Set(recordArray), { valueValidator: isObject }),
        ).toBeTruthy();
        expect(
            isSet<number | string>(new Set([...numberArray, ...stringArray]), {
                valueValidator: isUnion<number | string>(isString, isNumber),
            }),
        ).toBeTruthy();
    });
    it('returns false for negatively tested set values', () => {
        expect(
            isSet<string>(new Set(stringArray), { valueValidator: isNumber }),
        ).toBeFalsy();
        expect(
            isSet<number>(new Set(numberArray), { valueValidator: isString }),
        ).toBeFalsy();
        expect(
            isSet<symbol>(new Set(symbolArray), { valueValidator: isObject }),
        ).toBeFalsy();
        expect(
            isSet<object>(new Set(recordArray), { valueValidator: isSymbol }),
        ).toBeFalsy();
        expect(
            isSet<number | string>(new Set([...recordArray, ...symbolArray]), {
                valueValidator: isUnion<number | string>(isString, isNumber),
            }),
        ).toBeFalsy();
    });
    it('returns false for non-set values', () => {
        expect(isSet<string>('', { valueValidator: isString })).toBeFalsy();
        expect(isSet<string>(null, { valueValidator: isString })).toBeFalsy();
        expect(isSet<string>(123, { valueValidator: isString })).toBeFalsy();
        expect(
            isSet<string>(Symbol(), { valueValidator: isString }),
        ).toBeFalsy();
        expect(isSet<string>({}, { valueValidator: isString })).toBeFalsy();
    });
    it('guards type correctly', () => {
        const unknownSet: unknown = new Set(stringArray);
        if (isSet(unknownSet)) {
            expectTypeOf(unknownSet).toMatchTypeOf(
                new Set<unknown>(stringArray),
            );
        }
        if (isSet<string>(unknownSet, { valueValidator: isString })) {
            expectTypeOf(unknownSet).toMatchTypeOf(
                new Set<string>(stringArray),
            );
        }
    });
});

describe('isMap', () => {
    it('returns true for positively tested map values', () => {
        expect(
            isMap<string, string>(stringMap, {
                keyValidator: isString,
                valueValidator: isString,
            }),
        ).toBeTruthy();
        expect(
            isMap<number, number>(numberMap, {
                keyValidator: isNumber,
                valueValidator: isNumber,
            }),
        ).toBeTruthy();
        expect(
            isMap<symbol, symbol>(symbolMap, {
                keyValidator: isSymbol,
                valueValidator: isSymbol,
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
                    keyValidator: isUnion<number | string | symbol>(
                        isString,
                        isNumber,
                        isSymbol,
                    ),
                    valueValidator: isUnion<number | string | symbol>(
                        isString,
                        isNumber,
                        isSymbol,
                    ),
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
                    keyValidator: isUnion<boolean | object>(
                        isObject,
                        isBoolean,
                    ),
                    valueValidator: isUnion<boolean | object>(
                        isObject,
                        isBoolean,
                    ),
                },
            ),
        ).toBeTruthy();
    });
    it('returns false for negatively tested map values', () => {
        expect(
            isMap(stringMap, {
                keyValidator: isNumber,
                valueValidator: isNumber,
            }),
        ).toBeFalsy();
        expect(
            isMap(numberMap, {
                keyValidator: isString,
                valueValidator: isString,
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
                keyValidator: isUnion<object | string>(isObject, isString),
                valueValidator: isUnion<object | string>(isObject, isString),
            })
        ) {
            expectTypeOf(unknownMap).toMatchTypeOf<
                Map<object | string, object | string>
            >(new Map<object | string, object | string>());
        }
    });
});

describe('isRecord', () => {
    it('returns true for positively tested record values', () => {
        expect(
            isRecord<string, string>(stringRecord, {
                keyValidator: isString,
                valueValidator: isString,
            }),
        ).toBeTruthy();
        expect(
            isRecord<string, number>(numberRecord, {
                keyValidator: isString,
                valueValidator: isNumber,
            }),
        ).toBeTruthy();
        expect(
            isRecord<symbol, symbol>(symbolRecord, {
                keyValidator: isSymbol,
                valueValidator: isSymbol,
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
                    keyValidator: isUnion<number | string | symbol>(
                        isString,
                        isNumber,
                        isSymbol,
                    ),
                    valueValidator: isUnion<number | string | symbol>(
                        isString,
                        isNumber,
                        isSymbol,
                    ),
                },
            ),
        ).toBeTruthy();
    });
    it('returns false for negatively tested record values', () => {
        expect(
            isRecord(stringRecord, {
                keyValidator: isNumber,
                valueValidator: isNumber,
            }),
        ).toBeFalsy();
        expect(
            isRecord(numberRecord, {
                keyValidator: isString,
                valueValidator: isString,
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
                keyValidator: isUnion<number | string>(isNumber, isString),
                valueValidator: isUnion<number | string>(isNumber, isString),
            })
        ) {
            expectTypeOf(unknownRecord).toMatchTypeOf<
                Record<string, number | string>
            >({
                ...numberRecord,
                ...stringRecord,
            });
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
            ...objectValues.filter((v) => !(v instanceof String)),
            ...functionValues,
        ],
    ],
    [
        'Boolean',
        isBooleanObject,
        [new Boolean(true)],
        [
            ...primitiveValues,
            ...objectValues.filter((v) => !(v instanceof Boolean)),
            ...functionValues,
        ],
    ],
    [
        'Number',
        isNumberObject,
        [new Number(1)],
        [
            ...primitiveValues,
            ...objectValues.filter((v) => !(v instanceof Number)),
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
