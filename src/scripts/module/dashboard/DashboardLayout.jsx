import React from 'react';

import Global from '../common/Global.jsx'
import CommonTools from '../common/CommonTools.jsx'
import HttpRequest from '../common/HttpRequest.jsx';
import EventProxy from '../common/EventProxy.jsx'

import ButtonMenu from '../commonui/ButtonMenu.jsx'
import XModal from '../commonui/XModal.jsx';

import OverviewContextMenu from './DashboardContextMenu.jsx';
import Detail from './Detail.jsx';


//config 对话框
class AddressConfigPanel extends React.Component {

    constructor(props) {
        super(props);
        this.parseInput = this.parseInput.bind(this);
    }

    parseInput() {
        let _selectedItemName = Global.Status.EventVar_Modal_ClickItemName;
        return {
            'ampName': _selectedItemName,
            'addr': this.addrInput.value,
            'desc1': this.ch1DescInput.value,
            'desc2': this.ch2DescInput.value
        }
    }

    render() {
        let _data = this.props.addressData;
        let _selectedItemName = Global.Status.EventVar_Modal_ClickItemName;

        let _selectedItem = undefined;
        for (let i = 0; i < _data.rows.length; i++) {
            let row = _data.rows[i];

            for (let j = 0; j < row.items.length; j++) {
                let item = row.items[j];
                if (item.name == _selectedItemName) {
                    _selectedItem = item;
                }
            }
        }

        return (
            <ul className="list-unstyled weather-info">
                <li><span className="field-name">Addr</span><span className="pull-right field-value-component">
                    <input ref={(ref) => this.addrInput = ref} type="number" defaultValue={_selectedItem.addr} />
                </span></li>
                <li><span className="field-name">CH1 Description</span><span className="pull-right field-value-component">
                    <input ref={(ref) => this.ch1DescInput = ref} type="string" defaultValue={_selectedItem.chs[0].desc} />
                </span></li>
                <li><span className="field-name">CH2 Description</span><span className="pull-right field-value-component">
                    <input ref={(ref) => this.ch2DescInput = ref} type="string" defaultValue={_selectedItem.chs[1].desc} />
                </span></li>
            </ul>
        )
    };

}

class DashboardConfigPanel extends React.Component {

    constructor(props) {
        super(props);
    }

    //保存设置
    actionConfigOKButtonClick() {
        this.props.overviewData.baud_rate = parseInt(this.baudRateInput.value);
        this.props.overviewData.com = this.comInput.value();
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

class DashboardLayout extends React.Component {

    constructor(props) {
        super(props);
        this.state = { uiUpdate: 0 };

        //data
        this.overviewData = undefined;
        this.overviewStatusData = undefined;


        //是否已经Mount
        this.isSelfMount = true;

        //init 
        this.onRequestInitDatasLoaded = this.onRequestInitDatasLoaded.bind(this);

        //ui
        this.buildRows = this.buildRows.bind(this);
        this.renderRow = this.renderRow.bind(this);
        this.buildItems = this.buildItems.bind(this);

        this.actionConfigOKButtonClick = this.actionConfigOKButtonClick.bind(this);
        this.actionAddressConfigOkButtonClick = this.actionAddressConfigOkButtonClick.bind(this);

        //refresh
        //实时请求失败次数
        this.refreshStatusFaultCount = 0;
        //refresh回调
        this.refreshStatusInterval = undefined;
        this.refreshStatus = this.refreshStatus.bind(this);
        this.onRefreshStatusLoaded = this.onRefreshStatusLoaded.bind(this);

        //action
        this.actionContextMenuItemClick = this.actionContextMenuItemClick.bind(this);
        this.actionSaveButtonClick = this.actionSaveButtonClick.bind(this);
        this.actionConfigButtonClick = this.actionConfigButtonClick.bind(this);
        this.actionAddRowButtonClick = this.actionAddRowButtonClick.bind(this);
        this.actionDeleteLastRowButtonClick = this.actionDeleteLastRowButtonClick.bind(this);

    }


    //初始化dashboard数据
    componentDidMount() {
        this.isSelfMount = true;
        HttpRequest.axios.get('/dashboard').then(this.onRequestInitDatasLoaded);
        //请求状态
        this.refreshStatus();
    }
    componentWillUnmount() {
        this.isSelfMount = false;
        clearTimeout(this.refreshStatusInterval);
    }
    onRequestInitDatasLoaded(response) {
        this.overviewData = response.data;
        this.setState({ uiUpdate: (this.state.uiUpdate++) });
    }

    //初始化dashboard数据

    //刷新实时
    refreshStatus() {
        HttpRequest.axios.get('/dashboard/status').then(this.onRefreshStatusLoaded).catch(function (error) {
            this.refreshStatusFaultCount++;
            if (this.refreshStatusFaultCount >= 5) {
                this.refreshStatusInterval = setTimeout(this.refreshStatus, Global.Status.RefreshThreadIntervalFault);
            } else {
                this.refreshStatusInterval = setTimeout(this.refreshStatus, Global.Status.RefreshThreadInterval);
            }
        }.bind(this));
    }
    onRefreshStatusLoaded(response) {
        this.refreshStatusFaultCount = 0;
        if (this.isSelfMount) {
            this.overviewStatusData = response.data;
            this.setState({ uiUpdate: (this.state.uiUpdate++) });
            this.refreshStatusInterval = setTimeout(this.refreshStatus, Global.Status.RefreshThreadInterval);
        }
    }
    //刷新实时 

    //action
    //菜单放大器详情
    actionContextMenuItemClick(_key, selectItemName) {
        if ('detail' == _key) {
            EventProxy.trigger(Global.Const.Event_DashboardChange, { 'index': 2, 'selectItemName': selectItemName });
        } else if ('config' == _key) {
            Global.Status.EventVar_Modal_ClickItemName = selectItemName;
            this.addressConfigModal.openModal();
        }
    }
    //菜单放大器详情

    //保存layout
    actionSaveButtonClick() {
        let json = JSON.stringify(this.overviewData);
        var params = new URLSearchParams();
        params.append('content', json);
        HttpRequest.axios.put('/dashboard', params).then(function (response) {
            console.log(response);
        });
    }

    //打开配置对话框
    actionConfigButtonClick() {
        this.dashboardConfigModal.openModal();
    }

    //保存layout配置
    actionConfigOKButtonClick() {
        this.dashboardConfigBody.actionConfigOKButtonClick();
        this.actionSaveButtonClick();
    }

    //修改硬件地址
    actionAddressConfigOkButtonClick() {
        let _inputs = this.addressConfigPanelBody.parseInput();
        console.log(_inputs);

        var params = new URLSearchParams();
        params.append('addr', _inputs.addr);
        params.append('d1', _inputs.desc1);
        params.append('d2', _inputs.desc2);

        HttpRequest.axios.patch('/dashboard/' + _inputs.ampName, params).then(function (response) {
            console.log(response);
            HttpRequest.axios.get('/dashboard').then(this.onRequestInitDatasLoaded);
        }.bind(this));
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

    //删除行
    actionDeleteLastRowButtonClick() {
        let _rows = this.overviewData.rows;
        if (_rows.length > 0) {
            _rows.splice(_rows.length - 1, 1);
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

    //ui build
    buildItems(item, i) {
        let color1 = '#9E9E9E';
        let color2 = '#9E9E9E';

        let _statusData = this.overviewStatusData;
        if (_statusData) {
            if (_statusData.status) {
                let chs_values = _statusData.status[item.name];
                if (chs_values) {
                    if (item.chs) {
                        color1 = CommonTools.renderColor(chs_values[0]);
                        color2 = CommonTools.renderColor(chs_values[1]);
                    }
                }
            }
        }

        return (<div className="col-xs-2 amplifier-column" key={i} data-itemname={item.name} >
            <div className="amplifier-content-all" data-toggle="context" data-target="#context-menu">
                <div className="label label-primary amplifier-title">
                    {item.addr}
                </div>
                <div className="amplifier-fire-div">
                    {}
                    <i className="amplifier-fire glyphicon glyphicon-fire" style={{ color: color1 }} aria-hidden="true"></i>
                    <span className="amplifier-label">CH1</span>
                </div>
                <div className="amplifier-fire-div">
                    <i className="amplifier-fire glyphicon glyphicon-fire" style={{ color: color2 }} aria-hidden="true"></i>
                    <span className="amplifier-label">CH2</span>
                </div>
            </div>
        </div>);
    }

    renderRow(row) {
        let items = row.items;

        //添加item 按钮
        if (items.length >= 6 || Global.Status.UserName == undefined) {
            return items.map(this.buildItems)
        } else if (items.length < 6) {
            let _content = items.map(this.buildItems);

            let _add = (<div className="col-xs-2 amplifier-column" key={-1} onClick={this.actionAddItem.bind(this, row)} >
                <div className="amplifier-content-all amplifier-plus cursor-pointer">
                    <span className="fa fa-plus-circle fa-2x amplifier-plus-icon" aria-hidden="true"></span>
                </div>
            </div>);

            _content.push(_add);
            return _content;

        }

    }

    buildRows(row, i) {
        //<a href='#' onClick={this.actionDeleteRowButtonClick.bind(this, row, i)} className="glyphicon glyphicon-remove row-delete-icon" aria-hidden="true"></a>
        return (
            <div className="panel panel-dark row-panel" key={i}>
                <div className="panel-body">
                    <div className="row-title">
                        {row.title}
                    </div>

                    <div className="row">
                        {this.renderRow(row)}
                    </div>
                </div>
            </div >);
    }

    render() {
        let _data = this.overviewData;
        if (!_data) {
            return null;
        } else {
            if (Global.Status.UserName) {
                return (
                    <div className="panel panel-dark" >
                        <div className="panel-heading">
                            <div className="panel-head-right">
                                <button type="button" onClick={this.actionAddRowButtonClick} className="btn btn-primary panel-head-button">Add Row</button>
                                <button type="button" onClick={this.actionDeleteLastRowButtonClick} className="btn btn-primary panel-head-button">Delete Last Row</button>

                                <button type="button" onClick={this.actionConfigButtonClick} className="btn btn-primary panel-head-button">Config</button>
                                <button type="button" onClick={this.actionSaveButtonClick} className="btn btn-primary panel-head-button">Save</button>
                            </div>
                        </div>

                        {_data.rows.map(this.buildRows)}
                        <OverviewContextMenu onItemClick={this.actionContextMenuItemClick} />
                        <XModal ref={(ref) => this.dashboardConfigModal = ref}
                            title="Dashboard Settings"
                            okFunc={this.actionConfigOKButtonClick} >
                            <DashboardConfigPanel ref={(dcp) => this.dashboardConfigBody = dcp} overviewData={_data} />
                        </XModal>

                        <XModal ref={(ref) => this.addressConfigModal = ref}
                            title="Address Settings"
                            okFunc={this.actionAddressConfigOkButtonClick} >
                            <AddressConfigPanel ref={(ref) => this.addressConfigPanelBody = ref} addressData={this.overviewData} />
                        </XModal>
                    </div>
                );
            } else {
                //guest 用户
                return (
                    <div className="panel panel-dark" >
                        {_data.rows.map(this.buildRows)}
                        <OverviewContextMenu onItemClick={this.actionContextMenuItemClick} />
                    </div>
                );
            }
        }
    }

}

module.exports = DashboardLayout;