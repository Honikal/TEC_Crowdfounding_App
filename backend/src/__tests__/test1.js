// example.test.js
const sum = (a, b) => a + b;

test('Test1: adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});