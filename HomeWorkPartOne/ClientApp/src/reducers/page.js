import Action from '../actions';

var initialState = {
    pageID: 0
};

function Page(state = initialState, action) {
    switch (action.type) {
        case Action.Set_Page_ID:
            return { ...state, pageID: action.PageID };
        default:
            return state;
    }
}

export default Page;