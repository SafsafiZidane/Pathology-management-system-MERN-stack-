import { useEffect, useState } from "react";
import Modal from "../ui/Modal";

const emptyForm = { testName: "", category: "", price: "", description: "" };

const TestFormModal = ({ open, onClose, onSubmit, initialData }) => {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) {
      setForm(
        initialData
          ? {
              testName: initialData.testName,
              category: initialData.category,
              price: initialData.price,
              description: initialData.description || "",
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
      await onSubmit({ ...form, price: Number(form.price) });
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Could not save test.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title={initialData ? "Edit test" : "Add test"}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">Test name</label>
          <input
            name="testName"
            required
            value={form.testName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-line rounded text-sm focus:border-teal-500 outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Category</label>
            <input
              name="category"
              required
              value={form.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-line rounded text-sm focus:border-teal-500 outline-none"
              placeholder="e.g. Hematology"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Price</label>
            <input
              name="price"
              type="number"
              min="0"
              step="0.01"
              required
              value={form.price}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-line rounded text-sm focus:border-teal-500 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">Description</label>
          <textarea
            name="description"
            rows={3}
            value={form.description}
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
            {saving ? "Saving…" : "Save test"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default TestFormModal;
