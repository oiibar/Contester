import { getToken, setToken, removeToken } from './localStorage.helper';

describe('localStorage lib', () => {
  beforeEach(() => {
    Storage.prototype.getItem = jest.fn();
    Storage.prototype.setItem = jest.fn();
    Storage.prototype.removeItem = jest.fn();
  });

  test('getToken returns parsed data if exists', () => {
    Storage.prototype.getItem.mockReturnValueOnce(JSON.stringify({ id: 1 }));
    const result = getToken('auth');
    expect(result).toEqual({ id: 1 });
    expect(localStorage.getItem).toHaveBeenCalledWith('auth');
  });

  test('getToken returns empty string if no data', () => {
    Storage.prototype.getItem.mockReturnValueOnce(null);
    const result = getToken('auth');
    expect(result).toBe('');
  });

  test('setToken stores stringified token', () => {
    setToken('auth', { token: 'abc123' });
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'auth',
      JSON.stringify({ token: 'abc123' })
    );
  });

  test('removeToken removes item', () => {
    removeToken('auth');
    expect(localStorage.removeItem).toHaveBeenCalledWith('auth');
  });
});
