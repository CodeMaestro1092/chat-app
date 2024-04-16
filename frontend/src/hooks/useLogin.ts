import { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';


const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext()

    const login = async (username: string, password: string) => {
        const success = handleInputError(username, password)
        if(!success) return
        setLoading(true);
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            })

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error)
            }

            localStorage.setItem("chat-user", JSON.stringify(data));
            setAuthUser(data);

        } catch (e: any) {
            toast.error(e.message)
        } finally {
            setLoading(false)
        }
    }
    return { loading, login }
}

export default useLogin

const handleInputError = (username: string, password: string) => {
    if (!username || !password) {
        toast.error("please fill all fields")
        return false
    }
    return true;
}