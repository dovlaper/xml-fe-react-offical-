import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import { getRole } from '../../utils/request';
import AppealList from '../AppealList';
import { getInformation } from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeSelectInformation } from './selectors';
const key = 'information';
const InfoAppealWrapper = styled.div`
width: 100%;
`
const Information = () => {
    const newXml = useSelector(makeSelectInformation())
    const ref = useRef()
    const dispatch = useDispatch();
    useInjectReducer({ key, reducer })
    useInjectSaga({ key, saga })
    useEffect(() => {
        const role = getRole();
        if (role === "ROLE_CITIZEN"){
            dispatch(getInformation('all'))
        } else {
            dispatch(getInformation())
        }
    }, [dispatch])


    return (
        <InfoAppealWrapper>
            <AppealList ref={ref} list={newXml} />    
        </InfoAppealWrapper>
    )
}

export default Information;