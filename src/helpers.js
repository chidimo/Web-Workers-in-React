export const ordinal_suffix = (num) => {
  // 1st, 2nd, 3rd, 4th, etc.
  const j = num % 10;
  const k = num % 100;
  switch (true) {
    case j === 1 && k !== 11:
      return num + "st";
    case j === 2 && k !== 12:
      return num + "nd";
    case j === 3 && k !== 13:
      return num + "rd";
    default:
      return num + "th";
  }
};

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
