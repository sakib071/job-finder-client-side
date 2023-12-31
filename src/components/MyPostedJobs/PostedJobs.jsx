import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const PostedJobs = ({ postedJob, handleDelete }) => {
    const { _id, jobTitle, deadline, description, category, maximumPrice, minimumPrice } = postedJob;


    return (
        <tr>
            <td className='w-32'>{jobTitle}</td>
            <td>{category}</td>
            <td>{deadline}</td>
            <td className='w-96'>{description}</td>
            <td>${maximumPrice}</td>
            <td>${minimumPrice}</td>
            <th>
                <Link to={{
                    pathname: `/updateJob/${_id}`,
                    state: { jobData: postedJob }
                }} className="btn bg-blue-500 text-white btn-sm hover:bg-blue-600 ">Update</Link>

            </th>
            <td>
                <button onClick={() => handleDelete(_id)} className="btn btn-circle btn-sm hover:bg-red-500 hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </td>
        </tr >
    );
};

PostedJobs.propTypes = {
    postedJob: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        jobTitle: PropTypes.string.isRequired,
        deadline: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        maximumPrice: PropTypes.number.isRequired,
        minimumPrice: PropTypes.number.isRequired,
    }).isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleUpdate: PropTypes.func.isRequired,
};



export default PostedJobs;