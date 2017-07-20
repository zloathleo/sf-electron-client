import React from 'react';
import ReactDOM from 'react-dom';

import Const from '../Const.jsx'
import EventProxy from '../EventProxy.jsx'
import OverviewContextMenu from './DashboardContextMenu.jsx';
import Detail from './Detail.jsx';

class DashboardPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = { uiIndex: 0 };

        this.overviewData = undefined;
        this.detailData = undefined;

        //init
        this.requestInitDatas = this.requestInitDatas.bind(this);
        this.onRequestInitDatasLoaded = this.onRequestInitDatasLoaded.bind(this);

        //ui
        this.buildRows = this.buildRows.bind(this);
        this.renderRow = this.renderRow.bind(this);
        this.buildItems = this.buildItems.bind(this);

        //action
        this.actionAddItem = this.actionAddItem.bind(this);
        this.actionContextMenuItemClick = this.actionContextMenuItemClick.bind(this);
        this.actionRequestDetail = this.actionRequestDetail.bind(this);
        this.onRequestDetailDataLoaded = this.onRequestDetailDataLoaded.bind(this);
    }

    componentDidMount() {
        this.requestInitDatas();
    }

    //初始化数据
    requestInitDatas() {
        setTimeout(this.onRequestInitDatasLoaded, 1000);
    }

    onRequestInitDatasLoaded() {
        this.overviewData = require("../../../assets/datas/overview.json");
        this.setState({ uiIndex: 1 });
        EventProxy.trigger(Const.Event_DataLoading, 1);
    }

    //请求探头详情数据
    actionRequestDetail() {
        setTimeout(this.onRequestDetailDataLoaded, 1000 * 1);
    }

    onRequestDetailDataLoaded() {
        this.detailData = require("../../../assets/datas/detail.json");
        // waitingDialog.hide();
        EventProxy.trigger(Const.Event_DataLoading, 1);
        this.setState({ uiIndex: 2 });
    }

    //action
    actionContextMenuItemClick(_key) {
        console.log('actionContextMenuItemClick:' + _key);
        if ('detail' == _key) {
            EventProxy.trigger(Const.Event_DataLoading, 0);
            this.actionRequestDetail();

            // waitingDialog.show('Loading ...', {
            //     onShow: this.actionRequestDetail,
            // });
        }
    }



    actionAddItem() {

    }

    //ui
    buildItems(item, i) {
        return (<div className="col-xs-2 amplifier" key={i} >
            <div className="amplifier-content-all" data-toggle="context" data-target="#context-menu">

                <span className="badge"> No.{item.addr}</span>
                <div className="amplifier-content">
                    <div className="amplifier-fire-div">
                        <i className="amplifier-fire glyphicon glyphicon-fire" style={{ color: '#f44336' }} aria-hidden="true"></i>
                        <span className="amplifier-label">CH1</span>
                    </div>
                    <div className="amplifier-fire-div">
                        <i className="amplifier-fire glyphicon glyphicon-fire" style={{ color: '#FFEB3B' }} aria-hidden="true"></i>
                        <span className="amplifier-label">CH2</span>
                    </div>
                </div>
            </div>
        </div>);
    }

    renderRow(items) {
        if (items.length < 6) {
            let _content = items.map(this.buildItems);

            let _add = (<div className="col-xs-2 amplifier" key={-1} >
                <div className="amplifier-content-all amplifier-plus">
                    <span className="fa fa-plus-circle fa-3x" aria-hidden="true"></span>
                </div>
            </div>);

            _content.push(_add);
            return _content;

        } if (items.length >= 6) {
            return items.map(this.buildItems)
        }
    }

    buildRows(row, i) {
        return (<div className="row" key={i}>
            <div className="col-xs-12">
                <div className="panel panel-dark">
                    <div className="panel-body">

                        <div className="row-title">
                            {row.title}
                        </div>

                        <span className="glyphicon glyphicon-remove row-delete-icon" aria-hidden="true"></span>
                        <div className="row">
                            {this.renderRow(row.items)}
                        </div>

                    </div>
                </div>
            </div>
        </div >);
    }



    render() {
        if (this.state.uiIndex == 0) {
            return (
                <div />
            );
        } else if (this.state.uiIndex == 1) {
            let _data = this.overviewData;
            return (
                <div>
                    {_data.rows.map(this.buildRows)}
                    <OverviewContextMenu onItemClick={this.actionContextMenuItemClick} /> 
                </div>
            );
        } else if (this.state.uiIndex == 2) {
            let _data = this.detailData;
            return (
                <div>
                    <Detail data={_data} />
                </div>
            );
        }


    }
}

module.exports = DashboardPage;


