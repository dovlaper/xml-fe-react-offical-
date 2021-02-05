import React, { useContext } from 'react';
import { Accordion, AccordionContext, Button, Card, useAccordionToggle,   } from 'react-bootstrap';

function ContextAwareToggle({ children, eventKey, callback, title, status, ...rest }) {
    const currentEventKey = useContext(AccordionContext);

    const isCurrentEventKey = currentEventKey === eventKey;
    const buttonStyle = {
        'REJECTED' : 'danger',
        'PROCESS' : 'warning',
        'ACCEPTED' : 'success'
    } 
    return (
        <Card.Header>
            <Accordion.Toggle as={Button} variant={buttonStyle[status]}  eventKey={eventKey}>
                <div>
                    {title} | {status}
                </div>
            </Accordion.Toggle>
            {children(isCurrentEventKey,status, rest)}
        </Card.Header>
    );
  }

  export default ContextAwareToggle;