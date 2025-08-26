import NoteEditorModal from "@/components/NoteEditorModal";
import { PATHS } from "@/constants/paths";
import { useAuth } from "@/hooks/useAuth";
import { noteService } from "@/services/noteService";
import type { NoteDto } from "@/types/note.types";
import { toastService } from "@/utils/toastService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewNote: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [note, setNote] = useState<NoteDto>({ content: "", title: "", uuid: "", userUuid: user?.uuid });

  const handleSave = async (note: NoteDto) => {
    const response = await noteService.createAsync(note);
    if (response?.isSuccess) {
      toastService.success(response?.message);
      setNote({ content: "", title: "", uuid: "", userUuid: user?.uuid });
    }
  };

  const handleCancel = () => {
    navigate(PATHS.HOME);
  };

  return (
    <div
      className="
        bg-[var(--color-bg)]
		    md:max-w-full
        md:min-w-fit
		    w-full
		    md:rounded-xl
        md:justify-self-center
        md:m-2
		    md:p-6
        p-4">
      <NoteEditorModal
        note={note}
        onClose={handleCancel}
        onSaveAsync={handleSave}
      />
    </div>
  );
};

export default NewNote;
