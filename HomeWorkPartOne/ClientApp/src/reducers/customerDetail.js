import Action from '../actions';

var initialState = {
    customerName: '',
    customerTelNo: '',
    customerEmail: '',
    provinceName: '',
    districtName: '',
    subDistrictName: '',
    zipCode: '',
    address: '',
    addressDiscription: '',
    customerDetail: []
};

function Customer(state = initialState, action) {
    switch (action.type) {
        case Action.Set_Customer_Name:
            return { ...state, customerName: action.CustomerName };
        case Action.Set_Customer_TelNo:
            return { ...state, customerTelNo: action.CustomerTelNo };
        case Action.Set_Customer_Email:
            return { ...state, customerEmail: action.CustomerEmail };
        case Action.Set_Customer_ProvinceName:
            return { ...state, provinceName: action.ProvinceName };
        case Action.Set_Customer_DistrictName:
            return { ...state, districtName: action.DistrictName };
        case Action.Set_Customer_SubDistrictName:
            return { ...state, subDistrictName: action.SubDistrictName };
        case Action.Set_Customer_ZipCode:
            return { ...state, zipCode: action.ZipCode };
        case Action.Set_Customer_Address:
            return { ...state, address: action.Address };
        case Action.Set_Customer_AddressDiscription:
            return { ...state, addressDiscription: action.AddressDiscription };
        case Action.Set_Customer_Detail:
            return { ...state, customerDetail: action.CustomerDetail };
        default:
            return state;
    }
}

export default Customer;