import type { NoteEditorModalProps } from "@/components/NoteEditorModal/NoteEditorModal.types";
import MDEditor from "@uiw/react-md-editor";
import { useEffect, useState } from "react";

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
    <div>
      <div
        className="
            w-full
            h-full
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
            justify-center
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
				      hover:text-[var(--color-text)]">
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
			        text-[var(--color-bg)]">
          Save
        </button>
      </div>
    </div>
  );
};

export default NoteEditorModal;
