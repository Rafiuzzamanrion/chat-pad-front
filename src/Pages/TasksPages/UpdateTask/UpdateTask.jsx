import { useLoaderData, useNavigate } from 'react-router-dom';
import image from '/tasks.png'
import Swal from 'sweetalert2';
import axios from 'axios';

const UpdateTask = () => {
    const navigate = useNavigate();

    const data = useLoaderData();
    const { title, description, _id } = data;

    const handleUpdate = (id, event) => {
        event.preventDefault();

        const form = event.target;
        const title = form.title.value;
        const description = form.description.value;
        const updatedData = {
            title: title,
            description: description,
            time: Date()
        }

        Swal.fire({
            title: "Do you want to Update this?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Update it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.patch(`https://task-pad-server.vercel.app/updateTask?id=${id}`, updatedData)
                    .then(res => {
                        if (res.data && res.data.modifiedCount) {
                            Swal.fire({
                                title: "Completed!",
                                text: "Your task has been updated.",
                                icon: "success"
                            }).then(() => {
                                navigate('/task/allTask');
                                window.location.reload();
                            });
                        } else {
                            Swal.fire({
                                title: "Error!",
                                text: "Failed to update task.",
                                icon: "error"
                            });
                        }
                    })
                    .catch(error => {
                        console.error("Error updating task:", error);
                        Swal.fire({
                            title: "Error!",
                            text: "An error occurred while updating the task.",
                            icon: "error"
                        });
                    });
            }
        });
    };

    return (
        <div className='w-full md:w-2/3 '>
            <div>
                <form onSubmit={(event) => handleUpdate(_id, event)} className='bg-base-100 shadow-2xl p-5 w-full rounded-xl'>
                    <div className='flex justify-center items-center'>
                        <img className='object-cover w-40' src={image} alt="" />
                    </div>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Title</span>
                        </div>
                        <input defaultValue={title} name='title' type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                    </label>
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Description</span>
                        </div>
                        <textarea defaultValue={description} name='description' className="textarea textarea-bordered h-24" placeholder="Type here"></textarea>
                    </label>
                    <input className='btn btn-info my-5' type="submit" value="UPDATE" />
                </form>
            </div>
        </div>
    );
};

export default UpdateTask;