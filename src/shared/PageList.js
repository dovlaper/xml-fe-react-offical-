import { IconButton } from '@material-ui/core';
import { NoteAdd } from '@material-ui/icons';
import styled from 'styled-components';

export const PageList = styled.div`
    display: inline-flex;
    position: relative;
    margin-left: 25%;
    width: 50%;
    margin-top: 20px;
    margin-bottom: 20px;
`

export const AddButton = styled.div`
    position: absolute;
    right: 0;
`;

export const AddButtonIcon = ({onClick}) => (
    <AddButton>
        <IconButton
            onClick={onClick}
            edge="start"
            aria-label="menu"
            >      
            <NoteAdd
            fontSize="large"
            style={{color: "#17a2b8",  fontSize: 40}}
            />
        </IconButton>
    </AddButton>
)