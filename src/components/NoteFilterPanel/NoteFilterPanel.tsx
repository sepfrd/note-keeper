import type { NoteFilterPanelProps, NoteFilters } from "@/components/NoteFilterPanel/NoteFilterPanel.types";
import React, { useEffect, useState } from "react";

const NoteFilterPanel: React.FC<NoteFilterPanelProps> = (props) => {
  const [filters, setFilters] = useState<NoteFilters>({});

  useEffect(() => {
    resetFilters();
  }, [props.shouldReset]);

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
          items-center">
      {/* Filter Panel */}
      <div
        className="
				  mt-4
				  p-4
				  bg-[var(--color-text)]
				  rounded-lg">
        <div
          className="
            flex
            flex-col
            justify-between
            items-center">
          {/* Text Fields */}
          <div
            className="
              grid
              items-center
              grid-cols-[5rem_1fr]
              my-1
              w-full">
            <label className="mr-4 text-left">Title:</label>
            <input
              name="title"
              placeholder="Title"
              value={filters.title || ""}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
            />
          </div>
          <div
            className="
              grid
              items-center
              my-1
              grid-cols-[5rem_1fr]
              w-full">
            <label className="mr-4 text-left">Content:</label>
            <input
              name="content"
              placeholder="Content"
              value={filters.content || ""}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
            />
          </div>
          {/* Date Fields */}
          <div className="flex flex-col w-full">
            <div
              className="
                grid
                grid-cols-[repeat(5,auto)]
                gap-2
                w-full
                my-2
                items-center">
              <label>Created At</label>
              <label className="text-[var(--color-muted)]">from</label>
              <input
                name="createdAtStartDate"
                type="datetime-local"
                value={filters.createdAtStartDate || ""}
                onChange={handleChange}
                className="border rounded px-3 py-2"
              />
              <label className="text-[var(--color-muted)]">to</label>
              <input
                name="createdAtEndDate"
                type="datetime-local"
                value={filters.createdAtEndDate || ""}
                onChange={handleChange}
                className="border rounded px-3 py-2"
              />
            </div>
            <div
              className="
                flex
                flex-row
                w-full
                my-2
                items-center
                justify-between">
              <label>Updated At</label>
              <label className="text-[var(--color-muted)]">from</label>
              <input
                name="updatedAtStartDate"
                type="datetime-local"
                value={filters.updatedAtStartDate || ""}
                onChange={handleChange}
                className="border rounded px-3 py-2"
              />
              <label className="text-[var(--color-muted)]">to</label>
              <input
                name="updatedAtEndDate"
                type="datetime-local"
                value={filters.updatedAtEndDate || ""}
                onChange={handleChange}
                className="border rounded px-3 py-2"
              />
            </div>
          </div>
        </div>
        {/* Actions */}
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => props.onApply(filters)}
            className="
              text-[var(--color-alice-blue)]
              bg-[var(--color-secondary)]
				      px-4
				      py-2
				      rounded-full
				      hover:bg-[var(--color-primary)]">
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
    </div>
  );
};

export default NoteFilterPanel;
