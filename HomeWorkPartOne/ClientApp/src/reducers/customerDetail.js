import Action from '../actions';

var initialState = {
    customerDetail: []
};

function Customer(state = initialState, action) {
    switch (action.type) {
        case Action.Set_Customer_Detail:
            return { ...state, customerDetail: action.CustomerDetail };
        default:
            return state;
    }
}

export default Customer;