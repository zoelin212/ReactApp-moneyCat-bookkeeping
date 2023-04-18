import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useLocation } from "react-router-dom";

ChartJS.register(ArcElement, Tooltip, Legend);

const Donut = ({cost}) => {
    const location = useLocation();
    const path = location.pathname;
    //console.log(path);
    let data;
    let options = {};
    if(path === '/chart_spend'){
       data = {
            //labels: ['Food', 'Home', 'Fun', 'Travel', 'Health', 'Learn', 'Shop', 'Lend', 'Others'],
            datasets: [
            {
                //label: '# of Votes',
                data: [cost['food'], cost['home'], cost['fun'], cost['travel'], cost['health'], cost['learn'], cost['shop'], cost['lend'], cost['others']],
                backgroundColor: [
                    'rgba(1, 137, 143, 0.8)',
                    'rgba(104, 193, 221, 0.8)',
                    'rgba(241, 79, 42, 0.8)',
                    'rgba(255, 139, 56, 0.8)',
                    'rgba(23, 44, 105, 0.8)',
                    'rgba(252, 238, 33, 0.8)',
                    'rgba(182, 32, 252, 0.8)',
                    'rgba(252, 33, 191, 0.8)',
                    'rgba(152, 185, 234, 0.8)'
                ],
                borderColor: [
                    'rgba(1, 137, 143, 1)',
                    'rgba(104, 193, 221, 1)',
                    'rgba(241, 79, 42, 1)',
                    'rgba(255, 139, 56, 1)',
                    'rgba(23, 44, 105, 1)',
                    'rgba(252, 238, 33, 1)',
                    'rgba(182, 32, 252, 1)',
                    'rgba(252, 33, 191, 1)',
                    'rgba(152, 185, 234, 1)'
                ],
                borderWidth: 1
            }
            ]
        };
        options = {
            cutout: "75%",
            aspectRatio: 1,
        }
    } else {
       data = {
            //labels: ['salay','bonus','sideline','investment','allowance','stock','tips','othersIn'],
            datasets: [
            {
                //label: '# of Votes',
                data: [cost['salay'], cost['bonus'], cost['sideline'], cost['investment'], cost['allowance'], cost['stock'], cost['tips'],cost['others']],
                backgroundColor: [
                    'rgba(1, 137, 143, 0.8)',
                    'rgba(104, 193, 221, 0.8)',
                    'rgba(241, 79, 42, 0.8)',
                    'rgba(255, 139, 56, 0.8)',
                    'rgba(23, 44, 105, 0.8)',
                    'rgba(182, 32, 252, 0.8)',
                    'rgba(252, 33, 191, 0.8)',
                    'rgba(152, 185, 234, 0.8)'
                ],
                borderColor: [
                    'rgba(1, 137, 143, 1)',
                    'rgba(104, 193, 221, 1)',
                    'rgba(241, 79, 42, 1)',
                    'rgba(255, 139, 56, 1)',
                    'rgba(23, 44, 105, 1)',
                    'rgba(182, 32, 252, 1)',
                    'rgba(252, 33, 191, 1)',
                    'rgba(152, 185, 234, 1)'
                ],
                borderWidth: 1
            }
            ]
        };
        options = {
            cutout: "75%",
            aspectRatio: 1,
        }
    }

  return (
    <div className='DonutBox'>
      <Doughnut  data={data} options={options} />
    </div>
  );
};

export default Donut;
