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

const renderToStep2 = async (fetch = true) => {
  if (fetch) {
    // Disabling fetch is useful for testing reject responses.
    fetchMock.mockResponseOnce(JSON.stringify(help));
    fetchMock.mockResponseOnce(JSON.stringify(carparks));
    fetchMock.mockResponseOnce(JSON.stringify(bays));
    fetchMock.mockResponseOnce(JSON.stringify({ success: true, bays: baysBooked }));
    fetchMock.mockResponseOnce(JSON.stringify({ success: true, booking_id: 1 }));
  }

  const component = render(<BookingForm {...initialProps} />);
  await waitFor(() => expect(component.getAllByTestId('carpark-card').length).toBeGreaterThan(0));
  UserEvent.click(component.getAllByTestId('carpark-card')[0]);
  await waitFor(() => expect(component.getByText(/Select bay for/)).toBeInTheDocument());
  return component;
};

const renderToStep3 = async (fetch = true) => {
  const component = await renderToStep2(fetch);
  UserEvent.click(component.getByText('Continue'));
  await waitFor(() => expect(component.getByText('Booking Details')).toBeInTheDocument());
  return component;
};

const renderToConfirmation = async (fetch = true) => {
  const component = await renderToStep3(fetch);
  UserEvent.type(component.getByTestId('firstName'), faker.name.firstName());
  UserEvent.type(component.getByTestId('lastName'), faker.name.lastName());
  UserEvent.type(component.getByTestId('email'), faker.internet.email());
  UserEvent.type(component.getByTestId('phone'), faker.phone.phoneNumber('+61########'));
  UserEvent.click(component.getByText('Submit'));
  await waitFor(() => expect(component.getByText(/Thank you/)).toBeInTheDocument());
  return component;
};

describe('Booking Form Step 1', () => {
  it('matches its snapshot', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(help));
    fetchMock.mockResponseOnce(JSON.stringify(carparks));
    const { asFragment, getAllByTestId } = render(<BookingForm {...initialProps} />);
    await waitFor(() => expect(getAllByTestId('carpark-card').length).toBeGreaterThan(0));
    expect(asFragment()).toMatchSnapshot();
  });

  it('help works correctly', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(help));
    fetchMock.mockResponseOnce(JSON.stringify(carparks));
    const { getAllByTestId, getByText } = render(<BookingForm {...initialProps} />);
    await waitFor(() => expect(getAllByTestId('carpark-card').length).toBeGreaterThan(0));
    UserEvent.click(getByText('Need Help'));
    UserEvent.click(getByText('Close'));
  });

  it('no carparks renders no cards', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(help));
    fetchMock.mockResponseOnce(JSON.stringify([]));
    const { getByTestId } = render(<BookingForm {...initialProps} />);
    await waitFor(() => expect(getByTestId('carpark-step').getAttribute('data-loading')).toBe('false'));
    expect(getByTestId('carpark-cards').children.length).toBe(0);
  });

  it('error in loading cars, shows error', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(help));
    fetchMock.mockRejectOnce();
    const { getByText } = render(<BookingForm {...initialProps} />);
    await waitFor(() => expect(getByText(/Something went wrong when fetching carpark data/)).toBeInTheDocument());
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

  it('error on loading bay for carpark render error', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(help));
    fetchMock.mockResponseOnce(JSON.stringify(carparks));
    fetchMock.mockResponseOnce(JSON.stringify(bays));
    fetchMock.mockRejectOnce();
    const { getByText, getAllByTestId } = render(<BookingForm {...initialProps} />);
    await waitFor(() => expect(getAllByTestId('carpark-card').length).toBeGreaterThan(0));
    UserEvent.click(getAllByTestId('carpark-card')[0]);
    await waitFor(() => expect(getByText(/Something went wrong when fetching bays for carpark/)).toBeInTheDocument());
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

  it('handles change date correctly', async () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const getInitialStateSpy = jest.spyOn(require('@/frontend/lib/BayInitialProps'), 'getInitialState');
    fetchMock.mockResponseOnce(JSON.stringify(help));
    fetchMock.mockResponseOnce(JSON.stringify(carparks));
    fetchMock.mockResponseOnce(JSON.stringify(bays));
    fetchMock.mockResponseOnce(JSON.stringify({ success: true, bays: baysBooked }));

    fetchMock.mockResponseOnce(JSON.stringify(bays));
    fetchMock.mockResponseOnce(JSON.stringify({ success: true, bays: baysBooked }));

    const { container } = await renderToStep2(false);
    expect(getInitialStateSpy).toHaveBeenCalledTimes(1);

    UserEvent.click(container.querySelector('.react-datepicker__input-container input')!);
    await waitFor(() => expect(container.querySelectorAll('.react-datepicker__day').length).toBeGreaterThan(1));
    UserEvent.click(container.querySelectorAll('.react-datepicker__day')[10]);
    await waitFor(() => expect(container.querySelectorAll('.react-datepicker__day').length).toBe(0));
    expect(getInitialStateSpy).toHaveBeenCalledTimes(2);
  });

  it('error in data change should render error', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(help));
    fetchMock.mockResponseOnce(JSON.stringify(carparks));
    fetchMock.mockResponseOnce(JSON.stringify(bays));
    fetchMock.mockResponseOnce(JSON.stringify({ success: true, bays: baysBooked }));

    fetchMock.mockResponseOnce(JSON.stringify(bays));
    fetchMock.mockRejectOnce();
    const { container, getByText } = await renderToStep2(false);
    UserEvent.click(container.querySelector('.react-datepicker__input-container input')!);
    await waitFor(() => expect(container.querySelectorAll('.react-datepicker__day').length).toBeGreaterThan(1));
    UserEvent.click(container.querySelectorAll('.react-datepicker__day')[10]);
    await waitFor(() => expect(getByText(/Something went wrong when fetching bays for carpark/)).toBeInTheDocument());
  });

  it('bay additional info works correctly', async () => {
    const { getByText, getAllByTestId } = await renderToStep2();
    UserEvent.click(getAllByTestId('additionalInfo')[0]);
    UserEvent.click(getByText('Close'));
  });

  it('click on unavailable time slot should do nothing', async () => {
    const { container } = await renderToStep2();
    const allNodes = container.querySelectorAll('[data-unavailable="true"]');
    UserEvent.click(allNodes[0]);
    expect(container.querySelectorAll('[data-unavailable="true"]').length).toBe(allNodes.length);
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
    UserEvent.type(getByTestId('phone'), faker.phone.phoneNumber('+61########'));
    UserEvent.type(getByTestId('rego'), faker.vehicle.vrm());
    UserEvent.type(getByTestId('company'), faker.company.companyName());
    UserEvent.click(getByText('Submit'));
    await waitFor(() => expect(getByText(/Thank you/)).toBeInTheDocument());
  });

  it('renders error message if submission was rejected', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(help));
    fetchMock.mockResponseOnce(JSON.stringify(carparks));
    fetchMock.mockResponseOnce(JSON.stringify(bays));
    fetchMock.mockResponseOnce(JSON.stringify({ success: true, bays: baysBooked }));
    fetchMock.mockRejectOnce();

    const { getByText, getByTestId } = await renderToStep3(false);
    expect(getByText('Booking Details')).toBeInTheDocument();
    UserEvent.type(getByTestId('firstName'), faker.name.firstName());
    UserEvent.type(getByTestId('lastName'), faker.name.lastName());
    UserEvent.type(getByTestId('email'), faker.internet.email());
    UserEvent.type(getByTestId('phone'), faker.phone.phoneNumber('+61########'));
    UserEvent.click(getByText('Submit'));
    await waitFor(() => expect(getByText(/Something went wrong/)).toBeInTheDocument());
  });

  it('renders error message on successful submission but incorrect data (return single error)', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(help));
    fetchMock.mockResponseOnce(JSON.stringify(carparks));
    fetchMock.mockResponseOnce(JSON.stringify(bays));
    fetchMock.mockResponseOnce(JSON.stringify({ success: true, bays: baysBooked }));
    fetchMock.mockResponseOnce(JSON.stringify({ error: 'Test Error Return' }));

    const { getByText, getByTestId } = await renderToStep3(false);
    expect(getByText('Booking Details')).toBeInTheDocument();
    UserEvent.type(getByTestId('firstName'), faker.name.firstName());
    UserEvent.type(getByTestId('lastName'), faker.name.lastName());
    UserEvent.type(getByTestId('email'), faker.internet.email());
    UserEvent.type(getByTestId('phone'), faker.phone.phoneNumber('+61########'));
    UserEvent.click(getByText('Submit'));
    await waitFor(() => expect(getByText(/Test Error Return/)).toBeInTheDocument());
  });

  it('renders error message on successful submission but incorrect data (return multiple errors)', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(help));
    fetchMock.mockResponseOnce(JSON.stringify(carparks));
    fetchMock.mockResponseOnce(JSON.stringify(bays));
    fetchMock.mockResponseOnce(JSON.stringify({ success: true, bays: baysBooked }));
    fetchMock.mockResponseOnce(JSON.stringify({ errors: { phone: 'needs to length 15', name: 'is required' } }));

    const { getByText, getByTestId } = await renderToStep3(false);
    expect(getByText('Booking Details')).toBeInTheDocument();
    UserEvent.type(getByTestId('firstName'), faker.name.firstName());
    UserEvent.type(getByTestId('lastName'), faker.name.lastName());
    UserEvent.type(getByTestId('email'), faker.internet.email());
    UserEvent.type(getByTestId('phone'), faker.phone.phoneNumber('+61########'));
    UserEvent.click(getByText('Submit'));
    await waitFor(() => expect(getByText(/phone: needs to length 15/)).toBeInTheDocument());
  });

  it('renders error message on successful submission but incorrect data (no error returned)', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(help));
    fetchMock.mockResponseOnce(JSON.stringify(carparks));
    fetchMock.mockResponseOnce(JSON.stringify(bays));
    fetchMock.mockResponseOnce(JSON.stringify({ success: true, bays: baysBooked }));
    fetchMock.mockResponseOnce(JSON.stringify({}));

    const { getByText, getByTestId } = await renderToStep3(false);
    expect(getByText('Booking Details')).toBeInTheDocument();
    UserEvent.type(getByTestId('firstName'), faker.name.firstName());
    UserEvent.type(getByTestId('lastName'), faker.name.lastName());
    UserEvent.type(getByTestId('email'), faker.internet.email());
    UserEvent.type(getByTestId('phone'), faker.phone.phoneNumber('+61########'));
    UserEvent.click(getByText('Submit'));
    await waitFor(() => expect(getByText(/Something went wrong/)).toBeInTheDocument());
  });
});

describe('Booking Form Confirmation', () => {
  it('matches its snapshot', async () => {
    expect((await renderToConfirmation()).asFragment()).toMatchSnapshot();
  });

  it('return button works correctly', async () => {
    const { getByText } = await renderToConfirmation();
    UserEvent.click(getByText('Return'));
  });

  it('pdf buttons works correctly', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore next
    delete window.open;
    window.open = jest.fn();
    const { getByText } = await renderToConfirmation();
    UserEvent.click(getByText('Download PDF'));
    expect(window.open).toHaveBeenCalledWith('/admin/bookings/download/1', '_blank', 'noopener,noreferrer');
  });
});
