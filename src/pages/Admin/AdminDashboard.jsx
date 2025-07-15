import React, { useContext, useEffect, useState } from 'react'
import useUserAuth from '../../hooks/useUserAuth'
import { UserContext } from '../../context/userContext';
import DashBoardLayout from '../../components/layout/DashBoardLayout';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import moment from 'moment'
import InfoCard from '../../components/Cards/InfoCard';
import { addThousandSeparator } from '../../utils/helper';
import { LuArrowRight } from 'react-icons/lu';
import TaskListTable from '../../components/layout/TaskListTable';
import CustomPieChart from '../../components/Charts/CustomPieChart';
import CustomBarChart from '../../components/Charts/CustomBarChart';

const COLORS = ['#8D51FF', "#00B8DB", '#7BCE00']

function AdminDashboard() {
  useUserAuth();
  const { user } = useContext(UserContext);
  const [dashBoardData, setDashboardData] = useState(null);

  const navigate = useNavigate();

  const [pieChartData, setPieChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);

  function onSeeMore() {
    navigate("/admin/task")
  };

  function prepareChart(data) {
    const taskDistribution = data?.taskDistribution || null;
    const taskPriorityLevel = data?.taskPriorityLevel || null;

    const taskDistributionData = [
      { status: "Pending", count: taskDistribution?.Pending || 0 },
      { status: "In Progress", count: taskDistribution?.InProgress || 0 },
      { status: "Completed", count: taskDistribution?.Completed || 0 },
    ];

    setPieChartData(taskDistributionData);

    const taskPriorityData = [
      { priority: 'Low', count: taskPriorityLevel?.Low || 0 },
      { priority: 'Medium', count: taskPriorityLevel?.Medium || 0 },
      { priority: 'High', count: taskPriorityLevel?.High || 0 },
    ];
    setBarChartData(taskPriorityData);
  };

  useEffect(() => {
    async function getDashboardData() {
      try {
        const res = await axiosInstance.get(API_PATHS.TASK.GET_DASHBOARD_DATA, { withCredentials: true });
        if (res.data.message) {
          setDashboardData(res.data.message);
          prepareChart(res.data.message?.charts || null);
        }
      } catch (e) {
        console.error('Can not Fetch Dashboard Data', e)
      }
    }
    getDashboardData()
  }, [])

  return (
    <DashBoardLayout activeMenu="Dashboard">
      <div className='card my-5'>
        <div className='col-span-3'>
          <h2 className='text-xl md:text-2xl'>Good Morning! {user?.name}</h2>
          <p className='text-xs md:text-[13px] text-gray-400 mt-1.5'>
            {moment().format('dddd Do MMMM yyyy')}
          </p>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mt-5'>
          <InfoCard
            label='Total Tasks'
            value={addThousandSeparator(
            dashBoardData?.charts?.taskDistribution?.All || 0
            )}
            color="bg-blue-600"
          />
          <InfoCard
            label='Pending Tasks'
            value={addThousandSeparator(
              dashBoardData?.charts?.taskDistribution?.Pending || 0
            )}
            color="bg-violet-500"
          />
          <InfoCard
            label='In Progress Tasks'
            value={addThousandSeparator(
              dashBoardData?.charts?.taskDistribution?.InProgress || 0
            )}
            color="bg-cyan-500"
          />
          <InfoCard
            label='Completed Tasks'
            value={addThousandSeparator(
              dashBoardData?.charts?.taskDistribution?.Completed || 0
            )}
            color="bg-lime-500"
          />
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 my-4 md:my-6'>
        <div className='w-full'>
          <div className='card h-full'>
            <div className='flex items-center justify-between'>
              <h5 className='font-medium'>Task Distribution</h5>
            </div>
            <CustomPieChart
              data={pieChartData}
              colors={COLORS}
            />
          </div>
        </div>

        <div className='w-full'>
          <div className='card h-full'>
            <div className='flex items-center justify-between'>
              <h5 className='font-medium'>Task Priority Levels</h5>
            </div>
            <CustomBarChart
              data={barChartData}
            />
          </div>
        </div>

        <div className='col-span-1 md:col-span-2'>
          <div className='card'>
            <div className='flex items-center justify-between flex-wrap gap-2'>
              <h5 className='text-lg'>Recent Tasks</h5>
              <button className='card-btn' onClick={onSeeMore}>
                See All <LuArrowRight className="text-base" />
              </button>
            </div>
            <TaskListTable tableData={dashBoardData?.recentTask || []} />
          </div>
        </div>
      </div>
    </DashBoardLayout>
  )
}

export default AdminDashboard
