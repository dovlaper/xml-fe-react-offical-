import { Button } from '@material-ui/core';
import React from 'react';
import { useLocation } from 'react-router';

const HeaderOptionsCommissioner = ({rejectCb, show}) => {
    const route = useLocation().pathname;
    const showOptions = route === '/requests'
    return (
        <>
        {showOptions ? (
            <>
                {show && (<Button onClick={rejectCb} variant="success">Reject</Button>)}
                {/* <Button onClick={createRescriptCb} variant="info" style={{margin: '20px'}}>Create Rescript</Button>         */}
            </>
        ) : null}
        </>
    );
}

export default HeaderOptionsCommissioner;