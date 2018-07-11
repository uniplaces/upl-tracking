import { ActionsType } from './upl-tracking';

test('it exports the events type enumerable', () => {
  const expected = 'sign-up';
  const result = ActionsType.SIGN_UP;

  expect(result).toBe(expected);
});
