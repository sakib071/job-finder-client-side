import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProviders";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

const AddJob = () => {

    const { user } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState([]);

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    }
    console.log(selectedCategory);

    const handleAddJob = event => {
        event.preventDefault();

        const form = event.target;
        const email = user?.email;
        const jobTitle = form.jobTitle.value;
        const deadline = form.deadline.value;
        const description = form.description.value;
        const minimumPrice = form.minimumPrice.value;
        const maximumPrice = form.maximumPrice.value;
        const category = form.category.value;

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

        fetch('http://localhost:5000/addJobs', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(addJob)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        icon: "success",
                        title: "Job added successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate(location?.state ? location?.state : '/postedJobs');
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
        <div className="max-w-xl border-2 p-5 rounded-md mx-auto mt-20 mb-28 text-center">
            <h3 className="text-3xl font-bold">Add Job</h3>
            <form onSubmit={handleAddJob} className="card-body">

                <div className="grid grid-cols-2 gap-5">
                    <div className="form-control">
                        <input type="name" name="name" defaultValue={user?.email} className="input input-bordered rounded-md input-sm w-56" readOnly />
                    </div>

                    <div className="form-control">
                        <input type="text" name="jobTitle" placeholder="Job Title" className="input input-bordered rounded-md
                        input-sm w-56" required />
                    </div>

                    <div className="form-control">
                        <input type="text" placeholder="Deadline" name="deadline" className="input input-bordered rounded-md
                        input-sm w-56" required />
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
                        <input type="text" placeholder="Minimum Price" name="minimumPrice" className="input input-bordered rounded-md
                        input-sm w-56" required />
                    </div>

                    <div className="form-control">
                        <input type="text" placeholder="Maximum Price" name="maximumPrice" className="input input-bordered rounded-md
                        input-sm w-56" required />
                    </div>

                    <textarea
                        placeholder="Description"
                        name="description"
                        className="textarea w-full textarea-bordered rounded-md"
                        required
                    ></textarea>
                </div>

                <div className="form-control mt-6">
                    <input type="submit" className="btn bg-blue-500 text-white hover:bg-blue-600 btn-block" value="Add Job" />
                </div>
            </form>
        </div>
    );
};

export default AddJob;