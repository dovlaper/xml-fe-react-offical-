import React, { useContext } from 'react';
import { Accordion, AccordionContext, Button, Card, useAccordionToggle } from 'react-bootstrap';

function ContextAwareToggle({ children, eventKey, callback, title }) {
    const currentEventKey = useContext(AccordionContext);
  
    const decoratedOnClick = useAccordionToggle(
      eventKey,
      () => callback && callback(eventKey),
    );
  
    const isCurrentEventKey = currentEventKey === eventKey;
  
    return (
        <Card.Header>
            <Accordion.Toggle as={Button} variant="danger"  eventKey={eventKey}>
                <div>
                    {title}
                </div>
            </Accordion.Toggle>
            {children(isCurrentEventKey)}
        </Card.Header>
    );
  }

  export default ContextAwareToggle;