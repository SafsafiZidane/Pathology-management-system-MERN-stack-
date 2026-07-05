import Modal from "./Modal";

const ConfirmDialog = ({ open, onClose, onConfirm, title, message, confirmLabel = "Delete" }) => (
  <Modal open={open} onClose={onClose} title={title} width="max-w-sm">
    <p className="text-sm text-muted">{message}</p>
    <div className="flex justify-end gap-3 mt-6">
      <button
        onClick={onClose}
        className="px-4 py-2 text-sm rounded border border-line text-ink hover:bg-canvas transition-colors"
      >
        Cancel
      </button>
      <button
        onClick={onConfirm}
        className="px-4 py-2 text-sm rounded bg-red-700 text-white hover:bg-clay-500 transition-colors"
      >
        {confirmLabel}
      </button>
    </div>
  </Modal>
);

export default ConfirmDialog;
