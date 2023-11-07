import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../providers/AuthProviders";
import PostedJobs from "./PostedJobs";
import Swal from "sweetalert2";

const MyPostedJobs = () => {

    const { user } = useContext(AuthContext);
    const [postedJob, setPostedJob] = useState([]);
    // console.log(user.email);
    const url = `http://localhost:5000/jobs?email=${user?.email}`;
    useEffect(() => {
        axios.get(url)
            .then(res => {
                setPostedJob(res.data);
            })
    }, [url]);

    const handleDelete = id => {
        console.log(id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/postedJobs/${id}`, {
                    method: 'DELETE',
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            const remaining = postedJob.filter(postedJob => postedJob._id !== id);
                            setPostedJob(remaining);
                        }
                    }).catch(error => {
                        console.error("Error while deleting:", error);
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Something went wrong!",
                            footer: '<a href="#">Why do I have this issue?</a>'
                        });
                    });
            }
        });
    }

    const handlePostedJobConfirm = id => {
        fetch(`http://localhost:5000/postedJobs/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ status: 'confirm' })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    //update status
                    const remaining = postedJob.filter(postedJob => postedJob._id !== id);
                    const updated = postedJob.find(postedJob => postedJob._id === id);
                    updated.status = 'confirm';
                    const newPostedJobs = [updated, ...remaining];
                    setPostedJob(newPostedJobs);
                }
            })
    }

    return (
        <div>
            <div className="max-w-6xl mt-10 mb-5 text-left mx-auto text-md font-semibold">
                <h3 className="">Jobs posted by: <span className="text-blue-500">{user?.email}</span> </h3>
                <h3 className="">Your Posted Jobs: <span className="text-blue-500">{postedJob.length}</span> </h3>
            </div>
            <div className="overflow-x-auto">
                <table className="table max-w-fit mx-auto">
                    {/* head */}
                    <thead className="text-center bg-blue-100 text-blue-500">
                        <tr>
                            <th>Job title</th>
                            <th>Category</th>
                            <th>Deadline</th>
                            <th>Description</th>
                            <th>Maximum Salary</th>
                            <th>Minimum Salary</th>
                            <th>Status</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {
                            postedJob.map(postedJob =>
                                <PostedJobs
                                    key={postedJob._id}
                                    postedJob={postedJob}
                                    handleDelete={handleDelete}
                                    handlePostedJobConfirm={handlePostedJobConfirm}>
                                </PostedJobs>)

                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyPostedJobs;