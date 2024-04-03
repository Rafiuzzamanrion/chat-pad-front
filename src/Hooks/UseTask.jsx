import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProviders";


const UseTask = () => {
    const { user,loading } = useContext(AuthContext);
    const { data: taskCount = [], refetch } = useQuery({
        queryKey: ['taskCount', user?.email],
        enabled:!loading,
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/taskCount?email=${user?.email}`);
            return res.data;
        }
    })
    return [taskCount, refetch]
}
export default UseTask;

