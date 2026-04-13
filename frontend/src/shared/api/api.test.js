import { authenticateUser } from './authApi';
import { fetchContests } from './contestApi';
import { apiCall } from './base';
import { config } from './config';
const API_URL = config.apiUrl;

beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('apiCall', () => {
  test('returns JSON on success', async () => {
    const mockData = { ok: true };
    fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => mockData,
    });

    const data = await apiCall('/test');
    expect(fetch).toHaveBeenCalledWith(`${API_URL}/test`, expect.any(Object));
    expect(data).toEqual(mockData);
  });

  test('returns null on 204 No Content', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      status: 204,
      json: async () => ({}),
    });

    const data = await apiCall('/empty');
    expect(data).toBeNull();
  });

  test('throws error with JSON body on failure', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: async () => ({ message: 'Bad Request' }),
    });

    await expect(apiCall('/fail')).rejects.toThrow('Bad Request');
  });

  test('throws error with fallback message if error body not JSON', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => {
        throw new Error('not json');
      },
    });

    await expect(apiCall('/server-error')).rejects.toThrow(
      'Unknown server error'
    );
  });
});

describe('API helpers', () => {
  test('authenticateUser sends POST with body', async () => {
    const payload = { username: 'test', password: '1234' };
    const mockResponse = { token: 'abc' };

    fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => mockResponse,
    });

    const result = await authenticateUser(payload);

    expect(fetch).toHaveBeenCalledWith(
      `${API_URL}/auth/authenticate`,
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify(payload),
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }),
      })
    );
    expect(result).toEqual(mockResponse);
  });

  test('fetchContests adds Authorization header', async () => {
    const token = 'jwt123';
    const mockResponse = [{ id: 1, name: 'Contest' }];

    fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => mockResponse,
    });

    const result = await fetchContests(token);

    expect(fetch).toHaveBeenCalledWith(
      `${API_URL}/contests`,
      expect.objectContaining({
        method: 'GET',
        headers: expect.objectContaining({
          Authorization: `Bearer ${token}`,
        }),
      })
    );
    expect(result).toEqual(mockResponse);
  });
});
