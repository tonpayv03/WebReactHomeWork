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
import { map } from 'jquery';

class ProductCustomerAddress extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            JsonResponseProvince: [],
            JsonResponseDistrict: [],
            JsonResponseSubDistrict: [],
            JsonResponseZipCode: [],
            Name: '',
            TelNo: '',
            Email: '',
            Province: '',
            District: '',
            SubDistrict: '',
            ZipCode: '',
            Address: '',
            AddressDescription: '',

            ProvinceCode: '',
            DistrictCode: '',
            SubDistrictCode: '',
            ZipCodeID: ''

        };
    }

    componentDidMount() {
        this.props.PageAction.setPageID(4);
        this.loadDataProvince();
    }

    onClickConfirm = () => {

        const {
            Name, TelNo,
            Email, Province,
            District, SubDistrict,
            ZipCode, Address,
            AddressDescription, ProvinceCode,
            DistrictCode, SubDistrictCode, ZipCodeID
        } = this.state;

        console.log(this.state);

        const Emailpattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const Emailresult = Emailpattern.test(Email);

        const Mobilepattern = /(([0-9]{3}))*([0-9]{3})*([0-9]{4})/;
        const Mobileresult = Mobilepattern.test(TelNo);

        let alertNameMsg = "";

        if (!Name) {
            alertNameMsg += " - กรุณาใส่ชื่อ-นามสกุล\n";
        }

        if (Emailresult === false) {
            alertNameMsg += " - รูปแบบ E-mail ไม่ถูกต้อง กรุณาใส่ข้อมูลใหม่\n";
            this.setState({ Email: '' });
        }

        if (Mobileresult === false) {
            alertNameMsg += " - กรุณาใส่เบอร์ติดต่อเฉพาะตัวเลขให้ครบ 10 หลัก\n";
            this.setState({ TelNo: '' });
        }

        if (TelNo.substring(0, 1) !== "0") {
            alertNameMsg += " - กรุณาใส่เบอร์ติดต่อเริ่มต้นด้วยเลข 0\n";
            this.setState({ TelNo: '' });
        }

        if (TelNo.substring(0, 2) === "02") {
            alertNameMsg += " - ไม่สามารถใส่เบอร์ติดต่อเริ่มต้นด้วยเลข 02 ได้ กรุณาใส่ข้อมูลใหม่\n";
            this.setState({ TelNo: '' });
        }

        if (ProvinceCode === "0" || !ProvinceCode) {
            alertNameMsg += " - กรุณาเลือกจังหวัด\n";
        }

        if (DistrictCode === "0" || !DistrictCode) {
            alertNameMsg += " - กรุณาเลือกเขต/อำเภอ\n";
        }

        if (SubDistrictCode === "0" || !SubDistrictCode) {
            alertNameMsg += " - กรุณาเลือกตำบล\n";
        }

        if (ZipCodeID === "0" || !ZipCodeID) {
            alertNameMsg += " - กรุณาเลือกรหัสไปรษณีย์\n";
        }

        if (!Address) {
            alertNameMsg += " - กรุณาใส่บ้านเลขที่\n";
        }

        if (alertNameMsg) {
            alert(`${alertNameMsg}`);
        } else {

            const data = {
                Name: Name, 
                TelNo: TelNo,
                Email: Email, 
                Province: Province,
                District: District, 
                SubDistrict: SubDistrict,
                ZipCode: ZipCode,
                 Address: Address,
                AddressDescription: AddressDescription,
            };

            this.props.CustomerAction.setCustomerDetail(data);
            this.props.history.goBack()
        }
    }

    handleChangeProvince = async (event) => {

        this.handleSelectDataValue("ChangeProvince");

        const selectedIndex = event.target.options.selectedIndex;
        const provinceCode = event.target.options[selectedIndex].getAttribute('data-key');
        const provinceName = event.target.value;

        console.log(provinceCode);
        console.log(provinceName);

        await this.setState({ ProvinceCode: provinceCode });
        await this.setState({ Province: provinceName });

        if (provinceCode !== "0") {
            this.loadDataDistrict();
        }
    }

    handleChangeDistrict = async (event) => {

        this.handleSelectDataValue("ChangeDistrict");

        const selectedIndex = event.target.options.selectedIndex;
        const districtCode = event.target.options[selectedIndex].getAttribute('data-key');
        const districtName = event.target.value;

        console.log(districtCode);
        console.log(districtName);

        await this.setState({ DistrictCode: districtCode });
        await this.setState({ District: districtName });

        if (districtCode !== "0") {
            this.loadDataSubDistrict();
        }
    }

    handleChangeSubDistrict = async (event) => {

        this.handleSelectDataValue("ChangeSubDistrict");

        const selectedIndex = event.target.options.selectedIndex;
        const subDistrictCode = event.target.options[selectedIndex].getAttribute('data-key');
        const subDistrictName = event.target.value;

        console.log(subDistrictCode);
        console.log(subDistrictName);

        await this.setState({ SubDistrictCode: subDistrictCode });
        await this.setState({ SubDistrict: subDistrictName });

        if (subDistrictCode !== "0") {
            this.loadDataZipCode();
        }
    }

    handleChangeZipcode = async (event) => {

        const selectedIndex = event.target.options.selectedIndex;
        const zipCodeID = event.target.options[selectedIndex].getAttribute('data-key');
        const zipCode = event.target.value;

        console.log(zipCodeID);
        console.log(zipCode);

        await this.setState({ ZipCodeID: zipCodeID });
        await this.setState({ ZipCode: zipCode });
    }

    handleSelectDataValue(event) {
        let eventName = event;

        if (eventName === "ChangeProvince") {
            this.setState({ JsonResponseDistrict: [] });
            this.setState({ JsonResponseSubDistrict: [] });
            this.setState({ JsonResponseZipCode: [] });

            this.setState({ DistrictCode: "0" });
            this.setState({ SubDistrictCode: "0" });
            this.setState({ ZipCodeID: "0" });

        }
        else if (eventName === "ChangeDistrict") {
            this.setState({ JsonResponseSubDistrict: [] });
            this.setState({ JsonResponseZipCode: [] });

            this.setState({ SubDistrictCode: "0" });
            this.setState({ ZipCodeID: "0" });
        }
        else if (eventName === "ChangeSubDistrict") {

            this.setState({ JsonResponseZipCode: [] });

            this.setState({ ZipCodeID: "0" });
        }
    }

    loadDataProvince() {

        const url = window.WebServiceEndpoint + '/api/Product/GetProvince';

        const body = JSON.stringify({
            ProvinceCode: "",
            Lang: "TH"
        });

        axios.post(url, body, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            if (response.data !== null) {
                this.setState({ JsonResponseProvince: response.data.provinces });

            }

        }).catch(function (error) {
            console.log("loadData Error", error);
        });
    }

    loadDataDistrict() {

        const provinceCode = this.state.ProvinceCode;
        console.log(provinceCode);
        const url = window.WebServiceEndpoint + '/api/Product/GetDistrict';

        const body = JSON.stringify({
            ProvinceCode: provinceCode,
            Lang: "TH"
        });

        axios.post(url, body, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            if (response.data !== null) {
                this.setState({ JsonResponseDistrict: response.data.districts });

            }

        }).catch(function (error) {
            console.log("loadData Error", error);
        });
    }

    loadDataSubDistrict() {

        const districtCode = this.state.DistrictCode;
        const url = window.WebServiceEndpoint + '/api/Product/GetSubDistrict';

        const body = JSON.stringify({
            DistrictCode: districtCode,
            Lang: "TH"
        });

        axios.post(url, body, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            if (response.data !== null) {
                this.setState({ JsonResponseSubDistrict: response.data.subDistricts });
                console.log(response.data.subDistricts);
            }

        }).catch(function (error) {
            console.log("loadData Error", error);
        });
    }

    loadDataZipCode() {

        const provinceCode = this.state.ProvinceCode;
        const districtCode = this.state.DistrictCode;
        const subDistrictCode = this.state.SubDistrictCode;

        const url = window.WebServiceEndpoint + '/api/Product/GetZipCode';

        const body = JSON.stringify({
            ProvinceCode: provinceCode,
            DistrictCode: districtCode,
            SubDistrictCode: subDistrictCode,
            Lang: "TH"
        });

        axios.post(url, body, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            if (response.data !== null) {
                this.setState({ JsonResponseZipCode: response.data.zipCode });
                console.log(response.data.zipCode);
            }

        }).catch(function (error) {
            console.log("loadData Error", error);
        });
    }

    handleChangeInput = async (event) => {

        const key = event.target.getAttribute('data-key');
        console.log(key);
        let input = event.target.value;
        console.log(input);

        switch (key) {
            case "name":
                await this.setState({ Name: input });
                break;
            case "tel":
                await this.setState({ TelNo: input });
                break;
            case "email":
                await this.setState({ Email: input });
                break;
            case "address":
                await this.setState({ Address: input });
                break;
            case "addressDescription":
                await this.setState({ AddressDescription: input });
                break;
            default:
                break;
        }
    }

    render() {

        const provinceList = this.state.JsonResponseProvince;
        const districtList = this.state.JsonResponseDistrict;
        const subDistrictList = this.state.JsonResponseSubDistrict;
        const zipCodeList = this.state.JsonResponseZipCode;

        return (
            <React.Fragment>
                <div>
                    <div className="layout" style={{ background: '#f6f7fb' }}>
                        <TopbarComponent />

                        <div className="major-navbar">
                            <div className="navbar-title" style={{ color: '#3a3433' }}>
                                ที่อยู่สำหรับจัดส่ง
                            </div>
                        </div>

                        <div className="button-row">
                            <button className="button-primary" onClick={this.onClickConfirm}>
                                ยืนยัน
                            </button>
                        </div>

                        <div className="content content--scrollable">
                            <div className="pizza-address-title">ข้อมูลลูกค้า</div>
                            <div className="pizza-address-input">
                                <input type="text" placeholder="ชื่อ - นามสกุล" onChange={this.handleChangeInput} data-key="name" />
                            </div>
                            <div className="pizza-address-input">
                                <input type="tel" placeholder="เบอร์ติดต่อ" onChange={this.handleChangeInput} data-key="tel" />
                            </div>
                            <div className="pizza-address-input">
                                <input type="email" placeholder="อีเมล" onChange={this.handleChangeInput} data-key="email" />
                            </div>
                            <div className="pizza-address-title">ข้อมูลที่อยู่</div>
                            <div className="pizza-address-input">
                                <select onChange={this.handleChangeProvince}>
                                    <option data-key="0">จังหวัด</option>
                                    {provinceList.map(
                                        ({
                                            ProvinceCode,
                                            ProvinceNameTH
                                        }) =>
                                            <option data-key={ProvinceCode} >{ProvinceNameTH}</option>
                                    )}
                                </select>
                            </div>
                            <div className="pizza-address-input">
                                <select onChange={this.handleChangeDistrict}>
                                    <option data-key="0">เขต/อำเภอ</option>
                                    {districtList.map(
                                        ({
                                            DistrictCode,
                                            DistrictNameTH
                                        }) =>
                                            <option data-key={DistrictCode} >{DistrictNameTH}</option>
                                    )}
                                </select>
                            </div>
                            <div className="pizza-address-input">
                                <select onChange={this.handleChangeSubDistrict}>
                                    <option data-key="0">ตำบล</option>
                                    {subDistrictList.map(
                                        ({
                                            SubDistrictCode,
                                            SubDistrictNameTH
                                        }) =>
                                            <option data-key={SubDistrictCode} >{SubDistrictNameTH}</option>
                                    )}
                                </select>
                            </div>
                            <div className="pizza-address-input">
                                <select onChange={this.handleChangeZipcode}>
                                    <option data-key="0">รหัสไปรษณีย์</option>
                                    {zipCodeList.map(
                                        ({
                                            ZipCodeID,
                                            ZipCode
                                        }) =>
                                            <option data-key={ZipCodeID} >{ZipCode}</option>
                                    )}
                                </select>
                            </div>
                            <div className="pizza-address-input">
                                <input type="text" placeholder="บ้านเลขที่" onChange={this.handleChangeInput} data-key="address" />
                            </div>
                            <div className="pizza-address-input">
                                <textarea placeholder="อธิบายข้อมูลที่อยู่เพิ่มเติม" onChange={this.handleChangeInput} data-key="addressDescription"></textarea>
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