import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import AppealList from '../AppealList';
import { getDecisionAppeal } from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeSelectDecision } from './selectors';
const key = 'decision';

const Decision = () => {
    const newXml = useSelector(makeSelectDecision())
    const ref = useRef()
    const dispatch = useDispatch();
    useInjectReducer({ key, reducer })
    useInjectSaga({ key, saga })
    useEffect(() => {
        dispatch(getDecisionAppeal())
    }, [dispatch])

    const DecisionAppealWrapper = styled.div`
        width: 50%;
    `
    return (
        <DecisionAppealWrapper>
            <AppealList ref={ref} list={newXml} />    
        </DecisionAppealWrapper>
    )
}

export default Decision;