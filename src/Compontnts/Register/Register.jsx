import { useForm } from "react-hook-form"
import useAxiosPublic from "../../utils/useAxiosPublic";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {

    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async(data) => {
        const info = {
            name : data.name,
            email : data.email,
            pin : data.pin,
            mobile : data.mobile,
            userType : data.role,
            status : "pending",
            balance : parseInt(0)
        }
        try {
            const {data} = await axiosPublic.post('/users', info);
            if(data.message == "exist") {
                return alert('This Email already exist. Choose another email!')
            }
            alert('Registration Done!');
            navigate('/login')
        } catch (error) {
            console.log(error);
            alert("something went wrong!")
        }
    };
    return (
        <div className="p-4 lg:p-10">

            <p className="text-3xl lg:text-6xl font-bold text-center mb-10">Register</p>
            

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
                        <span className="label-text">Name</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Name"
                        className="input input-bordered"
                        {...register('name', { required: 'Name is required' })}
                    />
                    {errors.name && <span className="text-red-500">{errors.name.message}</span>}
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Mobile</span>
                    </label>
                    <input
                        type="tel"
                        placeholder="Mobile"
                        maxLength="11"
                        className="input input-bordered"
                        {...register('mobile', {
                            required: 'Mobile number is required',
                            pattern: {
                                value: /^\d{11}$/,
                                message: 'Mobile number must be exactly 11 digits'
                            }
                        })}
                    />
                    {errors.mobile && <span className="text-red-500">{errors.mobile.message}</span>}
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
                    <label className="label">
                        <span className="label-text">Select Role</span>
                    </label>
                    <select
                        className="select select-bordered"
                        {...register('role', { required: 'Role is required' })}
                    >
                        <option value="" disabled>Select your role</option>
                        <option value="user">User</option>
                        <option value="agent">Agent</option>
                    </select>
                    {errors.role && <span className="text-red-500">{errors.role.message}</span>}
                </div>

                <div className="form-control">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
            <div>
                <p className="text-center mt-5 text-xl">Already have an Account ? <Link to={'/login'} className="text-blue-600 font-medium">Login</Link></p>
            </div>
        </div>
    );
};

export default Register;