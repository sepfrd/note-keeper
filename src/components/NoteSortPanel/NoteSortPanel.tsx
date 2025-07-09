import React, { useState } from "react";
import type { NoteSort, NoteSortPanelProps, SortDirection, SortField } from "./NoteSortPanel.types";

const NoteSortPanel: React.FC<NoteSortPanelProps> = (props) => {
  const [sort, setSort] = useState<NoteSort>({ field: "createdAt", direction: "desc" });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSort({ ...sort, [name]: value as SortField | SortDirection });
  };

  return (
    <div
      className="
        p-4
        text-[var(--color-bg)]
        bg-[var(--color-text)]
        rounded-lg
        w-max">
      <div className="flex flex-col">
        <div
          className="
                grid
                grid-cols-[5rem_1fr]
                gap-2
                w-full
                my-2
                items-center">
          <label className="pr-4">Sort By:</label>
          <select
            name="field"
            value={sort.field}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-fit text-left">
            <option value="title">Title</option>
            <option value="createdAt">Created At</option>
            <option value="updatedAt">Updated At</option>
          </select>
        </div>
        <div
          className="
            grid
            grid-cols-[5rem_1fr]
            gap-2
            w-full
            my-2
            items-center">
          <label className="pr-4">Direction:</label>
          <select
            name="direction"
            value={sort.direction}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-fit text-left">
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
      {/* Actions */}
      <div className="mt-4 flex flex-row gap-2 justify-start">
        <button
          disabled={sort.field === "none"}
          onClick={() => props.onApply(sort)}
          className="
              text-[var(--color-alice-blue)]
              bg-[var(--color-secondary)]
				      px-4
				      py-2
				      rounded-full
				      hover:bg-[var(--color-primary)]
              disabled:opacity-50">
          Apply Filters
        </button>
        <button
          onClick={props.onCancel}
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
  );
};

export default NoteSortPanel;
