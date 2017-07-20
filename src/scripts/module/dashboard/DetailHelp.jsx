import React from 'react';

import Choice from '../common/Choice.jsx'
import DetailSystemConfigPanel from './DetailSystemConfigPanel.jsx'
import { ConfigDialog } from '../MyDialog.jsx';

//详情的注释
class DetailHelp extends React.Component {

    constructor(props) {
        super(props);

        this.detailSystemConfigPanel = undefined;
        this.factorySettingModalRender = this.factorySettingModalRender.bind(this);
    }

    handleSwitch(elem, state) {
        if (state) {
            console.log("摄氏度");
        } else {
            console.log("华氏度");
        }
    }

    actionFactorySettingClick() {
        let systemSettingJson = require("../../../assets/datas/detail-system-setting.json");
        setTimeout(this.onSystemSettingDatasLoaded.bind(this, systemSettingJson), 1000 * 1);
    }

    onSystemSettingDatasLoaded(systemSettingJson) {
        this.detailSystemConfigPanel.setState({ data: systemSettingJson });
    }

    factorySettingModalRender() {
        return (
            <DetailSystemConfigPanel ref={(ref) => this.detailSystemConfigPanel = ref} />
        );
    }

    render() {
        const data = this.props.data;
        return (
            <div>
                <ConfigDialog id="factoryConfigModal" title="Factory Settings" body={this.factorySettingModalRender} />
                <div className="row">
                    <div className="col-xs-12 detail-all">
                        <div className="panel panel-dark detail-panel">
                            <div className="panel-body">
                                <div className="col-md-4">
                                    <ul className="list-unstyled weather-info">
                                        <li><span className="field-name">C</span><span className="pull-right">Celsius</span></li>
                                        <li><span className="field-name">F</span><span className="pull-right">Fahrenhert</span></li>
                                        <li><span className="field-name">IR</span><span className="pull-right">Infrared</span></li>
                                        <li><span className="field-name">UV</span><span className="pull-right">Ultraviolet</span></li>
                                    </ul>
                                </div>
                                <div className="col-md-4">
                                    <ul className="list-unstyled weather-info">
                                        <li><span className="field-name">Fault</span><span className="pull-right">Error Code(Hex)</span></li>
                                        <li><span className="field-name">MAX</span><span className="pull-right">AC Maximum</span></li>
                                        <li><span className="field-name">MIN</span><span className="pull-right">AC Minimum</span></li>
                                        <li><span className="field-name">TEMP</span><span className="pull-right">Temperature</span></li>
                                    </ul>
                                </div>
                                <div className="col-md-4">
                                    <ul className="list-unstyled weather-info">
                                        <li><span className="field-name">ON_TL</span><span className="pull-right">ON Threshold in Low</span></li>
                                        <li><span className="field-name">ON_TH</span><span className="pull-right">ON Threshold in High</span></li>
                                        <li><span className="field-name"></span><span className="pull-right field-value-component"><Choice selectIndex={0} labels={['F', 'C']} /></span></li>
                                        <li><span className="field-name"></span><span className="pull-right field-value-component">
                                            <button type="button" className="btn btn-info" data-toggle="modal" data-target="#factoryConfigModal" onClick={this.actionFactorySettingClick.bind(this)}>Factory Settings</button>
                                        </span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    };

}

module.exports = DetailHelp;