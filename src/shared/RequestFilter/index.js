
import { FormControl, IconButton, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { FilterList } from '@material-ui/icons';
import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import {requestXML} from '../../constants/filterDocSpec';
import BaseModal from '../ContextAwareToggle/BaseModal';



// "submitter",
// "institutionName",
// "institutionOffice",
// "requestType",
// "delivery",
// "submitterName",
// "submitterLastname",
// "appealDate"
const Filter = ({onSubmit}) => {
    const [show, setShow] = useState(false);
    const handleSubmit = () => {
        const xmlToSend = requestXML(
            institutionName,
            institutionOffice,
            requestType,
            delivery,
            submitter,
            submitterName,
            submitterLastname,
            appealDate
        )
        onSubmit(xmlToSend)
        setShow(false)
    }

    const [institutionName, setInstitutionName] = useState('')
    const [institutionOffice, setInstitutionOffice] = useState('');
    const [requestType, setRequestType] = useState('KOPIJA DOKUMENTA')
    const [delivery, setDelivery] = useState('')
    const [submitter, setSubmitter] = useState('')
    const [submitterName, setSubmitterName] = useState('')
    const [submitterLastname, setSubmitterLastname] = useState('')
    const [appealDate, setAppealDate] = useState(new Date());

    return (
        <>
            <IconButton style={{position: 'absolute', right: 300}} onClick={() => setShow(true)}>
                <FilterList style={{fontSize: 40}} />
            </IconButton>
                <BaseModal
                    show={show}
                    close={() => setShow(false)}
                    title="Filter Request"
                    onSubmit={handleSubmit}
                    buttonTitle="Apply filters"
                    aditionalStyle={{marginTop: '200px'}}
                >
                    <TextField
                        style={{margin: '20px'}}
                        id="outlined-basic"
                        label="Institution Name"
                        variant="outlined"
                        value={institutionName}
                        onChange={e => setInstitutionName(e.target.value)}
                    />
                    <TextField
                        style={{margin: '20px'}}
                        id="outlined-basic"
                        label="Institution Office"
                        variant="outlined"
                        value={institutionOffice}
                        onChange={e => setInstitutionOffice(e.target.value)}
                    />
  
                    <TextField
                        style={{margin: '20px'}}
                        id="outlined-basic"
                        label="Submitter Email"
                        variant="outlined"
                        value={submitter}
                        onChange={e => setSubmitter(e.target.value)}
                    />
                    <TextField
                        style={{margin: '20px'}}
                        id="outlined-basic"
                        label="Commissioner's Last Name"
                        variant="outlined"
                        value={submitterName}
                        onChange={e => setSubmitterName(e.target.value)}
                    />
                    <TextField
                        style={{margin: '20px'}}
                        id="outlined-basic"
                        label="Commissioner's Last Name"
                        variant="outlined"
                        value={submitterLastname}
                        onChange={e => setSubmitterLastname(e.target.value)}
                    />
                    <FormControl variant="outlined" style={{margin: '20px'}}>
                        <InputLabel id="demo-simple-select-outlined-label">Request Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={requestType}
                            onChange={e => setRequestType(e.target.value)}
                            label="Request Type"
                        >
                            <MenuItem value={'KOPIJA DOKUMENTA'}>KOPIJA DOKUMENTA</MenuItem>
                            <MenuItem value={'UVID U DOKUMENT'}>UVID U DOKUMENT</MenuItem>
                            <MenuItem value={'OBAVESTENJE DA LI POSEDUJE INFORMACIJU'}>OBAVESTENJE DA LI POSEDUJE INFORMACIJU</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl variant="outlined" style={{margin: '20px'}}>
                        <InputLabel id="demo-simple-select-outlined-label">Delivery</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={delivery}
                            onChange={e => setDelivery(e.target.value)}
                            label="Request Type"
                        >
                            <MenuItem value={'EMAIL'}>Email</MenuItem>
                            <MenuItem value={'POSTA'}>Posta</MenuItem>
                            <MenuItem value={'FAKS'}>Faks</MenuItem>
                        </Select>
                    </FormControl>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            style={{margin: '20px',width:"225px"}}
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Rescript Date"
                            value={appealDate}
                            onChange={setAppealDate}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </BaseModal>
        </>
    )
}

export default Filter;