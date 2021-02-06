import React, { useRef, forwardRef } from 'react';
import answerDocSpec, { xmlString } from '../../constants/answerDocSpec';
import BaseModal from '../../shared/ContextAwareToggle/BaseModal';
import { Builder, XmlEditor } from 'react-xml-editor';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import saga from './saga';
import reducer from './reducer';

import { useDispatch } from 'react-redux';
import { createAnswer } from './actions';

const key = 'request';

const CreateAnswerModal = ({show, close, appealId }) => {
    const ref = useRef();
    
    const dispatch = useDispatch();
    useInjectReducer({ key, reducer })

    const handleCreateAnswer = () => {
        if (ref.current) {
            const builder = new Builder({});
            const xml = ref.current.getXml();
            if (xml) {
                
                dispatch(createAnswer(builder.buildObject(xml)))
            }
            close();
        }
    }

    return (
        <BaseModal
            show={show}
            close={close}
            title={"Create Answer"}
            buttonTitle={"Create"}
            onSubmit={handleCreateAnswer}
            aditionalStyle={{marginTop: '250px'}}
        >
            <XmlEditor
                mode={'laic'}
                docSpec={ answerDocSpec }
                xml={ xmlString(appealId) }
                ref={ref}
            />        
        </BaseModal>
    )
}

export default CreateAnswerModal;