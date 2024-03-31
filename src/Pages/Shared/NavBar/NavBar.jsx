import { Link } from "react-router-dom";
import logo from '/tasks.png'

const NavBar = () => {
    return (
        <div className="mb-8">
        <nav className="flex justify-between bg-base-100 shadow-2xl p-2">
            <div className="mr-2">
               <Link to={'/'}> <img className="w-12" src={logo} alt="" /></Link>
            </div>
            <div className="flex justify-center gap-2 md:gap-5 items-center uppercase text-xs font-semibold">
                <Link to={'/features'} className="hover:text-info hover:border-b-4 hover:border-info">features</Link>
                <Link to={'/contact'} className="hover:text-info hover:border-b-4 hover:border-info">contact us</Link>
                <Link to={'/login'}><button className="btn btn-info rounded-full hover:bg-transparent hover:border-2 text-white hover:text-black">LOGIN</button></Link>
                <Link to={'/signUp'}><button className="btn btn-info bg-transparent border-2 rounded-full">SIGN UP</button></Link>
            </div>
        </nav>
        </div>
    );
};

export default NavBar;