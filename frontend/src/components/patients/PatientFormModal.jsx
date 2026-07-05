import { useEffect, useState } from "react";
import Modal from "../ui/Modal";

const emptyForm = { name: "", age: "", gender: "Male", mobile: "", address: "" };

const PatientFormModal = ({ open, onClose, onSubmit, initialData }) => {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) {
      setForm(
        initialData
          ? {
              name: initialData.name,
              age: initialData.age,
              gender: initialData.gender,
              mobile: initialData.mobile,
              address: initialData.address,
            }
          : emptyForm
      );
      setError("");
    }
  }, [open, initialData]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      await onSubmit({ ...form, age: Number(form.age) });
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Could not save patient.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title={initialData ? "Edit patient" : "Add patient"}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">Full name</label>
          <input
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-line rounded text-sm focus:border-teal-500 outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Age</label>
            <input
              name="age"
              type="number"
              min="0"
              max="150"
              required
              value={form.age}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-line rounded text-sm focus:border-teal-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Gender</label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-line rounded text-sm focus:border-teal-500 outline-none bg-white"
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">Mobile number</label>
          <input
            name="mobile"
            required
            pattern="[0-9]{10}"
            title="10-digit mobile number"
            value={form.mobile}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-line rounded text-sm focus:border-teal-500 outline-none"
            placeholder="10-digit number"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">Address</label>
          <textarea
            name="address"
            required
            rows={2}
            value={form.address}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-line rounded text-sm focus:border-teal-500 outline-none resize-none"
          />
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
            {saving ? "Saving…" : "Save patient"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default PatientFormModal;
