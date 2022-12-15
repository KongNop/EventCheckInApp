import React from 'react'
import CreateEvent from '../components/CreateEvent'
import EventList from '../components/EventList'

const Admin = () => {
  return (
      <>
          <EventList />
          <CreateEvent />
      </>
  )
}

export default Admin