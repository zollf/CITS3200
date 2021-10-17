import React from 'react';
import { TimeMocks } from '@/frontend/tests/mocks/time';
import { render } from '@testing-library/react';

import createListItems, { renderCleanedTimes } from '../ProcessBayMap';

const bayTimes = new Map();
TimeMocks.forEach((t) => bayTimes.set(t.slug, t));

describe('createListItems()', () => {
  it('works correctly given mock', () => {
    const listItems = createListItems(bayTimes);
    expect(listItems[0].map((t) => t.time)).toEqual(['08:00', '09:00']);
    expect(listItems[1].map((t) => t.time)).toEqual(['22:30', '23:30']);
    expect(listItems[1][1].endTime).toBe('00:00');
    expect(listItems[2].length).toBe(1);
  });
});

describe('renderCleanedTimes()', () => {
  it('matches its snapshot', () => {
    const component = () => (
      <table>
        <tbody>{renderCleanedTimes(bayTimes)}</tbody>
      </table>
    );
    expect(render(component()).baseElement).toMatchSnapshot();
  });

  it('matches its buffer snapshot', () => {
    const component = () => (
      <table>
        <tbody>{renderCleanedTimes(bayTimes, 30)}</tbody>
      </table>
    );
    expect(render(component()).baseElement).toMatchSnapshot();
  });
});
