import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import Topbar from "../components/layout/Topbar";
import ReportTable from "../components/reports/ReportTable";
import ReportFormModal from "../components/reports/ReportFormModal";
import ReportDetailModal from "../components/reports/ReportDetailModal";
import ConfirmDialog from "../components/ui/ConfirmDialog";
import axiosInstance from "../api/axiosInstance";

const filters = ["All", "Pending", "Completed"];

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [createOpen, setCreateOpen] = useState(false);
  const [viewing, setViewing] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchReports = async (status = filter) => {
    setLoading(true);
    setError("");
    try {
      const res = await axiosInstance.get("/reports", {
        params: status !== "All" ? { status } : {},
      });
      setReports(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load reports.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports(filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const handleCreate = async (data) => {
    await axiosInstance.post("/reports", data);
    fetchReports(filter);
  };

  const handleUpdate = async (id, data) => {
    await axiosInstance.put(`/reports/${id}`, data);
    fetchReports(filter);
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/reports/${deleteTarget._id}`);
      setDeleteTarget(null);
      fetchReports(filter);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete report.");
      setDeleteTarget(null);
    }
  };

  return (
    <>
      <Topbar
        title="Reports"
        subtitle={`${reports.length} report${reports.length === 1 ? "" : "s"}`}
        actions={
          <button
            onClick={() => setCreateOpen(true)}
            className="flex items-center gap-2 bg-teal-950 text-white px-4 py-2 rounded text-sm font-medium hover:bg-teal-600 transition-colors"
          >
            <Plus size={16} />
            Assign tests
          </button>
        }
      />

      <div className="p-8">
        <div className="flex gap-2 mb-5">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3.5 py-1.5 rounded-full text-sm border transition-colors ${
                filter === f
                  ? "bg-teal-950 text-white border-teal-500"
                  : "bg-surface text-muted border-line hover:border-teal-500/50"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {error && (
          <p className="text-sm text-clay-400 bg-clay-50 border border-clay-400/20 rounded px-3 py-2 mb-4">
            {error}
          </p>
        )}

        {loading ? (
          <p className="text-sm text-muted">Loading reports…</p>
        ) : (
          <ReportTable
            reports={reports}
            onView={(r) => setViewing(r)}
            onDelete={(r) => setDeleteTarget(r)}
          />
        )}
      </div>

      <ReportFormModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onSubmit={handleCreate}
      />

      <ReportDetailModal
        open={!!viewing}
        onClose={() => setViewing(null)}
        report={viewing}
        onSubmit={handleUpdate}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete report"
        message={`Delete this report for ${deleteTarget?.patient?.name}? This cannot be undone.`}
      />
    </>
  );
};

export default Reports;
