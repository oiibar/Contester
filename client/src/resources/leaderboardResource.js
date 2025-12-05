import { wrapPromise } from 'shared/lib/wrapPromise';
import { fetchUsers } from 'shared/api/userApi';

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
