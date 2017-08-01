import React from 'react';

import HttpRequest from '../common/HttpRequest.jsx';

import Choice from '../commonui/Choice.jsx'

import DetailSystemSettingsPanel from './DetailSystemSettingsPanel.jsx'


//详情的注释
class DetailHelp extends React.Component {

    constructor(props) {
        super(props);
        this.detailSystemSettingsPanel = undefined;
        this.factorySettingModalRender = this.factorySettingModalRender.bind(this);
        this.onSystemSettingDatasLoaded = this.onSystemSettingDatasLoaded.bind(this);
    }

    handleSwitch(elem, state) {
        if (state) {
            console.log("摄氏度");
        } else {
            console.log("华氏度");
        }
    }

    actionFactorySettingClick() {
        let detailName = this.props.data.name;
        HttpRequest.axios.get('/detail/' + detailName + '/systemsettings').then(this.onSystemSettingDatasLoaded);
    }

    onSystemSettingDatasLoaded(response) {
        this.detailSystemSettingsPanel.setState({ data: response.data });
    }

    factorySettingModalRender() {
        return (
            <DetailSystemSettingsPanel ref={(ref) => this.detailSystemSettingsPanel = ref} />
        );
    }

    render() {
        const data = this.props.data;
        return (
            <div>
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
                                            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#factoryConfigModal" onClick={this.actionFactorySettingClick.bind(this)}>Factory Settings</button>
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