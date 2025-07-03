import type { ConfirmDeleteModalProps } from "@/components/ConfirmDeleteModal/ConfirmDeleteModal.types";

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({ isOpen, note, onCancel, onConfirmAsync }) => {
  if (!isOpen) {
    return null;
  }

  const handleConfirmAsync = async () => {
    await onConfirmAsync(note!);
    onCancel();
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onCancel();
        }
      }}
      className="
		    fixed
		    inset-0
		    z-50
		    flex
		    items-center
		    justify-center
		    backdrop-blur-lg">
      <div
        className="
	  		bg-[var(--color-bg)]
			rounded-xl
			border-2
			border-[var(--color-border)]
			shadow-xl
			max-w-sm
			w-full
			p-6">
        <h2
          className="
		  	text-lg
			font-semibold">
          Delete Note
        </h2>
        <p
          className="
			mt-2
			">
          Are you sure you want to delete <span className="font-medium">{note!.title}</span>?
        </p>

        <div
          className="
			mt-4
			flex
			justify-end
			gap-2">
          <button
            onClick={onCancel}
            className="
				px-4
				py-2
				rounded-lg
				text-[var(--color-white)]
				bg-[var(--color-secondary)]
				hover:bg-[var(--color-primary)]">
            Cancel
          </button>
          <button
            onClick={handleConfirmAsync}
            className="
				px-4
				py-2
				rounded-lg
				text-[var(--color-white)]
				bg-red-800
				hover:bg-red-700">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
