import React from 'react';

import Const from '../Const.jsx'
import EventProxy from '../EventProxy.jsx'

import DetailGauge from './DetailGauge.jsx';
import DetailHelp from './DetailHelp.jsx';
import DetailUserConfigPanel from './DetailUserConfigPanel.jsx';
import { ConfigDialog } from '../MyDialog.jsx';

class Detail extends React.Component {

    constructor(props) {
        super(props); 
        this.configModalRender = this.configModalRender.bind(this);
    }

    componentDidMount() {
    }

    actionUserSettingClick(_param) {
        console.log(_param)
        let detailUserSettingJson = require("../../../assets/datas/detail-user-setting.json");
        setTimeout(this.onDetailConfigDatasLoaded.bind(this, detailUserSettingJson), 1000 * 1); 
    }

    onDetailConfigDatasLoaded(detailUserSettingJson) {
        console.log('detailUserSettingJson:' + detailUserSettingJson);
        this.detailUserConfigPanel.setState({ data: detailUserSettingJson });
    }

    configModalRender() {
        return (
            <DetailUserConfigPanel ref={(ref) => this.detailUserConfigPanel = ref} />
        );
    }

    render() {
        const data = this.props.data;
        return (
            <div>
                <ConfigDialog id="configModal" title="User Settings" body={this.configModalRender} />
                <div className="row">
                    <div className="col-xs-12 detail-row">
                        <div className="col-xs-6 detail-card">
                            <div className="panel panel-dark detail-panel">

                                <div className="panel-heading">
                                    <h4 className="panel-title">{data.name}-CH1</h4>
                                    <span className="badge">No.{data.addr}</span>
                                    <div className="panel-control">
                                        <a className="cursor-pointer" onClick={this.actionUserSettingClick.bind(this, 123)} title="" data-toggle="modal" data-target="#configModal" ><i className="fa fa-cog"></i></a>
                                    </div>
                                </div>
                                <div className="panel-body">
                                  
                                        <div className="row">
                                            <div className="col-md-6">
                                                <ul className="list-unstyled weather-info">
                                                    <li><span className="field-name">ON_TH</span><span className="pull-right field-value-dsdigi-font">{data.ch1.onth}</span></li>
                                                    <li><span className="field-name">ON_TL</span><span className="pull-right field-value-dsdigi-font">{data.ch1.ontl}</span></li>
                                                    <li><span className="field-name">MAX</span><span className="pull-right field-value-dsdigi-font">{data.ch1.max}</span></li>
                                                    <li><span className="field-name">MIN</span><span className="pull-right field-value-dsdigi-font">{data.ch1.min}</span></li>
                                                    <li><span className="field-name">DC</span><span className="pull-right field-value-dsdigi-font">{data.ch1.dc}</span></li>
                                                    <li><span className="field-name">AC</span><span className="pull-right field-value-dsdigi-font">{data.ch1.ac}</span></li>
                                                    <li><span className="field-name">FREQ</span><span className="pull-right field-value-dsdigi-font">{data.ch1.freq}</span></li>
                                                </ul>
                                            </div>
                                            <div className="col-md-6">
                                                <ul className="list-unstyled weather-info">
                                                    <li><span className="field-name">TYPE</span><span className="pull-right field-value-dsdigi-font">{data.ch1.freq}</span></li>
                                                    <li><span className="field-name">STATUS</span><span className="pull-right field-value-dsdigi-font">{data.ch1.status}</span></li>
                                                    <li><span className="field-name">FAULT</span><span className="pull-right field-value-dsdigi-font">{data.ch1.fault}</span></li>
                                                    <li><span className="field-name">TEMP</span><span className="pull-right field-value-dsdigi-font">{data.ch1.temp}</span></li>
                                                    <li><span className="field-name">FQ</span><span className="pull-right field-value-dsdigi-font">{data.ch1.fq}%</span></li>
                                                    <li><span className="pull-right"><DetailGauge value={data.ch1.fq} ref={(ref) => this.detailGaugeCh1 = ref} /></span></li>
                                                </ul>
                                            </div>
                                        </div>
                                 
                                </div>
                            </div>
                        </div>

                        <div className="col-xs-6 detail-card">
                            <div className="panel panel-dark detail-panel">
                                <div className="panel-heading">
                                    <h4 className="panel-title">{data.name}-CH2</h4>
                                    <span className="badge">No.{data.addr}</span>
                                    <div className="panel-control">
                                        <a href="javascript:void(0);" title=""><i className="fa fa-cog"></i></a>
                                    </div>
                                </div>
                                <div className="panel-body">
                                    
                                        <div className="row">
                                            <div className="col-md-6">
                                                <ul className="list-unstyled weather-info">
                                                    <li><span className="field-name">ON_TH</span><span className="pull-right field-value-dsdigi-font">{data.ch2.onth}</span></li>
                                                    <li><span className="field-name">ON_TL</span><span className="pull-right field-value-dsdigi-font">{data.ch2.ontl}</span></li>
                                                    <li><span className="field-name">MAX</span><span className="pull-right field-value-dsdigi-font">{data.ch2.max}</span></li>
                                                    <li><span className="field-name">MIN</span><span className="pull-right field-value-dsdigi-font">{data.ch2.min}</span></li>
                                                    <li><span className="field-name">DC</span><span className="pull-right field-value-dsdigi-font">{data.ch2.dc}</span></li>
                                                    <li><span className="field-name">AC</span><span className="pull-right field-value-dsdigi-font">{data.ch2.ac}</span></li>
                                                    <li><span className="field-name">FREQ</span><span className="pull-right field-value-dsdigi-font">{data.ch2.freq}</span></li>
                                                </ul>
                                            </div>
                                            <div className="col-md-6">
                                                <ul className="list-unstyled weather-info">
                                                    <li><span className="field-name">TYPE</span><span className="pull-right field-value-dsdigi-font">{data.ch2.freq}</span></li>
                                                    <li><span className="field-name">STATUS</span><span className="pull-right field-value-dsdigi-font">{data.ch2.status}</span></li>
                                                    <li><span className="field-name">FAULT</span><span className="pull-right field-value-dsdigi-font">{data.ch2.fault}</span></li>
                                                    <li><span className="field-name">TEMP</span><span className="pull-right field-value-dsdigi-font">{data.ch2.temp}</span></li>
                                                    <li><span className="field-name">FQ</span><span className="pull-right field-value-dsdigi-font">{data.ch2.fq}%</span></li>
                                                    <li><span className="pull-right"><DetailGauge value={data.ch2.fq} ref={(ref) => this.detailGaugeCh2 = ref} /></span></li>
                                                </ul>
                                            </div>
                                        </div>
                                 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <DetailHelp data={data}/>
            </div>
        )
    };

}

module.exports = Detail;