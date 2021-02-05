import React, {useState, useRef, useMemo, forwardRef} from 'react';
import requestDocSpec, { xmlString } from '../../constants/requestDocSpec';
import BaseModal from '../../shared/ContextAwareToggle/BaseModal';
import { FormControlLabel, Radio, RadioGroup, TextField, withStyles } from '@material-ui/core';
import { Builder, XmlEditor } from 'react-xml-editor';
import { green } from '@material-ui/core/colors';
import { getUserFromToken } from '../../utils/request';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import saga from '../../components/Request/saga';
import reducer from '../../components/Request/reducer';

import { useDispatch } from 'react-redux';
import { createRequest } from '../../components/Request/actions';

const key = 'request';

const GreenRadio = withStyles({
    root: {
      color: green[400],
      '&$checked': {
        color: green[600],
      },
    },
    checked: {},
  })((props) => <Radio color="default" {...props} />);
  
const CreateInformationModal = ({show, close }) => {
    // const [submitter, setSubmitter] = useState('individual');
    const [requestId, setRequestId] = useState('');
    const ref = useRef();
    
    const dispatch = useDispatch();
    useInjectReducer({ key, reducer })
    useInjectSaga({ key, saga })


    const handleCreateInformation = () => {
        if (ref.current) {
            const builder = new Builder({});
            const xml = ref.current.getXml();
            if (xml) {
                
                dispatch(createRequest(builder.buildObject(xml)))
            }
            close();
        }
    }

    const officalId = useMemo(() => getUserFromToken().email)

    const XmlComponent = forwardRef((props, ref)=>{
        return (
            <XmlEditor
                mode={'laic'}
                docSpec={ requestDocSpec }
                xml={ xmlString(requestId, officalId ) }
                ref={ref}
            />)
    })

    // const handleSubmitterChange = e => setSubmitter(e.target.value)
    return (
        <BaseModal
            show={show}
            close={close}
            title={"Create Information"}
            buttonTitle={"Create"}
            onSubmit={handleCreateInformation}
        >

            <div style={{display: 'inline-flex'}}>
            <TextField
                style={{margin: '20px'}}
                id="outlined-basic"
                label="Request ID"
                variant="outlined"
                value={requestId}
                onChange={e => setRequestId(e.target.value)}
            />

            {/* <RadioGroup aria-label="type" name="type" value={submitter} onChange={handleSubmitterChange}>
                <FormControlLabel value="individual" control={<GreenRadio />} label="Individual" />
                <FormControlLabel value="legalEntity" control={<GreenRadio />} label="Legal Entity" />
            </RadioGroup> */}

            </div>

            <XmlComponent ref={ref}/>
        </BaseModal>
    )
}

export default CreateInformationModal;