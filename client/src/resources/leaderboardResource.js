import { wrapPromise } from 'utils/wrapPromise';
import { fetchUsers } from 'api/api';

let leaderboardResource;

export function preloadLeaderboard(token) {
  if (!leaderboardResource) {
    leaderboardResource = wrapPromise(fetchUsers(token));
  }
  return leaderboardResource;
}

export function resetLeaderboard() {
  leaderboardResource = null;
}
