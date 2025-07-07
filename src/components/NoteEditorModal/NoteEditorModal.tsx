import { useEffect, useState } from "react";
import type { NoteEditorModalProps } from "@/components/NoteEditorModal/NoteEditorModal.types";
import MDEditor from "@uiw/react-md-editor";

const NoteEditorModal: React.FC<NoteEditorModalProps> = ({ note, onClose, onSaveAsync }) => {
  const [localNote, setLocalNote] = useState(note);

  useEffect(() => {
    setLocalNote(note);
  }, [note]);

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalNote({ ...localNote, title: e.target.value });
  };

  const handleChangeContent = (val: string | undefined) => {
    setLocalNote({ ...localNote, content: val || "" });
  };

  const handleSave = async () => await onSaveAsync(localNote);

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      className="
		    fixed
		    inset-0
		    flex
		    backdrop-blur-lg
		    items-center
		    justify-center
		    z-50">
      <div
        className="
		      bg-[var(--color-muted)]
		      max-w-2xl
		      w-full
		      rounded-xl
		      p-6">
        <div
          className="
			      flex
			      justify-between
			      items-center
			      mb-4">
          <input
            placeholder="Title"
            className="
              w-full
              text-[var(--color-bg)]
              font-semibold
              text-xl
              border-b
              focus:outline-none"
            value={localNote.title}
            onChange={handleChangeTitle}
          />
        </div>
        <MDEditor
          value={localNote.content}
          onChange={handleChangeContent}
        />
        <div
          className="
            mt-4
            flex
            justify-end
            space-x-2">
          <button
            onClick={onClose}
            className="
				      px-4
				      py-2
				      rounded
				      bg-[var(--color-text)]
				      text-[var(--color-bg)]
				      hover:bg-[var(--color-bg)]
				      hover:text-[var(--color-text)]
				      transition">
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="
			        px-4
			        py-2
			        rounded
			        bg-[var(--color-secondary)]
			        hover:bg-[var(--color-primary)]
			        text-[var(--color-bg)]
			        transition">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteEditorModal;
