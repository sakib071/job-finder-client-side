import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../providers/AuthProviders";
import Swal from "sweetalert2";
import Bids from "./Bids";

const MyBids = () => {

    const { user } = useContext(AuthContext);
    const [bids, setBids] = useState([]);
    // console.log(user.email);
    const url = `http://localhost:5000/bids`;
    useEffect(() => {
        axios.get(url)
            .then(res => {
                setBids(res.data);
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
                fetch(`http://localhost:5000/bids/${id}`, {
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
                            const remaining = bids.filter(bids => bids._id !== id);
                            setBids(remaining);
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

    return (
        <div className="h-[60vh]">
            <div className="max-w-2xl mt-10 mb-5 text-left mx-auto text-md font-semibold">
                <h3 className="">Bids: <span className="text-blue-500">{user?.email}</span> </h3>
                <h3 className="">Your Bids: <span className="text-blue-500">{bids.length}</span> </h3>
            </div>
            <div className="overflow-x-auto">
                <table className="table max-w-3xl mx-auto">
                    <thead className="text-center bg-blue-100 text-blue-500">
                        <tr>
                            <th>Job title</th>
                            <th>Email</th>
                            <th>Deadline</th>
                            <th>Status</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {
                            bids.map(bids =>
                                <Bids
                                    key={bids._id}
                                    bids={bids}
                                    handleDelete={handleDelete}
                                >
                                </Bids>)

                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyBids;