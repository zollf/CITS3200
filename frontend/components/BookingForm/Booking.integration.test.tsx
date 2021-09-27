import React from 'react';
import UserEvent from '@testing-library/user-event';
import faker from 'faker';
import help from '@/frontend/tests/mocks/help';
import { bays } from '@/frontend/tests/mocks/bays';
import { baysBooked } from '@/frontend/tests/mocks/baysBooked';
import { carparks } from '@/frontend/tests/mocks/carpark';
import { fireEvent, render, waitFor } from '@testing-library/react';

import BookingForm from './';

faker.seed(1);

beforeEach(() => {
  fetchMock.resetMocks();
});

const initialProps = {
  globalStartTime: '00:00',
  globalEndTime: '24:00',
  phone: '04 1234 5678',
  hub: 'uniart',
  userId: '1',
};

const renderToStep2 = async () => {
  fetchMock.mockResponseOnce(JSON.stringify(help));
  fetchMock.mockResponseOnce(JSON.stringify(carparks));
  fetchMock.mockResponseOnce(JSON.stringify(bays));
  fetchMock.mockResponseOnce(JSON.stringify({ success: true, bays: baysBooked }));

  const component = render(<BookingForm {...initialProps} />);
  await waitFor(() => expect(component.getAllByTestId('carpark-card').length).toBeGreaterThan(0));
  UserEvent.click(component.getAllByTestId('carpark-card')[0]);
  await waitFor(() => expect(component.getByText(/Select bay for/)).toBeInTheDocument());
  return component;
};

const renderToStep3 = async () => {
  const component = await renderToStep2();
  UserEvent.click(component.getByText('Continue'));
  await waitFor(() => expect(component.getByText('Booking Details')).toBeInTheDocument());
  return component;
};

const renderToConfirmation = async () => {
  const component = await renderToStep3();
  UserEvent.type(component.getByTestId('firstName'), faker.name.firstName());
  UserEvent.type(component.getByTestId('lastName'), faker.name.lastName());
  UserEvent.type(component.getByTestId('email'), faker.internet.email());
  UserEvent.type(component.getByTestId('phone'), faker.phone.phoneNumber());
  UserEvent.click(component.getByText('Submit'));
  await waitFor(() => expect(component.getByText(/Thank you/)).toBeInTheDocument());
  return component;
};

describe('Booking Form Step 1', () => {
  it('matches its snapshot', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(help));
    fetchMock.mockResponse(JSON.stringify(carparks));
    const { asFragment, getAllByTestId } = render(<BookingForm {...initialProps} />);
    await waitFor(() => expect(getAllByTestId('carpark-card').length).toBeGreaterThan(0));
    expect(asFragment()).toMatchSnapshot();
  });

  it('no carparks renders no cards', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(help));
    fetchMock.mockResponse(JSON.stringify([]));
    const { getByTestId } = render(<BookingForm {...initialProps} />);
    await waitFor(() => expect(getByTestId('carpark-step').getAttribute('data-loading')).toBe('false'));
    expect(getByTestId('carpark-cards').children.length).toBe(0);
  });

  it('resets bay on different carpark selection', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(help));
    fetchMock.mockResponseOnce(JSON.stringify(carparks));
    fetchMock.mockResponseOnce(JSON.stringify(bays));
    fetchMock.mockResponseOnce(JSON.stringify({ success: true, bays: baysBooked }));

    const { getByText, getAllByTestId } = render(<BookingForm {...initialProps} />);
    await waitFor(() => expect(getAllByTestId('carpark-card').length).toBeGreaterThan(0));
    UserEvent.click(getAllByTestId('carpark-card')[0]);
    await waitFor(() => expect(getByText(/Select bay for/)).toBeInTheDocument());

    UserEvent.click(getAllByTestId('bay-time')[0]);
    await waitFor(() => expect(getAllByTestId('bay-time')[0].getAttribute('data-selected')).toBe('true'));

    fetchMock.mockResponseOnce(JSON.stringify(carparks));
    UserEvent.click(getByText('Back'));

    await waitFor(() => expect(getAllByTestId('carpark-card').length).toBeGreaterThan(0));

    fetchMock.mockResponseOnce(JSON.stringify(bays));
    fetchMock.mockResponseOnce(JSON.stringify({ success: true, bays: baysBooked }));

    UserEvent.click(getAllByTestId('carpark-card')[1]);

    await waitFor(() => expect(getByText(/Select bay for/)).toBeInTheDocument());
    expect(getAllByTestId('bay-time')[0].getAttribute('data-selected')).toBe('false');
  });

  it('completes step 1 correctly', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(help));
    fetchMock.mockResponseOnce(JSON.stringify(carparks));
    fetchMock.mockResponseOnce(JSON.stringify(bays));
    fetchMock.mockResponseOnce(JSON.stringify({ success: true, bays: baysBooked }));
    const { getByText, getAllByTestId } = render(<BookingForm {...initialProps} />);
    await waitFor(() => expect(getAllByTestId('carpark-card').length).toBeGreaterThan(0));
    expect(getByText('UniPark VIP Booking')).toBeInTheDocument();
    UserEvent.click(getAllByTestId('carpark-card')[0]);
    await waitFor(() => expect(getByText(/Select bay for/)).toBeInTheDocument());
  });
});

describe('Booking Form Step 2', () => {
  it('matches its snapshot', async () => {
    expect((await renderToStep2()).asFragment()).toMatchSnapshot();
  });

  it('select and unselect multiple bays', async () => {
    const { getAllByTestId } = await renderToStep2();
    UserEvent.click(getAllByTestId('bay-time')[0]);
    UserEvent.click(getAllByTestId('bay-time')[1]);
    UserEvent.click(getAllByTestId('bay-time')[2]);
    await waitFor(() => expect(getAllByTestId('bay-time')[2].getAttribute('data-selected')).toBe('true'));
    UserEvent.click(getAllByTestId('bay-time')[0]);
    UserEvent.click(getAllByTestId('bay-time')[1]);
    UserEvent.click(getAllByTestId('bay-time')[2]);
    await waitFor(() => expect(getAllByTestId('bay-time')[2].getAttribute('data-selected')).toBe('false'));
  });

  it('reset works correctly', async () => {
    const { getAllByTestId, getByText } = await renderToStep2();
    UserEvent.click(getAllByTestId('bay-time')[0]);
    UserEvent.click(getAllByTestId('bay-time')[1]);
    await waitFor(() => expect(getAllByTestId('bay-time')[1].getAttribute('data-selected')).toBe('true'));
    UserEvent.click(getByText('Reset'));
    await waitFor(() => expect(getAllByTestId('bay-time')[0].getAttribute('data-selected')).toBe('false'));
  });

  it('hover selects on mouse down', async () => {
    const { getAllByTestId } = await renderToStep2();
    fireEvent.mouseDown(getAllByTestId('bay-time')[0]);
    UserEvent.hover(getAllByTestId('bay-time')[1]);
    UserEvent.hover(getAllByTestId('bay-time')[2]);
    await waitFor(() => expect(getAllByTestId('bay-time')[2].getAttribute('data-selected')).toBe('true'));
  });

  it('leaving selection area changes mouse down state', async () => {
    const { getAllByTestId, getByTestId } = await renderToStep2();
    fireEvent.mouseDown(getAllByTestId('bay-time')[0]);
    UserEvent.hover(getAllByTestId('bay-time')[0]);
    fireEvent.mouseLeave(getByTestId('table'));
    await waitFor(() => expect(getAllByTestId('bay-time')[0].getAttribute('data-selected')).toBe('false'));
  });

  it('completes step 2 correctly', async () => {
    const { getByText, getAllByTestId } = await renderToStep2();
    expect(getByText(/Select bay for/)).toBeInTheDocument();
    UserEvent.click(getAllByTestId('bay-time')[0]);
    UserEvent.click(getAllByTestId('bay-time')[1]);
    UserEvent.click(getByText('Continue'));
    await waitFor(() => expect(getByText('Booking Details')).toBeInTheDocument());
  });
});

describe('Booking Form Step 3', () => {
  it('matches its snapshot', async () => {
    expect((await renderToStep3()).asFragment()).toMatchSnapshot();
  });

  it('completes step 3 correctly', async () => {
    const { getByText, getByTestId } = await renderToStep3();
    expect(getByText('Booking Details')).toBeInTheDocument();
    UserEvent.type(getByTestId('firstName'), faker.name.firstName());
    UserEvent.type(getByTestId('lastName'), faker.name.lastName());
    UserEvent.type(getByTestId('email'), faker.internet.email());
    UserEvent.type(getByTestId('phone'), faker.phone.phoneNumber());
    UserEvent.type(getByTestId('rego'), faker.vehicle.vrm());
    UserEvent.type(getByTestId('company'), faker.company.companyName());
    UserEvent.click(getByText('Submit'));
    await waitFor(() => expect(getByText(/Thank you/)).toBeInTheDocument());
  });
});

describe('Booking Form Confirmation', () => {
  it('matches its snapshot', async () => {
    expect((await renderToConfirmation()).asFragment()).toMatchSnapshot();
  });
});
