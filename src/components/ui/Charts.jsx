import { Line, Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Chart theme colors based on studio palette
const chartColors = {
  primary: "#4c7273",
  secondary: "#86b9b0",
  accent: "#042630",
  light: "#d0d6d6",
};

export const RevenueChart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.month),
    datasets: [
      {
        label: "Monthly Revenue",
        data: data.map((item) => item.revenue),
        borderColor: chartColors.primary,
        backgroundColor: chartColors.secondary,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Revenue Trend",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return "$" + value.toLocaleString();
          },
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export const ClassAttendanceChart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.class),
    datasets: [
      {
        label: "Attendance Rate (%)",
        data: data.map((item) => item.attendance),
        backgroundColor: [
          chartColors.primary,
          chartColors.secondary,
          chartColors.accent,
          "#86b9b0",
          "#4c7273",
          "#042630",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Class Attendance Rates",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: function (value) {
            return value + "%";
          },
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export const MemberDemographicsChart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.ageGroup),
    datasets: [
      {
        data: data.map((item) => item.count),
        backgroundColor: [
          chartColors.primary,
          chartColors.secondary,
          chartColors.accent,
          "#86b9b0",
          "#d0d6d6",
        ],
        borderWidth: 2,
        borderColor: "#fff",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: "Member Demographics by Age",
      },
    },
  };

  return <Doughnut data={chartData} options={options} />;
};
