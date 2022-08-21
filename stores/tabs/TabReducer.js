import * as TabActionTypes from './TabActions';
const intialState = {
	selectedTab: 'Home',
};

const tabReducer = (state = intialState, action) => {
	console.log(action);
	switch (action.type) {
		case TabActionTypes.SET_SELECTED_TAB:
			return {
				...state,
				selectedTab: action.payload.selectedTab,
			};

		default:
			return state;
	}
};
export default tabReducer;
