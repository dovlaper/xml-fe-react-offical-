import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Builder, XmlEditor } from 'react-xml-editor';
import docSpec, { xmlString } from '../../constants/responseDocSpec';
import BaseModal from '../../shared/ContextAwareToggle/BaseModal';
import { useInjectSaga } from '../../utils/injectSaga';
import { createInformation } from '../Information/actions';
import saga from '../Information/saga';

const key = 'information';

const CreateResponseModal = ({show, close, requestId, submitterId}) => {
    const ref = useRef();
    const xmlS = xmlString(requestId, submitterId);
    useInjectSaga({key, saga});
    const dispatch = useDispatch();
    const createResponse = () => {
        if (ref.current) {
            const builder = new Builder({});
            const xml = ref.current.getXml();
            if (xml) {
                dispatch(createInformation(builder.buildObject(xml)))
            }
            close();
        }
    }

    return (
        <BaseModal
            show={show}
            close={close}
            onSubmit={createResponse}
            title={"Create Response"}
            buttonTitle={"Create"}
            closeButtonTitle={"Cancel"}
        >
            <XmlEditor
                ref={ref}
                xml={xmlS}
                docSpec={docSpec}
            ></XmlEditor>
        </BaseModal>
    )
}

export default CreateResponseModal;