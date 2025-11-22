export const rankUsers = (users) =>
  [...users]
    .sort((a, b) => b.rating - a.rating)
    .map((user, index) => ({
      ...user,
      rank: index + 1,
    }));
