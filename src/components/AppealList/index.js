import React, { useRef, useState } from 'react';
import { Accordion, Button, Card } from 'react-bootstrap';
import { Builder, XmlEditor } from 'react-xml-editor';
import ContextAwareToggle from '../../shared/ContextAwareToggle';

import silenceAppealDocSpec from '../../constants/silenceAppealDocSpec';
import CreateRescriptModal from '../Rescript/CreateRescriptModal';
import { makeSelectUser } from '../../containers/App/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { getUserFromToken } from '../../utils/request';
import { useInjectSaga } from '../../utils/injectSaga';
import saga from '../Silence/saga';
import { download } from '../Silence/actions';
import { Link } from '@material-ui/core';
import HeaderOptionsCommissioner from './HeaderOptionsCommissioner';
import HeaderOptionsCitizen from './HeaderOptionsCitizen';

function AccordionHeaderOptions(shouldShow, rest){
    const [showModal, setShowModal] = useState(false);

    const { role } = getUserFromToken();
    const isCitizen = role === 'ROLE_CITIZEN';
    return (
        <span style={{margin: '10px'}}>
            {shouldShow && (
                <>
                    {isCitizen ? 
                        <HeaderOptionsCitizen id={rest.id}/> :
                        <HeaderOptionsCommissioner
                            createRescriptCb={() => setShowModal(true)}
                            forwardRescriptCb={() => {}}/>}
                    <CreateRescriptModal
                        show={showModal}
                        close={() => setShowModal(false)}
                        {...rest}
                    />
                </>
            )}
        </span>
)}

const AppealList = ({list}) => {
    const serializer = new XMLSerializer();
    const user = getUserFromToken()

    const itemEls = useRef(new Array())
    const [ xml, setXml] = useState('')
    const [current, setCurrent] = useState(null)

    return (
        <div style={{width: '50%', marginLeft: '25%'}}>
            {!!list.length && (
            <Accordion onSelect={(index)=>{setCurrent(index)}} >
                {list.map((xmlNode, index) => {

                    const submitter = xmlNode?.getElementsByTagNameNS("http://www.zalbacutanje.com", "podnosilac_zalbe")[0]?.getAttribute('href');
                    const cardName = xmlNode.getAttribute('id') || `Zalba-${index}`;
                    const xmlString = serializer.serializeToString(xmlNode);
                    const appealHref = xmlNode?.getAttribute('about')
                    return (
                        <Card key={index}>
                            <ContextAwareToggle
                                eventKey={cardName}
                                title={cardName}
                                appealHref={appealHref}
                                id={cardName}
                                commissionerHref={`http://users/${user.email}`}
                                submitter={submitter}
                            >
                                {AccordionHeaderOptions}
                            </ContextAwareToggle>
                            <Accordion.Collapse eventKey={cardName}>
                                <Card.Body>
                                    <XmlEditor
                                        docSpec={ silenceAppealDocSpec }
                                        ref={(element) => itemEls.current[cardName] = element}
                                        xml={ xmlString }
                                    />
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                )})
                }
            </Accordion>)}
        </div>
    )
}

export default AppealList;