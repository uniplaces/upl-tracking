import ActionsType from './actions-type';

test('it has the correct number of properties', () => {
  const expected = 3;
  const result = Object.keys(ActionsType).length;

  expect(result).toBe(expected);
});

test('it returns the sign up event', () => {
  const expected = 'sign-up';
  const result = ActionsType.SIGN_UP;

  expect(result).toBe(expected);
});

test('it returns the booking request event', () => {
  const expected = 'booking-request';
  const result = ActionsType.BOOKING_REQUEST;

  expect(result).toBe(expected);
});

test('it returns the publish listing event', () => {
  const expected = 'publish-listing';
  const result = ActionsType.PUBLISH_LISTING;

  expect(result).toBe(expected);
});
