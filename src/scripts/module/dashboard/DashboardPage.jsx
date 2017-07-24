import React from 'react';
import ReactDOM from 'react-dom';

import Const from '../Const.jsx'
import CommonTools from '../common/CommonTools.jsx'
import ButtonMenu from '../common/ButtonMenu.jsx'

import HttpRequest from '../common/HttpRequest.jsx';

import EventProxy from '../EventProxy.jsx'
import OverviewContextMenu from './DashboardContextMenu.jsx';
import Detail from './Detail.jsx';
import { ConfigDialog } from '../MyDialog.jsx';


//config 对话框
class DashboardConfigPanel extends React.Component {

    constructor(props) {
        super(props);
        console.log(this.props.overviewData.com);
        console.log(this.props.overviewData.baud_rate);
    }

    //保存设置
    actionConfigOKButtonClick() {
        this.props.overviewData.baud_rate = parseInt(this.baudRateInput.value);
        this.props.overviewData.com = "COM3";
        console.log(comInput.value());
    }

    render() {
        return (
            <ul className="list-unstyled weather-info">
                <li><span className="field-name">I/O Port</span><span className="pull-right field-value-component">
                    <ButtonMenu ref={(ref) => this.comInput = ref} selected={this.props.overviewData.com} items={['COM3', 'COM4', 'COM5', 'COM6', 'COM7', 'COM8', 'COM9', 'COM10', 'COM11', 'COM12']} />
                </span></li>
                <li><span className="field-name">Boad Rate</span><span className="pull-right field-value-component">
                    <input ref={(ref) => this.baudRateInput = ref} type="number" defaultValue={this.props.overviewData.baud_rate} />
                </span></li>
            </ul>
        )
    };

}

//布局页
class DashboardPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = { uiIndex: 0, uiUpdate: 0 };

        this.overviewData = undefined;
        this.detailData = undefined;

        //ui
        this.dashboardConfigModalPanel = undefined;

        //init
        this.requestInitDatas = this.requestInitDatas.bind(this);
        this.onRequestInitDatasLoaded = this.onRequestInitDatasLoaded.bind(this);

        //ui
        this.buildRows = this.buildRows.bind(this);
        this.renderRow = this.renderRow.bind(this);
        this.buildItems = this.buildItems.bind(this);

        this.dashboardConfigModalRender = this.dashboardConfigModalRender.bind(this);
        this.actionConfigOKButtonClick = this.actionConfigOKButtonClick.bind(this);

        //action
        this.actionSaveButtonClick = this.actionSaveButtonClick.bind(this);
        this.actionContextMenuItemClick = this.actionContextMenuItemClick.bind(this);
        this.actionRequestDetail = this.actionRequestDetail.bind(this);
        this.onRequestDetailDataLoaded = this.onRequestDetailDataLoaded.bind(this);

        this.actionAddRowButtonClick = this.actionAddRowButtonClick.bind(this);
        // this.actionDeleteRowButtonClick = this.actionDeleteRowButtonClick.bind(this);
    }

    componentDidMount() {
        this.requestInitDatas();
    }

    //初始化dashboard数据
    requestInitDatas() {
        HttpRequest.axios.get('/dashboard').then(this.onRequestInitDatasLoaded);
    }

    onRequestInitDatasLoaded(response) {
        // this.overviewData = require("../../../assets/datas/overview.json");
        this.overviewData = response.data;
        this.setState({ uiIndex: 1 });
    }

    //请求探头详情数据
    actionRequestDetail() {
        setTimeout(this.onRequestDetailDataLoaded, 1000 * 1);
    }

    onRequestDetailDataLoaded() {
        this.detailData = require("../../../assets/datas/detail.json");
        EventProxy.trigger(Const.Event_DataLoading, 1);
        this.setState({ uiIndex: 2 });
    }

    //action
    //保存layout
    actionSaveButtonClick() {
        let json = JSON.stringify(this.overviewData);
        var params = new URLSearchParams();
        params.append('content', json);
        console.log(json);
        HttpRequest.axios.put('/dashboard', params).then(function (response) {
            console.log(response);
        });
    }

    //保存设置
    actionConfigOKButtonClick() {
        this.dashboardConfigModalPanel.actionConfigOKButtonClick();
        this.actionSaveButtonClick();
    }

    //菜单详情
    actionContextMenuItemClick(_key) {
        console.log('actionContextMenuItemClick:' + _key);
        if ('detail' == _key) {
            EventProxy.trigger(Const.Event_DataLoading, 0);
            this.actionRequestDetail();
        }
    }

    //添加行
    actionAddRowButtonClick() {
        let _data = this.overviewData;

        let length = _data.rows.length;
        if (length >= 22) {
            toastr.error('too many rows:' + length);
        } else {
            let row = {
                index: length,
                title: CommonTools.getCharForNumber(length),
                items: []
            }
            _data.rows.push(row);
            this.setState({ uiUpdate: (this.state.uiUpdate++) });
        }
    }

    //添加项目
    actionAddItem(row) {
        let length = row.items.length;
        if (length >= 6) {
            toastr.error('too many items:' + length);
        } else {
            let item = {
                name: row.title + length,
                addr: -1,
                chs: [
                    {
                        name: "CH1"
                    },
                    {
                        name: "CH2"
                    }
                ]
            }
            row.items.push(item);
            this.setState({ uiUpdate: (this.state.uiUpdate++) });
        }
    }

    //ui 
    buildItems(item, i) {
        return (<div className="col-xs-2 amplifier-column" key={i} >
            <div className="amplifier-content-all" data-toggle="context" data-target="#context-menu">
                <div className="label label-primary amplifier-title">
                    {item.addr}
                </div>
                <div className="amplifier-fire-div">
                    <i className="amplifier-fire glyphicon glyphicon-fire" style={{ color: '#f44336' }} aria-hidden="true"></i>
                    <span className="amplifier-label">CH1</span>
                </div>
                <div className="amplifier-fire-div">
                    <i className="amplifier-fire glyphicon glyphicon-fire" style={{ color: '#FFEB3B' }} aria-hidden="true"></i>
                    <span className="amplifier-label">CH2</span>
                </div>
            </div>
        </div>);
    }

    renderRow(row) {
        let items = row.items;
        if (items.length < 6) {
            let _content = items.map(this.buildItems);

            let _add = (<div className="col-xs-2 amplifier-column" key={-1} onClick={this.actionAddItem.bind(this, row)} >
                <div className="amplifier-content-all amplifier-plus">
                    <span className="fa fa-plus-circle fa-2x amplifier-plus-icon" aria-hidden="true"></span>
                </div>
            </div>);

            _content.push(_add);
            return _content;

        } if (items.length >= 6) {
            return items.map(this.buildItems)
        }
    }

    buildRows(row, i) {
        return (
            <div className="panel panel-dark row-panel" key={i}>
                <div className="panel-body">
                    <div className="row-title">
                        {row.title}
                    </div>
                    <span onClick={this.actionDeleteRowButtonClick} className="glyphicon glyphicon-remove row-delete-icon" aria-hidden="true"></span>
                    <div className="row">
                        {this.renderRow(row)}
                    </div>
                </div>
            </div >);
    }

    dashboardConfigModalRender() {
        return (
            <DashboardConfigPanel overviewData={this.overviewData} ref={(ref) => this.dashboardConfigModalPanel = ref} />
        );
    }

    render() {
        if (this.state.uiIndex == 0) {
            return (
                <div />
            );
        } else if (this.state.uiIndex == 1) {
            let _data = this.overviewData;
            return (
                <div className="panel panel-dark" >
                    <div className="panel-heading">
                        <h4 className="panel-title">{_data.name}</h4>
                        <div className="panel-head-right">
                            <button type="button" onClick={this.actionAddRowButtonClick} className="btn btn-primary panel-head-button">Add Row</button>
                            <button type="button" data-toggle="modal" data-target="#dashboardConfigModal" className="btn btn-primary panel-head-button">Config</button>
                            <button type="button" onClick={this.actionSaveButtonClick} className="btn btn-primary panel-head-button">Save</button>
                        </div>
                    </div>

                    {_data.rows.map(this.buildRows)}
                    <OverviewContextMenu onItemClick={this.actionContextMenuItemClick} />
                    <ConfigDialog id="dashboardConfigModal" title="Dashboard Settings" body={this.dashboardConfigModalRender} okFunc={this.actionConfigOKButtonClick} />
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


