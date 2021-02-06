import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { makeSelectReports }  from './selectors';
import { getReports, search } from './actions'; 
import saga from './saga';
import reducer from './reducer';
import { useInjectReducer } from '../../utils/injectReducer';
import { useDispatch, useSelector } from 'react-redux';
import AppealList from '../../components/AppealList';
import { useInjectSaga } from '../../utils/injectSaga';
import { PageList } from '../../shared/PageList';
import { getRole } from '../../utils/request';
import SearchInput from '../../shared/SearchInput';

const ReportWrapper = styled.div`
width: 100%;
`

const key="reports";

const Reports = () => {
    const newXml = useSelector(makeSelectReports())
    const ref = useRef()
    const dispatch = useDispatch();
    useInjectReducer({ key, reducer })
    // useInjectSaga({ key, saga })
    useEffect(() => {
        dispatch(getReports())
    }, [dispatch])

    const isOfficial = getRole() === 'ROLE_OFFICIAL';

    const handleChange = (value) => {
      if (value) {
          dispatch(search(value))
      } else {
          dispatch(getReports())
      }
    }


    return (
        <>
            <PageList>
                <h2>Reports</h2>
                {isOfficial && (
                <>
                <SearchInput title="Search By Date" onChange={handleChange}/>
                </>)}
            </PageList>
            <ReportWrapper>
                <AppealList ref={ref} list={newXml} />    
            </ReportWrapper>
        </>
    )
}

export default Reports;



