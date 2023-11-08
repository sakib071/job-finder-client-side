import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "./components/providers/AuthProviders";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    // console.log(location.pathname);

    if (loading) {
        return <progress className="progress w-56 flex mx-auto mt-20 mb-20"></progress>
    }

    if ((user?.email)) {
        return children;
    }

    return <Navigate state={location.pathname} to="/login" replace></Navigate>;

};

export default PrivateRoute;