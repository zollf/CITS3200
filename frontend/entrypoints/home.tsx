import React from 'react';
import ReactDOM from 'react-dom';
import BookingForm from '@/frontend/components/BookingForm';

const initialProps = {
  globalStartTime: document.getElementById('globalStartTime')?.dataset.globalStartTime || '10:00',
  globalEndTime: document.getElementById('globalEndTime')?.dataset.globalEndTime || '24:00',
  phone: document.getElementById('phone')?.dataset.phone || '04 1234 5678',
  userId: document.getElementById('user')?.dataset.user || null,
  hub: document.getElementById('hub')?.dataset.hub || '',
  bufferInfo: document.getElementById('bufferInfo')?.dataset.bufferInfo || '',
};

ReactDOM.render(<BookingForm {...initialProps} />, document.getElementById('react-app'));
