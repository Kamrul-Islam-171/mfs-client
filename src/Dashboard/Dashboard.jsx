import { useState, useEffect, useContext } from 'react';

import { Outlet, Link } from 'react-router-dom';
import useAxiosPublic from '../utils/useAxiosPublic';
import { AuthContext } from '../Provider/AuthProvider';
import { IoMdMenu } from "react-icons/io";
import { IoMdCloseCircleOutline } from "react-icons/io";


const Dashboard = () => {
    const [userType, setuserType] = useState('');
    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);
    // const { isMobile, setIsMobile } = useState(false);
    const [isShow, setIsShow] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axiosPublic.get(`/user/${user}`);
                console.log(response.data.userType);
                setuserType(response.data.userType);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [user]);

    const renderMenuOptions = () => {
        switch (userType) {
            case 'user':
                return (
                    <ul className="space-y-2">
                        <li>
                            <Link to="/send-money" className="block px-4 py-2 text-blue-500 hover:bg-blue-100">Send Money</Link>
                        </li>
                        <li>
                            <Link to="/cashout" className="block px-4 py-2 text-blue-500 hover:bg-blue-100">Cashout</Link>
                        </li>
                        <li>
                            <Link to="/cashin" className="block px-4 py-2 text-blue-500 hover:bg-blue-100">Cashin</Link>
                        </li>
                        <li>
                            <Link to="/balance-check" className="block px-4 py-2 text-blue-500 hover:bg-blue-100">Balance Check</Link>
                        </li>
                        <li>
                            <Link to="/transaction-history" className="block px-4 py-2 text-blue-500 hover:bg-blue-100">Transaction History</Link>
                        </li>
                    </ul>
                );
            case 'agent':
                return (
                    <ul className="space-y-2">
                        <li>
                            <Link to="/transaction-management" className="block px-4 py-2 text-blue-500 hover:bg-blue-100">Transaction Management</Link>
                        </li>
                        <li>
                            <Link to="/balance-check" className="block px-4 py-2 text-blue-500 hover:bg-blue-100">Balance Check</Link>
                        </li>
                        <li>
                            <Link to="/history" className="block px-4 py-2 text-blue-500 hover:bg-blue-100">History</Link>
                        </li>
                    </ul>
                );
            case 'admin':
                return (
                    <ul className="space-y-2">
                        <li>
                            <Link to="/user-management" className="block px-4 py-2 text-blue-500 hover:bg-blue-100">User Management</Link>
                        </li>
                        <li>
                            <Link to="/system-monitoring" className="block px-4 py-2 text-blue-500 hover:bg-blue-100">System Monitoring</Link>
                        </li>
                    </ul>
                );
            default:
                return (
                    <ul className="space-y-2">
                        <li>
                            <Link to="/send-money" className="block px-4 py-2 text-blue-500 hover:bg-blue-100">Send Money</Link>
                        </li>
                        <li>
                            <Link to="/cashout" className="block px-4 py-2 text-blue-500 hover:bg-blue-100">Cashout</Link>
                        </li>
                        <li>
                            <Link to="/cashin" className="block px-4 py-2 text-blue-500 hover:bg-blue-100">Cashin</Link>
                        </li>
                        <li>
                            <Link to="/balance-check" className="block px-4 py-2 text-blue-500 hover:bg-blue-100">Balance Check</Link>
                        </li>
                        <li>
                            <Link to="/transaction-history" className="block px-4 py-2 text-blue-500 hover:bg-blue-100">Transaction History</Link>
                        </li>
                    </ul>
                );
        }
    };
    console.log(isShow)

    return (
        < >
            <div className='md:hidden flex text-3xl hover:cursor-pointer  p-5 bg-slate-600 text-white' onClick={() => setIsShow(!isShow)}>
                {/* <IoMdMenu /> <IoMdCloseCircleOutline /> */}
                <div className=' btn bg-slate-500 text-white text-3xl hover:bg-gray-800'>
                    {
                        isShow ? <IoMdCloseCircleOutline /> : <IoMdMenu />
                    }
                </div>
            </div>
            <div className="flex flex-row min-h-screen bg-gray-100">
                {/* Sidebar */}
                <aside className={`md:w-64  z-10 bg-gray-800 text-white  ${isShow ? 'translate-x-0 transition duration-500' : '-translate-x-96  transition duration-300'}  md:translate-x-0`}>
                    <div className="p-4">
                        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
                        <div className=''>
                            {renderMenuOptions()}
                        </div>
                    </div>
                </aside>





                {/* Main Content */}
                <main className="flex-1 p-4  ">
                    <Outlet />
                </main>
            </div>
        </>
    );
};

export default Dashboard;