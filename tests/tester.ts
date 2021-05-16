import * as colors from 'colors';

export enum TestStatus {
  PASS,
  FAIL,
  SKIP
}

export class Tester {

  public totalTests: number = 0;
  public testsFailed: number = 0;
  public testsPassed: number = 0;
  public testsSkipped: number = 0;

  constructor() {
      console.log(colors.yellow('=== Started testing ===\n'));
  }

  public async test(
      testFunc: () => Promise<TestStatus>,
      testDescription: string,
      successMsg: string,
      failMsg: string,
      skipMsg?: string) {

      console.log(colors.yellow(`=== ${testDescription} ===`));

      let status: TestStatus = TestStatus.FAIL;

      try {
          status = await testFunc();
      } catch (err) {
          console.log(`Error executing test: ${err}`);
      }

      this.totalTests++;

      if (status === TestStatus.PASS) {
          console.log(colors.green(' ✔️  ') + successMsg);
          this.testsPassed++;
      } else if (status === TestStatus.FAIL) {
          console.log(colors.red(' ❌ ') + failMsg);
          this.testsFailed++;
      } else {
          console.log(colors.blue(' - ') + skipMsg);
          this.testsSkipped++;
      }

      console.log('');
  }

  public summary(): void {
      console.log(colors.yellow('=== Testing complete! ==='));

      console.log(colors.white(' 📰  ')
                + colors.white('Total tests:  ')
                + colors.white(this.totalTests.toString()));

      console.log(colors.green(' ✔️  ')
                + colors.white('Tests passed: ')
                + colors.green(this.testsPassed.toString()));

      console.log(colors.blue(' - ')
                + colors.white('Tests skipped: ')
                + colors.blue(this.testsSkipped.toString()));

      console.log(colors.red(' ❌  ')
                + colors.white('Tests failed: ')
                + colors.red(this.testsFailed.toString()));
  }

  public setExitCode(): void {
      process.exitCode = this.testsFailed === 0 ? 0 : 1;
  }
}