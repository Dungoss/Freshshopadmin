import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import BaseLayout from '../../components/BaseLayout'
import {
  getTopTenProductAPI
} from '../../api/product'
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Top 10 mã sản phẩm có danh số cao nhất',
    },
  },

};

let HomePage = (props) => {
  const [productsTopTen, setProductTopTen] = useState([]);
  useEffect(() => {
    let _getAllUsers = async () => {
      try {
        let res = await getTopTenProductAPI();
        if (res.status === 200) {
          let handleDataRes = res.data.data.products.length ? res.data.data.products : [];
          setProductTopTen(handleDataRes)
        }
      } catch (error) {}
    };
    _getAllUsers();
  }, [])
  return (
    <>
      <BaseLayout>
          <Bar options={options} data={{
            labels: productsTopTen.length > 0 ? productsTopTen.map((item => item?.pid)) : [],
            datasets: [
              {
                label: 'Doanh số bán hàng',
                data: productsTopTen.length > 0 ? productsTopTen.map((item => item?.totalPrice)) : [],
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
              },
            ]
          }} />
      </BaseLayout>
    </>
  );
};


export default React.memo(HomePage);
