import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import Topbar from "../components/layout/Topbar";
import TestTable from "../components/tests/TestTable";
import TestFormModal from "../components/tests/TestFormModal";
import ConfirmDialog from "../components/ui/ConfirmDialog";
import axiosInstance from "../api/axiosInstance";

const Tests = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchTests = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axiosInstance.get("/tests");
      setTests(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load tests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTests();
  }, []);

  const handleSave = async (data) => {
    if (editing) {
      await axiosInstance.put(`/tests/${editing._id}`, data);
    } else {
      await axiosInstance.post("/tests", data);
    }
    fetchTests();
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/tests/${deleteTarget._id}`);
      setDeleteTarget(null);
      fetchTests();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete test.");
      setDeleteTarget(null);
    }
  };

  return (
    <>
      <Topbar
        title="Tests"
        subtitle={`${tests.length} catalog item${tests.length === 1 ? "" : "s"}`}
        actions={
          <button
            onClick={() => {
              setEditing(null);
              setFormOpen(true);
            }}
            className="flex items-center gap-2 bg-teal-950 text-white px-4 py-2 rounded text-sm font-medium hover:bg-teal-600 transition-colors"
          >
            <Plus size={16} />
            Add test
          </button>
        }
      />

      <div className="p-8">
        {error && (
          <p className="text-sm text-clay-400 bg-clay-50 border border-clay-400/20 rounded px-3 py-2 mb-4">
            {error}
          </p>
        )}

        {loading ? (
          <p className="text-sm text-muted">Loading tests…</p>
        ) : (
          <TestTable
            tests={tests}
            onEdit={(t) => {
              setEditing(t);
              setFormOpen(true);
            }}
            onDelete={(t) => setDeleteTarget(t)}
          />
        )}
      </div>

      <TestFormModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSave}
        initialData={editing}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete test"
        message={`Remove ${deleteTarget?.testName} from the catalog? This cannot be undone.`}
      />
    </>
  );
};

export default Tests;
