import { createTypeGuard } from '../utils';

/**
 * ```typescript
 * // true
 * isString('xyz');
 *
 * // false
 * isString(new String('xyz'));
 * ```
 *
 * /**
 *
 * @category Type Guard
 * @example
 *
 * ```typescript
 * // true
 * isString('xyz');
 *
 * // false
 * isString(new String('xyz'));
 * ```
 */
export const isString = createTypeGuard<string>(
    (value) => typeof value === 'string',
);
