import { useEffect, useState } from "react"
import toast from "react-hot-toast";

const useGetConversations = () => {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        const useGetConversations = async () => {
            setLoading(true);
            try {
                const res = await fetch('/api/users');
                const data = await res.json();
                if (data.error) {
                    throw new Error(data.error)
                }
                setConversations(data)
            } catch (e: any) {
            toast.error(e.message)

            } finally {
                setLoading(false)
            }
        }

        useGetConversations();
    }, [])
    return {loading, conversations}
}

export default useGetConversations;