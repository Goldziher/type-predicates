import type { ErrorMessage } from '../types';
import { isDataView } from '../guards/isDataView';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export function assertIsDataView(input: unknown, options?: ErrorMessage): asserts input is DataView {
    if (!isDataView(input)) {
        throw new TypeError(options?.message);
    }
}
