import React, { useState } from 'react'
import CreateInformationModal from '../OfficalDashboard/CreateInformationModal';
import Information from '../../components/Information';
import { PageList, AddButtonIcon} from '../../shared/PageList';
import SearchInput from  '../../shared/SearchInput';
import Filter from '../../shared/Filter';
import { getRole } from '../../utils/request';
import { useDispatch } from 'react-redux';
import { search } from '../../components/Information/actions';
import { getInformation } from '../../components/Information/actions';

const SilenceAppeals = () => {
    const [show, setShow] = useState(false)
    const close = () => setShow(false)

    const dispatch = useDispatch();
    const handleChange = (value) => {
        if (value) {
            dispatch(search(value))
        } else {
            dispatch(getInformation())
        }
    }

    const isOffical = getRole() === "ROLE_OFFICIAL"

    return  (
      <>
        <PageList>
          <h2>Information</h2>
          {isOffical && (<><SearchInput onChange={handleChange}/>
          <Filter /></>)}
        </PageList>

        <Information style={{width:'50%', marginLeft: '25%'}}/>
        {show && (<CreateInformationModal show={show} close={close} />)}
      </>
    )
}

export default SilenceAppeals;