import { useEffect, useState } from "react";
import { Users, FlaskConical, Clock, CheckCircle2 } from "lucide-react";
import Topbar from "../components/layout/Topbar";
import StatCard from "../components/ui/StatCard";
import axiosInstance from "../api/axiosInstance";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axiosInstance.get("/dashboard/stats");
        setStats(res.data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load dashboard stats.");
      }
    };
    fetchStats();
  }, []);

  return (
    <>
      <Topbar title="Dashboard" subtitle="Lab activity at a glance" />
      <div className="p-8">
        {error && (
          <p className="text-sm text-clay-400 bg-clay-50 border border-clay-400/20 rounded px-3 py-2 mb-6">
            {error}
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard
            label="Total Patients"
            value={stats ? stats.totalPatients : "—"}
            code="001"
            icon={Users}
            tone="teal"
          />
          <StatCard
            label="Tests Conducted"
            value={stats ? stats.totalTestsConducted : "—"}
            code="002"
            icon={FlaskConical}
            tone="teal"
          />
          <StatCard
            label="Pending Reports"
            value={stats ? stats.pendingReports : "—"}
            code="003"
            icon={Clock}
            tone="amber"
          />
          <StatCard
            label="Completed Reports"
            value={stats ? stats.completedReports : "—"}
            code="004"
            icon={CheckCircle2}
            tone="moss"
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
