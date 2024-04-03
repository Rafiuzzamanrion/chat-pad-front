import { Link, Outlet } from "react-router-dom";
import { RiMenu2Fill } from "react-icons/ri";
import { FaHome } from "react-icons/fa";
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";

import { MdOutlineDashboard } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { MdOutlineTaskAlt } from "react-icons/md";
import { BiTaskX } from "react-icons/bi";
import { MdImportantDevices } from "react-icons/md";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProviders";
import { FiLogOut } from "react-icons/fi";
import Swal from "sweetalert2";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const TaskManagement = () => {
    const { user,logOutUser,loading } = useContext(AuthContext);

    const handleLogOut = ()=> {
        logOutUser()
        .then(() => {
            Swal.fire({
                position: "top",
                icon: "success",
                title: "You have successfully Logged out",
                showConfirmButton: false,
                timer: 1500,
              });
            
        }).catch(error => console.log(error))
    };


    const { data: avatar = [], refetch } = useQuery({
        queryKey: ['avatarLoad', user?.email],
        enabled:!loading,
        queryFn: async () => {
            const res = await axios.get(`https://task-pad-server.vercel.app/avatarLoad?email=${user?.email}`);
            return res.data;
        }
    })
    return (
        <div>
            <div className="drawer lg:drawer-open mt-3">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">

                    <label
                        htmlFor="my-drawer-2"
                        className="btn btn-outline drawer-button border-2 border-info hover:bg-info hover:text-black hover:scale-110 hover:ease-in hover:duration-150 lg:hidden my-5"
                    >
                        <RiMenu2Fill size={20} />  Menu
                    </label>

                    {/* Page content here */}
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label
                        htmlFor="my-drawer-2"
                        aria-label="close sidebar"
                        className="drawer-overlay"
                    ></label>
                    <ul className="menu p-4 w-72 shadow-xl text-sm text-slate-100 bg-slate-900 rounded-sm">
                        {/* Sidebar content here */}
                        <li>
                            <div className="flex flex-col items-center justify-center gap-5 mb-6">
                                <div className="avatar">
                                    <div className="w-16 rounded-full ring ring-info ring-offset-base-100 ring-offset-2">
                                        <img src={avatar.image} />
                                    </div>
                                </div>
                                <div>
                                    <h1 className="font-bold">{user?.displayName}</h1>
                                </div>
                            </div>
                        </li>
                        <li>
                            <Link className="hover:scale-110 hover:ease-in hover:duration-150" to={'/task/taskHome'}><MdOutlineDashboard size={22} /> Dashboard</Link>
                        </li>
                        <li>
                            <Link to={'/task/allTask'} className="hover:scale-110 hover:ease-in hover:duration-150" ><FaTasks size={21} />All Tasks</Link>
                        </li>
                        <li>
                            <Link to={'/task/completed'} className="hover:scale-110 hover:ease-in hover:duration-150" ><MdOutlineTaskAlt size={22} /> Completed</Link>
                        </li>
                        <li>
                            <Link to={'/task/incomplete'} className="hover:scale-110 hover:ease-in hover:duration-150" ><BiTaskX size={22} /> Incomplete</Link>
                        </li>
                        <li>
                            <Link to={'/task/important'} className="hover:scale-110 hover:ease-in hover:duration-150" ><MdImportantDevices size={22} /> Important</Link>
                        </li>
                        <div className="divider divider-info"></div>
                        <h1 className="flex gap-2 ps-4">Back To <MdOutlineSubdirectoryArrowRight size={22} /></h1>
                        <div className="divider divider-info"></div>
                        <li>
                            <Link className="hover:scale-110 hover:ease-in hover:duration-150" to={'/'}><FaHome size={20} /> Home</Link>
                        </li>
                        <li>
                            <button onClick={handleLogOut} className="hover:scale-110 hover:ease-in hover:duration-150"><FiLogOut size={22} />  Logout</button>
                        </li>


                    </ul>
                </div>
            </div>
        </div>

    );
};

export default TaskManagement;