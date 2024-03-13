import Chart from '../../components/chart/Chart'
import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo'
import './home.css'
import WidgetLg from '../../components/widgetLg/WidgetLg';
import WidgetSm from '../../components/widgetSm/WidgetSm';
import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

export default function Home() {
  const MONTHS = useMemo (
    ()=> [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ], 
  []
  );

  const [userStats, setUserStats] = useState([]);

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await axios.get("/users/stats", {
          headers: {
            token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        const statsList = res.data.sort((a, b) => a._id - b._id);
        
        const uniqueMonthsSet = new Set();
  
        statsList.forEach(item =>
          uniqueMonthsSet.add({ name: MONTHS[item._id - 1], 'New User': item.total })
        );
  
        const uniqueMonthsArray = Array.from(uniqueMonthsSet);
  
        setUserStats(uniqueMonthsArray);
      } catch (err) {
        console.log(err);
      }
    };
  
    getStats();
  }, [MONTHS]);

 console.log(userStats);

  return (
    <div className='home'>
      <FeaturedInfo/>
      <Chart data={userStats} title="User Analytics" grid dataKey="New User" />
      <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
      </div>
    </div>
  )
}
