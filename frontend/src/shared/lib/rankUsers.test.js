import { rankUsers } from './rankUsers';

describe('rankUsers', () => {
  it('ranks users by rating in descending order', () => {
    const users = [
      { name: 'Alice', rating: 100 },
      { name: 'Bob', rating: 200 },
      { name: 'Charlie', rating: 150 },
    ];

    const result = rankUsers(users);

    expect(result).toEqual([
      { name: 'Bob', rating: 200, rank: 1 },
      { name: 'Charlie', rating: 150, rank: 2 },
      { name: 'Alice', rating: 100, rank: 3 },
    ]);
  });

  it('does not mutate the original array', () => {
    const users = [
      { name: 'Alice', rating: 100 },
      { name: 'Bob', rating: 200 },
    ];

    const copy = [...users];
    rankUsers(users);

    expect(users).toEqual(copy);
  });

  it('assigns correct rank even with duplicate ratings', () => {
    const users = [
      { name: 'Alice', rating: 200 },
      { name: 'Bob', rating: 200 },
      { name: 'Charlie', rating: 150 },
    ];

    const result = rankUsers(users);

    expect(result).toEqual([
      { name: 'Alice', rating: 200, rank: 1 },
      { name: 'Bob', rating: 200, rank: 2 },
      { name: 'Charlie', rating: 150, rank: 3 },
    ]);
  });

  it('returns empty array if input is empty', () => {
    expect(rankUsers([])).toEqual([]);
  });
});
