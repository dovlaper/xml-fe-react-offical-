import { Button } from '@material-ui/core';
import React from 'react';

const HeaderOptionsCommissioner = ({forwardRescriptCb, createRescriptCb}) => {
    return (
        <>
            <Button onClick={forwardRescriptCb} variant="success">Forward to Official</Button>
            <Button onClick={createRescriptCb} variant="info" style={{margin: '20px'}}>Create Rescript</Button>        
        </>
    );
}

export default HeaderOptionsCommissioner;