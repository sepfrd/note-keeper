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
import { ArrowDownWideNarrow, ArrowLeft, ArrowRight, ArrowUpNarrowWide, FunnelPlus, FunnelX, Plus } from "lucide-react";
import { useEffect, useState } from "react";

const Notes: React.FC = () => {
  const [notes, setNotes] = useState<NoteDto[]>();
  const [selectedNote, setSelectedNote] = useState<NoteDto | null>(null);
  const [deletedNote, setDeletedNote] = useState<NoteDto | null>(null);
  const [pagination, setPagination] = useState<PaginationDto>({ pageNumber: 1, pageSize: 10 });
  const [totalPages, setTotalPages] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [shouldResetFilterPanel, setShouldResetFilterPanel] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    loadNotesAsync({ ...pagination });
  }, [pagination]);

  const loadNotesAsync = async (filters: NoteFilterDto) => {
    const response = await noteService.getAllAsync(filters);
    const notes = response?.success ? response.data : null;
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

      if (response?.success) {
        toastService.success(response.message);
        await loadNotesAsync({ ...pagination });
      } else {
        toastService.error(response?.message || messages.errors.generic);
      }
    } else {
      const response = await noteService.createAsync(note);
      if (response?.success) {
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

    if (response?.success) {
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
          md:top-18
          md:sticky
          fixed
          bottom-3
          right-2
          z-40
          w-max
          p-2
          md:p-2
          md:mt-4
          md:ml-4
          border-2
          text-(--color-text)
          bg-(--color-bg)
          border-(--color-text)
          hover:text-(--color-bg)
          hover:bg-(--color-text)
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
          hidden
          md:flex
          flex-col
          sticky
          top-18
          w-full
          z-10">
        <div
          className="
            relative
            text-(--color-text)
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
              bg-(--color-text)">
            <button
              onClick={() => setShowFilters((prev) => !prev)}
              className="
              mr-1
			        p-2
			        rounded-full
			        bg-(--color-bg)
			        hover:bg-(--color-primary)">
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
			        rounded-full
			        bg-(--color-bg)
			        hover:bg-(--color-primary)">
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
              rounded-full
              border-none
              cursor-pointer
              bg-(--color-bg)
              hover:bg-(--color-primary)
              disabled:opacity-50">
              Previous
            </button>
            <div
              className="
                text-center
                mx-4
                px-2
                py-1
                rounded-full
                border-none
                bg-(--color-bg)
                disabled:opacity-50">
              <label htmlFor="pageSize">Page Size: </label>
              <select
                name="pageSize"
                className="
                cursor-pointer
                bg-(--color-primary)
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

                  setShouldResetFilterPanel((prev) => !prev);
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
                bg-(--color-bg)
                mx-4
                px-2
                py-1
                rounded-full
                border-none
                disabled:opacity-50">
              Page{" "}
              <span>
                <select
                  name="pageNumber"
                  className="
                    cursor-pointer
                    bg-(--color-primary)
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
                border-none
                bg-(--color-bg)
                hover:bg-(--color-primary)
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
      {/* Notes */}
      <div
        className="
          mx-4
          my-4
          flex
          flex-col
          md:grid
          md:grid-cols-[repeat(auto-fit,minmax(15rem,1fr))]
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
            mt-16
		        backdrop-blur-lg
		        md:items-center
		        md:justify-center
		        z-50">
          <div
            className="
		          md:bg-(--color-muted)
              bg-(--color-bg)
		          md:max-w-2xl
		          w-full
		          md:rounded-xl
		          md:p-6
              p-4">
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
      {/* Mobile Version */}
      <div
        className="
          md:hidden
          overflow-hidden
          w-full
          justify-center
          flex
          flex-row
          sticky
          bottom-2
          z-10">
        <div
          className="
            text-(--color-text)
            flex
            flex-row
            items-center
            justify-center">
          <div
            className="
              flex
              flex-row
              border-2
              border-(--color-text)
              px-4
              py-2
              w-full
              items-center
              justify-between
              rounded-full
              bg-(--color-bg-secondary)">
            <button
              disabled={pagination.pageNumber === 1}
              onClick={() => navigateTo(pagination.pageNumber - 1)}
              className="
              text-center
              px-2
              py-1
              mr-3
              rounded-full
              border-none
              cursor-pointer
              bg-(--color-secondary)
              hover:bg-(--color-primary)
              disabled:opacity-50">
              <ArrowLeft />
            </button>
            <span
              className="
                text-center
                bg-(--color-secondary)
                rounded-full
                border-none
                px-2
                py-1
                disabled:opacity-50">
              Page <span>{pagination.pageNumber}</span> of <span>{totalPages}</span>
            </span>
            <button
              disabled={pagination.pageNumber === totalPages}
              onClick={() => navigateTo(pagination.pageNumber + 1)}
              className="
                text-center
                border-none
                px-2
                py-1
                ml-3
                bg-(--color-secondary)
                hover:bg-(--color-primary)
                rounded-full
                cursor-pointer
                disabled:opacity-50">
              <ArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notes;
