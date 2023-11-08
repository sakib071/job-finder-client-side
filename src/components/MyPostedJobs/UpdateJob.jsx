import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../providers/AuthProviders";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

const UpdateJob = () => {

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [jobData, setJobData] = useState({});
    console.log(jobData);

    const data = useLoaderData();
    const { _id, jobTitle, deadline, description, category, maximumPrice, minimumPrice } = data;

    console.log(jobTitle);

    useEffect(() => {
        fetch(`http://localhost:5000/jobs/${_id}`)
            .then(res => res.json())
            .then(data => {
                setJobData(data);
                setSelectedCategory(data.category);
            })
    }, [_id]);

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    }

    const handleUpdateJob = event => {
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
            method: 'PUT',
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
                        <label className=" label label-text" >Email</label>

                        <input type="name" name="name" defaultValue={user?.email} className="input input-bordered rounded-md input-sm w-56" readOnly />
                    </div>

                    <div className="form-control">
                        <label className=" label label-text" >Job Title</label>

                        <input type="text" name="jobTitle" defaultValue={jobTitle} className="input input-bordered rounded-md input-sm w-56" required />
                    </div>

                    <div className="form-control">
                        <label className=" label label-text" >Deadline</label>

                        <input type="text" defaultValue={deadline} name="deadline" className="input input-bordered rounded-md input-sm w-56" required />
                    </div>

                    <div className="form-control">
                        <label className=" label label-text" >Job Category</label>

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
                        <label className=" label label-text" >Minimum Price</label>

                        <input type="text" defaultValue={minimumPrice} name="minimumPrice" className="input input-bordered rounded-md input-sm w-56" required />
                    </div>

                    <div className="form-control">
                        <label className=" label label-text" >Maximum Price</label>

                        <input type="text" defaultValue={maximumPrice} name="maximumPrice" className="input input-bordered rounded-md input-sm w-56" required />
                    </div>

                    <div>
                        <label className=" label label-text" >Description</label>
                        <textarea
                            placeholder="Description"
                            name="description"
                            className="textarea w-full textarea-bordered rounded-md"
                            required
                            defaultValue={description}
                        ></textarea>
                    </div>

                </div>

                <div className="form-control mt-6">
                    <input type="submit" className="btn bg-blue-500 text-white hover:bg-blue-600 hover-bg-blue-600 btn-block" value="Update Job" />
                </div>
            </form>
        </div>
    );
};

export default UpdateJob;
