import type { ErrorMessage, TypedArray } from '../types';
import {
    isBigInt64Array,
    isBigUint64Array,
    isFloat32Array,
    isFloat64Array,
    isInt8Array,
    isInt16Array,
    isInt32Array,
    isTypedArray,
    isUint8Array,
    isUint8ClampedArray,
    isUint16Array,
    isUint32Array,
} from '../guards/isTypedArray';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export function assertIsBigInt64Array(
    input: unknown,
    options?: ErrorMessage,
): asserts input is BigInt64Array {
    if (!isBigInt64Array(input)) {
        throw new TypeError(options?.message);
    }
}

/**
 * @category Type Assertion
 * @throws TypeError
 */
export function assertIsBigUint64Array(
    input: unknown,
    options?: ErrorMessage,
): asserts input is BigUint64Array {
    if (!isBigUint64Array(input)) {
        throw new TypeError(options?.message);
    }
}

/**
 * @category Type Assertion
 * @throws TypeError
 */
export function assertIsFloat32Array(
    input: unknown,
    options?: ErrorMessage,
): asserts input is Float32Array {
    if (!isFloat32Array(input)) {
        throw new TypeError(options?.message);
    }
}

/**
 * @category Type Assertion
 * @throws TypeError
 */
export function assertIsFloat64Array(
    input: unknown,
    options?: ErrorMessage,
): asserts input is Float64Array {
    if (!isFloat64Array(input)) {
        throw new TypeError(options?.message);
    }
}

/**
 * @category Type Assertion
 * @throws TypeError
 */
export function assertIsInt16Array(
    input: unknown,
    options?: ErrorMessage,
): asserts input is Int16Array {
    if (!isInt16Array(input)) {
        throw new TypeError(options?.message);
    }
}

/**
 * @category Type Assertion
 * @throws TypeError
 */
export function assertIsInt32Array(
    input: unknown,
    options?: ErrorMessage,
): asserts input is Int32Array {
    if (!isInt32Array(input)) {
        throw new TypeError(options?.message);
    }
}

/**
 * @category Type Assertion
 * @throws TypeError
 */
export function assertIsInt8Array(
    input: unknown,
    options?: ErrorMessage,
): asserts input is Int8Array {
    if (!isInt8Array(input)) {
        throw new TypeError(options?.message);
    }
}

/**
 * @category Type Assertion
 * @throws TypeError
 */
export function assertIsTypedArray(
    input: unknown,
    options?: ErrorMessage,
): asserts input is TypedArray {
    if (!isTypedArray(input)) {
        throw new TypeError(options?.message);
    }
}

/**
 * @category Type Assertion
 * @throws TypeError
 */
export function assertIsUint16Array(
    input: unknown,
    options?: ErrorMessage,
): asserts input is Uint16Array {
    if (!isUint16Array(input)) {
        throw new TypeError(options?.message);
    }
}

/**
 * @category Type Assertion
 * @throws TypeError
 */
export function assertIsUint32Array(
    input: unknown,
    options?: ErrorMessage,
): asserts input is Uint32Array {
    if (!isUint32Array(input)) {
        throw new TypeError(options?.message);
    }
}

/**
 * @category Type Assertion
 * @throws TypeError
 */
export function assertIsUint8Array(
    input: unknown,
    options?: ErrorMessage,
): asserts input is Uint8Array {
    if (!isUint8Array(input)) {
        throw new TypeError(options?.message);
    }
}

/**
 * @category Type Assertion
 * @throws TypeError
 */
export function assertIsUint8ClampedArray(
    input: unknown,
    options?: ErrorMessage,
): asserts input is Uint8ClampedArray {
    if (!isUint8ClampedArray(input)) {
        throw new TypeError(options?.message);
    }
}
