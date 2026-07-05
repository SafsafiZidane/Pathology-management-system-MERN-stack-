import { useEffect, useState, useCallback } from "react";
import { Plus, Search } from "lucide-react";
import Topbar from "../components/layout/Topbar";
import PatientTable from "../components/patients/PatientTable";
import PatientFormModal from "../components/patients/PatientFormModal";
import ConfirmDialog from "../components/ui/ConfirmDialog";
import axiosInstance from "../api/axiosInstance";

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchPatients = useCallback(async (searchTerm = "") => {
    setLoading(true);
    setError("");
    try {
      const res = await axiosInstance.get("/patients", {
        params: searchTerm ? { search: searchTerm } : {},
      });
      setPatients(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load patients.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  // Debounce search input
  useEffect(() => {
    const t = setTimeout(() => fetchPatients(search), 350);
    return () => clearTimeout(t);
  }, [search, fetchPatients]);

  const handleSave = async (data) => {
    if (editing) {
      await axiosInstance.put(`/patients/${editing._id}`, data);
    } else {
      await axiosInstance.post("/patients", data);
    }
    fetchPatients(search);
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/patients/${deleteTarget._id}`);
      setDeleteTarget(null);
      fetchPatients(search);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete patient.");
      setDeleteTarget(null);
    }
  };

  return (
    <>
      <Topbar
        title="Patients"
        subtitle={`${patients.length} record${patients.length === 1 ? "" : "s"}`}
        actions={
          <button
            onClick={() => {
              setEditing(null);
              setFormOpen(true);
            }}
            className="flex items-center gap-2 bg-teal-950 text-white px-4 py-2 rounded text-sm font-medium hover:bg-teal-600 transition-colors"
          >
            <Plus size={16} />
            Add patient
          </button>
        }
      />

      <div className="p-8">
        <div className="relative mb-5 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or mobile"
            className="w-full pl-9 pr-3 py-2 border border-line rounded text-sm bg-surface focus:border-teal-500 outline-none"
          />
        </div>

        {error && (
          <p className="text-sm text-clay-400 bg-clay-50 border border-clay-400/20 rounded px-3 py-2 mb-4">
            {error}
          </p>
        )}

        {loading ? (
          <p className="text-sm text-muted">Loading patients…</p>
        ) : (
          <PatientTable
            patients={patients}
            onEdit={(p) => {
              setEditing(p);
              setFormOpen(true);
            }}
            onDelete={(p) => setDeleteTarget(p)}
          />
        )}
      </div>

      <PatientFormModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSave}
        initialData={editing}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete patient"
        message={`Remove ${deleteTarget?.name} from records? This cannot be undone.`}
      />
    </>
  );
};

export default Patients;
