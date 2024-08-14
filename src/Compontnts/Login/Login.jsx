import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../utils/useAxiosPublic";
import { useForm } from "react-hook-form";
import { setEmail } from "../../utils/setStorage";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";


const Login = () => {
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const {user, setUser} = useContext(AuthContext);

    // const { signIn } = useContext(AuthContext);
    // console.log(signIn)

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        const info = {
            email: data.email,
            pin: data.pin,

        }
        // signIn(info.email, info.pin);


        try {
            const { data } = await axiosPublic.get(`/userLogin?email=${info.email}&pin=${info.pin}`);
            
            if (data.message == 'matched') {
                
                setEmail(info.email);
                setUser(info.email)
                
                alert('login successfull')
                navigate('/dashboard')

            }
            else {
                alert(data.message)
            }
            
        } catch (error) {
            console.log(error);
            alert("something went wrong!")
        }
    };
    return (
        <div className="p-4 lg:p-10">

            <p className="text-3xl lg:text-6xl font-bold text-center mb-10">Login</p>


            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 border-2 p-2 lg:p-10 rounded-xl">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input
                        type="email"
                        placeholder="Email"
                        className="input input-bordered"
                        {...register('email', { required: 'Email is required' })}
                    />
                    {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                </div>





                <div className="form-control">
                    <label className="label">
                        <span className="label-text">5-digit PIN</span>
                    </label>
                    <input
                        type="password"
                        placeholder="PIN"
                        maxLength="5"
                        className="input input-bordered"
                        {...register('pin', {
                            required: 'PIN is required',
                            pattern: {
                                value: /^\d{5}$/,
                                message: 'PIN must be exactly 5 digits'
                            }
                        })}
                    />
                    {errors.pin && <span className="text-red-500">{errors.pin.message}</span>}
                </div>



                <div className="form-control">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
            <div>
                <p className="text-center mt-5 text-xl">Don't Have an Account ? <Link to={'/reg'} className="text-blue-600 font-medium">Register</Link></p>
            </div>
        </div>
    );
};

export default Login;