import React from 'react';
import BaseModal from '../../shared/ContextAwareToggle/BaseModal';

const ErrorModal = ({show, close, error}) => {

    return (
            <BaseModal
                show={show}
                close={close}
                title={"Oops!"}
                buttonTitle={"Close"}
                onSubmit={close}
                aditionalStyle={{marginTop: '300px'}}
            >
                <h1 style={{color: 'red'}}>
                    {error}
                </h1>
            </BaseModal>
    )
}

export default ErrorModal;