import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../providers/AuthProviders";
import Swal from "sweetalert2";

const JobDetails = () => {

    const { user } = useContext(AuthContext);
    const data = useLoaderData();
    const { _id, jobTitle, deadline, description, category, maximumPrice, minimumPrice } = data;

    const email = user?.email;
    console.log(jobTitle);

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
        <div className="max-w-xl border-2 p-5 rounded-md mx-auto mt-20 mb-28 text-center">
            <h3 className="text-3xl font-bold">Job Details</h3>
            <div className="card-body">
                <div className="grid grid-cols-2 gap-5">
                    <div className="form-control">
                        <input type="name" name="name" defaultValue={user?.email} className="input input-bordered rounded-md input-sm w-56" readOnly />
                    </div>

                    <div className="form-control">
                        <input type="text" name="jobTitle" defaultValue={jobTitle} className="input input-bordered rounded-md input-sm w-56" readOnly />
                    </div>

                    <div className="form-control">
                        <input type="text" defaultValue={deadline} name="deadline" className="input input-bordered rounded-md input-sm w-56" readOnly />
                    </div>

                    <div className="form-control">
                        <input type="text" defaultValue={category} name="deadline" className="input input-bordered rounded-md input-sm w-56" readOnly />
                    </div>

                    {/* <div className="form-control">
                        <select
                            name="category"
                            defaultValue={category}
                            className="select select-bordered w-56 select-sm"
                            required
                        >
                            <option value="" disabled>Select a category</option>
                            <option value="webDevelopment">Web Development</option>
                            <option value="graphicsDesign">Graphics Design</option>
                            <option value="digitalMarketing">Digital Marketing</option>
                        </select>
                    </div> */}

                    <div className="form-control">
                        <input type="text" defaultValue={minimumPrice} name="minimumPrice" className="input input-bordered rounded-md input-sm w-56" readOnly />
                    </div>

                    <div className="form-control">
                        <input type="text" defaultValue={maximumPrice} name="maximumPrice" className="input input-bordered rounded-md input-sm w-56" readOnly />
                    </div>

                    <textarea
                        placeholder="Description"
                        name="description"
                        className="textarea w-full textarea-bordered rounded-md"
                        readOnly
                        defaultValue={description}
                    ></textarea>
                </div>

                <div onClick={() => handleBid(_id)} className="form-control mt-6">
                    <input type="submit" className="btn bg-blue-500 text-white hover:bg-blue-600 hover-bg-blue-600 btn-block" value="Bid Now" />
                </div>
            </div>
        </div >
    );
};

export default JobDetails;