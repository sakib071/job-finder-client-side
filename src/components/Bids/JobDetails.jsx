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
                <div className="grid grid-cols-2 gap-5 text-left">
                    <div className="">
                        <label className="label label-text p-0" >Email</label>
                        <p className="font-semibold">{user?.email}</p>
                    </div>

                    <div className="">
                        <label className="label label-text p-0" >Job Title</label>
                        <p className="font-semibold">{jobTitle}</p>
                    </div>

                    <div className="">
                        <label className="label label-text p-0" >Deadline</label>
                        <p className="font-semibold">{deadline}</p>
                    </div>

                    <div className="">
                        <label className="label label-text p-0" >Job Category</label>
                        <p className="font-semibold">{category}</p>
                    </div>

                    <div className="">
                        <label className="label label-text p-0" >Minimum Price</label>
                        <p className="font-semibold">{minimumPrice}</p>
                    </div>

                    <div className="form-control">
                        <label className="label label-text p-0" >Maximum Price</label>
                        <p className="font-semibold">{maximumPrice}</p>
                    </div>
                    <div>
                        <label className="label label-text p-0" >Job Category</label>
                        <p className="font-semibold">{category}</p>
                    </div>
                    <div>
                        <label className="label label-text p-0" >Description</label>
                        <p className="font-semibold">{description}</p>
                    </div>
                </div>

                <div className="divider"></div>

                <div className="grid grid-cols-2 gap-5">
                    <div className="form-control">
                        <label className=" label label-text" >Price</label>
                        <input type="text" placeholder="price" name="price" className="input input-bordered rounded-md input-sm w-56" />
                    </div>
                    <div className="form-control">
                        <label className=" label label-text" >Deadline</label>
                        <input type="date" name="deadline" className="input input-bordered rounded-md input-sm w-56" />
                    </div>
                    <div className="form-control">
                        <label className=" label label-text" >Who is biding?</label>
                        <input type="name" name="name" defaultValue={user?.email} className="input input-bordered rounded-md input-sm w-56" readOnly />
                    </div>
                </div>

                <div onClick={() => handleBid(_id)} className="form-control mt-6">
                    <input type="submit" className="btn bg-blue-500 text-white hover:bg-blue-600 hover-bg-blue-600 btn-block" value="Bid Now" />
                </div>
            </div>
        </div >
    );
};

export default JobDetails;