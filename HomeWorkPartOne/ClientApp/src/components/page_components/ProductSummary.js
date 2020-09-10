import React, { Component } from 'react';
import TopbarComponent from '../global_components/Topbar';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { render } from 'react-dom';
import * as productAction from '../../actions/product-action';
import * as pageAction from '../../actions/page-action';
import '../assets/indexsecond.css';
import NumberFormat from 'react-number-format';

class ProductSummary extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            disCountPrice: 100,
            customerDetail: []
        };
    }

    componentDidMount() {
        this.props.PageAction.setPageID(3);

    }

    onError = (e) => {
        e.target.src = require('../assets/image/image2.jpg')
    }

    onClickRemove = () => {
        this.props.ProductAction.setSelectProductItem(null);
    }

    render() {

        const selectProduct = this.props.Product.selectProductItem;
        console.log(selectProduct);
        const customerList = this.state.customerDetail;

        return (
            <React.Fragment>

                <div>
                    <div class="layout" style={{ background: '#f6f7fb' }}>
                        <TopbarComponent />
                        <div className="major-navbar">
                            <div className="navbar-title" style={{ color: '#3a3433' }}>
                                สรุปรายการ
                            </div>
                        </div>

                        <div className="button-row">
                            <button className="button-primary">
                                ชำระเงิน
                            </button>
                        </div>

                        <div className="content content--scrollable">
                            <div className="pizza-detail-title">ที่อยู่สำหรับจัดส่ง</div>

                            {this.state.customerDetail.length === 0 ?
                                <div className="pizza-address-card pizza-address-card--no-address">
                                    <div className="pizza-address-card-icon"></div>
                                    <div className="pizza-address-card-instruction">
                                        ระบุที่อยู่จัดส่ง
                                    </div>
                                </div>
                                :
                                <div className="pizza-address-card">
                                    <div className="pizza-address-card-icon"></div>
                                    <div className="pizza-address-card-name">
                                        นลิดา สมวัน
                                    </div>
                                    {/*<a href="sku-address.html">*/}
                                    <div className="pizza-address-card-action">
                                        เลือกที่อยู่อื่น
                                    </div>
                                    {/*</a>*/}
                                    <div className="pizza-address-card-mobile">
                                        099 999 9999
                                    </div>
                                    <div className="pizza-address-card-email">
                                        nalida@krungsri.com
                                    </div>
                                    <div className="pizza-address-card-address">
                                        295/44 ถนน พระราม3 แขวง บางคอแหลม เขต บางคอแหลม กรุงเทพมหานคร 10120
                                    </div>
                                    <div className="pizza-address-card-additional-title">
                                        ข้อมูลที่อยู่เพิ่มเติม
                                    </div>
                                    <div className="pizza-address-card-additional-detail">
                                        ปากซอยอยู่มีเซเว่นอยู่ ตรงข้ามเซเว่นเป็นบ้านสำหรับจัดส่ง
                                    </div>
                                </div>
                            }

                            <div className="pizza-detail-title">รายการสินค้า</div>

                            {selectProduct === null ?
                                null
                                :
                                <div className="pizza-item-card">
                                    <div className="pizza-item-card-head">
                                        <div className="pizza-item-card-image">
                                            <img src={selectProduct.ProductImgURL_EN} onError={this.onError} />
                                        </div>

                                        <div className="pizza-item-card-title">
                                            {selectProduct.ProductNameEN}
                                        </div>

                                        <div className="pizza-item-card-remarks">
                                            <span style={{ color: '#00a6ff', fontSize: '8px', fontWeight: '500', letterSpacing: '-0.2px', backgroundColor: '#E3F6FF', padding: '2px 4px', borderRadius: '1px' }}>
                                                {selectProduct.Remark}
                                            </span>
                                        </div>

                                        <div className="pizza-item-card-commands">
                                            <a className="pizza-item-card-commands-delete" onClick={this.onClickRemove}>ลบรายการ</a>
                                    |
                                    <span className="pizza-item-card-commands-detail">รายละเอียดสินค้า</span>
                                        </div>

                                        <div className="pizza-item-card-total">
                                            <NumberFormat value={selectProduct.Price} displayType={'text'} thousandSeparator={true} /> บาท
                                    </div>

                                        <div className="pizza-item-card-quantity">จำนวน 1 ชิ้น</div>
                                    </div>

                                    <div className="pizza-item-card-detail">
                                        <div className="pizza-item-card-detail-text">
                                            <p dangerouslySetInnerHTML={{ __html: selectProduct.ProductDescTH }} />
                                        </div>
                                    </div>
                                </div>
                            }

                            <div className="pizza-summary">

                                <div className="pizza-summary-row">
                                    <div className="pizza-summary-row-title">ค่าจัดส่ง</div>
                                    <div className="pizza-summary-row-detail">
                                        {selectProduct === null ?
                                            0
                                            : selectProduct.DeliveryCharge
                                        } บาท
                                    </div>
                                </div>

                                <div className="pizza-summary-row">
                                    <div className="pizza-summary-row-title">ส่วนลดพิเศษ</div>
                                    <div className="pizza-summary-row-detail pizza-redtext">- {this.state.disCountPrice} บาท</div>
                                </div>

                                <div className="pizza-summary-row">
                                    <div className="pizza-summarybox-title">
                                        ราคาทั้งหมด
                                </div>
                                    <div className="pizza-summarybox-total">
                                        <NumberFormat value={
                                            selectProduct === null ?
                                                0
                                                :
                                                ((selectProduct.Price + selectProduct.DeliveryCharge) - this.state.disCountPrice)
                                        }
                                            displayType={'text'} thousandSeparator={true} /> บาท
                                    </div>
                                </div>

                            </div>

                        </div>  {/* end content */}
                    </div>  {/* end layout */}
                </div> {/* end root */}

            </React.Fragment >
        )
    }
}

const mapStateToProps = state => ({
    Product: state.ProductReducer,
    Customer: state.CustomerReducer
});

const mapDispatchToprops = dispatch => ({
    ProductAction: bindActionCreators(productAction, dispatch),
    PageAction: bindActionCreators(pageAction, dispatch)
});

export default connect(mapStateToProps, mapDispatchToprops)(ProductSummary);