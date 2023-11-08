import PropTypes from 'prop-types';
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProviders';

const BidReqRow = ({ bids, handleDelete, handleBidConfirm, handleBidReject }) => {
    const { user } = useContext(AuthContext);
    const { _id, jobTitle, deadline, status } = bids;


    return (
        <tr>
            <td >{jobTitle}</td>
            <td >{user?.email}</td>
            <td>{deadline}</td>
            <th>
                {
                    status === 'confirm' ? (
                        <span className='uppercase text-green-600'>Accepted</span>
                    ) : status === 'reject' ? (
                        <span className='uppercase text-red-600'>Rejected</span>
                    ) : (
                        <div className='space-x-1'>
                            <button
                                onClick={() => {
                                    handleBidConfirm(_id); // This should update the status to 'Accepted'
                                }}
                                className="btn bg-blue-500 text-white btn-sm hover:bg-blue-600"
                            >
                                Accept
                            </button>
                            <button
                                onClick={() => {
                                    handleBidReject(_id); // This should update the status to 'Rejected'
                                }}
                                className="btn bg-red-500 text-white btn-sm hover-bg-red-600"
                            >
                                Reject
                            </button>
                        </div>
                    )
                }

                {/* {
                    status === 'confirm' ? <span className='uppercase  text-green-600'>Rejected</span> : <button to={`/updateJob/${_id}`} onClick={() => handleBidConfirm(_id)} className="btn bg-blue-500 text-white btn-sm hover:bg-blue-600 ">Reject</button>
                } */}
            </th>
            <td>
                <button onClick={() => handleDelete(_id)} className="btn btn-circle btn-sm hover:bg-red-500 hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </td>
        </tr >
    );
};

BidReqRow.propTypes = {
    bids: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        bids: PropTypes.string.isRequired,
        jobTitle: PropTypes.string.isRequired,
        deadline: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
    }).isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleBidConfirm: PropTypes.func.isRequired,
    handleBidReject: PropTypes.func.isRequired,
};



export default BidReqRow;