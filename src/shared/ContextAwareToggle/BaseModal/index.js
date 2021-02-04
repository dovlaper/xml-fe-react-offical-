import React from 'react';
import { Button, makeStyles, Modal } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    paper: {
        width: '50%',
        position: 'absolute',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid red',
        marginLeft: '25%',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        alignItems: 'center'
    },
  })); 


function getModalStyle() {
    return {
      overflow: 'scroll',
    };
  }
const BaseModal = ({show, close, title, children, onSubmit}) => {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);

    return (
    <Modal
        open={show}
        onClose={close}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        style={modalStyle} 
    >
        <div className={classes.paper}>
            <h2>{title}</h2>
            {children}
            <Button onClick={onSubmit}>Create</Button>
        </div>
  </Modal>

)}

export default BaseModal;