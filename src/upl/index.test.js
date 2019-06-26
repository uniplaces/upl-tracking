import Cookies from 'js-cookie';
import Config from '../config';
import { trackAction, ActionsType, assignUserToTrackingId } from './index';

import * as DataInfrastructureService from '../services/data-infrastructure';

jest.mock('js-cookie');
jest.mock('../services/data-infrastructure');
jest.mock('../config');

beforeEach(() => {
  DataInfrastructureService.putRecord = jest.fn(() => Promise.resolve({}));
});

test('it tracks an action', () => {
  expect.assertions(4);

  Cookies.getJSON = jest.fn(() => ({
    tracking_id: '123-456-789',
    created_at: 1500987895463
  }));

  trackAction(ActionsType.SIGN_UP).then((res) => {
    const expectedStream = 'upl-actions-v1';
    const expectedPayload = {
      touch_id: '123-456-789_1500987895463',
      action: 'sign-up',
      extra_info: null,
      extra: null
    };

    expect(res).toEqual({});
    expect(Cookies.getJSON).toHaveBeenCalled();
    expect(DataInfrastructureService.putRecord).toHaveBeenCalled();
    expect(DataInfrastructureService.putRecord).toHaveBeenCalledWith(Config, expectedStream, expectedPayload);
  });
});

test('it tracks an action with extra info', () => {
  expect.assertions(3);

  const bookingId = '1';

  Cookies.getJSON = jest.fn(() => ({
    tracking_id: '123-456-789',
    created_at: 1500987895463
  }));

  trackAction(ActionsType.BOOKING_REQUEST, bookingId).then((res) => {
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

test('it tracks an assignment of a user to a tracking id', () => {
  expect.assertions(4);

  const userId = 'this-is-a-unique-user-id';

  Cookies.getJSON = jest.fn(() => ({
    tracking_id: '123-456-789',
    created_at: 1500987895463
  }));

  assignUserToTrackingId(userId).then((res) => {
    const expectedStream = 'upl-users-v1';
    const expectedPayload = {
      touch_id: '123-456-789_1500987895463',
      tracking_id: '123-456-789',
      user_type: 'guest',
      user_id: userId,
    };

    expect(res).toEqual({});
    expect(Cookies.getJSON).toHaveBeenCalled();
    expect(DataInfrastructureService.putRecord).toHaveBeenCalled();
    expect(DataInfrastructureService.putRecord).toHaveBeenCalledWith(Config, expectedStream, expectedPayload);
  });
});

test('it exports the events type enumerable', () => {
  const expected = 'sign-up';
  const result = ActionsType.SIGN_UP;

  expect(result).toBe(expected);
});
