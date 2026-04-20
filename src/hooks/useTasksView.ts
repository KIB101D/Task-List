import { Filter } from "../App";

type UseTasksViewParams = {
  filter: Filter;
  activeCount: number;
  completedCount: number;
};

export const useTasksView = ({
  filter,
  activeCount,
  completedCount,
}: UseTasksViewParams) => {
  const isAll = filter === "all";
  const isActive = filter === "active";
  const isCompleted = filter === "completed";

  const isEmpty = activeCount === 0 && completedCount === 0;

  const showActive = (isAll || isActive) && activeCount > 0;

  const showCompleted = (isAll || isCompleted) && completedCount > 0;

  const showEmptyAll = isAll && isEmpty;
  const showEmptyActive = isActive && activeCount === 0;
  const showEmptyCompleted = isCompleted && completedCount === 0;

  return {
    isAll,
    isActive,
    isCompleted,
    showActive,
    showCompleted,
    showEmptyAll,
    showEmptyActive,
    showEmptyCompleted,
  };
};
