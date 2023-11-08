import { NavLink } from "react-router-dom";
import logo from "../../../assets/job-offer.png"
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import signOut from "../../../assets/logout.png";
import Swal from "sweetalert2";

const Navbar = () => {

    const { user, logOut } = useContext(AuthContext);


    const handleLogout = () => {
        logOut()
            .then(() => {
                Swal.fire("Logout Successful!");
            })
            .catch(error => error.message)
    }

    const navItems = <>
        <li>
            <NavLink to="/"
                className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "text-md font-bold text-blue-700 border-b-4 pb-1 transition-all ease-in-out border-blue-600" : "text-md font-semibold"
                }>
                Home
            </NavLink>
        </li>
        <li>
            <NavLink to="/addJob"
                className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "text-md font-bold text-blue-700 border-b-4 pb-1 transition-all ease-in-out border-blue-600" : "text-md font-semibold"
                }>
                Add job
            </NavLink>
        </li>
        <li>
            <NavLink to="/postedJobs"
                className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "text-md font-bold text-blue-700 border-b-4 pb-1 transition-all ease-in-out border-blue-600" : "text-md font-semibold"
                }>
                My Posted Jobs
            </NavLink>
        </li>
        <li>
            <NavLink to="/myBids"
                className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "text-md font-bold text-blue-700 border-b-4 pb-1 transition-all ease-in-out border-blue-600" : "text-md font-semibold"
                }>
                My Bids
            </NavLink>
        </li>
        <li>
            <NavLink to="/bidRequest"
                className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "text-md font-bold text-blue-700 border-b-4 pb-1 transition-all ease-in-out border-blue-600" : "text-md font-semibold"
                }>
                Bid request
            </NavLink>
        </li>

        {!user && <li>
            <NavLink to="/register"
                className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "text-md font-bold text-blue-700 border-b-4 pb-1 transition-all ease-in-out border-blue-600" : "text-md font-semibold"
                }>
                Register
            </NavLink>
        </li>}
        {!user && <li>
            <NavLink to="/login"
                className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "text-md font-bold text-blue-700 border-b-4 pb-1 transition-all ease-in-out border-blue-600" : "text-md font-semibold"
                }>
                Login
            </NavLink>
        </li>}

    </>

    return (
        <div className="navbar sticky z-10 top-0 shadow-md bg-white h-10 p-5 pl-10 pr-10">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navItems}
                    </ul>
                </div>
                <NavLink to="/" className="m-1 flex gap-3 items-center normal-case text-lg">
                    <img className="w-[40px]" src={logo} alt="" />
                    <span className="font-bold">JOB FINDER</span>
                </NavLink>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="flex gap-10 px-1 text-gray-600">
                    {navItems}
                </ul>
            </div>
            <div className="navbar-end gap-5">
                {
                    user && <>
                        <NavLink to="/profile">
                            <div className="avatar items-center">
                                <button className="btn-sm text-md font-semibold">{user?.displayName}</button>
                                <div className="w-10 rounded-full">
                                    <img src={user?.photoURL} />
                                </div>
                            </div>
                        </NavLink>
                        <a onClick={handleLogout} >
                            <img className="w-5 ml-10 hover:w-[22px] transition-all ease-in-out" src={signOut} alt="" />
                        </a>
                    </>
                }
            </div>
        </div>
    );
};

export default Navbar;