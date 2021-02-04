import React, { useRef } from 'react';
import { Builder, XmlEditor } from 'react-xml-editor';
import BaseModal from '../../shared/ContextAwareToggle/BaseModal';
import createRescriptDocSpec, { xmlString } from '../../constants/createRescriptDocSpec'
import { useDispatch } from 'react-redux';
import { createRescript } from './actions';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import saga from './saga';
import reducer from './reducer';

const key = 'rescript';

const CreateRescriptModal = ({show, close, officalHref, appealHref}) => {
    const ref = useRef()
    const dispatch = useDispatch();
    useInjectReducer({ key, reducer })
    useInjectSaga({ key, saga })
    const handleCreateRescript = () => {
        if (ref.current) {
            const builder = new Builder({});
            const xml = ref.current.getXml();
            if (xml) {
                dispatch(createRescript(builder.buildObject(xml)))
            }
        }
    }

    return (
        <BaseModal
            show={show}
            close={close}
            title={"Create rescript"}
            onSubmit={handleCreateRescript}
        >
            <XmlEditor
                mode={'laic'}
                docSpec={ createRescriptDocSpec }
                ref={ref}
                xml={ xmlString(officalHref, appealHref)}
            />
        </BaseModal>
    )
}

export default CreateRescriptModal;