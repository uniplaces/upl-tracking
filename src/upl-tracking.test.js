import Cookies from 'js-cookie';
import Config from './config';
import { setEnvironment, trackAction, ActionsType } from './upl-tracking';
import * as DataInfrastructureService from './services/data-infrastructure';

jest.mock('js-cookie');
jest.mock('./services/data-infrastructure');
jest.mock('./config');

beforeEach(() => {
  DataInfrastructureService.putRecord = jest.fn(() => Promise.resolve({}));
});

test('it tracks an action', () => {
  expect.assertions(3);

  Cookies.getJSON = jest.fn(() => ({ tracking_id: '123-456-789', created_at: 1500987895463 }));

  trackAction(ActionsType.SIGN_UP).then((res) => {
    expect(res).toEqual({});
    expect(Cookies.getJSON).toHaveBeenCalled();
    expect(DataInfrastructureService.putRecord).toHaveBeenCalled();
  });
});

test('it does not track an action when the cookie is unexistent', () => {
  expect.assertions(3);

  Cookies.getJSON = jest.fn(() => null);

  trackAction(ActionsType.BOOKING_REQUEST).catch((err) => {
    expect(Cookies.getJSON).toHaveBeenCalled();
    expect(DataInfrastructureService.putRecord).toHaveBeenCalledTimes(0);
    expect(err).toEqual({ msg: 'UPL cookie is not set' });
  });
});

test('it exports the events type enumerable', () => {
  const expected = 'sign-up';
  const result = ActionsType.SIGN_UP;

  expect(result).toBe(expected);
});

test('environment change from config through seEnvironment', () => {
  Config.setEnvironment = jest.fn((val) => expect(val).toBe('production'));
  setEnvironment('production');
});
