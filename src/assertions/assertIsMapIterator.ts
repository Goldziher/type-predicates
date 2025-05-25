import { isMapIterator } from '../guards/isMapIterator';
import { createTypeAssertion } from '../utils';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export const assertIsMapIterator =
    createTypeAssertion<IterableIterator<[unknown, unknown]>>(isMapIterator);
