import React, { useRef, useState } from 'react';
import { Accordion, Card } from 'react-bootstrap';
import { XmlEditor } from 'react-xml-editor';
import ContextAwareToggle from '../../shared/ContextAwareToggle';

import silenceAppealDocSpec from '../../constants/requestDocSpec';
import CreateRescriptModal from '../Rescript/CreateRescriptModal';
import { getUserFromToken } from '../../utils/request';
import HeaderOptionsCommissioner from './HeaderOptionsCommissioner';
import HeaderOptionsCitizen from './HeaderOptionsCitizen';
import { useDispatch } from 'react-redux';
import { useInjectSaga } from '../../utils/injectSaga';
import saga from '../Request/saga';
import {getRequests, reject } from '../Request/actions'
const key = 'request';
const AccordionHeaderOptions = (shouldShow, status, rest) => {
    const [showModal, setShowModal] = useState(false);
    console.log([status])
    const show = status === 'PROCESS'
    const { role } = getUserFromToken();
    const isCitizen = role === 'ROLE_CITIZEN';
    const dispatch = useDispatch()
    useInjectSaga({key, saga});

    const handleReject = () => {
        dispatch(reject(rest.id))
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
                                />
                            </>
                            )}
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
                    const status = xmlNode?.getAttribute('status')
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