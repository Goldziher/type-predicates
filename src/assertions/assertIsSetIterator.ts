import { isSetIterator } from '../guards/isSetIterator';
import { createTypeAssertion } from '../utils';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export const assertIsSetIterator =
    createTypeAssertion<IterableIterator<unknown>>(isSetIterator);
