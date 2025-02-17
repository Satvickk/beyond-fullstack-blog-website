import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { Button, Input, Logo} from "../components/index"
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert'
import { ScaleLoader } from 'react-spinners'

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const {register, handleSubmit} = useForm();
    
    const login = async(data) => {
        setError("");
        setLoading(true)
        try {
            const session = await authService.login(data)
            if(session){
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(authLogin(userData));
                navigate("/")
                setLoading(false)
            }
        } catch (error) {
            setError(error.message)
            Swal(
                "Something went wrong",
                "Cannot log in user! Please try again",
                "error"
            )
            setLoading(false)
        }
    }
  return (
    <div
    className='flex items-center justify-center w-full py-8'
    >
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight text-gray-600">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                       Sign Up
                    </Link>
        </p>
            <form onSubmit={handleSubmit(login)} className='mt-8'>
                <div className='space-y-5 text-black'>

                    <Input 
                    type="email"
                    placeholder="Enter your email"
                    label="Email: satvick@gmail.com"
                    {...register("email", {
                        required : true,
                        validate : {
                            // this is an regex expression
                            matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||"Email address must be a valid address",
                        } 
                    })}
                    />
                    <Input 
                    type="password"
                    placeholder="Enter your password"
                    label="Password: Sp@123456"
                    {...register("password", {
                        required : true,
                    })}
                    />
                    {
                        loading ? <ScaleLoader loading={loading} /> : <Button className="w-full" type='submit'>Log in</Button>
                    }
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login
