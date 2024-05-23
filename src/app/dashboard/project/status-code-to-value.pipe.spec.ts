import { StatusCodeToValuePipe } from './status-code-to-value.pipe';

describe('StatusCodeToValuePipe', () => {
  it('create an instance', () => {
    const pipe = new StatusCodeToValuePipe();
    expect(pipe).toBeTruthy();
  });
});
