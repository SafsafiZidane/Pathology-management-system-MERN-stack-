import { Pencil, Trash2 } from "lucide-react";

const TestTable = ({ tests, onEdit, onDelete }) => {
  if (tests.length === 0) {
    return (
      <div className="text-center py-16 text-muted text-sm">
        No tests in the catalog yet. Add one to get started.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border border-line rounded-md bg-surface">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-muted">
            <th className="px-4 py-3 font-medium">Test name</th>
            <th className="px-4 py-3 font-medium">Category</th>
            <th className="px-4 py-3 font-medium">Price</th>
            <th className="px-4 py-3 font-medium">Description</th>
            <th className="px-4 py-3 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tests.map((t) => (
            <tr key={t._id} className="border-b border-line last:border-0 hover:bg-canvas/60">
              <td className="px-4 py-3 font-medium text-ink">{t.testName}</td>
              <td className="px-4 py-3 text-muted">
                <span className="px-2 py-0.5 rounded-full bg-teal-50 text-teal-500 text-xs">
                  {t.category}
                </span>
              </td>
              <td className="px-4 py-3 text-muted accession">${t.price.toFixed(2)}</td>
              <td className="px-4 py-3 text-muted max-w-xs truncate">{t.description || "—"}</td>
              <td className="px-4 py-3">
                <div className="flex justify-end gap-1.5">
                  <button
                    onClick={() => onEdit(t)}
                    className="p-1.5 rounded hover:bg-teal-50 text-teal-500 transition-colors"
                    aria-label={`Edit ${t.testName}`}
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    onClick={() => onDelete(t)}
                    className="p-1.5 rounded hover:bg-clay-50 text-clay-400 transition-colors"
                    aria-label={`Delete ${t.testName}`}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TestTable;
