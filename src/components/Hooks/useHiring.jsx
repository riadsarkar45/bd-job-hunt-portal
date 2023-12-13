import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../dashboard/authProvider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useHiring = () => {
    const { user, loading } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    
    const { data: isHiring, isPending: isHiringLoading } = useQuery({
        queryKey: [user?.email, 'isHiring'],
        enabled: !loading,
        queryFn: async () => {
            try {
                const res = await axiosSecure.get(`/users/hiring/${user.email}`);
                console.log(res.data);

                // Make sure to return a defined value
                return res.data?.hiring || false; // Assuming a default value of false if hiring is undefined
            } catch (error) {
                console.error("Error fetching hiring status:", error);
                throw new Error("Error fetching hiring status");
            }
        }
    });

    return [isHiring, isHiringLoading];
};

export default useHiring;
