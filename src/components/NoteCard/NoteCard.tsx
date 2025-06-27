import MarkdownContent from "@/components/MarkdownContent";
import type { NoteCardProps } from "@/components/NoteCard/NoteCard.types";

const NoteCard: React.FC<NoteCardProps> = ({ note, onClick }) => {
  return (
    <div
      className="
        cursor-pointer
        p-4
        bg-[var(--color-bg)]
        rounded-xl
        shadow
        hover:shadow-md
        border
        border-[var(--color-border)]
        transition"
      onClick={onClick}>
      <h2 className="font-semibold text-lg mb-2">{note.title}</h2>
      <MarkdownContent content={note.content} />
    </div>
  );
};

export default NoteCard;
