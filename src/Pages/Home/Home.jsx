import { Link } from 'react-router-dom';
import banner from '/home_banner1.webp';
import { FaArrowRight } from "react-icons/fa";
import { Helmet, HelmetProvider } from 'react-helmet-async';


const Home = () => {
    return (
        <div>
            <HelmetProvider>
                <Helmet>
                    <title>Task | Home</title>
                </Helmet>
            </HelmetProvider>
            <div className='grid md:grid-cols-2 min-h-screen'>
                <div className='mt-16 ps-6'>
                    <h1 className='text-6xl font-bold '>Simplify Tasks, Maximize Impact With TaskPad <span className='text-info'> !!</span></h1>
                    <h1 className='my-8 text-2xl text-gray-500'>Take charge of your workflow, stay organized, and achieve unparalleled productivity with our task management software.</h1>
                    <Link to={'/login'}> <button className='btn btn-info hover:bg-transparent border-2 mb-5'>LET&apos;S START <FaArrowRight /></button></Link>
                </div>
                <div><img src={banner} alt="" /></div>
            </div>
        </div>
    );
};

export default Home;