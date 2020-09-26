import Action from '../actions';

var initialState = {
    productList: [],
    productID: 0,
    selectProductItem: [],
    defaultProductValue: []
};

function Product(state = initialState, action) {
    switch (action.type) {
        case Action.Set_Product_List:
            return { ...state, productList: action.ProductList };
        case Action.Set_Product_ID:
            return { ...state, productID: action.ProductID };
        case Action.Set_Select_Product_Item:
            return { ...state, selectProductItem: action.SelectProductItem };
        case Action.Set_Default_Product_Value:
            return { ...state, defaultProductValue: action.DefaultProductValue };
        // { ...state, name of storeState: action.nameprops }
        // เอา data จาก action.props มา setState ให้ storeState
        // test
        default:
            return state;
    }
}

export default Product;