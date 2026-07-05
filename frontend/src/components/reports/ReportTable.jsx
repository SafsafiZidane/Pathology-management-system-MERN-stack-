import { Eye, Trash2 } from "lucide-react";
import StatusBadge from "../ui/StatusBadge";

const ReportTable = ({ reports, onView, onDelete }) => {
  if (reports.length === 0) {
    return (
      <div className="text-center py-16 text-muted text-sm">
        No reports match this filter yet.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border border-line rounded-md bg-surface">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-muted">
            <th className="px-4 py-3 font-medium">Patient</th>
            <th className="px-4 py-3 font-medium">Tests</th>
            <th className="px-4 py-3 font-medium">Total</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Created</th>
            <th className="px-4 py-3 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((r) => (
            <tr key={r._id} className="border-b border-line last:border-0 hover:bg-canvas/60">
              <td className="px-4 py-3">
                <p className="font-medium text-ink">{r.patient?.name}</p>
                <p className="text-xs text-muted accession">{r.patient?.mobile}</p>
              </td>
              <td className="px-4 py-3 text-muted">
                {r.tests?.map((t) => t.testName).join(", ")}
              </td>
              <td className="px-4 py-3 text-muted accession">${r.totalAmount?.toFixed(2)}</td>
              <td className="px-4 py-3">
                <StatusBadge status={r.status} />
              </td>
              <td className="px-4 py-3 text-muted text-xs accession">
                {new Date(r.createdAt).toLocaleDateString()}
              </td>
              <td className="px-4 py-3">
                <div className="flex justify-end gap-1.5">
                  <button
                    onClick={() => onView(r)}
                    className="p-1.5 rounded hover:bg-teal-950 text-teal-500 transition-colors"
                    aria-label={`View report for ${r.patient?.name}`}
                  >
                    <Eye size={15} />
                  </button>
                  <button
                    onClick={() => onDelete(r)}
                    className="p-1.5 rounded hover:bg-clay-50 text-clay-400 transition-colors"
                    aria-label={`Delete report for ${r.patient?.name}`}
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

export default ReportTable;
