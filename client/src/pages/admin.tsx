import React from 'react'
import CreateEvent from '../components/CreateEvent'
import EventList from '../components/EventList'
import Footer from '../components/Footer';

const Admin = () => {
  return (
      <>
          <EventList />
          <CreateEvent />
          <Footer />
      </>
  );
}

export default Admin