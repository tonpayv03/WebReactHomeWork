import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as productAction from '../../actions/product-action';


class Topbar extends React.Component {

    render() {

        const pageID = this.props.Page.pageID;

        return (
            <React.Fragment>
                <div className="navbar">
                    <div className="navbar-title">
                        H.I.S Service
                    </div>
                    {pageID === 1 ?
                        null
                        :
                        <div className="navbar-back" onClick={() => { this.props.history.goBack() }} />
                    }
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    Page: state.PageReducer
});

export default withRouter(connect(mapStateToProps, null)(Topbar));