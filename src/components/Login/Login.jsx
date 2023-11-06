import { Link, useLocation, useNavigate } from 'react-router-dom';
import img from '../../assets/Forgot password-rafiki.svg'
import { useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../providers/AuthProviders';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

    const { signIn } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        // console.log(email, password);

        signIn(email, password)
            .then(result => {
                const loggedInUser = result.user;
                console.log(loggedInUser);
                const user = { email };
                //get access token
                axios.post('http://localhost:5000/jwt', user, {
                    withCredentials: true
                })
                    .then(res => {
                        console.log(res.data)
                        if (res.data) {
                            navigate(location?.state ? location?.state : '/');
                            toast.success('Login successfully', {
                                position: "top-right",
                                autoClose: 1000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "light",
                            });
                        }
                    })

            })
            .catch(error => {
                toast.error('Login failed, Try again!', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                console.error(error)
            });
    }

    return (
        <div className="w-[60vw] h-[70vh] mx-auto mt-24">
            <div className="hero-content gap-10 flex-col lg:flex-row">
                <div className="w-1/2">
                    <img src={img} alt="" />
                </div>
                <div className="card flex-shrink-0 w-full h-[60vh] max-w-lg">
                    <form onSubmit={handleLogin} className="card-body justify-center">
                        <h1 className="text-3xl font-bold text-center mb-10">Login now!</h1>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="email" name='email' className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="password" name='password' className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <input type="submit" className="btn bg-blue-500 hover:bg-blue-600 text-white font-bold text-md" value="Login" />
                        </div>
                        <p className='text-center'>New to Job Finder? <Link to="/register" className='text-blue-500 font-bold'>Sign UP</Link></p>
                    </form>
                    <ToastContainer />
                </div>
            </div>

        </div>
    );
};

export default Login;