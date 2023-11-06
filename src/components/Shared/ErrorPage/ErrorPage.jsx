import { NavLink } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="h-[80vh] flex flex-col justify-center items-center mt-10">
            <h1 className="text-4xl font-bold text-red-500">404 - Page Not Found</h1>
            <p className="mt-3 text-lg text-gray-800">The page you are looking for does not exist.</p>
            <p className="mt-2 text-lg text-gray-800">Please check the URL and try again.</p>
            <NavLink to="/">
                <button className="btn btn-md m-10 btn-outline border-red-500 text-red-500 hover:bg-red-500 hover:border-0">Go back to Home</button>
            </NavLink>
        </div>
    );
};

export default ErrorPage;
