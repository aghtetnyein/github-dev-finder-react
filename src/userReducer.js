const INITIAL_STATE = {
	loading: false,
	user: {},
	error: false,
};
const userReducer = (state, action) => {
	switch (action.type) {
		case "FETCH_START":
			return {
				loading: true,
				error: false,
				user: null,
			};
		case "FETCH_SUCCESS":
			return {
        ...state,
				loading: false,
				user: action.payload,
			};
		case "FETCH_FAIL":
			return {
				loading: false,
				error: true,
				user: null,
			};
        default:
      return state;
	}
};

export { INITIAL_STATE, userReducer };


