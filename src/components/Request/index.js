import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import { getRequests } from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeSelectRequest } from './selectors';

import styled from 'styled-components';
import AppealList from '../AppealList';
import { getRole } from '../../utils/request';
const key = 'request';
const RequestWrapper = styled.div`
width: 100%;
`
const Request = () => {
    const newXml = useSelector(makeSelectRequest())
    const ref = useRef()
    const dispatch = useDispatch();
    useInjectReducer({ key, reducer })
    useInjectSaga({ key, saga })
    useEffect(() => {
        const role = getRole();
        if (role === "ROLE_CITIZEN"){
            dispatch(getRequests('all'))
        } else {
            dispatch(getRequests())
        }
    }, [dispatch])


    return (
        <RequestWrapper>
            <AppealList ref={ref} list={newXml} />    
        </RequestWrapper>
    )
}

export default Request;