import { useEffect, useState } from "react";
import Modal from "../ui/Modal";
import StatusBadge from "../ui/StatusBadge";

const ReportDetailModal = ({ open, onClose, report, onSubmit }) => {
  const [values, setValues] = useState([]);
  const [status, setStatus] = useState("Pending");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open && report) {
      setValues(
        report.resultValues.map((rv) => ({
          test: rv.test?._id || rv.test,
          testName: rv.test?.testName || "Test",
          value: rv.value || "",
          unit: rv.unit || "",
          normalRange: rv.normalRange || "",
        }))
      );
      setStatus(report.status);
      setError("");
    }
  }, [open, report]);

  if (!report) return null;

  const updateValue = (index, field, val) => {
    setValues((prev) =>
      prev.map((v, i) => (i === index ? { ...v, [field]: val } : v))
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      await onSubmit(report._id, {
        resultValues: values.map(({ test, value, unit, normalRange }) => ({
          test,
          value,
          unit,
          normalRange,
        })),
        status,
      });
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Could not update report.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Report details" width="max-w-2xl">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex items-center justify-between border border-line rounded p-4 bg-canvas/50">
          <div>
            <p className="font-medium text-ink">{report.patient?.name}</p>
            <p className="text-xs text-muted accession mt-0.5">
              {report.patient?.mobile} · Total ${report.totalAmount?.toFixed(2)}
            </p>
          </div>
          <StatusBadge status={status} />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink mb-2">Result values</label>
          <div className="border border-line rounded divide-y divide-line">
            {values.map((v, i) => (
              <div key={v.test} className="p-3 grid grid-cols-12 gap-2 items-center">
                <span className="col-span-3 text-sm text-ink truncate">{v.testName}</span>
                <input
                  placeholder="Value"
                  value={v.value}
                  onChange={(e) => updateValue(i, "value", e.target.value)}
                  className="col-span-3 px-2 py-1.5 border border-line rounded text-sm focus:border-teal-500 outline-none"
                />
                <input
                  placeholder="Unit"
                  value={v.unit}
                  onChange={(e) => updateValue(i, "unit", e.target.value)}
                  className="col-span-2 px-2 py-1.5 border border-line rounded text-sm focus:border-teal-500 outline-none"
                />
                <input
                  placeholder="Normal range"
                  value={v.normalRange}
                  onChange={(e) => updateValue(i, "normalRange", e.target.value)}
                  className="col-span-4 px-2 py-1.5 border border-line rounded text-sm focus:border-teal-500 outline-none"
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">Report status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-3 py-2 border border-line rounded text-sm focus:border-teal-500 outline-none bg-white"
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
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
            {saving ? "Saving…" : "Save report"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ReportDetailModal;
