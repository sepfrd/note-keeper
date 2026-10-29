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
        bg-(--color-bg-secondary)
        justify-between
        cursor-pointer
        rounded-xl
        shadow
        border
        border-(--color-border)
        hover:shadow-md
        hover:border-(--color-primary)
        hover:scale-102
        w-full
        max-h-[30vh]
        md:max-w-80
        md:aspect-square
        overflow-hidden"
      onClick={onClick}>
      <h2 className="font-semibold text-lg m-2">{note.title}</h2>
      <MarkdownContent content={note.content} />
      <div
        className="
          flex
          flex-col
          bg-(--color-text)
          text-(--color-bg)
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
              bg-(--color-text)
              text-(--color-bg)
              rounded-full
              hover:text-(--color-bg)
              hover:bg-(--color-highlight)
              hover:scale-115"
        />
      </button>
    </div>
  );
};

export default NoteCard;
