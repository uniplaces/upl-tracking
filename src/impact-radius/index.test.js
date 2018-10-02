import Cookies from 'js-cookie';
import Config from '../config';
import { trackClickId, assignClickIdToBookingId } from './index';
import * as ImpactRadiusService from '../services/impact-radius';

jest.mock('js-cookie');
jest.mock('../services/impact-radius');
jest.mock('../config');

beforeEach(() => {
  ImpactRadiusService.create = jest.fn(() => Promise.resolve({}));
});

test('it tracks a click', () => {
  Cookies.getJSON = jest.fn(() => ({ click_id: '123-456-789' }));

  const result = trackClickId();
  const expected = {
    click_id: '123-456-789'
  };

  expect(Cookies.getJSON).toHaveBeenCalled();
  expect(result).toEqual(expected);
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
