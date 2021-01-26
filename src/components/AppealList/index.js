import React, { useRef, useState } from 'react';
import { Accordion, Button, Card } from 'react-bootstrap';
import { Builder, XmlEditor } from 'react-xml-editor';
import ContextAwareToggle from '../../shared/ContextAwareToggle';
import silenceAppealDocSpec from '../../constants/silenceAppealDocSpec';

const accordionHeaderOptions = shouldShow => (
    <span style={{margin: '10px'}}>
        {shouldShow && (<Button variant="success">Forward to Official</Button>)}
    </span>
)

const AppealList = ({list}) => {
    const serializer = new XMLSerializer();

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
                    const cardName = xmlNode.getAttribute('id')?.slice(0, -4) || `Zalba-${index}`;
                    const xmlString = serializer.serializeToString(xmlNode);
                    return (
                        <Card key={index}>
                            
                            <ContextAwareToggle  eventKey={cardName} title={cardName} >
                                {accordionHeaderOptions}
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