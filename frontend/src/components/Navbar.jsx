import React from 'react'
import { Link } from "react-router-dom";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";
import {useSelector,useDispatch} from 'react-redux';
import { logout } from '../redux/slice/AuthSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const { authUser } = useSelector((slice) => slice.auth);

  const handleLogout = async()=>{
      dispatch(logout());
  } 

  return (
    <header
      className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 
    backdrop-blur-lg bg-base-100/80"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link to="/home" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              
              <h1 className="text-emerald-500 font-bold text-3xl">Madat</h1>
            </Link>
          </div>

          <div className="flex items-center gap-2">

            {authUser && (
              <>
                {/* <Link to={"/profile"} className={`btn btn-sm gap-2`}>
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link> */}

                <button className="flex gap-2 items-center bg-red-500 p-2 rounded-md" onClick={handleLogout}>
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;









