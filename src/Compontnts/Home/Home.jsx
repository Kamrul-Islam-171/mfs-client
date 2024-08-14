import { useEffect } from "react";
import useAxiosSecure from "../../utils/useAxiosSecure";
import { getEmailInfo } from "../../utils/getStorage";


const Home = () => {
    // const axiosSecure = useAxiosSecure();
    useEffect(() => {
        const email = getEmailInfo();
        console.log('home email = ', email);
        
    }, [])
    return (
        <div>
            Home
        </div>
    );
};

export default Home;