import { formatDate, calculateDuration } from './dateUtils';

describe('formatDate', () => {
  it('formats a valid date string correctly', () => {
    const input = '2025-09-09T15:30:00Z';
    const result = formatDate(input);
    expect(result).toMatch(/Tue, Sep \d{1,2}, 2025, \d{1,2}:\d{2} (AM|PM)/);
  });

  it("returns 'Invalid Date' for bad input", () => {
    const input = 'not-a-date';
    const result = formatDate(input);
    expect(result).toBe('Invalid Date');
  });
});

describe('calculateDuration', () => {
  it('calculates days, hours, and minutes correctly', () => {
    const start = '2025-09-09T00:00:00Z';
    const end = '2025-09-10T02:30:00Z'; // +1 day 2h 30m
    const result = calculateDuration(start, end);
    expect(result).toBe('1 day 2 hours 30 minutes');
  });

  it('handles less than an hour duration', () => {
    const start = '2025-09-09T10:00:00Z';
    const end = '2025-09-09T10:20:00Z';
    const result = calculateDuration(start, end);
    expect(result).toBe('20 minutes');
  });

  it('handles negative durations (end before start)', () => {
    const start = '2025-09-09T10:00:00Z';
    const end = '2025-09-09T09:00:00Z';
    const result = calculateDuration(start, end);
    expect(result).toBe('1 hour');
  });

  it('returns empty string when both dates are the same', () => {
    const start = '2025-09-09T10:00:00Z';
    const end = '2025-09-09T10:00:00Z';
    const result = calculateDuration(start, end);
    expect(result).toBe('');
  });
});
