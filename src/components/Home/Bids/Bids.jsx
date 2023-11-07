import PropTypes from 'prop-types';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProviders';

const Bids = ({ bids, handleDelete, handlePostedJobConfirm }) => {
    const { user } = useContext(AuthContext);
    const { _id, jobTitle, deadline, status } = bids;


    return (
        <tr>
            <td >{jobTitle}</td>
            <td >{user?.email}</td>
            <td>{deadline}</td>
            <th>
                {
                    status === 'confirm' ? <span className='uppercase  text-green-600'>Confirmed</span> : <Link to={`/updateJob/${_id}`} onClick={() => handlePostedJobConfirm(_id)} className="btn bg-blue-500 text-white btn-sm hover:bg-blue-600 ">Confirm</Link>
                }
            </th>
            <td>
                <button onClick={() => handleDelete(_id)} className="btn btn-circle btn-sm hover:bg-red-500 hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </td>
        </tr >
    );
};

Bids.propTypes = {
    postedJob: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        jobTitle: PropTypes.string.isRequired,
        deadline: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
    }).isRequired,
    handleDelete: PropTypes.func.isRequired,
    handlePostedJobConfirm: PropTypes.func.isRequired,
};



export default Bids;