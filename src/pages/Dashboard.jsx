import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { dashboardData } from "../data/sampleData";
import Card from "../components/ui/Card";
import { RevenueChart, ClassAttendanceChart, MemberDemographicsChart } from "../components/ui/Charts";
import { TrendingUp, Users, DollarSign, Calendar, Target, Award } from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null;

  const { kpis, recentSales, monthlyRevenue, classAttendance, memberDemographics, topClasses } =
    dashboardData;

  const StatCard = ({ title, value, icon: Icon, trend, trendValue }) => (
    <Card>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-studio-dark">{value}</p>
          {trend && (
            <p className={`text-xs ${trend === "up" ? "text-green-600" : "text-red-600"}`}>
              {trend === "up" ? "↗" : "↘"} {trendValue}
            </p>
          )}
        </div>
        <div className="p-3 bg-studio-light rounded-full">
          <Icon className="h-6 w-6 text-studio-teal" />
        </div>
      </div>
    </Card>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-studio-dark">Dashboard</h1>
        <p className="mt-2 text-studio-teal">Welcome back, Evenflow Yoga!</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Members"
          value={kpis.totalMembers}
          icon={Users}
          trend="up"
          trendValue="+12 this month"
        />
        <StatCard
          title="Monthly Revenue"
          value={`$${kpis.monthlyRevenue.toLocaleString()}`}
          icon={DollarSign}
          trend="up"
          trendValue="+8.5% from last month"
        />
        <StatCard
          title="Classes This Month"
          value={kpis.classesThisMonth}
          icon={Calendar}
          trend="up"
          trendValue="+5 from last month"
        />
        <StatCard
          title="Active Members"
          value={kpis.activeMembers}
          icon={Target}
          trend="up"
          trendValue="87% of total"
        />
        <StatCard
          title="Retention Rate"
          value={`${kpis.memberRetentionRate}%`}
          icon={Award}
          trend="up"
          trendValue="+2.1% from last month"
        />
        <StatCard
          title="Avg Class Size"
          value={kpis.averageClassSize}
          icon={TrendingUp}
          trend="up"
          trendValue="+0.8 from last month"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card>
          <RevenueChart data={monthlyRevenue} />
        </Card>
        <Card>
          <ClassAttendanceChart data={classAttendance} />
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <Card>
            <MemberDemographicsChart data={memberDemographics} />
          </Card>
        </div>
        <div className="lg:col-span-1">
          <Card>
            <h3 className="text-lg font-semibold text-studio-dark mb-4">Top Performing Classes</h3>
            <div className="space-y-4">
              {topClasses.map((classItem, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-studio-light rounded-lg">
                  <div>
                    <p className="font-medium text-studio-dark">{classItem.name}</p>
                    <p className="text-sm text-gray-600">{classItem.instructor}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-studio-teal">{classItem.avgAttendance} avg</p>
                    <p className="text-xs text-gray-500">⭐ {classItem.rating}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Recent Sales */}
      <Card>
        <h3 className="text-lg font-semibold text-studio-dark mb-4">Recent Sales</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-studio-light">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentSales.map((sale) => (
                <tr key={sale.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-studio-dark">
                    {sale.customerName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sale.service}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-studio-teal font-semibold">
                    ${sale.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(sale.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
