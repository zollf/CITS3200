import MockDate from 'mockdate';
import fetchMock from 'jest-fetch-mock';

MockDate.set('2000-01-01');

fetchMock.enableMocks();
