import MarkdownContent from "@/components/MarkdownContent";
import { dateOptions, type NoteCardProps } from "@/components/NoteCard/NoteCard.types";
import { Trash2 } from "lucide-react";

const NoteCard: React.FC<NoteCardProps> = ({ note, onClick, onDelete }) => {
  return (
    <div
      className="
        relative
        flex
        flex-col
        justify-between
        cursor-pointer
        bg-[var(--color-bg)]
        rounded-xl
        shadow
        border
        border-[var(--color-border)]
        hover:shadow-md
        hover:border-[var(--color-primary)]
        hover:scale-102
        max-w-80
        aspect-square
        overflow-hidden"
      onClick={onClick}>
      <h2 className="font-semibold text-lg m-2">{note.title}</h2>
      <MarkdownContent content={note.content} />
      <div
        className="
          flex
          flex-col
          bg-[var(--color-text)]
          text-[var(--color-bg)]
          text-xs
          py-2
          px-2
          w-full">
        <div>
          <label>Created At: </label>
          {note.createdAt && new Date(note.createdAt).toLocaleString(dateOptions.locales, dateOptions.options)}
        </div>
        <div>
          <label>Updated At: </label>
          {note.updatedAt && new Date(note.updatedAt).toLocaleString(dateOptions.locales, dateOptions.options)}
        </div>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}>
        <Trash2
          className="
              absolute
              right-1
              top-1
              p-2
              m-2
              min-w-10
              min-h-10
              bg-[var(--color-text)]
              text-[var(--color-bg)]
              rounded-full
              hover:text-[var(--color-bg)]
              hover:bg-red-500
              hover:scale-115"
        />
      </button>
    </div>
  );
};

export default NoteCard;
