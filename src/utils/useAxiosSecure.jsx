import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
})
const useAxiosSecure = () => {

    const navigate = useNavigate();
    // const { logOut } = useContext(AuthContext);
    const {logoutUser} = useContext(AuthContext);
    

    axiosSecure.interceptors.request.use(function (config) {
        // console.log('i am ')
        const token = localStorage.getItem('access-token');
        console.log('this is my token = ', token);
        config.headers.authorization = `Barer ${token}`;
        return config;

    }, function (error) {
        // console.log('i am gett')
        return Promise.reject(error);
    });

    axiosSecure.interceptors.response.use(function (response) {
        
      
        return response;
    }, async (error) => {
        // console.log('i am error', error)
        
        const status = error?.response?.status;
        if (status === 401 || status === 403) {
            // await logOut();
            await logoutUser();
            navigate('/login')
        }
        return Promise.reject(error);
    });
    return axiosSecure;
};

export default useAxiosSecure;