import type { NoteFilterPanelProps } from "@/components/NoteFilterPanel/NoteFilterPanel.types";
import { FunnelPlus, FunnelX } from "lucide-react";
import React, { useState } from "react";

const NoteFilterPanel: React.FC<{
  onApply: (filters: NoteFilterPanelProps) => void;
}> = ({ onApply }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<NoteFilterPanelProps>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetFilters = () => setFilters({});

  return (
    <div
      className="
			w-full
			text-[var(--color-bg)]
			flex
			flex-col
			items-center
			max-w-4xl
			mx-auto
			mb-4">
      <button
        onClick={() => setShowFilters((prev) => !prev)}
        className="
			px-4
			py-2
			bg-[var(--color-secondary)]
			rounded-full
			hover:bg-[var(--color-primary)]">
        {showFilters ? <FunnelX /> : <FunnelPlus />}
      </button>

      {/* Filter Panel */}
      {showFilters && (
        <div
          className="
				mt-4
				p-4
				bg-[var(--color-text)]
				rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Text Fields */}
            <input
              name="title"
              placeholder="Title"
              value={filters.title || ""}
              onChange={handleChange}
              className="border rounded px-3 py-2"
            />
            <input
              name="content"
              placeholder="Content"
              value={filters.content || ""}
              onChange={handleChange}
              className="border rounded px-3 py-2"
            />

            {/* Date Fields */}
            <input
              name="createdAtStartDate"
              type="date"
              value={filters.createdAtStartDate || ""}
              onChange={handleChange}
              className="border rounded px-3 py-2"
            />
            <input
              name="createdAtEndDate"
              type="date"
              value={filters.createdAtEndDate || ""}
              onChange={handleChange}
              className="border rounded px-3 py-2"
            />
            <input
              name="updatedAtStartDate"
              type="date"
              value={filters.updatedAtStartDate || ""}
              onChange={handleChange}
              className="border rounded px-3 py-2"
            />
            <input
              name="updatedAtEndDate"
              type="date"
              value={filters.updatedAtEndDate || ""}
              onChange={handleChange}
              className="border rounded px-3 py-2"
            />
          </div>

          {/* Actions */}
          <div className="mt-4 flex gap-4">
            <button
              onClick={() => onApply(filters)}
              className="
			  	bg-[var(--color-darker-green)]
				px-4
				py-2
				rounded-full
				hover:bg-[var(--color-lighter-green)]">
              Apply Filters
            </button>
            <button
              onClick={resetFilters}
              className="
			  	text-[var(--color-text)]
			  	bg-[var(--color-bg)]
				px-4
				py-2
				rounded-full
				hover:bg-[var(--color-muted)]">
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoteFilterPanel;
