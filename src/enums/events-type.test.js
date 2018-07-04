import EventsType from './events-type';

test('it has the correct number of properties', () => {
  const expected = 2;
  const result = Object.keys(EventsType).length;

  expect(result).toBe(expected);
});

test('it returns the sign up event', () => {
  const expected = 'sign-up';
  const result = EventsType.SIGN_UP;

  expect(result).toBe(expected);
});

test('it returns the booking request event', () => {
  const expected = 'booking-request';
  const result = EventsType.BOOKING_REQUEST;

  expect(result).toBe(expected);
});
