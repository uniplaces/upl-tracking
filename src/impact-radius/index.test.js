import Cookies from 'js-cookie';
import Config from '../config';
import { trackClickId, assignClickIdToBookingId } from './index';
import * as ImpactRadiusService from '../services/impact-radius';

jest.mock('js-cookie');
jest.mock('../services/impact-radius');
jest.mock('../config');

function _setHref(href) {
  window.history.pushState({}, 'new-history-state', href);
}

function _clearHref() {
  window.history.pushState({}, 'new-history-state', 'https://www.test.com');
}

beforeEach(() => {
  ImpactRadiusService.create = jest.fn(() => Promise.resolve({}));
});

afterEach(() => {
  _clearHref();
});

test('it tracks a click', () => {
  _setHref('https://www.test.com/home?ir_click_id=123-456-789');

  Cookies.getJSON = jest.fn(() => null);
  Cookies.set = jest.fn(() => null);

  const result = trackClickId();
  const expected = {
    click_id: '123-456-789'
  };

  expect(Cookies.getJSON).toHaveBeenCalled();
  expect(Cookies.set).toHaveBeenCalled();
  expect(result).toEqual(expected);
});

test('it updates an existent click', () => {
  _setHref('https://www.test.com/home?ir_click_id=123-456-789-1');

  Cookies.getJSON = jest.fn(() => ({ click_id: '123-456-789-0' }));
  Cookies.set = jest.fn(() => null);

  const result = trackClickId();
  const expected = { click_id: '123-456-789-1' };

  expect(Cookies.getJSON).toHaveBeenCalled();
  expect(Cookies.set).toHaveBeenCalled();
  expect(result).toEqual(expected);
});

test('it does not save when the click ID is inexistent', () => {
  Cookies.getJSON = jest.fn(() => null);
  Cookies.set = jest.fn(() => null);

  const result = trackClickId();

  expect(Cookies.getJSON).toHaveBeenCalledTimes(0);
  expect(Cookies.set).toHaveBeenCalledTimes(0);
  expect(result).toBeUndefined();
});

test('it tracks an assignment of a click id to a booking id', () => {
  expect.assertions(4);

  const bookingId = 150777;
  const clickId = '123-456-789';

  Cookies.getJSON = jest.fn(() => ({ click_id: clickId }));

  assignClickIdToBookingId(bookingId).then((res) => {
    expect(res).toEqual({});
    expect(Cookies.getJSON).toHaveBeenCalled();
    expect(ImpactRadiusService.create).toHaveBeenCalled();
    expect(ImpactRadiusService.create).toHaveBeenCalledWith(Config, clickId, bookingId);
  });
});
