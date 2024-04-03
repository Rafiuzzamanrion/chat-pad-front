import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoMdCheckmarkCircle } from "react-icons/io";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Card = ({ task }) => {
    const { title, description, time, status, _id, IsImportant } = task;

    // ========= updating complete button ========
    const handleComplete = id => {
        Swal.fire({
            title: "Do you want to complete this?",

            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Complete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axios.patch(`https://task-pad-server.vercel.app/completeTask?id=${id}`)
                    .then(res => {
                        if (res.data.modifiedCount) {
                            window.location.reload();
                            Swal.fire({
                                title: "Completed!",
                                text: "Your task has been Completed.",
                                icon: "success"
                            });
                        }
                    })
            }
        });


    }

    // ========== for deleting task ============
    const handleDelete = id => {
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

                axios.delete(`https://task-pad-server.vercel.app/deleteTask?id=${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            window.location.reload();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your task has been deleted.",
                                icon: "success"
                            });

                        }

                    })
            }
        });


    }

    return (
        <div className="mt-8 flex justify-center items-center">
            <div className="card w-96 bg-slate-900 text-slate-100">
                <div className="card-body">
                    <h2 className="card-title text-info">{title}</h2>
                    <p className="text-sm text-slate-300">{description}</p>
                    <p className="text-sm">Date : {time}</p>
                    <div>
                        {IsImportant === 'important' && <div className="rating rating-md">
                            <input defaultChecked name="rating-8" className="mask mask-star-2 bg-info" />
                            <input  name="rating-8" className="mask mask-star-2 bg-info" defaultChecked />
                           
                        </div>}
                    </div>
                    <div className="card-actions justify-between">
                        {status == 'incomplete' ? <button onClick={() => handleComplete(_id)} className="btn btn-error btn-sm rounded-full">complete</button> : <h1 className="text-success flex gap-2"><IoMdCheckmarkCircle size={20} />completed</h1>}
                        <div>
                            <Link to={`/task/updateTask/${_id}`}>  <button className="text-info"><FaEdit size={28} /></button></Link>
                            <button onClick={() => handleDelete(_id)} className="text-error ms-2"><MdDelete size={30} /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;