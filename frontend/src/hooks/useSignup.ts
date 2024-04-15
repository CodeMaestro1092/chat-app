import React, { useState } from 'react'
import { SignUpInputsT } from '../pages/signUp/SignUp';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const { authUser,setAuthUser} = useAuthContext()

    const signup = async ({ fullname, username, password, confirmPassword, gender }: SignUpInputsT) => {
        const success = handleInputError({ fullname, username, password, confirmPassword, gender });
        if (!success) return

        setLoading(true)

        try {
            const res = await fetch("http://localhost:6969/api/auth/signup", {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fullname, username, password, confirmPassword, gender })
            })

            const data = await res.json();
            if(data.error){
                throw new Error(data.error)
            }
            console.log(data);

            localStorage.setItem("chat-user",JSON.stringify(data))

            setAuthUser(data)

        } catch (e: any) {
            toast.error(e.message)
        }
    }
    return { loading, signup }

}

export default useSignup

const handleInputError = ({ fullname, username, password, confirmPassword, gender }: SignUpInputsT) => {
    if (!fullname || !username || !password || !confirmPassword || !gender) {
        toast.error('Please fill in all fields')
        return false
    }

    if (password !== confirmPassword) {
        toast.error('Passwords do not match')
        return false
    }

    if (password.length < 6) {
        toast.error('Password must be at least 6 characters')
        return false
    }

    return true;
}