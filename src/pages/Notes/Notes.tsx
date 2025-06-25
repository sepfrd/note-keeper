import NoteCard from "@/components/NoteCard";
import NoteEditorModal from "@/components/NoteEditorModal";
import { useAuth } from "@/hooks/useAuth";
import { noteService } from "@/services/noteService";
import type { ApiResponse } from "@/types/api.types";
import type { NoteDto } from "@/types/note.types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const mockNotes: NoteDto[] = [
  { uuid: "1", title: "Welcome", content: "This is your first note!" },
  { uuid: "2", title: "Markdown", content: "You can use **Markdown** to format text." },
];

const Notes: React.FC = () => {
  const [notes, setNotes] = useState<NoteDto[]>(mockNotes);
  const [selectedNote, setSelectedNote] = useState<NoteDto | null>(null);

  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }

    noteService
      .getAllAsync({})
      .then((response) => {
        if (typeof response === "object") {
          const apiResponse = response as ApiResponse<NoteDto[]>;
          if (apiResponse.isSuccess) {
            setNotes(apiResponse.data);
          }
        }
      })
      .catch();
  }, [navigate, user, selectedNote]);

  const handleSaveAsync = async (updatedNote: NoteDto) => {
    await noteService.updateAsync({
      uuid: updatedNote.uuid,
      newTitle: updatedNote.title,
      newContent: updatedNote.content,
    });

    setSelectedNote(null);
  };

  return (
    <div className="pt-20 px-4 max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {notes.map((note) => (
        <NoteCard
          key={note.uuid}
          note={note}
          onClick={() => setSelectedNote(note)}
        />
      ))}
      {selectedNote && (
        <NoteEditorModal
          note={selectedNote}
          onClose={() => setSelectedNote(null)}
          onSaveAsync={handleSaveAsync}
        />
      )}
    </div>
  );
};

export default Notes;
