import { getUserFromToken } from '../../utils/request';
import Silence from '../../components/Silence';
import Desicion from '../../components/Decision';
const CommissionerDashboard = ({props}) => {

    const user = getUserFromToken();
    return  (
        <>
            <Silence/>
            <Desicion/>
        </>
    )
}

export default CommissionerDashboard;