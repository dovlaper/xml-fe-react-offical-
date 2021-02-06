import React, { useState } from 'react'
import Request from '../../components/Request';
import { AddButtonIcon, PageList } from '../../shared/PageList';
import { getRole } from '../../utils/request';
import SearchInput from '../../shared/SearchInput';
import Filter from '../../shared/RequestFilter';
import { useDispatch } from 'react-redux';
import { getRequests, search, filter } from '../../components/Request/actions';
import CreateRequestModal from '../CitizenDashboard/CreateRequestModal';

const RequestPage = () => {

    const [show, setShow] = useState(false)
    const close = () => setShow(false)
    const dispatch = useDispatch();
    const handleChange = (value) => {
        if (value) {
            dispatch(search(value))
        } else {
            dispatch(getRequests())
        }
    }
    const handleFilterSubmit = (data) => {
        dispatch(filter(data))
    }
    const isOffical = getRole() === "ROLE_OFFICIAL";
    return  (
        <>
          <PageList>
            <h2>Requests</h2>
            {isOffical && (<>
              <Filter onSubmit={handleFilterSubmit}/>
              <SearchInput onChange={handleChange}/>
            </>)}
            {getRole() === 'ROLE_CITIZEN' && (<AddButtonIcon onClick={() =>setShow(true)} />)}
          </PageList>
          <Request style={{width:'50%', marginLeft: '25%'}}/>
          {show && (<CreateRequestModal show={show} close={close} />)}
        </>
      )
}

export default RequestPage;