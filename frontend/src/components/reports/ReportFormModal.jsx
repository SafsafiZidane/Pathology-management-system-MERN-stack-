import { useEffect, useState } from "react";
import Modal from "../ui/Modal";
import axiosInstance from "../../api/axiosInstance";

const ReportFormModal = ({ open, onClose, onSubmit }) => {
  const [patients, setPatients] = useState([]);
  const [tests, setTests] = useState([]);
  const [patientId, setPatientId] = useState("");
  const [selectedTests, setSelectedTests] = useState([]);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;
    setError("");
    setPatientId("");
    setSelectedTests([]);

    const loadOptions = async () => {
      try {
        const [patientsRes, testsRes] = await Promise.all([
          axiosInstance.get("/patients"),
          axiosInstance.get("/tests"),
        ]);
        setPatients(patientsRes.data.data);
        setTests(testsRes.data.data);
      } catch (err) {
        setError("Failed to load patients or tests.");
      }
    };
    loadOptions();
  }, [open]);

  const toggleTest = (id) => {
    setSelectedTests((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!patientId) {
      setError("Select a patient.");
      return;
    }
    if (selectedTests.length === 0) {
      setError("Select at least one test.");
      return;
    }

    setSaving(true);
    try {
      await onSubmit({ patient: patientId, tests: selectedTests });
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Could not create report.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Assign tests to patient" width="max-w-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">Patient</label>
          <select
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            className="w-full px-3 py-2 border border-line rounded text-sm focus:border-teal-500 outline-none bg-white"
          >
            <option value="">Select a patient…</option>
            {patients.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name} — {p.mobile}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-ink mb-2">Tests to assign</label>
          <div className="border border-line rounded max-h-56 overflow-y-auto divide-y divide-line">
            {tests.length === 0 && (
              <p className="text-sm text-muted px-3 py-3">No tests in catalog yet.</p>
            )}
            {tests.map((t) => (
              <label
                key={t._id}
                className="flex items-center justify-between gap-3 px-3 py-2.5 text-sm cursor-pointer hover:bg-canvas/60"
              >
                <span className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={selectedTests.includes(t._id)}
                    onChange={() => toggleTest(t._id)}
                    className="accent-teal-500"
                  />
                  <span>
                    <span className="text-ink">{t.testName}</span>{" "}
                    <span className="text-muted text-xs">({t.category})</span>
                  </span>
                </span>
                <span className="accession text-muted text-xs">${t.price.toFixed(2)}</span>
              </label>
            ))}
          </div>
        </div>

        {error && (
          <p className="text-sm text-clay-400 bg-clay-50 border border-clay-400/20 rounded px-3 py-2">
            {error}
          </p>
        )}

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm rounded border border-line text-ink hover:bg-canvas transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 text-sm rounded bg-teal-950 text-white hover:bg-teal-600 transition-colors disabled:opacity-60"
          >
            {saving ? "Creating…" : "Create report"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ReportFormModal;
