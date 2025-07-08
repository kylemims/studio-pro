import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { marketingData } from "../data/sampleData";
import Card from "../components/ui/Card";
import { Plus, Mail, Share2, Target, TrendingUp, Eye, MousePointer, UserX } from "lucide-react";

const Marketing = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("campaigns");

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null;

  const { campaigns, emailMetrics, socialMediaMetrics } = marketingData;

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Completed":
        return "bg-blue-100 text-blue-800";
      case "Draft":
        return "bg-gray-100 text-gray-800";
      case "Paused":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const CampaignCard = ({ campaign }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-studio-teal rounded-full flex items-center justify-center">
            {campaign.type === "Email" ? (
              <Mail className="h-5 w-5 text-white" />
            ) : (
              <Share2 className="h-5 w-5 text-white" />
            )}
          </div>
          <div>
            <h3 className="font-semibold text-studio-dark">{campaign.name}</h3>
            <p className="text-sm text-gray-600">{campaign.type}</p>
          </div>
        </div>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
            campaign.status
          )}`}>
          {campaign.status}
        </span>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Budget</span>
          <span className="font-semibold text-studio-dark">${campaign.budget}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Spent</span>
          <span className="font-semibold text-studio-teal">${campaign.spent}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-studio-teal h-2 rounded-full"
            style={{ width: `${(campaign.spent / campaign.budget) * 100}%` }}></div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-lg font-semibold text-studio-dark">{campaign.reach}</p>
          <p className="text-xs text-gray-600">Reach</p>
        </div>
        <div>
          <p className="text-lg font-semibold text-studio-dark">{campaign.engagement}%</p>
          <p className="text-xs text-gray-600">Engagement</p>
        </div>
        <div>
          <p className="text-lg font-semibold text-studio-dark">{campaign.conversions}</p>
          <p className="text-xs text-gray-600">Conversions</p>
        </div>
      </div>
    </Card>
  );

  const MetricCard = ({ title, value, subtitle, icon: Icon, trend }) => (
    <Card>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-studio-dark">{value}</p>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
        <div className="p-3 bg-studio-light rounded-full">
          <Icon className="h-6 w-6 text-studio-teal" />
        </div>
      </div>
      {trend && (
        <div className="mt-2">
          <span className={`text-xs ${trend.type === "up" ? "text-green-600" : "text-red-600"}`}>
            {trend.type === "up" ? "↗" : "↘"} {trend.value}
          </span>
        </div>
      )}
    </Card>
  );

  const EmailMetrics = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Sent"
          value={emailMetrics.totalSent.toLocaleString()}
          icon={Mail}
          trend={{ type: "up", value: "+12% this month" }}
        />
        <MetricCard
          title="Open Rate"
          value={`${emailMetrics.openRate}%`}
          icon={Eye}
          trend={{ type: "up", value: "+2.3% from last month" }}
        />
        <MetricCard
          title="Click Rate"
          value={`${emailMetrics.clickRate}%`}
          icon={MousePointer}
          trend={{ type: "up", value: "+1.8% from last month" }}
        />
        <MetricCard
          title="Unsubscribe Rate"
          value={`${emailMetrics.unsubscribeRate}%`}
          icon={UserX}
          trend={{ type: "down", value: "-0.2% from last month" }}
        />
      </div>

      <Card>
        <h3 className="text-lg font-semibold text-studio-dark mb-4">Email Performance Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Delivered</span>
              <span className="font-semibold">{emailMetrics.delivered.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Opened</span>
              <span className="font-semibold">{emailMetrics.opened.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Clicked</span>
              <span className="font-semibold">{emailMetrics.clicked.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Unsubscribed</span>
              <span className="font-semibold">{emailMetrics.unsubscribed.toLocaleString()}</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="text-center">
              <p className="text-2xl font-bold text-studio-teal">{emailMetrics.openRate}%</p>
              <p className="text-sm text-gray-600">Open Rate</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-studio-teal">{emailMetrics.clickRate}%</p>
              <p className="text-sm text-gray-600">Click Rate</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );

  const SocialMediaMetrics = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(socialMediaMetrics.followers).map(([platform, followers]) => (
          <Card key={platform}>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-studio-dark capitalize">{platform}</h3>
              <p className="text-3xl font-bold text-studio-teal mt-2">
                {followers.toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">Followers</p>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Engagement</span>
                  <span className="text-sm font-semibold">
                    {socialMediaMetrics.engagement[platform]}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Reach</span>
                  <span className="text-sm font-semibold">
                    {socialMediaMetrics.reach[platform].toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-studio-dark">Marketing</h1>
        <p className="mt-2 text-studio-teal">
          Manage your marketing campaigns and track performance
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab("campaigns")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === "campaigns"
              ? "bg-studio-teal text-white"
              : "bg-white text-studio-dark hover:bg-studio-light"
          }`}>
          Campaigns
        </button>
        <button
          onClick={() => setActiveTab("email")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === "email"
              ? "bg-studio-teal text-white"
              : "bg-white text-studio-dark hover:bg-studio-light"
          }`}>
          Email Analytics
        </button>
        <button
          onClick={() => setActiveTab("social")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === "social"
              ? "bg-studio-teal text-white"
              : "bg-white text-studio-dark hover:bg-studio-light"
          }`}>
          Social Media
        </button>
      </div>

      {/* Content */}
      {activeTab === "campaigns" && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-studio-dark">Active Campaigns</h2>
            <button className="flex items-center px-4 py-2 bg-studio-teal text-white rounded-lg hover:bg-studio-blue">
              <Plus className="h-4 w-4 mr-2" />
              New Campaign
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        </div>
      )}

      {activeTab === "email" && <EmailMetrics />}
      {activeTab === "social" && <SocialMediaMetrics />}
    </div>
  );
};

export default Marketing;
