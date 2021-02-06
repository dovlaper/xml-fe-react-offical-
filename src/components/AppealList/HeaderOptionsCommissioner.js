import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import { useLocation } from 'react-router';
import CreateAnswerModal from '../../containers/AppealAnnouncement/CreateAnswerModal';

const HeaderOptionsCommissioner = ({rejectCb, show, aproveCb, appealId}) => {
    const route = useLocation().pathname;
    const showOptions = route === '/requests'
    const showAnswer = route === '/appeal-announcement'
    const [showModal, setShowModal] = useState(false)
    const close = () => setShowModal(false)
    return (
        <>
        {showOptions ? (
            <>
                {show && (<Button onClick={rejectCb} variant="success">Reject</Button>)}            
                {show && (<Button onClick={aproveCb} variant="success">Aprove</Button>)}            
            </>
        ) : null}
        {showAnswer && (<Button onClick={() =>setShowModal(true)}>Answer</Button>)}
        {showModal && (<CreateAnswerModal show={showModal} close={close} appealId={appealId}/>)}
        </>
    );
}

export default HeaderOptionsCommissioner;