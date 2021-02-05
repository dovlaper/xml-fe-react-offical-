import { Button } from '@material-ui/core';
import React from 'react';
import { useLocation } from 'react-router';

const HeaderOptionsCommissioner = ({forwardRescriptCb, createRescriptCb}) => {
    const route = useLocation().pathname;
    const showOptions = route === '/silenceappeal' || route === '/decisionappeal'
    return (
        <>
        {showOptions ? (
            <>
                <Button onClick={forwardRescriptCb} variant="success">Forward to Official</Button>
                <Button onClick={createRescriptCb} variant="info" style={{margin: '20px'}}>Create Rescript</Button>        
            </>
        ) : null}
        </>
    );
}

export default HeaderOptionsCommissioner;