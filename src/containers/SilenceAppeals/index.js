import React, { useState } from 'react'
import { Button, IconButton } from '@material-ui/core';
import CreateAppealModal from '../CitizenDashboard/CreateAppealModal';
import Silence from '../../components/Silence';
import { PageList, AddButton, AddButtonIcon} from '../../shared/PageList';
import { NoteAdd } from '@material-ui/icons';
import { getRole } from '../../utils/request';

const SilenceAppeals = () => {
    const [show, setShow] = useState(false)
    const close = () => setShow(false)
    return  (
      <>
        <PageList>
          <h2>Silence Appeals</h2>
          {getRole() === 'ROLE_CITIZEN' && (<AddButtonIcon onClick={() =>setShow(true)} />)}
        </PageList>
        <Silence style={{width:'50%', marginLeft: '25%'}}/>
        {show && (<CreateAppealModal show={show} close={close} />)}
      </>
    )
}

export default SilenceAppeals;