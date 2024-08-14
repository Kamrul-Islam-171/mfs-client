import { Outlet } from "react-router-dom";
import Navbar from "../Compontnts/Navbar/Navbar";


const MainLayour = () => {
    return (
        <div>
            {/* <Navbar></Navbar> */}
            <Outlet></Outlet>
        </div>
    );
};

export default MainLayour;