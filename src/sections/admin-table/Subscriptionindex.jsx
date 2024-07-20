// /pages/index.js
import * as React from 'react';

import { Container } from '@mui/material';

import SubscriptionList from './Subscriptionpage';
import SubscriptionForm from './SubscriptionForm';

export default function Subscriptionindex() {
  const [showForm, setShowForm] = React.useState(false);

  const handleAddSubscription = () => {
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
  };

  return (
    <Container>
      {showForm ? (
        <SubscriptionForm onCancel={handleCancelForm} />
      ) : (
        <SubscriptionList onAddSubscription={handleAddSubscription} />
      )}
    </Container>
  );
};
