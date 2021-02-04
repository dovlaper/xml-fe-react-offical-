import { getUserFromToken } from '../../utils/request';
import Silence from '../../components/Silence';
import Rescript from '../../components/Rescript';
import Decision from '../../components/Decision';

const CommissionerDashboard = ({props}) => {

    const user = getUserFromToken();
    return  (
        <>
            <Silence/>
            <Decision/>
            <Rescript/>
        </>
    )
}

export default CommissionerDashboard;