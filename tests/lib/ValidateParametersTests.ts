import { validateAddress } from '../../lib/ValidateParameters';
import { TestStatus, Tester } from '../tester';

export const ValidateParametersTests = async (tester: Tester) => {
  await tester.test(async () => {
    const invalidAddress = '122 1/8 Street, New York';
    const isValid = await validateAddress(invalidAddress, false);
    return isValid ? TestStatus.FAIL : TestStatus.PASS;
  }, 'ValidateParameters: validateAddress: invalid address',
     'works as expected',
     'did not work as expected');

  await tester.test(async () => {
    const validAddress = 'TRTLv2txGW8daTunmAVV6dauJgEv1LezM2Hse7EUD5c11yKHsNDrzQ5UWNRmu2ToQVhDcr82ZPVXy4mU5D7w9RmfR747KeXD3UF';
    const isValid = await validateAddress(validAddress, false);
    return isValid ? TestStatus.PASS : TestStatus.FAIL;
  }, 'ValidateParameters: validateAddress: valid address',
      'works as expected',
      'did not work as expected');
}