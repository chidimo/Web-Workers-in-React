export const reducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_ERROR":
      return { ...state, err: action.err };
    case "SET_NUMBER":
      return { ...state, num: action.num };
    case "SET_FIBO":
      return {
        ...state,
        computedFibs: [
          ...state.computedFibs,
          { id: action.id, nth: action.nth, loading: action.loading },
        ],
      };
    case "UPDATE_FIBO": {
      const curr = state.computedFibs.filter((c) => c.id === action.id)[0];
      const idx = state.computedFibs.indexOf(curr);

      curr.loading = false;
      curr.time = action.time;
      curr.fibNum = action.fibNum;

      state.computedFibs[idx] = curr;
      return { ...state };
    }
    default:
      return state;
  }
};
