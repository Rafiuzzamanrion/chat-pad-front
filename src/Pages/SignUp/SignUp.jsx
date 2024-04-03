import React, { useContext } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import logo from '/tasks.png'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Providers/AuthProviders';
import { useForm } from 'react-hook-form';

const img_hosting_token = import.meta.env.VITE_ImageUploadToken;
const SignUp = () => {
    const { handleCreateUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

    const { register, handleSubmit, reset } = useForm();

    const onSubmit = (data) => {


        const { password } = data;
        console.log(data)

        // ====== input validation or password expression ========
        if (!/^(?=.*[A-Z]).*$/.test(password)) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Your password must have a uppercase character!",
            });
            return;
        } else if (!/^(?=.*[a-z]).*$/.test(password)) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Your password must have a lowercase character!",
            });
            return;
        } else if (
            !/^(?=.*[~`!@#$%^&*()--+={}[\]|\\:;"'<>,.?/_₹]).*$/.test(password)
        ) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Your password must have a special character!",
            });
            return;
        } else if (!password.length >= 8) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Your password must have 8 characters!",
            });
            return;
        }

        const formData = new FormData();
        formData.append("image", data.image[0]);

        // =========== add the photo to imagebb for hosting and get a image url ================

        fetch(img_hosting_url, {
            method: "POST",
            body: formData,
        })
            .then((res) => res.json())
            .then((imgResponse) => {
                if (imgResponse.success) {
                    const imgURL = imgResponse.data.display_url;

                    const { name, email, password } = data;
                    const newItem = {
                        name,
                        email,
                        image: imgURL,
                    };

                    handleCreateUser(email, password)
                        .then((result) => {
                            const createdUser = result.user;

                            //   ========= post user data to mongodb ==========
                            axios.post('https://task-pad-server.vercel.app/addUser', newItem
                            ).then((res) => {
                                if (res.data.insertedId) {

                                    Swal.fire({
                                        position: "top",
                                        icon: "success",
                                        title: "You have successfully created an account",
                                        showConfirmButton: false,
                                        timer: 1200
                                    });
                                    navigate('/task/taskHome');
                                    form.reset();

                                }
                            })
                                .catch(error => console.log(error))

                            //   ========= update user name =========
                            updateUserProfile(name)
                                .then(() => { })
                                .catch((error) => {
                                    console.log(error);
                                });


                        })
                        .catch(error => console.log(error))




                }
            })

    }
    return (
        <div>
            <HelmetProvider>
                <Helmet>
                    <title>Task | Sign up</title>
                </Helmet>
            </HelmetProvider>

            <div className="min-h-screen flex justify-center items-center">
                <form onSubmit={handleSubmit(onSubmit)} className="lg:w-1/3 bg-base-100 shadow-xl p-8 rounded-md mb-5">
                    <div className="flex justify-center items-center">
                        <Link to={'/'}> <img className="w-40 object-cover hover:ease-in hover:duration-150 hover:scale-110" src={logo} alt="" /></Link>
                    </div>
                    <h1 className="text-3xl font-bold uppercase text-center my-3">sign up Here</h1>
                    <label className="input input-bordered flex items-center gap-2 mb-5">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>

                        <input type="text"  {...register("name", { required: true, maxLength: 12000 })} placeholder="Name" />
                    </label>
                    <label className="input input-bordered flex items-center gap-2 mb-5">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                        </svg>

                        <input type="email" {...register("email", { required: true, maxLength: 12000 })} placeholder="Email" />
                    </label>
                    <label className="input input-bordered flex items-center gap-2 mb-5">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
                        </svg>

                        <input type="password"  {...register("password", { required: true, maxLength: 12000 })} placeholder="Password" />
                    </label>

                    <div className="label">
                        <span className="label-text">Select your image</span>

                    </div>

                    <input  {...register("image", { required: true, maxLength: 12000 })} type="file" className="file-input file-input-sm  file-input-info w-full max-w-xs mb-5" />


                    <div className="flex justify-center items-center">
                        <input className="btn btn-info w-full hover:ease-in hover:duration-150 hover:scale-110" type="submit" value="SIGN IN" />
                    </div>
                    <h1 className="my-2 text-sm text-center">Already have an account? <Link to={'/login'} className="text-info font-bold">LOGIN NOW</Link></h1>
                </form>
            </div>
        </div>
    );
};

export default SignUp;