import React, { useState } from 'react'
import Decision from '../../components/Decision';
import CreateAppealModal from '../CitizenDashboard/CreateAppealModal';
import { AddButtonIcon, PageList } from '../../shared/PageList';
import { getRole } from '../../utils/request';

const DecisionAppeals = () => {

    const [show, setShow] = useState(false)
    const close = () => setShow(false)
    return  (
        <>
          <PageList>
            <h2>Decision Appeals</h2>

            {getRole() === 'ROLE_CITIZEN' && (<AddButtonIcon onClick={() =>setShow(true)} />)}
          </PageList>
          <Decision style={{width:'50%', marginLeft: '25%'}}/>
          {show && (<CreateAppealModal show={show} close={close} />)}
        </>
      )
}

export default DecisionAppeals;