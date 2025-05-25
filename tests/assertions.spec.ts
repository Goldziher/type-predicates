import {
    assertIsAnyArrayBuffer,
    assertIsArray,
    assertIsArrayBuffer,
    assertIsAsyncFunction,
    assertIsAsyncGenerator,
    assertIsAsyncGeneratorFunction,
    assertIsAsyncIterable,
    assertIsBigInt,
    assertIsBigInt64Array,
    assertIsBigUint64Array,
    assertIsBoolean,
    assertIsBooleanObject,
    assertIsBuffer,
    assertIsDataView,
    assertIsDate,
    assertIsDefined,
    assertIsError,
    assertIsFloat32Array,
    assertIsFloat64Array,
    assertIsFunction,
    assertIsGenerator,
    assertIsGeneratorFunction,
    assertIsInt8Array,
    assertIsInt16Array,
    assertIsInt32Array,
    assertIsIterable,
    assertIsIterator,
    assertIsMap,
    assertIsNotNull,
    assertIsNotNullish,
    assertIsNull,
    assertIsNullish,
    assertIsNumber,
    assertIsNumberObject,
    assertIsObject,
    assertIsPromise,
    assertIsRecord,
    assertIsRegExp,
    assertIsSet,
    assertIsSharedArrayBuffer,
    assertIsString,
    assertIsStringObject,
    assertIsSymbol,
    assertIsTypedArray,
    assertIsUint8Array,
    assertIsUint8ClampedArray,
    assertIsUint16Array,
    assertIsUint32Array,
    assertIsUndefined,
    assertIsWeakMap,
    assertIsWeakSet,
    ErrorMessage,
    isBoolean,
    isNumber,
    isObject,
    isString,
    isSymbol,
    isUnion,
    TypeAssertion,
} from '../src';

const CUSTOM_MESSAGE = 'CUSTOM';
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
// Used for testing type guards and assertions
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class CustomClass {}
const stringRecord = { name: 'xyz' };
const numberRecord = { 1: 100 };
const symbolRecord = { [Symbol('a')]: Symbol('b') };
const promise = new Promise((resolve) => {
    resolve(null);
});
const primitiveValues = [true, false, 0, 1, '', undefined, Symbol()];
const iterableObjects = [new Map(), new Set(), String(''), []];
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
    Number(0),
    Boolean(false),
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

describe('assertIsArray', () => {
    it('does not throw for positively tested array values', () => {
        expect(() => {
            assertIsArray<string>(stringArray, { valueValidator: isString });
        }).not.toThrow();
        expect(() => {
            assertIsArray<number>(numberArray, { valueValidator: isNumber });
        }).not.toThrow();
        expect(() => {
            assertIsArray<symbol>(symbolArray, { valueValidator: isSymbol });
        }).not.toThrow();
        expect(() => {
            assertIsArray<object>(recordArray, { valueValidator: isObject });
        }).not.toThrow();
        expect(() => {
            assertIsArray<number | string>([...stringArray, ...numberArray], {
                valueValidator: isUnion<number | string>(isString, isNumber),
            });
        }).not.toThrow();
    });
    it('throw for negatively tested array values', () => {
        expect(() => {
            assertIsArray<string>(stringArray, { valueValidator: isNumber });
        }).toThrow();
        expect(() => {
            assertIsArray<number>(numberArray, { valueValidator: isString });
        }).toThrow();
        expect(() => {
            assertIsArray<symbol>(symbolArray, { valueValidator: isObject });
        }).toThrow();
        expect(() => {
            assertIsArray<object>(recordArray, { valueValidator: isSymbol });
        }).toThrow();
        expect(() => {
            assertIsArray<number | string>([...symbolArray, ...recordArray], {
                valueValidator: isUnion<number | string>(isString, isNumber),
            });
        }).toThrow();
    });
    it('throws for non-array values', () => {
        expect(() => {
            assertIsArray<string>('', { valueValidator: isString });
        }).toThrow();
        expect(() => {
            assertIsArray<string>(null, { valueValidator: isString });
        }).toThrow();
        expect(() => {
            assertIsArray<string>(123, { valueValidator: isString });
        }).toThrow();
        expect(() => {
            assertIsArray<string>(Symbol(), { valueValidator: isString });
        }).toThrow();
        expect(() => {
            assertIsArray<string>({}, { valueValidator: isString });
        }).toThrow();
    });
    it('throws custom message', () => {
        expect(() => {
            assertIsArray({}, { message: CUSTOM_MESSAGE });
        }).toThrow(CUSTOM_MESSAGE);
    });
});

describe('assertIsSet', () => {
    it('does not throw for positively tested Set values', () => {
        expect(() => {
            assertIsSet<string>(new Set(stringArray), {
                valueValidator: isString,
            });
        }).not.toThrow();
        expect(() => {
            assertIsSet<number>(new Set(numberArray), {
                valueValidator: isNumber,
            });
        }).not.toThrow();
        expect(() => {
            assertIsSet<symbol>(new Set(symbolArray), {
                valueValidator: isSymbol,
            });
        }).not.toThrow();
        expect(() => {
            assertIsSet<object>(new Set(recordArray), {
                valueValidator: isObject,
            });
        }).not.toThrow();
        expect(() => {
            assertIsSet<number | string>(
                new Set([...numberArray, ...stringArray]),
                {
                    valueValidator: isUnion<number | string>(
                        isString,
                        isNumber,
                    ),
                },
            );
        }).not.toThrow();
    });
    it('throws for negatively tested Set values', () => {
        expect(() => {
            assertIsSet<string>(new Set(stringArray), {
                valueValidator: isNumber,
            });
        }).toThrow();
        expect(() => {
            assertIsSet<number>(new Set(numberArray), {
                valueValidator: isString,
            });
        }).toThrow();
        expect(() => {
            assertIsSet<symbol>(new Set(symbolArray), {
                valueValidator: isObject,
            });
        }).toThrow();
        expect(() => {
            assertIsSet<object>(new Set(recordArray), {
                valueValidator: isSymbol,
            });
        }).toThrow();
        expect(() => {
            assertIsSet<number | string>(
                new Set([...recordArray, ...symbolArray]),
                {
                    valueValidator: isUnion<number | string>(
                        isString,
                        isNumber,
                    ),
                },
            );
        }).toThrow();
    });
    it('throws for non-Set values', () => {
        expect(() => {
            assertIsSet<string>('', { valueValidator: isString });
        }).toThrow();
        expect(() => {
            assertIsSet<string>(null, { valueValidator: isString });
        }).toThrow();
        expect(() => {
            assertIsSet<string>(123, { valueValidator: isString });
        }).toThrow();
        expect(() => {
            assertIsSet<string>(Symbol(), { valueValidator: isString });
        }).toThrow();
        expect(() => {
            assertIsSet<string>({}, { valueValidator: isString });
        }).toThrow();
    });
    it('throws custom message', () => {
        expect(() => {
            assertIsSet({}, { message: CUSTOM_MESSAGE });
        }).toThrow(CUSTOM_MESSAGE);
    });
});

describe('assertIsMap', () => {
    it('does not throw for positively tested Map values', () => {
        expect(() => {
            assertIsMap<string, string>(stringMap, {
                keyValidator: isString,
                valueValidator: isString,
            });
        }).not.toThrow();
        expect(() => {
            assertIsMap<number, number>(numberMap, {
                keyValidator: isNumber,
                valueValidator: isNumber,
            });
        }).not.toThrow();
        expect(() => {
            assertIsMap<symbol, symbol>(symbolMap, {
                keyValidator: isSymbol,
                valueValidator: isSymbol,
            });
        }).not.toThrow();
        expect(() => {
            assertIsMap<number | string | symbol, number | string | symbol>(
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
            );
        }).not.toThrow();
        expect(() => {
            assertIsMap<boolean | object, boolean | object>(
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
            );
        }).not.toThrow();
    });
    it('throws for negatively tested Map values', () => {
        expect(() => {
            assertIsMap(stringMap, {
                keyValidator: isNumber,
                valueValidator: isNumber,
            });
        }).toThrow();
        expect(() => {
            assertIsMap(numberMap, {
                keyValidator: isString,
                valueValidator: isString,
            });
        }).toThrow();
    });
    it('throws for non-Map values', () => {
        expect(() => {
            assertIsMap('');
        }).toThrow();
        expect(() => {
            assertIsMap(true);
        }).toThrow();
        expect(() => {
            assertIsMap(new Set());
        }).toThrow();
        expect(() => {
            assertIsMap([]);
        }).toThrow();
        expect(() => {
            assertIsMap(new WeakMap());
        }).toThrow();
    });
    it('throws custom message', () => {
        expect(() => {
            assertIsMap({}, { message: CUSTOM_MESSAGE });
        }).toThrow(CUSTOM_MESSAGE);
    });
});

describe('assertIsRecord', () => {
    it('returns true for positively tested record values', () => {
        expect(() => {
            assertIsRecord<string, string>(stringRecord, {
                keyValidator: isString,
                valueValidator: isString,
            });
        }).not.toThrow();
        expect(() => {
            assertIsRecord<string, number>(numberRecord, {
                keyValidator: isString,
                valueValidator: isNumber,
            });
        }).not.toThrow();
        expect(() => {
            assertIsRecord<symbol, symbol>(symbolRecord, {
                keyValidator: isSymbol,
                valueValidator: isSymbol,
            });
        }).not.toThrow();
        expect(() => {
            assertIsRecord<string | symbol, string | symbol>(
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
            );
        }).not.toThrow();
    });
    it('returns false for negatively tested record values', () => {
        expect(() => {
            assertIsRecord(stringRecord, {
                keyValidator: isNumber,
                valueValidator: isNumber,
            });
        }).toThrow();
        expect(() => {
            assertIsRecord(numberRecord, {
                keyValidator: isString,
                valueValidator: isString,
            });
        }).toThrow();
    });
    it('returns false for non-record values', () => {
        expect(() => {
            assertIsRecord(CustomClass);
        }).toThrow();
        expect(() => {
            assertIsRecord(new Map());
        }).toThrow();
        expect(() => {
            assertIsRecord(new Set());
        }).toThrow();
        expect(() => {
            assertIsRecord([]);
        }).toThrow();
        expect(() => {
            assertIsRecord(new WeakMap());
        }).toThrow();
    });
    it('throws custom message', () => {
        expect(() => {
            assertIsRecord([], { message: CUSTOM_MESSAGE });
        }).toThrow(CUSTOM_MESSAGE);
    });
});

describe.each([
    [
        'string',
        assertIsString,
        ['abc'],
        [1, true, null, ...objectValues, ...functionValues],
    ],
    [
        'number',
        assertIsNumber,
        [0, 1],
        ['abc', true, null, ...objectValues, ...functionValues],
    ],
    [
        'bigint',
        assertIsBigInt,
        [9_007_199_254_740_991n, BigInt(9_007_199_254_740_991)],
        [0, 1, 'abc', true, null, ...objectValues, ...functionValues],
    ],
    [
        'boolean',
        assertIsBoolean,
        [true, false],
        ['', 0, null, ...objectValues, ...functionValues],
    ],
    [
        'symbol',
        assertIsSymbol,
        [Symbol()],
        ['', 0, null, true, ...objectValues, ...functionValues],
    ],
    [
        'undefined',
        assertIsUndefined,
        [undefined],
        ['', 0, null, false, ...objectValues, ...functionValues],
    ],
    [
        'object',
        assertIsObject,
        objectValues,
        [null, ...primitiveValues, ...functionValues],
    ],
    [
        'null',
        assertIsNull,
        [null],
        ['', 0, undefined, false, ...objectValues, ...functionValues],
    ],
    [
        'nullish',
        assertIsNullish,
        [null, undefined],
        ['', 0, false, ...objectValues, ...functionValues],
    ],
    [
        'Defined',
        assertIsDefined,
        ['', 0, null, false, ...objectValues, ...functionValues],
        [undefined],
    ],
    [
        'notNull',
        assertIsNotNull,
        ['', 0, undefined, false, ...objectValues, ...functionValues],
        [null],
    ],
    [
        'notNullish',
        assertIsNotNullish,
        ['', 0, false, ...objectValues, ...functionValues],
        [null, undefined],
    ],
    [
        'Error',
        assertIsError,
        errors,
        [
            ...primitiveValues,
            ...objectValues.filter((v) => !(v instanceof Error)),
            ...functionValues,
        ],
    ],
    [
        'Buffer',
        assertIsBuffer,
        [Buffer.alloc(8), Buffer.alloc(16)],
        [
            ...primitiveValues,
            ...objectValues.filter((v) => !(v instanceof Buffer)),
            ...functionValues,
        ],
    ],
    [
        'ArrayBuffer',
        assertIsArrayBuffer,
        [new ArrayBuffer(8), new ArrayBuffer(16)],
        [
            ...primitiveValues,
            ...objectValues.filter((v) => !(v instanceof ArrayBuffer)),
            ...functionValues,
        ],
    ],
    [
        'SharedArrayBuffer',
        assertIsSharedArrayBuffer,
        [new SharedArrayBuffer(8), new SharedArrayBuffer(16)],
        [
            ...primitiveValues,
            ...objectValues.filter((v) => !(v instanceof SharedArrayBuffer)),
            ...functionValues,
        ],
    ],
    [
        'AnyArrayBuffer',
        assertIsAnyArrayBuffer,
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
        assertIsRegExp,
        [new RegExp('test'), /'test'/],
        [...primitiveValues, ...objectValues, ...functionValues],
    ],
    [
        'Date',
        assertIsDate,
        [new Date()],
        [...primitiveValues, ...objectValues, ...functionValues],
    ],
    [
        'String',
        assertIsStringObject,
        [String('x')],
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
        assertIsBooleanObject,
        [Boolean(true)],
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
        assertIsNumberObject,
        [Number(1)],
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
        assertIsPromise,
        [promise],
        [...objectValues, ...functionValues, ...primitiveValues],
    ],
    [
        'Function',
        assertIsFunction,
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
        assertIsAsyncFunction,
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
        assertIsGeneratorFunction,
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
        assertIsAsyncGeneratorFunction,
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
        assertIsGenerator,
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
        assertIsAsyncGenerator,
        [asyncGenerator],
        [generator, ...objectValues, ...functionValues, ...primitiveValues],
    ],
    [
        'Iterable',
        assertIsIterable,
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
        assertIsAsyncIterable,
        [asyncGenerator],
        [...errors, ...typedArrays, {}, ...functionValues, ...primitiveValues],
    ],
    [
        'Iterator',
        assertIsIterator,
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
        assertIsTypedArray,
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
        assertIsInt8Array,
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
        assertIsUint8Array,
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
        assertIsUint8ClampedArray,
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
        assertIsInt16Array,
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
        assertIsUint16Array,
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
        assertIsInt32Array,
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
        assertIsUint32Array,
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
        assertIsFloat32Array,
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
        assertIsFloat64Array,
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
        assertIsBigInt64Array,
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
        assertIsBigUint64Array,
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
        assertIsDataView,
        [new DataView(new ArrayBuffer(8))],
        [...objectValues, ...primitiveValues, ...functionValues],
    ],
    [
        'WeakMap',
        assertIsWeakMap,
        [new WeakMap([[stringRecord, '123']])],
        [
            ...objectValues.filter((v) => !(v instanceof WeakMap)),
            ...primitiveValues,
            ...functionValues,
        ],
    ],
    [
        'WeakSet',
        assertIsWeakSet,
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
        assertion: TypeAssertion<unknown, ErrorMessage>,
        expected: unknown[],
        failed: unknown[],
    ) => {
        it.each(expected)(`does not throw for expected values`, (value) => {
            expect(() => {
                assertion(value);
            }).not.toThrow();
        });
        it.each(failed)(`throws for non-expected values`, (value) => {
            expect(() => {
                assertion(value);
            }).toThrow();
        });
        it.each(failed)(`with custom message`, (value) => {
            expect(() => {
                assertion(value, { message: CUSTOM_MESSAGE });
            }).toThrow(CUSTOM_MESSAGE);
        });
    },
);
