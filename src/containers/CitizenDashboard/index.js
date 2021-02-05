import React, { useState } from 'react'

const CitizenDashboard = ({props}) => {

    const [show, setShow] = useState(false)
    const close = () => setShow(false)
    return  (
      <>
        {/* <Button onClick={() => setShow(true)} class="btn btn-info">Create Appeal</Button>

        <Rescript/>
        {show && (<CreateAppealModal show={show} close={close} />)} */}
      </>
    )
}

export default CitizenDashboard;