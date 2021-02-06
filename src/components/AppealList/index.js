import React, { useRef, useState } from 'react';
import { Accordion, Card } from 'react-bootstrap';
import { XmlEditor } from 'react-xml-editor';
import ContextAwareToggle from '../../shared/ContextAwareToggle';

import silenceAppealDocSpec from '../../constants/requestDocSpec';
import CreateRescriptModal from '../Rescript/CreateRescriptModal';
import CreateResponseModal from './CreateResponseModal';
import { getUserFromToken } from '../../utils/request';
import HeaderOptionsCommissioner from './HeaderOptionsCommissioner';
import HeaderOptionsCitizen from './HeaderOptionsCitizen';
import { useDispatch } from 'react-redux';
import { useInjectSaga } from '../../utils/injectSaga';
import saga from '../Request/saga';
import {getRequests, reject } from '../Request/actions'
import { useLocation } from 'react-router';
const key = 'request';
const AccordionHeaderOptions = (shouldShow, status, rest) => {
    const [showModal, setShowModal] = useState(false);
    const [showResponseModal, setShowResponseModal] = useState(false);

    const show = status === 'PROCESS'
    const { role } = getUserFromToken();
    const isCitizen = role === 'ROLE_CITIZEN';
    const dispatch = useDispatch()
    // useInjectSaga({key, saga});

    const handleReject = () => {
        dispatch(reject(rest.id))
    }

    const handleAprove = () => {
        setShowResponseModal(true);
    }

    return (
        <span style={{margin: '10px'}}>
            {shouldShow && (
                <>
                    {isCitizen ? 
                        <HeaderOptionsCitizen id={rest.id}/> :
                        (
                            <>
                                <HeaderOptionsCitizen id={rest.id}/>
                                <HeaderOptionsCommissioner
                                    rejectCb={handleReject}
                                    answerCb={() => setShowModal(true)}
                                    show={show}
                                    appealId={rest.appealId}
                                    aproveCb={handleAprove}
                                />
                            </>
                            )}
                    <CreateRescriptModal
                        show={showModal}
                        close={() => setShowModal(false)}
                        {...rest}
                    />
                    <CreateResponseModal
                        show={showResponseModal}
                        close={() => setShowResponseModal(false)}
                        submitterId={rest.submitterId}
                        requestId={rest.requestId}                        
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
    const namespace = useLocation().pathname === '/silenceappeal' ? 'zalbacutanje' : 'zalbanaodluku';
    return (
        <div style={{width: '50%', marginLeft: '25%'}}>
            {!!list.length && (
            <Accordion onSelect={(index)=>{setCurrent(index)}} >
                {list.map((xmlNode, index) => {
                    const submitter = xmlNode?.getElementsByTagNameNS(`http://www.${namespace}.com`, "podnosilac_zalbe")[0]?.getAttribute('href');
                    const cardName = xmlNode.getAttribute('id') || `Zalba-${index}`;
                    const xmlString = serializer.serializeToString(xmlNode);
                    const appealHref = xmlNode?.getAttribute('about')
                    const status = xmlNode?.getAttribute('status')
                    const appealId = xmlNode?.getElementsByTagNameNS("http://www.zalbaobavestenje.com", "ID_Zalbe")[0]?.innerHTML;
                    const submitterId = xmlNode?.getAttribute('href');
                    const requestId =  xmlNode?.getAttribute('about');
                    return (
                        <Card key={index}> 
                            <ContextAwareToggle
                                eventKey={cardName}
                                title={cardName}
                                appealHref={appealHref}
                                id={cardName}
                                commissionerHref={`http://users/${user.email}`}
                                submitter={submitter}
                                status={status}
                                submitterId={submitterId}
                                requestId={requestId}
                                appealId={appealId}
                            >
                                {AccordionHeaderOptions}
                            </ContextAwareToggle>
                            <Accordion.Collapse eventKey={cardName}>
                                <Card.Body>
                                    <XmlEditor
                                        mode="laic"
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