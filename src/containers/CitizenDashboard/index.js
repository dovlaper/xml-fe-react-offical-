import React, { useState } from 'react'
import { getUserFromToken } from '../../utils/request';
import Silence from '../../components/Silence';
import Decision from '../../components/Decision';
import Rescript from '../../components/Rescript';
import { Button } from '@material-ui/core';
import CreateAppealModal from './CreateAppealModal';

const CitizenDashboard = ({props}) => {

    const [show, setShow] = useState(false)
    const close = () => setShow(false)
    return  (
      <>
        <Button onClick={() => setShow(true)} class="btn btn-info">Create Appeal</Button>

        <div style={{display:'inline-flex', width: '100%'}}>
          <Silence/>
          <Decision/>
        </div>
        <Rescript/>
        {show && (<CreateAppealModal show={show} close={close} />)}
      </>
    )
}

export default CitizenDashboard;