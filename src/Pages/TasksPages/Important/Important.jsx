import React, { useContext, useEffect, useState } from 'react';
import { IoMdAdd } from "react-icons/io";
import { AuthContext } from '../../../Providers/AuthProviders';
import Card from '../../../Components/Card';
import UseTask from '../../../Hooks/UseTask';
import axios from 'axios';
import Swal from 'sweetalert2';

const Important = () => {


    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);
    const [tasks, setTasks] = useState([])
    const [selectedValue, setSelectedValue] = useState(null);
    const [taskCount] = UseTask();
    const { count } = taskCount;
    console.log(count)

    // ========= load data from mongodb (pagination wise) =========
    const { user } = useContext(AuthContext);
    useEffect(() => {
     
        fetch(`http://localhost:5000/task?email=${user?.email}&page=${currentPage}&size=${itemsPerPage}`,{
            headers: {
                authorization: `bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => setTasks(data))
    }

, [currentPage, itemsPerPage])
    // ========= pagination ==========
    const numberOFPages = Math.ceil(count / itemsPerPage)
    const pages = []
    for (let i = 0; i < numberOFPages; i++) {
        pages.push(i)
    }

    const handleItemPerPage = (e) => {
        const val = e.target.value;
        setItemsPerPage(val);
        setCurrentPage(0);
    };

    const handlePrev = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
    };
    const handleNext = () => {
        if (currentPage < pages.length) {
            setCurrentPage(currentPage + 1)
        }

    }
    const handleChange = (event) => {
        setSelectedValue(event.target.value);

    };
    const handleAddTask = event => {
        event.preventDefault();
        const form = event.target;
        const title = form.title.value;
        const description = form.description.value;
        const taskData = { title: title, description: description, IsImportant: selectedValue,time:Date(),email:user?.email,status:'incomplete' }

        axios.post(`http://localhost:5000/addTask`, taskData).then(res => {
            if (res.data.insertedId) {
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: "Your task has been successfully added",
                    showConfirmButton: false,
                    timer: 1200
                });
            }
        }).catch(error => console.log(error))



    }

    const newTasks = tasks.filter(task => task.IsImportant === 'important')
    

    return (
        <div className='mx-2 px-2 w-full h-full'>
            <div className='flex justify-between gap-16 '>
                <div>
                    <h1 className='text-xl font-bold uppercase'>Important Task Here</h1>
                </div>

                <div>
                    {/* The button to open modal */}
                    <label htmlFor="my_modal_6" className="btn btn-info rounded-full"><IoMdAdd size={20} />Add Task</label>

                    {/* Put this part before </body> tag */}
                    <input type="checkbox" id="my_modal_6" className="modal-toggle" />
                    <div className="modal" role="dialog">
                        <div className="modal-box">

                            <form onSubmit={handleAddTask}>
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Title</span>

                                    </div>
                                    <input name='title' type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                                </label>
                                <label className="form-control">
                                    <div className="label">
                                        <span className="label-text">Description</span>
                                    </div>
                                    <textarea name='description' className="textarea textarea-bordered h-24" placeholder="Type here"></textarea>
                                </label>

                                <div className='flex gap-2 mt-5'>
                                    <input
                                        className='radio radio-info'
                                        required
                                        type="radio"
                                        name="radioValue"
                                        value="important"
                                        onChange={handleChange}
                                    /> <span className=''>Important</span><br />
                                </div>
                                <div className='flex gap-2 mt-5'>
                                    <input
                                        className='radio radio-info'
                                        required
                                        type="radio"
                                        name="radioValue"
                                        value="not important"
                                        onChange={handleChange}
                                    /> <span className=''>Not Important</span> <br />
                                </div>
                                <input className='btn btn-info my-5' type="submit" value="ADD" />
                            </form>

                            <div className="modal-action">
                                <label htmlFor="my_modal_6" className="btn">Close!</label>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div>
                <div className='grid md:grid-cols-2 gap-5'>
                    {
                       newTasks.map(task => <Card key={task._id} task={task}></Card>)
                    }

                </div>
            </div>

            {/* ======== pagination ========== */}
            <div className='flex justify-center items-center mt-4'>


                <button onClick={handlePrev} className='btn btn-info mr-2'>Prev</button>
                {
                    pages.map(page => <button onClick={() => setCurrentPage(page)} className={`btn btn-sm bg-slate-900 text-slate-100 hover:bg-transparent hover:border-2 hover:border-slate-900 hover:text-black mx-2 my-2 ${currentPage === page ? 'bg-info' : undefined}`} key={page}>{page}</button>)
                }
                <button onClick={handleNext} className='btn btn-info ms-2'>Next</button>

                <select className='bg-info rounded-md ms-2' onChange={handleItemPerPage} value={itemsPerPage} name="" id="">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                </select>
            </div>
        </div>
    );
};

export default Important;