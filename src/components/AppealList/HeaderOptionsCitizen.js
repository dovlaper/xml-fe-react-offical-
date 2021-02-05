import { Button, Link, Menu, MenuItem } from '@material-ui/core';
import React, {useState} from 'react';
import { useLocation } from 'react-router-dom';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import silenceSaga from '../Request/saga';
import silenceReducer from '../Request/reducer';
import decisionSaga from '../Information/saga';
import decisionReducer from '../Information/reducer';

const silenceKey='silence';
const decisionKey='decision';

const HeaderOptionsCitizen = ({id}) => {
    const [anchorEl, setAnchorEl] = useState(null);

    useInjectReducer({key: silenceKey, reducer: silenceReducer});
    useInjectSaga({key: silenceKey, saga: silenceSaga});
    useInjectReducer({key: decisionKey, reducer: decisionReducer});
    useInjectSaga({key: decisionKey, saga: decisionSaga});

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const route = useLocation().pathname;
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
        <>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                Options
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                    <MenuItem>
                        <Link href={`http://localhost:8080/api${route}/${id}/generate?type=pdf`}>Download PDF</Link>
                    </MenuItem>
                    <MenuItem>
                        <Link href={`http://localhost:8080/api${route}/${id}/generate?type=html`}>Download HTML</Link>
                    </MenuItem>
                    <MenuItem>
                        <Link href={`http://localhost:8080/api${route}/meta/json/${id}`}>Export Metadata JSON</Link>
                    </MenuItem>
                    <MenuItem>
                        <Link href={`http://localhost:8080/api${route}/meta/rdf/${id}`}>Export Metadata RDF</Link>
                    </MenuItem>
            </Menu>     
        </>
    );
}

export default HeaderOptionsCitizen;