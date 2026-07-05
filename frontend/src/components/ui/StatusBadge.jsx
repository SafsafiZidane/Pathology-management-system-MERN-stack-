const styles = {
  Pending: "bg-amber-50 text-amber-500 border-amber-400/30",
  Completed: "bg-moss-50 text-moss-500 border-moss-400/30",
};

const StatusBadge = ({ status }) => (
  <span
    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
      styles[status] || "bg-gray-100 text-gray-600 border-gray-300"
    }`}
  >
    {status}
  </span>
);

export default StatusBadge;
