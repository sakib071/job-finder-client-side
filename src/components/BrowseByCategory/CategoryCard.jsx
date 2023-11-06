import PropTypes from 'prop-types';
import { BiTime } from 'react-icons/bi';
import { MdOutlineAttachMoney } from 'react-icons/md';

const CategoryCard = ({ job }) => {
    const { id, jobTitle, deadline, description, category, maximumPrice, minimumPrice, categoryColor } = job;
    console.log(id);


    return (
        <div>
            <div className="rounded-md w-80 h-full bg-base-100 hover:shadow-lg transition-all ease-in-out border-2">
                <div className="card-body text-left">
                    <h2 className="text-lg font-semibold">{jobTitle}</h2>
                    <div className="badge text-xs mb-3 py-3 text-semibold text-white" style={{ backgroundColor: categoryColor }}>{category}</div>
                    <p className="text-left">{description}</p>
                    <div className="flex gap-3">
                        <div className="text-sm flex gap-1 items-center border-r-2 border-gray-400 pr-4"> <BiTime /> <span>{deadline}</span> </div>
                        <div className="text-sm flex items-center"> <MdOutlineAttachMoney /> <span>{minimumPrice} - {maximumPrice}</span> </div>
                    </div>
                    <div className="card-actions justify-end mt-5">
                        <button className="btn btn-sm btn-outline bg-white  text-blue-500 hover:bg-blue-500 hover:border-0 hover:text-white">Bid Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

CategoryCard.propTypes = {
    job: PropTypes.shape({
        id: PropTypes.number.isRequired,
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