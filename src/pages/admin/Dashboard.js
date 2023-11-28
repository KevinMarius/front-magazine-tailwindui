import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import DashboardStatGrid from '../../components/DashboardStatGrid'
import StatisticChart from '../../components/StatisticChart';
import Datatable from '../../components/Datatable';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Dashboard() {
  /* const location = useLocation();
  const message = location.state.message;

  useEffect(() => {
    if(message) {
      toast.success(message)
    }
  }, []) */

  return (
    <React.Fragment>
      {/* <ToastContainer autoClose={2000}/> */}
      <div className='flex my-10 flex-col w-full gap-4'>
      <DashboardStatGrid />
      <StatisticChart />
    </div>
    </React.Fragment>
  )
}

export default Dashboard