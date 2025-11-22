import { fetchContests } from 'api/api';
import { wrapPromise } from 'shared/lib/wrapPromise';

let contestsResource;

export function preloadContests(token) {
  if (!contestsResource) {
    contestsResource = wrapPromise(fetchContests(token));
  }
  return contestsResource;
}

export function resetContests() {
  contestsResource = null;
}
