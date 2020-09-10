import React, { Component } from 'react';
import TopbarComponent from '../global_components/Topbar';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { render } from 'react-dom';
import * as productAction from '../../actions/product-action';
import * as pageAction from '../../actions/page-action';
import * as customerAction from '../../actions/customerDetail-action';
import '../assets/indexsecond.css';

class ProductCustomerAddress extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            JsonResponseProvince: [],
            JsonResponseDistrict: [],
            JsonResponseSubDistrict: [],
            JsonResponseZipCode: [],
            selectProvince: '',
        };
    }

    componentDidMount() {
        this.props.PageAction.setPageID(4);
        this.loadDataProvince();
    }

    onClickConfirm = () => {
        this.props.history.goBack()
    }

    handleChangeProvince= (event) => {

        const selectedIndex = event.target.options.selectedIndex;
        console.log(event.target.options[selectedIndex].getAttribute('data-key'));

        this.setState({selectProvince: event.target.value});
        console.log(event.target.value);
    }

    loadDataProvince() {

        const url = window.WebServiceEndpoint + '/api/Product/GetProvince';

        const body = JSON.stringify({
            ProvinceCode: "",
            Lang: "TH"
        });

        console.log(url);
        axios.post(url, body, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            if (response.data !== null) {
                this.setState({ JsonResponseProvince: response.data.provinces });
                console.log(response.data.provinces);
            }

        }).catch(function (error) {
            console.log("loadData Error", error);
        });
    }

    render() {

        const province = this.state.JsonResponseProvince;

        return (
            <React.Fragment>
                <div>
                    <div className="layout" style={{ background: '#f6f7fb' }}>
                        <TopbarComponent />

                        <div className="major-navbar">
                            <div className="navbar-title">
                                ที่อยู่สำหรับจัดส่ง
                            </div>
                        </div>

                        <div className="button-row">
                            <button className="button-primary" onClick={() => this.onClickConfirm()}>
                                ยืนยัน
                            </button>
                        </div>

                        <div className="content content--scrollable">
                            <div className="pizza-address-title">ข้อมูลลูกค้า</div>
                            <div className="pizza-address-input">
                                <input type="text" placeholder="ชื่อ - นามสกุล" />
                            </div>
                            <div className="pizza-address-input">
                                <input type="tel" placeholder="เบอร์ติดต่อ" />
                            </div>
                            <div className="pizza-address-input">
                                <input type="email" placeholder="อีเมล" />
                            </div>
                            <div className="pizza-address-title">ข้อมูลที่อยู่</div>
                            <div className="pizza-address-input">
                                <select onChange={this.handleChangeProvince} value={this.state.selectProvince}>
                                    <option disabled selected>จังหวัด</option>
                                    {province.map(
                                        ({
                                            ProvinceCode,
                                            ProvinceNameTH
                                        }) => 
                                    <option data-key={ProvinceCode}>{ProvinceNameTH}</option>)}
                                </select>
                            </div>
                            <div className="pizza-address-input">
                                <select>
                                    <option>เขต/อำเภอ</option>
                                    <option>บางคอแหลม</option>
                                </select>
                            </div>
                            <div className="pizza-address-input">
                                <select>
                                    <option>ตำบล</option>
                                    <option>ตำบล</option>
                                </select>
                            </div>
                            <div className="pizza-address-input">
                                <select>
                                    <option>รหัสไปรษณีย์</option>
                                    <option>10120</option>
                                </select>
                            </div>
                            <div className="pizza-address-input">
                                <input type="text" placeholder="บ้านเลขที่" />
                            </div>
                            <div className="pizza-address-input">
                                <textarea placeholder="อธิบายข้อมูลที่อยู่เพิ่มเติม"></textarea>
                            </div>
                        </div>  {/* end content */}
                    </div>  {/* end layout */}
                </div> {/* end root */}
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    Product: state.ProductReducer,
    Customer: state.CustomerReducer
});

const mapDispatchToprops = dispatch => ({
    ProductAction: bindActionCreators(productAction, dispatch),
    PageAction: bindActionCreators(pageAction, dispatch),
    CustomerAction: bindActionCreators(customerAction, dispatch)
});

export default connect(mapStateToProps, mapDispatchToprops)(ProductCustomerAddress);