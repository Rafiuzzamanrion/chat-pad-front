import { Helmet, HelmetProvider } from "react-helmet-async";
import logo from '/tasks.png'
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProviders";
import Swal from "sweetalert2";


const Login = () => {
    const navigate = useNavigate();
    const {handleLoginUser} = useContext(AuthContext);
    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email,password)

        handleLoginUser(email,password)
        .then(result => {
            const loggedInUser = result.user;
            Swal.fire({
                position: "top",
                icon: "success",
                title: "You have successfully Logged in here",
                showConfirmButton: false,
                timer: 1200
            });
            navigate('/task/taskHome')
        }).catch(error =>{
            Swal.fire({
                position: "top",
                icon: "error",
                title: "Your password is wrong",
                showConfirmButton: false,
                timer: 1500,
              });
              console.log(error);
        });

    }
    return (
        <div>
            <HelmetProvider>
                <Helmet>
                    <title>Task | Login</title>
                </Helmet>
            </HelmetProvider>

            <div className="min-h-screen flex justify-center items-center">
                <form onSubmit={handleLogin} className="lg:w-1/3 bg-base-100 shadow-xl p-8 rounded-md mb-5">
                    <div className="flex justify-center items-center">
                        <Link to={'/'}> <img className="w-40 object-cover hover:ease-in hover:duration-150 hover:scale-110" src={logo} alt="" /></Link>
                    </div>
                    <h1 className="text-3xl font-bold uppercase text-center my-3">Login Here</h1>
                    <label className="input input-bordered flex items-center gap-2 mb-5">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                        </svg>

                        <input type="email" name="email" required className="grow" placeholder="Email" />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
                        </svg>


                        <input type="password" name="password" required className="grow" placeholder="Password" />
                    </label>
                    <label className="label">
                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                    </label>
                    <div className="flex justify-center items-center">
                        <button type="submit" className="btn btn-info w-full hover:ease-in hover:duration-150 hover:scale-110">LOGIN</button>
                    </div>
                    <h1 className="my-2 text-sm text-center">Don&apos;t have an account? <Link to={'/signUp'} className="text-info font-bold">SIGN UP NOW</Link></h1>
                </form>
            </div>
        </div>
    );
};

export default Login;