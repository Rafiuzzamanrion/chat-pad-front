import { Link } from 'react-router-dom';
import banner from '/home_banner1.webp';
import { FaArrowRight } from "react-icons/fa";

const Home = () => {
    return (
        <div>
            <div className='grid md:grid-cols-2 max-h-screen'>
                <div className='mt-16 ps-6'>
                    <h1 className='text-6xl font-bold '>Simplify Tasks, Maximize Impact With TaskPad !!</h1>
                    <h1 className='my-5 text-2xl text-gray-500'>Take charge of your workflow, stay organized, and achieve unparalleled productivity with our task management software.</h1>
                   <Link to={'/login'}> <button className='btn btn-info hover:bg-transparent border-2 mb-5'>LET&apos;S START <FaArrowRight /></button></Link>
                </div>
                <div><img className='w-[550px]' src={banner} alt="" /></div>
            </div>
        </div>
    );
};

export default Home;