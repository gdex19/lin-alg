import {createAugment} from '../utils/alghelpers.js';

const equalMatrix = (one, two) => {
  for (let i = 0; i < one.length; i++) {
    for (let j = 0; j < one.length; j++) {
      if (one[i][j] != two[i][j]) {
        return false;
      }
    }
  }
  return true;
}
describe('Augmenting Matrices', () => {
  it('adds identity', () => {
    let matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
    let identity = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
    expect(equalMatrix(createAugment(matrix).map((r) => {
      return r.slice(3);
    }),  identity)).toEqual(true);
  });
  it('keeps original half', () => {
    let matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
    expect(equalMatrix(createAugment(matrix).map((r) => {
      return r.slice(0, 3);
    }),  matrix)).toEqual(true);
  });
})
