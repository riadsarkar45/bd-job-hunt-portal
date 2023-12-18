import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../components/Hooks/useAxiosSecure';
import useAdmin from '../../components/Hooks/useAdmin';

const AdminHome = () => {
    const axiosSecure = useAxiosSecure();
    const [isAdmin] = useAdmin();
    const { data: stats } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stats');
            return res.data
        }
    })
    return (
        <div className='w-full'>
            {
                isAdmin ? (
                    <div className="stats shadow w-full">

                        <div className="stat place-items-center">
                            <div className="stat-title">Users</div>
                            <div className="stat-value">{stats?.totalUser}</div>
                            <div className="stat-desc"></div>
                        </div>

                        <div className="stat place-items-center">
                            <div className="stat-title">Total Jobs</div>
                            <div className="stat-value text-secondary">{stats?.totalJobs}</div>
                            <div className="stat-desc text-secondary"></div>
                        </div>

                        <div className="stat place-items-center">
                            <div className="stat-title">Total Applicant's</div>
                            <div className="stat-value">{stats?.totalApplicant}</div>
                            <div className="stat-desc"></div>
                        </div>

                    </div>
                ) : (
                    <div role="alert" className="alert alert-success">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>Welcome User</span>
                    </div>
                )
            }
        </div>
    );
};

export default AdminHome;