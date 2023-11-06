import { Link } from 'react-router-dom';
import img from '../../assets/Forgot password-rafiki.svg'
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProviders';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const SignUp = () => {
    const { createUser } = useContext(AuthContext);

    const handleSignUp = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const photoURL = form.photoURL.value;
        const password = form.password.value;
        console.log(name, email, photoURL, password);

        createUser(email, password)
            .then(result => {
                const user = result.user;
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
                console.log(user);
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
                console.log(error);
            });
    }
    return (
        <div className="w-[60vw] h-[70vh] mx-auto mt-24">
            <div className="hero-content gap-10 flex-col lg:flex-row">
                <div className="w-1/2">
                    <img src={img} alt="" />
                </div>
                <div className="card flex-shrink-0 w-full h-[60vh] max-w-lg">
                    <form onSubmit={handleSignUp} className="card-body justify-center">
                        <h1 className="text-3xl font-bold text-center mb-5">Sign UP</h1>
                        <div className="form-control">

                            <input type="email" placeholder="Email" name='email' className="input input-bordered" required />
                        </div>
                        <div className="form-control">

                            <input type="name" placeholder="Name" name="name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">

                            <input type="text" placeholder="Photo URL" name='photoURL' className="input input-bordered" required />
                        </div>
                        <div className="form-control">

                            <input type="password" placeholder="Password" name='password' className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>

                        <div className="form-control mt-2">
                            <input type="submit" className="btn bg-blue-500 hover:bg-blue-600 text-white font-bold text-md" value="Sign Up" />
                        </div>
                        <p className='text-center'>Already have an account? <Link to="/login" className='text-blue-500 font-bold'>Login here</Link></p>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default SignUp;