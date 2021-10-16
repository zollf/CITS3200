import { standardTime } from '../Times';

describe('standardTime()', () => {
  it('HH:MM returns HH:MM', () => {
    expect(standardTime('00:00')).toBe('00:00');
  });

  it('HH:MM:SS returns HH:MM', () => {
    expect(standardTime('00:00:00')).toBe('00:00');
  });
});
