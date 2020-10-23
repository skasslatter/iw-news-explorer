import { TruncatePipe } from './truncate.pipe';

describe('TruncatePipe', () => {
  const pipe = new TruncatePipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  })
  it('transforms "This is a very long text" to "This ..."', () => {
    expect(pipe.transform('This is a very long text', 5)).toBe('This ...');
  });
  it('transforms "This is a very long text" to "This ..."', () => {
    expect(pipe.transform('This is a very long text', 50)).toBe('This is a very long text');
  });
});
