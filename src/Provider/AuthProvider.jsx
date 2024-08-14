// import PropTypes from 'prop-types'
import { createContext, useEffect, useState } from 'react'


import axios from 'axios'
import useAxiosPublic from '../utils/useAxiosPublic'
import { setEmail } from '../utils/setStorage'
import { getEmailInfo } from '../utils/getStorage'
import { Navigate, useNavigate } from 'react-router-dom'


export const AuthContext = createContext(null)


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();
    // const navigate = useNavigate();



    // const loginUser = async (email, pin) => {
    //     try {
    //         const { data } = await axiosPublic.get(`/userLogin?email=${email}&pin=${pin}`);
            
    //         if (data.message == 'matched') {
                
    //             setEmail(email);
    //             setUser(email)
                
    //             alert('login successfull')
                
                
    //         }
    //         else {
    //             alert(data.message)
    //         }
           
    //     } catch (error) {
    //         console.log(error);
    //         alert("something went wrong!")
    //     }
    // }

    const logoutUser = () => {
        setEmail('');
        localStorage.setItem('access-token', '')
    }

    // const signIn = (email, pin) => {
    //     setLoading(true)
       
    //     return loginUser(email, pin);
    // }

    // console.log("user = ", user)



    //   const logOut = async () => {
    //     setLoading(true)
    //     await axios.get(`${import.meta.env.VITE_API_URL}/logout`, {
    //       withCredentials: true,
    //     })
    //     return signOut(auth)
    //   }

      const logOut = async () => {
        setLoading(true)
        
        return logoutUser();
      }



    // const saveUser = async(user) => {
    //   const currentUser = {
    //     email : user?.email,
    //     role : 'guest',
    //     status : 'Verified'
    //   }
    //   const {data} = await axios.put(`${import.meta.env.VITE_API_URL}/user`, currentUser);
    //   return data;
    // }

    //   const saveUser = async (user) => {
    //     const currentUser = {
    //       email: user?.email,
    //       name:user?.displayName,
    //       image:user?.photoURL,
    //       role: 'employee',
    //       status: 'pending'
    //     }
    //     const { data } = await axios.put(`${import.meta.env.VITE_url}/user`, currentUser);
    //     return data;
    //   }


    // const saveUser = async(user) => {

    //   const {data} = await axios.put(`https://server-side-chi-livid.vercel.app/user`, user);
    //   return data;
    // }


    //Get token from server
    //   const getToken = async email => {
    //     const { data } = await axios.post(
    //       `http://localhost:5000//jwt`,
    //       { email },
    //       { withCredentials: true }
    //     )
    //     return data
    //   }

    // onAuthStateChange
    useEffect(() => {
        const email = getEmailInfo();
        // console.log('from loc = ', email);
        setUser(email)
        if (email) {
            // console.log('my = ', email)

            axiosPublic.post('/jwt', {email}, {withCredentials:true})
                .then(res => {
                    // console.log(res.data)
                    if (res.data.token) {
                        localStorage.setItem('access-token', res.data.token);
                        setLoading(false)
                    }
                })
        }
        // const unsubscribe = onAuthStateChanged(auth, currentUser => {
        //   setUser(currentUser)

        //   console.log(currentUser)
        //   if (currentUser) {

        //     const userEmail = currentUser?.email || user?.email;
        //     const loggedEmail = { email: userEmail }
        //     saveUser(currentUser);
        //     axiosPublic.post('/jwt', loggedEmail, {withCredentials:true})
        //     .then( res => {
        //       if(res.data.token) {
        //         localStorage.setItem('access-token', res.data.token);
        //         setLoading(false)
        //       }
        //     })

        //   }
        //   else {
        //     setLoading(false)
        //      localStorage.removeItem('access-token')
        //   }

        // })
        // return () => {
        //   return unsubscribe()
        // }


    }, [user])

    const authInfo = {
        user,
        loading,
        setLoading,

        setUser,
        logOut

    }

    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    )
}

// AuthProvider.propTypes = {
//   children: PropTypes.array,
// }

export default AuthProvider
