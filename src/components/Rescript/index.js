import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import { getRole } from '../../utils/request';
import AppealList from '../AppealList';
import { getAllRescripts } from './actions';
import reducer from './reducer';
import saga from './saga';
import {  makeSelectRescript } from './selectors';

const key = 'rescript';

const DecisionAppealWrapper = styled.div`
width: 100%;
`
const Rescript = () => {
    const newXml = useSelector(makeSelectRescript())
    const ref = useRef()
    const dispatch = useDispatch();
    useInjectReducer({ key, reducer })
    useInjectSaga({ key, saga })
    useEffect(() => {
        const role = getRole();
        if (role === "ROLE_CITIZEN"){
            dispatch(getAllRescripts('all'))
        } else {
            dispatch(getAllRescripts())
        }
    }, [dispatch])

    return (
        <DecisionAppealWrapper>
            <AppealList ref={ref} list={newXml} />    
        </DecisionAppealWrapper>
    )
}

export default Rescript;