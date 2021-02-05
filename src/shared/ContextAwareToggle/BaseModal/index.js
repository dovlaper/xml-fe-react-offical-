import React from 'react';
import { Button, makeStyles, Modal } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    paper: {
        width: '50%',
        position: 'absolute',
        backgroundColor: theme.palette.background.paper,
        marginLeft: '25%',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        alignItems: 'center',
        borderRadius: 20
    },
  })); 


function getModalStyle() {
    return {
      overflow: 'scroll',
    };
  }
const BaseModal = ({show, close, title, children, onSubmit, buttonTitle, closeButtonTitle, aditionalStyle}) => {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);

    return (
    <Modal
        open={show}
        onClose={close}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        style={{...modalStyle, ...aditionalStyle}} 
    >
        <div className={classes.paper}>
            <h2>{title}</h2>
            {children}
            <Button onClick={onSubmit}>{buttonTitle}</Button>
            {!!closeButtonTitle && (
              <Button variant="primary" onClick={close}>Abort</Button>
            )}
        </div>
  </Modal>

)}

export default BaseModal;