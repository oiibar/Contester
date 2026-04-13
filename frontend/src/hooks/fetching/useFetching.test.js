import { renderHook, act } from '@testing-library/react';
import { useFetching } from './useFetching';

describe('useFetching', () => {
  it('sets isLoading correctly during success', async () => {
    const mockCallback = jest.fn().mockResolvedValue('success');

    const { result } = renderHook(() => useFetching(mockCallback));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe('');

    let response;
    await act(async () => {
      response = await result.current.fetching('arg1', 'arg2');
    });

    expect(mockCallback).toHaveBeenCalledWith('arg1', 'arg2');
    expect(response).toBe('success');
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('handles error correctly', async () => {
    const mockError = new Error('Network failed');
    const mockCallback = jest.fn().mockRejectedValue(mockError);

    const { result } = renderHook(() => useFetching(mockCallback));

    let response;
    await act(async () => {
      response = await result.current.fetching();
    });

    expect(response).toBe(null);
    expect(result.current.error).toEqual({
      message: 'Network failed',
      status: null,
      details: null,
    });
    expect(result.current.isLoading).toBe(false);
  });

  it('returns default error message if no message provided', async () => {
    const errorWithoutMessage = {};
    const mockCallback = jest.fn().mockRejectedValue(errorWithoutMessage);

    const { result } = renderHook(() => useFetching(mockCallback));

    await act(async () => {
      await result.current.fetching();
    });

    expect(result.current.error.message).toBe(
      'Request failed. Please try again.'
    );
  });
});
