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

const key = 'silence';


function AccordionHeaderOptions(shouldShow, rest){
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();
    useInjectSaga({key, saga})
    const downloadPDF = () => {
        dispatch(download({id: rest.id, type: 'pdf'}))
    }
    return (
        <span style={{margin: '10px'}}>
            {shouldShow && (
                <>
                    <Button onClick={() => setShowModal(true)} variant="success">Forward to Official</Button>
                    <Button onClick={() => setShowModal(true) } variant="info" style={{margin: '20px'}}>Create Rescript</Button>
                    <Button onClick={downloadPDF} variant="warning">Download PDF</Button>
                    <Link href={`http://localhost:8080/api/silenceappeal/${rest.id}/generate?type=pdf`}>Download PDF</Link>
                    <Link href={`http://localhost:8080/api/silenceappeal/${rest.id}/generate?type=html`}>Download HTML</Link>
                    <Link href={`http://localhost:8080/api/silenceappeal/meta/json/${rest.id}`}>Export Metadata JSON</Link>
                    <Link href={`http://localhost:8080/api/silenceappeal/meta/rdf/${rest.id}`}>Export Metadata RDF</Link>


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

    const onClickHarvest = () => {
        if (itemEls.current && current) {
            const builder = new Builder({});
            const xml = itemEls.current[current].getXml();
            if (xml) {
                setXml(builder.buildObject(xml))
            }
        }
    }
    return (
        <>
            {!!list.length && (
            <Accordion onSelect={(index)=>{setCurrent(index)}} >
                {list.map((xmlNode, index) => {
                    const cardName = xmlNode.getAttribute('id') || `Zalba-${index}`;
                    const xmlString = serializer.serializeToString(xmlNode);
                    const appealHref = xmlNode?.getAttribute('about')
                    return (
                        <Card key={index}>
                            <ContextAwareToggle eventKey={cardName} title={cardName} appealHref={appealHref} id={cardName} officalHref={`http://users/${user.email}`} >
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


            <div>
                <button onClick={ onClickHarvest }>
                    Harvest
                </button>
            </div>
            <div>
                <pre>
                    { xml }
                </pre>
            </div> 
        </>
    )
}

export default AppealList;