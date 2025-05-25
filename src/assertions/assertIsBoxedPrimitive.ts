import { isBoxedPrimitive } from '../guards/isBoxedPrimitive';
import { createTypeAssertion } from '../utils';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export const assertIsBoxedPrimitive = createTypeAssertion<
    bigint | boolean | number | string | symbol
>(isBoxedPrimitive);
