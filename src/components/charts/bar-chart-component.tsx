import axios from "axios";
import { useEffect, useState } from "react";
import DOMAIN from "../../utils/proxy";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

const BarChart: React.FC = (): JSX.Element => {
  const [label, setLabel] = useState<String[]>();
  const [data1, setData1] = useState<Number[]>();

  const token = localStorage.getItem("token");
  useEffect(() => {
    const getData = async () => {
      const data = await axios.get(
        `${DOMAIN.URL}/api/v1/save-job/get-my-jobs-stats`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      setLabel(
        data.data.stats.map((el: { _id: String; sum: Number }) => el._id)
      );
      setData1(
        data.data.stats.map((el: { _id: String; sum: Number }) => el.sum)
      );
    };
    getData();
  }, [token]);

  const data = {
    labels: label,
    datasets: [
      {
        label: "# of Votes",
        data: data1,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={data} />;
};

export default BarChart;
