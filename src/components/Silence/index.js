import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Builder, XmlEditor } from 'react-xml-editor';
import silenceAppealDocSpec from '../../constants/silenceAppealDocSpec';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import { getSilenceAppeal } from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeSelectSilence } from './selectors';

import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import AppealList from '../AppealList';
const key = 'silence';

const Silence = () => {
    const newXml = useSelector(makeSelectSilence())
    const ref = useRef()
    const dispatch = useDispatch();
    useInjectReducer({ key, reducer })
    useInjectSaga({ key, saga })
    useEffect(() => {
        dispatch(getSilenceAppeal())
    }, [dispatch])

    const SilenceAppealWrapper = styled.div`
        width: 50%;
    `
    return (
        <SilenceAppealWrapper>
            <AppealList ref={ref} list={newXml} />    
        </SilenceAppealWrapper>
    )
}

export default Silence;