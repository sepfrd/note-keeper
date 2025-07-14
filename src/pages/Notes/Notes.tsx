import ConfirmDeleteModal from "@/components/ConfirmDeleteModal/ConfirmDeleteModal";
import NoteCard from "@/components/NoteCard";
import NoteEditorModal from "@/components/NoteEditorModal";
import NoteFilterPanel from "@/components/NoteFilterPanel";
import NoteSortPanel from "@/components/NoteSortPanel";
import type { NoteSort } from "@/components/NoteSortPanel/NoteSortPanel.types";
import { messages } from "@/constants/messages";
import { useAuth } from "@/hooks/useAuth";
import { noteService } from "@/services/noteService";
import type { NoteDto, NoteFilterDto } from "@/types/note.types";
import type { PaginationDto } from "@/types/pagination.types";
import { toastService } from "@/utils/toastService";
import { ArrowDownWideNarrow, ArrowUpNarrowWide, FunnelPlus, FunnelX, Plus } from "lucide-react";
import { useEffect, useState } from "react";

const Notes: React.FC = () => {
  const [notes, setNotes] = useState<NoteDto[]>();
  const [selectedNote, setSelectedNote] = useState<NoteDto | null>(null);
  const [deletedNote, setDeletedNote] = useState<NoteDto | null>(null);
  const [pagination, setPagination] = useState<PaginationDto>({ pageNumber: 1, pageSize: 10 });
  const [totalPages, setTotalPages] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [shouldResetFilterPanel, setshouldResetFilterPanel] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    loadNotesAsync({ ...pagination });
  }, [pagination]);

  const loadNotesAsync = async (filters: NoteFilterDto) => {
    const response = await noteService.getAllAsync(filters);
    const notes = response?.isSuccess ? response.data : null;
    if (notes) {
      setNotes(notes);
      setTotalPages(Math.ceil(response!.totalCount / (filters.pageSize || 10)));
    }
  };

  function sortNotes(notes: NoteDto[], sort: NoteSort): NoteDto[] {
    return [...notes].sort((a, b) => {
      if (sort.field === "none") {
        return 0;
      }

      let aValue = a[sort.field];
      let bValue = b[sort.field];

      if (aValue == null && bValue == null) {
        return 0;
      }
      if (aValue == null) {
        return 1;
      }
      if (bValue == null) {
        return -1;
      }

      if (sort.field === "createdAt" || sort.field === "updatedAt") {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (aValue < bValue) {
        return sort.direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sort.direction === "asc" ? 1 : -1;
      }

      return 0;
    });
  }

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
        await loadNotesAsync({ ...pagination });
      } else {
        toastService.error(response?.message || messages.errors.generic);
      }
    } else {
      const response = await noteService.createAsync(note);
      if (response?.isSuccess) {
        toastService.success(response.message);
        await loadNotesAsync({ ...pagination });
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
      await loadNotesAsync({ ...pagination });
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
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setShowFilters(false);
          setShowSort(false);
        }
      }}
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
          text-[var(--color-alice-blue)]
          bg-[var(--color-secondary)]
          hover:bg-[var(--color-primary)]
          hover:text-[var(--color-gunmetal)]
          hover:scale-110
          rounded-full">
        <Plus
          className="
            self-start
            cursor-pointer"
        />
      </button>
      {/* Pagination */}
      <div
        className="
          flex
          flex-col
          sticky
          top-18
          z-10">
        <div
          className="
            relative
            text-[var(--color-alice-blue)]
            flex
            w-full
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
              onClick={() => setShowFilters((prev) => !prev)}
              className="
              mr-1
			        p-2
			        bg-[var(--color-secondary)]
			        rounded-full
			        hover:bg-[var(--color-primary)]">
              {showFilters ? <FunnelX /> : <FunnelPlus className="max-h-fit" />}
            </button>
            <button
              onClick={() => {
                setShowSort((prev) => !prev);
                return;
              }}
              className="
              ml-1
			        p-2
			        bg-[var(--color-secondary)]
			        rounded-full
			        hover:bg-[var(--color-primary)]">
              {showSort ? <ArrowUpNarrowWide /> : <ArrowDownWideNarrow className="max-h-fit" />}
            </button>
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

                  setshouldResetFilterPanel((prev) => !prev);
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
          className={`
            flex
            flex-col
            items-center
            absolute
            top-full
            right-0
            left-0
            ${showFilters ? "opacity-100 max-h-fit pointer-events-auto" : "opacity-0 max-h-0 pointer-events-none"}`}>
          <NoteFilterPanel
            onApply={(filters) => loadNotesAsync({ ...filters, ...pagination } as NoteFilterDto)}
            shouldReset={shouldResetFilterPanel}
          />
        </div>
        <div
          className={`
            flex
            flex-col
            items-center
            absolute
            top-full
            right-0
            left-0
            ${showSort ? "opacity-100 max-h-fit pointer-events-auto" : "opacity-0 max-h-0 pointer-events-none"}`}>
          <NoteSortPanel
            onApply={(sort) => {
              if (notes && sort.field !== "none") {
                const sortedNotes = sortNotes(notes, sort);
                setNotes(sortedNotes);
              }
            }}
            onCancel={() => setShowSort(false)}
          />
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
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedNote(null);
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
            <NoteEditorModal
              note={selectedNote}
              onClose={() => setSelectedNote(null)}
              onSaveAsync={handleSaveAsync}
            />
          </div>
        </div>
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
