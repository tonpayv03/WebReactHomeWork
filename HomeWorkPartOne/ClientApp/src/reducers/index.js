import { combineReducers } from 'redux';

import Product from './product';
import Page from './page';
import Customer from './customerDetail';

export default combineReducers({
    ProductReducer: Product,
    PageReducer: Page,
    CustomerReducer: Customer
    // name props ที่ไว้สำหรับให้คนอื่นเรียกใช้ : ชื่อที่ import เข้ามา
});