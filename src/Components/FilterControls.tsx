import { Filter } from "../App";

interface Props {
  filter: Filter;
  setFilter: (f: Filter) => void;
}

function FilterControls({ filter, setFilter }: Props) {
  return (
    <div className="filter-controls">
      <button
        className={`filter-button ${filter === "all" ? "active" : ""}`}
        onClick={() => setFilter("all")}
      >
        All
      </button>

      <button
        className={`filter-button ${filter === "active" ? "active" : ""}`}
        onClick={() => setFilter("active")}
      >
        Active
      </button>

      <button
        className={`filter-button ${filter === "completed" ? "active" : ""}`}
        onClick={() => setFilter("completed")}
      >
        Completed
      </button>
    </div>
  );
}

export default FilterControls;
