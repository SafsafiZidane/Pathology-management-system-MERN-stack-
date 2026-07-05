const StatCard = ({ label, value, code, icon: Icon, tone = "teal" }) => {
  const tones = {
    teal: "text-teal-500",
    amber: "text-amber-400",
    moss: "text-moss-400",
    clay: "text-clay-400",
  };

  return (
    <div className="bg-surface border border-line rounded-md p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="accession text-[11px] text-muted">SPEC-{code}</span>
        {Icon && <Icon size={18} className={tones[tone]} strokeWidth={2} />}
      </div>
      <div className="ticket-divider" />
      <div>
        <p className="font-display text-3xl font-semibold text-ink accession">{value}</p>
        <p className="text-sm text-muted mt-1">{label}</p>
      </div>
    </div>
  );
};

export default StatCard;
