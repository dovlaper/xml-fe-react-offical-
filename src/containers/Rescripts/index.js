import React from 'react'
import { PageList } from '../../shared/PageList';
import Rescript from '../../components/Rescript';
import { getRole } from '../../utils/request';
import { useDispatch } from 'react-redux';
import { getAllRescripts, search, filter } from '../../components/Rescript/actions';
import SearchInput from '../../shared/SearchInput';
import Filter from '../../shared/RescriptFilter';

const Rescripts = () => {
  const isOffical = getRole() === 'ROLE_OFFICIAL';
  const dispatch = useDispatch()

  const handleChange = (value) => {
    if (value) {
        dispatch(search(value))
    } else {
        dispatch(getAllRescripts())
    }
  }

  const handleFilter = (data) => {
      dispatch(filter(data))
  }
    return  (
      <>
        <PageList>
          <h2>Rescripts</h2>
          {isOffical && (
            <>
              <SearchInput onChange={handleChange}/>
              <Filter onSubmit={handleFilter}/>
            </>
          )}
        </PageList>
        <Rescript style={{width:'50%', marginLeft: '25%'}}/>
      </>
    )
}

export default Rescripts;