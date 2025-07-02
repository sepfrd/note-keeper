import MarkdownContent from "@/components/MarkdownContent";
import type { NoteCardProps } from "@/components/NoteCard/NoteCard.types";
import { Trash2 } from "lucide-react";

const NoteCard: React.FC<NoteCardProps> = ({ note, onClick, onDelete }) => {
  return (
    <>
      <div
        className="
        relative
        cursor-pointer
        p-4
        pb-0
        bg-[var(--color-bg)]
        rounded-xl
        shadow
        hover:shadow-md
        border
        border-[var(--color-border)]
        transition
        min-w-3xs
        max-w-xs
        h-fit
        overflow-hidden"
        onClick={onClick}>
        <h2 className="font-semibold text-lg mb-2">{note.title}</h2>
        <MarkdownContent content={note.content} />
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
              hover:scale-115
              transition-all
              linear
              duration-150"
          />
        </button>
      </div>
    </>
  );
};

export default NoteCard;
