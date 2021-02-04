import React, { useState } from 'react'
import CreateAppealModal from '../CitizenDashboard/CreateAppealModal';
import { AddButtonIcon, PageList } from '../../shared/PageList';
import Rescript from '../../components/Rescript';
import CreateRescriptModal from '../../components/Rescript/CreateRescriptModal';
import { getRole } from '../../utils/request';

const Rescripts = () => {
    return  (
      <>
        <PageList>
          <h2>Rescripts</h2>
        </PageList>
        <Rescript style={{width:'50%', marginLeft: '25%'}}/>
      </>
    )
}

export default Rescripts;