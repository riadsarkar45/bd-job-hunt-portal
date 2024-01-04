import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../components/Hooks/useAxiosSecure';
import useAdmin from '../../components/Hooks/useAdmin';
import { Helmet } from 'react-helmet-async';
import { XAxis, YAxis, ResponsiveContainer, BarChart, Bar, Tooltip } from 'recharts';


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

    

    const { data: chartData = [] } = useQuery({
        queryKey: ['chartData'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/monthlyApplications`);
            return res.data;
        }
    });
    

    return (
        <div className='w-full'>

            <Helmet>
                <title>Home</title>
            </Helmet>
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

            <div className='mt-9'>
                <ResponsiveContainer height={250} width="100%">
                    <BarChart data={chartData} width={400} height={400}>
                        <XAxis dataKey="monthName" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="applicationCount" fill="#8883d8" />
                    </BarChart>
                </ResponsiveContainer>
            </div>


        </div>
    );
};

export default AdminHome;