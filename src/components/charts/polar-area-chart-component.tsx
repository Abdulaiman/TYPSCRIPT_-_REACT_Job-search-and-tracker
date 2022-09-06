import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";
import { useEffect, useState } from "react";
import DOMAIN from "../../utils/proxy";
import { PolarArea } from "react-chartjs-2";
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const PolarChart: React.FC = (): JSX.Element => {
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
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return <PolarArea data={data} />;
};

export default PolarChart;
