import ConfirmDeleteModal from "@/components/ConfirmDeleteModal/ConfirmDeleteModal";
import NoteCard from "@/components/NoteCard";
import NoteEditorModal from "@/components/NoteEditorModal";
import { messages } from "@/constants/messages";
import { useAuth } from "@/hooks/useAuth";
import { noteService } from "@/services/noteService";
import type { NoteDto } from "@/types/note.types";
import type { PaginationDto } from "@/types/pagination.types";
import { toastService } from "@/utils/toastService";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

const Notes: React.FC = () => {
  const [notes, setNotes] = useState<NoteDto[]>();
  const [selectedNote, setSelectedNote] = useState<NoteDto | null>(null);
  const [deletedNote, setDeletedNote] = useState<NoteDto | null>(null);
  const { user } = useAuth();
  const [pagination, setPagination] = useState<PaginationDto>({ pageNumber: 1, pageSize: 10 });
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    loadNotesAsync(pagination);
  }, [pagination]);

  const loadNotesAsync = async (pagination: PaginationDto) => {
    const response = await noteService.getAllAsync(pagination);
    const notes = response?.isSuccess ? response.data : null;
    if (notes) {
      setNotes(notes);
      setTotalPages(Math.ceil(response!.totalCount / pagination.pageSize));
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
        await loadNotesAsync(pagination);
      } else {
        toastService.error(response?.message || messages.errors.generic);
      }
    } else {
      const response = await noteService.createAsync(note);
      if (response?.isSuccess) {
        toastService.success(response.message);
        await loadNotesAsync(pagination);
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
      await loadNotesAsync(pagination);
    } else {
      toastService.error(response?.message || messages.errors.generic);
    }

    setDeletedNote(null);
  };

  const navigateTo = (page: number) => {
    if (page === 0 || page > totalPages || page < 0) {
      return;
    }

    setPagination((prev) => ({
      ...prev,
      pageNumber: page,
    }));

    window.scrollTo(0, 0);
  };

  return (
    <div
      className="
        flex
        flex-col
        max-w-full
        justify-start">
      <button
        onClick={() => setSelectedNote({ content: "", title: "", uuid: "", userUuid: user?.uuid })}
        className="
          sticky
          top-18
          z-40
          w-max
          p-2
          mt-4
          ml-4
          text-[var(--color-bg)]
          bg-[var(--color-secondary)]
          hover:bg-[var(--color-primary)]
          hover:scale-110
          rounded-full
          transition-all
          linear
          duration-100">
        <Plus
          className="
            self-start
            cursor-pointer"
        />
      </button>
      <div
        className="
            text-[var(--color-alice-blue)]
            flex
            sticky
            top-18
            w-full
            z-10
            flex-row
            items-center
            justify-center
            my-2">
        <div
          className="
              flex
              flex-row
              items-center
              justify-between
              p-2
              rounded-full
              bg-[var(--color-text)]">
          <button
            disabled={pagination.pageNumber === 1}
            onClick={() => navigateTo(pagination.pageNumber - 1)}
            className="
              text-center
              mx-4
              px-2
              py-1
              min-w-[8rem]
              rounded-full
              border-none
              cursor-pointer
              bg-[var(--color-secondary)]
              hover:bg-[var(--color-primary)]
              disabled:opacity-50">
            Previous
          </button>
          <div
            className="
                text-center
                mx-4
                px-2
                py-1
                min-w-[8rem]
                rounded-full
                border-none
                bg-[var(--color-secondary)]
                disabled:opacity-50">
            <label htmlFor="pageSize">Page Size: </label>
            <select
              name="pageSize"
              className="
                cursor-pointer
                bg-[var(--color-primary)]
                border-none
                rounded-full"
              id="pageSize"
              onChange={(e) => {
                const value = Number(e.target.value);

                if (!isNaN(value)) {
                  setPagination({
                    pageNumber: 1,
                    pageSize: value,
                  });
                }
              }}>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
          <span
            className="
                text-center
                bg-[var(--color-secondary)]
                mx-4
                px-2
                py-1
                min-w-[8rem]
                rounded-full
                border-none
                disabled:opacity-50">
            Page{" "}
            <span>
              <select
                name="pageNumber"
                className="
                cursor-pointer
                bg-[var(--color-primary)]
                border-none
                rounded-full"
                id="pageNumber"
                value={pagination.pageNumber}
                onChange={(e) => {
                  const value = Number(e.target.value);

                  if (!isNaN(value)) {
                    setPagination({
                      ...pagination,
                      pageNumber: value,
                    });
                  }
                }}>
                {Array.from({ length: totalPages }, (_, i) => (
                  <option
                    key={i + 1}
                    value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </span>{" "}
            of <span>{totalPages}</span>
          </span>
          <button
            disabled={pagination.pageNumber === totalPages}
            onClick={() => navigateTo(pagination.pageNumber + 1)}
            className="
                text-center
                mx-4
                px-2
                py-1
                min-w-[8rem]
                border-none
                bg-[var(--color-secondary)]
                hover:bg-[var(--color-primary)]
                rounded-full
                cursor-pointer
                disabled:opacity-50">
            Next
          </button>
        </div>
      </div>
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
      </div>
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
  );
};

export default Notes;
