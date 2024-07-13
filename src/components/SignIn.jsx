import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import {Link,  useNavigate } from 'react-router-dom'
import { Logo, Button, Input} from "./index"
import { login as authLogin } from '../store/authSlice'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert'
import { ScaleLoader } from 'react-spinners'

function SignIn() {

    const navigate = useNavigate()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm();

    const create = async(data) => {
        setError("");
        setLoading(true)
        try {
            const session = await authService.createAccount(data);
            // console.log("session", session)
            if(session){
                const userData = await authService.getCurrentUser()
                // console.log("userData", userData)
                if(userData) dispatch(authLogin(userData));
                navigate("/")
                setLoading(false)
            }
        } catch (error) {
            setError(error.message)
            Swal(
                "Something went wrong",
                "Could not create Account! Please try again",
                "error"
            )
            setLoading(false)
        }
    }
  return (
    <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight text-gray-600">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(create)}>
                    <div className='space-y-5 text-black'>
                        <Input
                        label="Full Name: "
                        placeholder="Enter your full name"
                        {...register("name", {
                            required: true,
                        })}
                        />
                        <Input
                        label="Email: "
                        placeholder="Enter your email"
                        type="email"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                            }
                        })}
                        />
                        <Input
                        label="Password: "
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", {
                            required: true,})}
                        />
                    {
                        loading ? 
                        <ScaleLoader loading={loading}/> :
                        <Button type="submit" className="w-full">
                            Create Account
                        </Button>
                    }
                    </div>
                </form>
            </div>

    </div>
  )
}

export default SignIn
