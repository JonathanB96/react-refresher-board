export const initialState = {
  tasks: [],
  ui: {
    isModalOpen: false,
    editingTaskId: null,
    search: "",
    priorityFilter: "all",
  },
};

export function boardReducer(state, action) {
  switch (action.type) {
    case "TASKS_INIT": {
      return { ...state, tasks: action.payload };
    }

    case "TASK_ADD": {
      return { ...state, tasks: [action.payload, ...state.tasks] };
    }

    case "TASK_DELETE": {
      const id = action.payload;
      const tasks = state.tasks.filter((t) => t.id !== id);

      const isEditingDeleted = state.ui.editingTaskId === id;

      return {
        ...state,
        tasks,
        ui: isEditingDeleted
          ? { ...state.ui, isModalOpen: false, editingTaskId: null }
          : state.ui,
      };
    }

    case "TASK_MOVE": {
      const { id, status } = action.payload;
      return {
        ...state,
        tasks: state.tasks.map((t) => (t.id === id ? { ...t, status } : t)),
      };
    }

    case "TASK_UPDATE": {
      const updated = action.payload;
      return {
        ...state,
        tasks: state.tasks.map((t) => (t.id === updated.id ? updated : t)),
      };
    }

    case "UI_OPEN_EDIT": {
      return {
        ...state,
        ui: { ...state.ui, isModalOpen: true, editingTaskId: action.payload },
      };
    }

    case "UI_CLOSE_MODAL": {
      return {
        ...state,
        ui: { ...state.ui, isModalOpen: false, editingTaskId: null },
      };
    }

    case "UI_SET_SEARCH": {
      return {
        ...state,
        ui: { ...state.ui, search: action.payload },
      };
    }

    case "UI_SET_PRIORITY": {
      return {
        ...state,
        ui: { ...state.ui, priorityFilter: action.payload },
      };
    }

    default:
      return state;
  }
}
