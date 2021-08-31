import React from 'react';
import { waitFor, render } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import BookingForm from './';
import faker from 'faker';

const renderToStep2 = async () => {
  const component = render(<BookingForm />);
  UserEvent.click(component.getByText('Next'));
  await waitFor(() => expect(component.getByText(/Select bay for/)).toBeInTheDocument());
  return component;
};

const renderToStep3 = async () => {
  const component = await renderToStep2();
  UserEvent.click(component.getByText('Next'));
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
  it('matches its snapshot', () => {
    expect(render(<BookingForm />).asFragment()).toMatchSnapshot();
  });

  it('completes step 1 correctly', async () => {
    const { getByText } = render(<BookingForm />);
    expect(getByText('UniPark VIP Booking')).toBeInTheDocument();
    UserEvent.click(getByText('Next'));
    await waitFor(() => expect(getByText(/Select bay for/)).toBeInTheDocument());
  });
});

describe('Booking Form Step 2', () => {
  it('matches its snapshot', async () => {
    expect((await renderToStep2()).asFragment()).toMatchSnapshot();
  });

  it('completes step 2 correctly', async () => {
    const { getByText } = await renderToStep2();
    expect(getByText(/Select bay for/)).toBeInTheDocument();
    UserEvent.click(getByText('Next'));
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
