import React, { Component } from 'react';
import TopbarComponent from '../global_components/Topbar';
import axios from 'axios';
import $ from 'jquery';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as productAction from '../../actions/product-action';
import * as pageAction from '../../actions/page-action';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            textSearch: '',
            JsonResponse: [],
            index: 1,
            round: 0,
            screenWidth: 0,
            isLoading: true,
            isSelectGrid: true,
        };

        window.addEventListener("resize", this.updateScreenWidth);
    }
    componentDidMount() {

        this.props.PageAction.setPageID(1);
        this.loadData();
        this.time = null;
    }

    updateScreenWidth = () => {
        this.setState({ screenWidth: window.innerWidth }) // window.innerWidth คือตัวที่มันจับขนาดหน้าจอ
    }

    handleChange = async (event) => {
        await this.setState({ textSearch: event.target.value });

        this.setState({ index: 1, round: 0 });

        clearTimeout(this.time)

        if (this.state.textSearch && 0 < this.state.textSearch.length) {
            var url = window.WebServiceEndpoint + '/api/Product/GetProductByName';

            var body = JSON.stringify({
                PartnerId: 'M004',
                SearchText: this.state.textSearch,
                Lang: 'TH',
            });
        }

        this.time = setTimeout(() => {
            this.loadData(body, url);
        }, 1000);

    }

    handleClickGirdOrList = (event) => {
        const value = event.currentTarget.value;

        if (value === "btnGrid") {
            this.setState({ isSelectGrid: true });
        } else {
            this.setState({ isSelectGrid: false });
        }
    }

    onClick = (productsku) => {

        this.props.ProductAction.setProductID(productsku.ProductID);

        const remark = 'จำเป็นต้องสั่งซื้อล่วงหน้าก่อนเดินทางออกจากประเทศไทย อย่างน้อย 7 วัน  เพื่อป้องกันการล่าช้า หรือผิดพลาดในการจัดส่ง';
        const description = `Japan Rail Pass เป็นบัตรที่ใช้สำหรับเดินทางด้วยรถไฟได้ทั่วทั้งประเทศญี่ปุ่นที่เป็นสายรถไฟของ JR Group   สามารถใช้ได้กับรถไฟชินคังเซน (ยกเว้น ขบวนรถไฟประเภท “NOZOMI”และ ”MIZUHO”) รถไฟด่วนพิเศษ (limited express) รถไฟด่วน (express) รถไฟเร็ว (rapid) และรถไฟธรรมดา (local)   หากท่านมีตั๋ว JR PASS นี้ จะช่วยให้ท่านประหยัดค่าเดินทางได้เป็นอย่างดี   ทั้งนี้ ตั๋วชั่วคราว (Exchange Order) จะต้องนำไปเปิดใช้งานภายใน 90 วัน<br><br>  รูปแบบตั๋ว : Exchange Order (บัตรชั่วคราว)<br><br>  ข้อมูลในการสั่งซื้อ :<br>  1. ชื่อผู้เดินทางสะกดตรงตามหนังสือเดินทางของทุกท่าน<br>  2. วันที่ต้องการเดินทางออกจากประเทศไทย<br>  3. ที่อยู่ในการจัดส่ง<br><br>  การเปิดใช้งาน :<br>  1. นำ Exchange Order พร้อมหนังสือเดินทาง ไปแลกเป็น JR Pass บัตรจริงตามจุดแลกต่างๆ ในประเทศญี่ปุ่น ทั้งนี้ จำเป็นต้องเปิดใช้ภายใน  3 เดือน นับจากวันที่เจ้าหน้าที่ออกบัตร Exchange Order<br>   2. หนังสือเดินทางจะต้องได้รับตราประทับเป็นแบบ Temporary Visitor เท่านั้น จึงจะสามารถแลกและมีสิทธิ์ใช้ JR Pass ได้<br><br>จัดส่งทางไปรษณีย์ไทย (EMS)<br><br>  การยกเลิก : เฉพาะ Exchange Order ที่ยังไม่ได้นำไปเปิดใช้งานเท่านั้น จึงจะสามารถนำมาขอยกเลิก และขอคืนเงินได้ภายใน 1 ปี ทั้งนี้ มีค่าธรรมเนียมการยกเลิก 20% ของราคาทั้งหมด สามารถดำนินการได้ที่สำนักงานบริษัท เอช.ไอ.เอส. ทัวร์ส์ จำกัด ทุกสาขาทั่วประเทศ`;

        const data = {
            id: productsku.ProductID, 
            name: productsku.ProductNameEN, 
            price: productsku.Price, 
            remark: remark,
            description: description
        };

        this.props.ProductAction.setDefaultProductValue(data)

        this.props.history.push('../product-detail');
        // product-detail ต้องตรงกับชื่อที่ตั้งใน App.js ที่ <Route exact path='/product-detail' component={ProductDetail} />
    }

    loadData(body, url) {

        if (this.state.round === 0) {
            this.setState({ isLoading: true });
        }

        if (!body && !url) {
            url = window.WebServiceEndpoint + '/api/Product/GetAllProduct';

            body = JSON.stringify({
                PartnerId: 'M004',
                Page_Index: this.state.index,
                Page_Size: window.PageSize,
            });
        }

        axios.post(url, body, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            if (response.data !== null) {
                if (this.state.round === 0) {
                    this.setState({ JsonResponse: response.data.products, index: 2, round: 1 });
                }
                else {

                    let data = this.state.JsonResponse;
                    for (let i = 0; i < response.data.products.length; i++) {
                        data.push({
                            "ProductID": response.data.products[i].ProductID,
                            "ProductNameEN": response.data.products[i].ProductNameEN,
                            "Price": response.data.products[i].Price,
                            "ProductImgURL_EN": response.data.products[i].ProductImgURL_EN,
                        })
                    }
                    this.setState({ JsonResponse: data, index: this.state.index + 1 });
                }
            }

            this.setState({ isLoading: false });

        }).catch(function (error) {
            console.log("loadData Error", error);
        });
    }

    render() {

        $('.searchArea').click(function () {
            $('.searchBox').focus();
        });

        const products = this.state.JsonResponse;
        const { screenWidth, isLoading, isSelectGrid } = this.state;

        const productDefault = [
            { name: 'Japan Rail Pass (All Area) Ordinary Car (7 Days)', price: 7999 },
            { name: 'Japan Rail Pass (All Area) Ordinary Car (14 Days)', price: 13180 },
            { name: 'Japan Rail Pass (All Area) Ordinary Car (21 Days)', price: 16860 },
        ];

        for (let i = 0; i < products.length; i++) {
            if (products[i].ProductNameEN.includes('Test')) {

                let ranNumber = Math.floor(Math.random() * productDefault.length);

                products[i].ProductNameEN = productDefault[ranNumber].name;
                products[i].Price = productDefault[ranNumber].price;
            }
        }

        //// Top banner
        //if (screenWidth < 800) {
        //    var _width = '-webkit-fill-available';
        //    var _left = '0';
        //    var _right = '0';
        //} else {
        //    var _width = '80%';
        //    var _left = 'auto';
        //    var _right = 'auto';
        //}

        if (isSelectGrid) {
            var imgBanner = require('../assets/image/banner.jpg');
            var imgListbtn = require('../assets/image/list_icon_unactive.png');
            var imgGridbtn = require('../assets/image/grid_icon_active.png');
        }
        else {
            imgBanner = require('../assets/image/banner3.jpg');
            imgListbtn = require('../assets/image/list_icon_active.png');
            imgGridbtn = require('../assets/image/grid_icon_unactive.png');
        }

        return (
            <React.Fragment>
                <center>
                    <TopbarComponent />
                    <div className="main-banner">
                        <img src={imgBanner} /*style={{ width: _width, marginLeft: _left, marginRight: _right }}*/ />
                    </div>
                </center>

                <div className="searchArea rows" style={{ width: '100%', marginTop: '10px' }}>
                    <img className="row" src={require('../assets/image/icon_search.png')} />
                    <input className="searchBox row" type="text" value={this.state.textSearch} onChange={this.handleChange} placeholder='ค้นหาสินค้า' />
                </div>

                <div className="sku-home-header-title selectPatternArea">
                    สินค้าทั้งหมด
                        <div>
                        <button value="btnList" onClick={this.handleClickGirdOrList}><img src={imgListbtn} /></button>
                        <button value="btnGrid" onClick={this.handleClickGirdOrList}><img src={imgGridbtn} /></button>
                    </div>
                </div>


                {isLoading ?
                    <center><h4>Loading...</h4></center>
                    :
                    products.length === 0 ?
                        <center><h4>ไม่พบข้อมูล</h4></center>
                        :
                        <React.Fragment>
                            <div className="productlist-products productlist-products--sku"
                                style={{
                                    //gridTemplateColumns:
                                    //    screenWidth < 800 ? 'repeat(2,1fr)' : 'repeat(3,1fr)',
                                    display:
                                        isSelectGrid ? 'grid' : 'list-item'
                                }} >
                                {products.map(
                                    productskuList =>
                                        <div onClick={() => this.onClick(productskuList)}>
                                            {isSelectGrid ?
                                                <ProductShowGrid {...productskuList} />
                                                :
                                                <ProductShowList {...productskuList} />
                                            }
                                        </div>
                                )}
                            </div>
                            <center>
                                <button className="btnLoadmore" onClick={() => this.loadData()} style={{ display: this.state.textSearch ? 'none' : 'initial' }}>Load More</button>
                            </center>
                        </React.Fragment>
                }
            </React.Fragment >

        )
    }
}

const ProductShowGrid = ({ ProductImgURL_EN, ProductNameEN, Price }) => {
    return (
        <React.Fragment>
            <div className="productlist-product">
                <div className="productlist-product-image">
                    <img src={ProductImgURL_EN} onError={(e) => {
                        e.target.src = require('../assets/image/image2.jpg')
                    }} />
                </div>
                <div className="productlist-product-data">
                    <div className="productlist-product-data-title">
                        {ProductNameEN}
                    </div>
                    <div className="productlist-product-data-price">{Price} บาท</div>
                </div>
            </div>
        </React.Fragment>
    );
}

const ProductShowList = ({ ProductImgURL_EN, ProductNameEN, Price }) => {
    return (
        <React.Fragment>
            <div className="productlist-product"
                style={{
                    display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', marginBottom: '10px'
                }} >
                <div className="productlist-product-image">
                    <img src={ProductImgURL_EN} onError={(e) => {
                        e.target.src = require('../assets/image/image2.jpg')
                    }} />
                </div>
                <div className="productlist-product-data productlist-responsive-text-position" style={{ /*paddingTop: '39%' ,*/ paddingLeft: '15px' }}>
                    <div className="productlist-product-data-title">
                        {ProductNameEN}
                    </div>
                    <div className="productlist-product-data-price"
                        style={{
                            position: 'relative', bottom: '0', left: '0', margin: '0px'
                        }}>
                        {Price} บาท
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

const mapDispatchToProps = dispatch => ({
    ProductAction: bindActionCreators(productAction, dispatch),
    PageAction: bindActionCreators(pageAction, dispatch)
    // name props ที่ไว้สำหรับเรียกใช้ : bindActionCreators(name action ที่ตั้งตอน import เข้ามา,dispatch)
})

export default connect(null, mapDispatchToProps)(Home);