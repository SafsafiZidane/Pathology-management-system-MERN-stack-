import { Pencil, Trash2 } from "lucide-react";

const PatientTable = ({ patients, onEdit, onDelete }) => {
  if (patients.length === 0) {
    return (
      <div className="text-center py-16 text-muted text-sm">
        No patients match this search yet. Add a patient to get started.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border border-line rounded-md bg-surface">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-muted">
            <th className="px-4 py-3 font-medium">Name</th>
            <th className="px-4 py-3 font-medium">Age</th>
            <th className="px-4 py-3 font-medium">Gender</th>
            <th className="px-4 py-3 font-medium">Mobile</th>
            <th className="px-4 py-3 font-medium">Address</th>
            <th className="px-4 py-3 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p) => (
            <tr key={p._id} className="border-b border-line last:border-0 hover:bg-canvas/60">
              <td className="px-4 py-3 font-medium text-ink">{p.name}</td>
              <td className="px-4 py-3 text-muted accession">{p.age}</td>
              <td className="px-4 py-3 text-muted">{p.gender}</td>
              <td className="px-4 py-3 text-muted accession">{p.mobile}</td>
              <td className="px-4 py-3 text-muted max-w-xs truncate">{p.address}</td>
              <td className="px-4 py-3">
                <div className="flex justify-end gap-1.5">
                  <button
                    onClick={() => onEdit(p)}
                    className="p-1.5 rounded hover:bg-teal-50 text-teal-500 transition-colors"
                    aria-label={`Edit ${p.name}`}
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    onClick={() => onDelete(p)}
                    className="p-1.5 rounded hover:bg-clay-50 text-clay-400 transition-colors"
                    aria-label={`Delete ${p.name}`}
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

export default PatientTable;
