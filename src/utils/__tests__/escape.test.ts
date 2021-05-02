import escape from '../escape';

describe('Escape', () => {
  it('should escape double quotes', () => {
    expect(escape('a"b')).toBe(String.raw`a\"b`);
    expect(escape('a"b"c')).toBe(String.raw`a\"b\"c`);
    expect(escape('a""b')).toBe(String.raw`a\"\"b`);
    expect(escape('""')).toBe(String.raw`\"\"`);
    expect(escape(String.raw`a\\"b`)).toBe(String.raw`a\\\"b`);
  });
  it('should not escape already escaped quotes', () => {
    expect(escape('ab')).toBe('ab');
    expect(escape(String.raw`a\"b`)).toBe(String.raw`a\"b`);
    expect(escape(String.raw`a\\\"b`)).toBe(String.raw`a\\\"b`);
  });
});
