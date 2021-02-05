import React from 'react'
import { PageList } from '../../shared/PageList';
import Rescript from '../../components/Rescript';

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