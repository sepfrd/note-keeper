import NoteCard from "@/components/NoteCard";
import NoteEditorModal from "@/components/NoteEditorModal";
import { noteService } from "@/services/noteService";
import type { NoteDto } from "@/types/note.types";
import { useEffect, useState } from "react";

const Notes: React.FC = () => {
  const [notes, setNotes] = useState<NoteDto[]>();
  const [selectedNote, setSelectedNote] = useState<NoteDto | null>(null);

  useEffect(() => {
    noteService.getAllAsync().then((notes) => {
      if (notes) {
        setNotes(notes);
      }
    });
  }, [selectedNote]);

  const handleSaveAsync = async (updatedNote: NoteDto) => {
    await noteService.updateAsync({
      uuid: updatedNote.uuid,
      newTitle: updatedNote.title,
      newContent: updatedNote.content,
    });

    setSelectedNote(null);
  };

  return (
    <div
      className="
      pt-20
      px-4
      max-w-5xl
      mx-auto
      grid
      grid-cols-1
      sm:grid-cols-2
      md:grid-cols-3
      gap-4">
      {notes?.map((note) => (
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
