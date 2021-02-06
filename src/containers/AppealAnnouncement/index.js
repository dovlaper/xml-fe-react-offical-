import React, { useState, useEffect, useRef } from 'react'
import { PageList } from '../../shared/PageList';
import { useDispatch, useSelector } from 'react-redux';
import CreateRequestModal from '../CitizenDashboard/CreateRequestModal';
import { getAppealAnnouncements } from './actions';
import { makeSelectAppealAnnouncements } from './selectors';
import AppealList from '../../components/AppealList';
import saga from '../AppealAnnouncement/saga';
import reducer from '../AppealAnnouncement/reducer';
import { useInjectSaga } from '../../utils/injectSaga';
import { useInjectReducer } from '../../utils/injectReducer';
import { Button } from '@material-ui/core';
import CreateAnswerModal from './CreateAnswerModal';


const key = 'appealAnnouncement';

const AppealAnnouncement = () => {
   
    useInjectSaga({key, saga});
    useInjectReducer({key, reducer});
    const dispatch = useDispatch();
    const xml = useSelector(makeSelectAppealAnnouncements())
    const ref= useRef();
    useEffect(()=> {
        dispatch(getAppealAnnouncements())
    }, [dispatch])
    return  (
        <>
            <PageList>
                <h2>Appeal Announcements</h2>
            </PageList>
            <div style={{width:'100%'}}>
                <AppealList ref={ref} list={xml} />    
            </div>
        </>
      )
}

export default AppealAnnouncement;