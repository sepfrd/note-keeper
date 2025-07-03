import ConfirmDeleteModal from "@/components/ConfirmDeleteModal/ConfirmDeleteModal";
import NoteCard from "@/components/NoteCard";
import NoteEditorModal from "@/components/NoteEditorModal";
import { messages } from "@/constants/messages";
import { useAuth } from "@/hooks/useAuth";
import { noteService } from "@/services/noteService";
import type { NoteDto } from "@/types/note.types";
import { toastService } from "@/utils/toastService";
import { SquarePen } from "lucide-react";
import { useEffect, useState } from "react";

const Notes: React.FC = () => {
  const [notes, setNotes] = useState<NoteDto[]>();
  const [selectedNote, setSelectedNote] = useState<NoteDto | null>(null);
  const [deletedNote, setDeletedNote] = useState<NoteDto | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    loadNotesAsync();
  }, []);

  const loadNotesAsync = async () => {
    const response = await noteService.getAllAsync();
    const notes = response?.isSuccess ? response.data : null;
    if (notes) {
      setNotes(notes);
    }
  };

  const handleSaveAsync = async (note: NoteDto) => {
    if (!note.title || !note.content) {
      toastService.error(messages.validations.emptyNote);
      return;
    }

    if (note.uuid) {
      const response = await noteService.updateAsync({
        uuid: note.uuid,
        newTitle: note.title,
        newContent: note.content,
      });

      if (response?.isSuccess) {
        toastService.success(response.message);
        await loadNotesAsync();
      } else {
        toastService.error(response?.message || messages.errors.generic);
      }
    } else {
      const response = await noteService.createAsync(note);
      if (response?.isSuccess) {
        toastService.success(response.message);
        await loadNotesAsync();
      } else {
        toastService.error(response?.message || messages.errors.generic);
      }
    }

    setSelectedNote(null);
  };

  const handleDeleteAsync = async () => {
    const response = await noteService.deleteAsync(deletedNote!.uuid);

    if (response?.isSuccess) {
      toastService.success(response.message);
      await loadNotesAsync();
    } else {
      toastService.error(response?.message || messages.errors.generic);
    }

    setDeletedNote(null);
  };

  return (
    <div
      className="
        flex
        flex-col
        h-screen
        max-w-full
        justify-start">
      <button
        onClick={() => setSelectedNote({ content: "", title: "", uuid: "", userUuid: user?.uuid })}
        className="
          flex
          flex-row
          items-center
          w-max
          text-lg
          p-2
          mt-4
          ml-4
          text-[var(--color-bg)]
          bg-green-500
          hover:bg-green-400
          font-bold
          rounded-lg
          transition-all
          linear
          duration-150">
        <SquarePen
          className="
            self-start
            cursor-pointer
            mr-2"
        />
        Create
      </button>
      <div
        className="
          min-w-full
          px-4
          mt-4
          max-w-5xl
          mx-auto
          grid
          [grid-template-columns:repeat(auto-fit,minmax(15rem,1fr))]
          gap-4">
        {notes?.map((note) => (
          <NoteCard
            key={note.uuid}
            note={note}
            onClick={() => setSelectedNote(note)}
            onDelete={() => setDeletedNote(note)}
          />
        ))}
        {selectedNote && (
          <NoteEditorModal
            note={selectedNote}
            onClose={() => setSelectedNote(null)}
            onSaveAsync={handleSaveAsync}
          />
        )}

        <ConfirmDeleteModal
          isOpen={!!deletedNote}
          note={deletedNote}
          onCancel={() => setDeletedNote(null)}
          onConfirmAsync={handleDeleteAsync}
        />
      </div>
    </div>
  );
};

export default Notes;
