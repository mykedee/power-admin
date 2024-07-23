import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Area,
  Bar,
} from "recharts";

 

import { CustomerDemography, ProductData, CustomerPortfolio } from "../data.js";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export const SalesChart = () => {
  return (
    <PieChart
      width={200}
      height={200}
      className="relative text-center mx-auto w-1/2"
    >
      <Pie
        data={ProductData}
        cx={100}
        cy={80}
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
      >
        {ProductData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
};


export const DemograpyChart = () => {
  return (
     <ResponsiveContainer height={250}>
      <LineChart
        width={450}
        data={CustomerDemography}
        margin={{ top: 5, right: 15, left: 10, bottom: 5 }}
        className="relative text-center mx-auto w-1/2"
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="country" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="totalVisit" stroke="#8884d8" />
        <Line type="monotone" dataKey="timeSpent" stroke="#82ca9d" />
      </LineChart>
     </ResponsiveContainer> 
  );
};



export const PortfolioChart = () => {
  return (
    <ResponsiveContainer height={250}>
      <ComposedChart
        width={500}
        data={CustomerPortfolio}
        margin={{
          top: 10,
          right: 40,
          bottom: 10,
          left: 10,
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis
          dataKey="coin"
          label={{ value: "Pages", position: "insideBottomRight", offset: 0 }}
          scale="band"
        />
        <YAxis label={{ value: "Index", angle: -90, position: "insideLeft" }} />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey="expected"
          fill="#8884d8"
          stroke="#8884d8"
        />
        <Bar dataKey="totalInvestment" barSize={20} fill="#413ea0" />
        <Line type="monotone" dataKey="totalProfilts" stroke="#ff7300" />
      </ComposedChart>
    </ResponsiveContainer>
  );
};