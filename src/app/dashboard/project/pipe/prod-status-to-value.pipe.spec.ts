import { ProdStatusToValuePipe } from './prod-status-to-value.pipe';

describe('ProdStatusToValuePipe', () => {
  it('create an instance', () => {
    const pipe = new ProdStatusToValuePipe();
    expect(pipe).toBeTruthy();
  });
});
