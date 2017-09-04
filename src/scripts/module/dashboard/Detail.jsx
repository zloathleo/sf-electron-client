import React from 'react';

import Global from '../common/Global.jsx'
import EventProxy from '../common/EventProxy.jsx'
import HttpRequest from '../common/HttpRequest.jsx';

import XModal from '../commonui/XModal.jsx';

import DetailGauge from './DetailGauge.jsx';
import DetailHelp from './DetailHelp.jsx';
import DetailUserSettingsPanel from './DetailUserSettingsPanel.jsx';


class DetailCard extends React.Component {

    constructor(props) {
        super(props);

        this.detailUserSettingsPanel = undefined;
        //action
        this.actionUserSettingClick = this.actionUserSettingClick.bind(this);
        this.onDetailUserSettingsLoaded = this.onDetailUserSettingsLoaded.bind(this);
        this.renderUserSettingButton = this.renderUserSettingButton.bind(this);
    }

    //usersettings
    actionUserSettingClick(_param) {
        let dname = this.props.dname;
        EventProxy.trigger(Global.Const.Event_DataLoading, Global.Const.Key_DataLoading_Doing);
        HttpRequest.axios.get('/detail/' + this.props.dname + '/usersettings/m').then(this.onDetailUserSettingsLoaded);
    }
    onDetailUserSettingsLoaded(response) {
        EventProxy.trigger(Global.Const.Event_DataLoading, Global.Const.Key_DataLoading_Finish);
        this.userSettingsModal.openModal();
        this.detailUserSettingsPanel.setState({ data: response.data });
    }
    actionConfigOKButtonClick() {
        console.log('ok');
    }
    //usersettings

    renderUserSettingButton() {
        if (Global.Status.UserName) {
            let ch = this.props.ch;
            if (ch.enable != undefined) {
                return (
                    <div className="panel-control">
                        <a className="cursor-pointer" onClick={this.actionUserSettingClick.bind(this, 123)} >
                            <i className="fa fa-cog"></i>
                        </a>
                    </div>
                )
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    render() {
        let dname = this.props.dname;
        let addr = this.props.addr;
        let ch = this.props.ch;
        let chn = this.props.chn;
        return (
            <div className="col-xs-6 detail-card">
                <div className="panel panel-dark detail-panel">

                    <div className="panel-heading">
                        <h4 className="panel-title">{dname}-CH{chn}</h4>
                        <span className="badge">{addr}</span>
                        {
                            this.renderUserSettingButton()
                        }
                    </div>
                    <div className="panel-body">

                        <XModal ref={(ref) => this.userSettingsModal = ref} title="User Settings"
                            okFunc={this.actionConfigOKButtonClick} >
                            <DetailUserSettingsPanel ref={(ref) => this.detailUserSettingsPanel = ref} chn={chn} />
                        </XModal>

                        <div className="row">
                            <div className="col-md-6">
                                <ul className="list-unstyled weather-info">
                                    <li><span className="field-name">ON_TH</span><span className="pull-right field-value-dsdigi-font">{ch.onth != undefined ? ch.onth : '--'}</span></li>
                                    <li><span className="field-name">ON_TL</span><span className="pull-right field-value-dsdigi-font">{ch.ontl != undefined ? ch.ontl : '--'}</span></li>
                                    <li><span className="field-name">MAX</span><span className="pull-right field-value-dsdigi-font">{ch.max != undefined ? ch.max : '--'}</span></li>
                                    <li><span className="field-name">MIN</span><span className="pull-right field-value-dsdigi-font">{ch.min != undefined ? ch.min : '--'}</span></li>
                                    <li><span className="field-name">DC</span><span className="pull-right field-value-dsdigi-font">{ch.dc != undefined ? ch.dc : '--'}</span></li>
                                    <li><span className="field-name">AC</span><span className="pull-right field-value-dsdigi-font">{ch.ac != undefined ? ch.ac : '--'}</span></li>
                                    <li><span className="field-name">FREQ</span><span className="pull-right field-value-dsdigi-font">{ch.freq != undefined ? ch.freq : '--'}</span></li>
                                </ul>
                            </div>
                            <div className="col-md-6">
                                <ul className="list-unstyled weather-info">
                                    <li><span className="field-name">TYPE</span><span className="pull-right field-value-dsdigi-font">{ch.type != undefined ? ch.type : '--'}</span></li>
                                    <li><span className="field-name">STATUS</span><span className="pull-right field-value-dsdigi-font">{ch.status != undefined ? ch.status : '--'}</span></li>
                                    <li><span className="field-name">FAULT</span><span className="pull-right field-value-dsdigi-font">{ch.fault != undefined ? ch.fault : '--'}</span></li>
                                    <li><span className="field-name">TEMP</span><span className="pull-right field-value-dsdigi-font">{ch.temp != undefined ? ch.temp : '--'}</span></li>
                                    <li><span className="field-name">FQ</span><span className="pull-right field-value-dsdigi-font">{ch.fq != undefined ? ch.fq + '%' : '--'}</span></li>
                                    <li><span className="pull-right">  </span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class Detail extends React.Component {

    constructor(props) {
        super(props);
        this.state = { uiUpdate: 0 };
        this.detailName = props.detailName;
        this.detailData = props.data;

        //是否已经Mount
        this.isSelfMount = true;
        //实时请求失败次数
        this.refreshStatusFaultCount = 0;
        //refresh回调
        this.refreshStatusInterval = undefined;

        //refresh data
        this.refreshStatusInterval = undefined;
        this.refreshStatus = this.refreshStatus.bind(this);
        this.onRefreshStatusLoaded = this.onRefreshStatusLoaded.bind(this);
    }

    //初始化detail数据
    componentDidMount() {
        this.isSelfMount = true;
        this.refreshStatus();
    }


    componentWillUnmount() {
        this.isSelfMount = false;
        clearTimeout(this.refreshStatusInterval);
    }

    //刷新detail
    refreshStatus() {
        HttpRequest.axios.get('/detail/' + this.detailName).then(this.onRefreshStatusLoaded).catch(function (error) {
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
            this.detailData = response.data;
            this.setState({ uiUpdate: (this.state.uiUpdate++) });
            this.refreshStatusInterval = setTimeout(this.refreshStatus, Global.Status.RefreshThreadInterval)
        }
    }
    //刷新detail

    render() {
        const data = this.detailData;
        if (!data) {
            return null;
        } else {
            return (
                <div>
                    <div className="row">
                        <div className="col-xs-12 detail-row">
                            <DetailCard dname={data.name} addr={data.addr} ch={data.ch1} chn={1} />
                            <DetailCard dname={data.name} addr={data.addr} ch={data.ch2} chn={2} />
                        </div>
                    </div>
                    <DetailHelp data={data} />
                </div>
            )
        };
    }
}

module.exports = Detail;