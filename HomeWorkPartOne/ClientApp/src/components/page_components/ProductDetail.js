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

class ProductDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            JsonResponse: [],
        };
    }

    componentDidMount() {

        this.props.PageAction.setPageID(2);
        this.loadData();
    }

    onError = (e) => {
        e.target.src = require('../assets/image/image2.jpg')
    }

    onClickSelectItem = (selectItem) => {
        this.props.ProductAction.setSelectProductItem(selectItem);
        this.props.history.push('../product-summary');
    }

    loadData() {

        const productId = this.props.Product.productID;
        const defaultProductValue = this.props.Product.defaultProductValue;
        const url = `${window.WebServiceEndpoint}/api/Product/GetProduct/${productId}`;

        axios.get(url, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            if (response.data !== null) {
                if (response.data.ProductNameEN.includes('Test') && response.data.ProductID === defaultProductValue.id) {

                    response.data.ProductNameEN = defaultProductValue.name;
                    response.data.Price = defaultProductValue.price;
                    response.data.Remark = defaultProductValue.remark;
                    response.data.DeliveryCharge = 0;
                    response.data.ProductDescTH = defaultProductValue.description;
                }
                this.setState({ JsonResponse: response.data });
            }
        }).catch(function (error) {
            console.log("loadData Error", error);
        });
    }

    render() {

        const products = this.state.JsonResponse;

        return (
            <React.Fragment>


                <div>
                    <div className="layout">
                        <TopbarComponent />
                        <div className="button-row">
                            <button className="button-primary" onClick={() => this.onClickSelectItem(products)}  >
                                เลือกสินค้า
                            </button>
                        </div>

                        <div className="content">
                            <div className="sku-product-header">
                                <div className="sku-product-slider">
                                    <div>
                                        <img src={products.ProductImgURL_EN} onError={this.onError} />
                                    </div>
                                </div>
                            </div>

                            <div className="sku-product-data">
                                <div className="sku-product-title">
                                    {products.ProductNameEN}
                                </div>

                                <div className="sku-product-price">
                                    <NumberFormat value={products.Price} displayType={'text'} thousandSeparator={true} /> บาท
                                </div>

                                <div className="sku-product-remark">
                                    <span style={{ color: '#00a6ff', fontSize: '8px', fontWeight: '500', letterSpacing: '-0.2px', backgroundColor: '#E3F6FF', padding: '2px 4px', borderRadius: '1px' }} >
                                        {products.Remark}
                                    </span>
                                </div>

                                <div className="sku-product-remark">
                                    <span style={{ color: '#15dcab', fontSize: '8px', fontWeight: '500', letterSpacing: '-0.2px', backgroundColor: '#E8FCF7', padding: '2px 4px', borderRadius: '1px' }}>
                                        <img src={require('../assets/image/sku-icon-truck@2x.png')} style={{ height: '17px', verticalAlign: 'middle' }} />
                                        <span> </span>
                                        {products.DeliveryCharge != 0 ?
                                            <NumberFormat value={products.DeliveryCharge} displayType={'text'} thousandSeparator={true} />
                                            : "ฟรี! ค่าจัดส่ง"}
                                    </span>
                                </div>
                            </div>

                            <div className="sku-product-detail">

                                <div className="sku-product-detail-title">รายละเอียดสินค้า</div>

                                <div className="sku-product-detail-content">
                                    <p dangerouslySetInnerHTML={{ __html: products.ProductDescTH }} />
                                </div>
                            </div>

                        </div> {/* end content */}
                    </div> {/*end layout */}
                </div> {/* end root */}
            </React.Fragment >
        )
    }
}

const mapStateToProps = state => ({
    Product: state.ProductReducer
});

const mapDispatchToprops = dispatch => ({
    ProductAction: bindActionCreators(productAction, dispatch),
    PageAction: bindActionCreators(pageAction, dispatch)
});

export default connect(mapStateToProps, mapDispatchToprops)(ProductDetail);
