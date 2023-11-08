import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../providers/AuthProviders";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

const UpdateJob = () => {

    const { user } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [jobData, setJobData] = useState({});

    const data = useLoaderData();
    const { _id, jobTitle, deadline, description, category, maximumPrice, minimumPrice } = data;

    console.log(data);

    const id = location?.state?._id;
    console.log(jobTitle);

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
            email,
            jobTitle,
            deadline,
            description,
            minimumPrice,
            maximumPrice,
            category: selectedCategory,
        };
        console.log(updatedJob);

        fetch(`http://localhost:5000/jobs/${_id}`, {
            method: 'PATCH',
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
                    navigate('/postedJobs');
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
                        <input type="text" name="jobTitle" defaultValue={jobTitle} className="input input-bordered rounded-md input-sm w-56" required />
                    </div>

                    <div className="form-control">
                        <input type="text" defaultValue={deadline} name="deadline" className="input input-bordered rounded-md input-sm w-56" required />
                    </div>

                    <div className="form-control">
                        <select
                            name="category"
                            defaultValue={category}
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
                        <input type="text" defaultValue={minimumPrice} name="minimumPrice" className="input input-bordered rounded-md input-sm w-56" required />
                    </div>

                    <div className="form-control">
                        <input type="text" defaultValue={maximumPrice} name="maximumPrice" className="input input-bordered rounded-md input-sm w-56" required />
                    </div>

                    <textarea
                        placeholder="Description"
                        name="description"
                        className="textarea w-full textarea-bordered rounded-md"
                        required
                        defaultValue={description}
                    ></textarea>
                </div>

                <div className="form-control mt-6">
                    <input type="submit" className="btn bg-blue-500 text-white hover:bg-blue-600 hover-bg-blue-600 btn-block" value="Update Job" />
                </div>
            </form>
        </div>
    );
};

export default UpdateJob;
