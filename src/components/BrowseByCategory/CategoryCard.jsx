import PropTypes from 'prop-types';
import { useContext } from 'react';
import { BiTime } from 'react-icons/bi';
import { MdOutlineAttachMoney } from 'react-icons/md';
import Swal from 'sweetalert2';
import { AuthContext } from '../providers/AuthProviders';

const CategoryCard = ({ job }) => {
    const { user } = useContext(AuthContext);
    const { _id, jobTitle, deadline, description, category, maximumPrice, minimumPrice } = job;
    const email = user.email;
    // console.log(email);

    const handleBid = _id => {
        console.log(_id);
        console.log(jobTitle);
        const addJob = {
            email,
            jobTitle,
            deadline,
            description,
            minimumPrice,
            maximumPrice,
            category
        }
        console.log(addJob);

        fetch('http://localhost:5000/bids', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(addJob)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.insertedId) {
                    Swal.fire({
                        icon: "success",
                        title: "Bids done successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
            .catch(err => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!"
                });
                console.log(err)
            })

    }

    return (
        <div>
            <div className="rounded-md w-80 h-full bg-base-100 hover:shadow-lg transition-all ease-in-out border-2">
                <div className="card-body text-left">
                    <h2 className="text-lg font-semibold">{jobTitle}</h2>
                    <div className="badge badge-outline border-blue-500 text-blue-500 font-semibold px-3 text-xs mb-3 py-3 text-semibold" >{category}</div>
                    <p className="text-left">{description}</p>
                    <div className="flex gap-3">
                        <div className="text-sm flex gap-1 items-center border-r-2 border-gray-400 pr-4"> <BiTime /> <span>{deadline}</span> </div>
                        <div className="text-sm flex items-center"> <MdOutlineAttachMoney /> <span>{minimumPrice} - {maximumPrice}</span> </div>
                    </div>
                    <div onClick={() => handleBid(_id)} className="card-actions justify-end mt-5">
                        <button className="btn btn-sm btn-outline bg-white  text-blue-500 hover:bg-blue-500 hover:border-0 hover:text-white">Bid Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

CategoryCard.propTypes = {
    job: PropTypes.shape({
        _id: PropTypes.number.isRequired,
        jobTitle: PropTypes.string.isRequired,
        deadline: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        maximumPrice: PropTypes.number.isRequired,
        minimumPrice: PropTypes.number.isRequired,
        categoryColor: PropTypes.string,
    }).isRequired,
};


export default CategoryCard;