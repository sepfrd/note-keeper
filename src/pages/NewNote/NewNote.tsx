import { PATHS } from "@/constants/paths";
import { useAuth } from "@/hooks/useAuth";
import { noteService } from "@/services/noteService";
import type { NoteDto } from "@/types/note.types";
import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewNote: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [note, setNote] = useState<NoteDto>({ content: "", title: "", uuid: "", userUuid: user?.uuid });

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNote({ ...note, title: e.target.value });
  };

  const handleChangeContent = (val: string | undefined) => {
    setNote({ ...note, content: val || "" });
  };

  const handleSave = async () => {
    const response = await noteService.createAsync(note);
    if (typeof response === "object") {
      if (response) {
        setNote({ content: "", title: "", uuid: "", userUuid: user?.uuid });
      }
    }
  };

  const handleCancel = () => {
    navigate(PATHS.HOME);
  };

  return (
    <div
      className="
		      w-screen
			    h-screen
		      p-6">
      <div
        className="
			      flex
			      justify-between
			      items-center
			      mb-4">
        <input
          className="
              w-full
              font-semibold
              text-xl
              border-b
              focus:outline-none"
          value={note.title}
          onChange={handleChangeTitle}
        />
      </div>
      <MDEditor
        value={note.content}
        onChange={handleChangeContent}
        className="min-h-6/12"
      />
      <div
        className="
            mt-4
            flex
            justify-center
            space-x-2">
        <button
          onClick={handleCancel}
          className="
				      px-4
				      py-2
				      rounded
				      bg-[var(--color-text)]
				      text-[var(--color-bg)]
				      hover:bg-[var(--color-muted)]
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
  );
};

export default NewNote;
