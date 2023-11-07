import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../providers/AuthProviders";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

const UpdateJob = () => {

    const { user } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [jobData, setJobData] = useState({});

    const id = location?.state?._id; // Pass the jobId when navigating to this component.
    console.log(jobData.jobTitle);

    useEffect(() => {
        // Fetch job data based on the jobId when the component mounts.
        fetch(`http://localhost:5000/jobs/${id}`)
            .then(res => res.json())
            .then(data => {
                setJobData(data);
                setSelectedCategory(data.category);
            })
    }, [id]);

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    }

    const handleUpdateJob = (event) => {
        event.preventDefault();

        const form = event.target;
        const email = user?.email;
        const jobTitle = form.jobTitle.value;
        const deadline = form.deadline.value;
        const description = form.description.value;
        const minimumPrice = form.minimumPrice.value;
        const maximumPrice = form.maximumPrice.value;

        const updatedJob = {
            ...jobData, // Retain the existing job data
            email,
            jobTitle,
            deadline,
            description,
            minimumPrice,
            maximumPrice,
            category: selectedCategory, // Use the selectedCategory
        };

        fetch(`http://localhost:5000/jobs/${id}`, {
            method: 'PATCH', // Use the HTTP PUT method to update the job
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedJob),
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        icon: "success",
                        title: "Job updated successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/postedJobs'); // Redirect to the list of posted jobs
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something went wrong!"
                    });
                }
            });
    }

    return (
        <div className="max-w-xl border-2 p-5 rounded-md mx-auto mt-20 mb-28 text-center">
            <h3 className="text-3xl font-bold">Update Job</h3>
            <form onSubmit={handleUpdateJob} className="card-body">
                <div className="grid grid-cols-2 gap-5">
                    <div className="form-control">
                        <input type="name" name="name" defaultValue={user?.email} className="input input-bordered rounded-md input-sm w-56" readOnly />
                    </div>

                    <div className="form-control">
                        <input type="text" name="jobTitle" defaultValue={jobData.jobTitle} className="input input-bordered rounded-md input-sm w-56" required />
                    </div>

                    <div className="form-control">
                        <input type="text" placeholder="Deadline" name="deadline" className="input input-bordered rounded-md input-sm w-56" required defaultValue={jobData.deadline} />
                    </div>

                    <div className="form-control">
                        <select
                            name="category"
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                            className="select select-bordered w-56 select-sm"
                            required
                        >
                            <option value="" disabled>Select a category</option>
                            <option value="webDevelopment">Web Development</option>
                            <option value="graphicsDesign">Graphics Design</option>
                            <option value="digitalMarketing">Digital Marketing</option>
                        </select>
                    </div>

                    <div className="form-control">
                        <input type="text" placeholder="Minimum Price" name="minimumPrice" className="input input-bordered rounded-md input-sm w-56" required defaultValue={jobData.minimumPrice} />
                    </div>

                    <div className="form-control">
                        <input type="text" placeholder="Maximum Price" name="maximumPrice" className="input input-bordered rounded-md input-sm w-56" required defaultValue={jobData.maximumPrice} />
                    </div>

                    <textarea
                        placeholder="Description"
                        name="description"
                        className="textarea w-full textarea-bordered rounded-md"
                        required
                        defaultValue={jobData.description}
                    ></textarea>
                </div>

                <div className="form-control mt-6">
                    <input type="submit" className="btn bg-blue-500 text-white hover-bg-blue-600 btn-block" value="Update Job" />
                </div>
            </form>
        </div>
    );
};

export default UpdateJob;
