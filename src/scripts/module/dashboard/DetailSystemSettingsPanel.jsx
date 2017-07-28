import React from 'react';

import Choice from '../common/Choice.jsx'
//系统配置界面

class FilePanel extends React.Component {
    render() {
        let _data = this.props.data;//file 
        return (
            <div className="row">
                <div className="col-md-4">

                    <div className="bs-callout bs-callout-danger">
                        <ul className="list-unstyled weather-info">
                            <li><span className="field-name">l_band</span><span className="pull-right field-value-component">
                                <input type="text" defaultValue={_data.ac.l_band} />
                            </span></li>

                            <li><span className="field-name">l_band</span><span className="pull-right field-value-component">
                                <input type="text" defaultValue={_data.ac.l_band} />
                            </span></li>
                        </ul>
                    </div>

                </div>
                <div className="col-md-4">
                    {_data.ac.l_band}
                </div>
                <div className="col-md-4">
                    {_data.ac.l_band}
                </div>
            </div>

        )
    }
}

class TwoFilePanel extends React.Component {

    render() {
        let _data = this.props.data;//ch 
        return (
            <div>
                <ul className="nav nav-tabs">
                    <li role="presentation" className="active"><a href={"#filea" + _data.name} data-toggle="tab">FILE A</a></li>
                    <li role="presentation"><a href={"#fileb" + _data.name} data-toggle="tab">FILE B</a></li>
                </ul>
                <div className="tab-content">
                    <div className="tab-pane fade in active" id={"filea" + _data.name}>
                        <FilePanel data={_data.filea} />
                    </div>
                    <div className="tab-pane fade" id={"fileb" + _data.name}>
                        <FilePanel data={_data.fileb} />
                    </div>
                </div>
            </div>

        )
    }
}

class ChannelPanel extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let _data = this.props.data;//ch
        return (
            <div className="row">
                <div className="col-md-5">
                    <ul className="list-unstyled weather-info">
                        <li><span className="field-name">ao_4mA_Value</span><span className="pull-right field-value-component"><input type="text" defaultValue={_data.ao_value.ao_4ma_value} /></span></li>
                    </ul>
                </div>
                <div className="col-md-5">
                    <ul className="list-unstyled weather-info">
                        <li><span className="field-name">ao_20mA_Value</span><span className="pull-right field-value-component"><input type="text" defaultValue={_data.ao_value.ao_20ma_value} /></span></li>
                    </ul>
                </div>
            </div>
        )
    }

}

class ChannelsPanel extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let _data = this.props.data;//system setting 
        return (
            <div className="col-md-12">
                <div className="panel panel-dark">
                    <ul className="nav nav-tabs">
                        <li role="presentation" className="active"><a href="#ch1" data-toggle="tab">CH1</a></li>
                        <li role="presentation"><a href="#ch2" data-toggle="tab">CH2</a></li>
                    </ul>

                    <div className="tab-content">
                        <div className="tab-pane fade in active" id="ch1">
                            <ChannelPanel data={_data.ch1} />
                            <TwoFilePanel data={_data.ch1} />
                        </div>
                        <div className="tab-pane fade" id="ch2">
                            <ChannelPanel data={_data.ch2} />
                            <TwoFilePanel data={_data.ch2} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class VersionInfoPanel extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let _data = this.props.data;//version 
        return (
            <div className="col-md-12">
                <div className="panel panel-dark config-inner-panel">
                    <div className="panel-heading">
                        <h4 className="panel-title">Version Infomation</h4>
                    </div>
                    <div className="panel-body">
                        <div className="row">
                            <div className="col-md-3">
                                <ul className="list-unstyled weather-info">
                                    <li><span className="field-name">AMP Version</span><span className="pull-right field-value-component"><input type="number" size={4} defaultValue={_data.amp_version} /></span></li>
                                </ul>
                            </div>
                            <div className="col-md-3">
                                <ul className="list-unstyled weather-info">
                                    <li><span className="field-name">FW Version</span><span className="pull-right field-value-component"><input type="number" size={4} defaultValue={_data.fw_version} /></span></li>
                                </ul>
                            </div>
                            <div className="col-md-3">
                                <ul className="list-unstyled weather-info">
                                    <li><span className="field-name">CH1</span><span className="pull-right field-value-component"><input type="number" size={4} defaultValue={_data.ch1} /></span></li>
                                </ul>
                            </div>
                            <div className="col-md-3">
                                <ul className="list-unstyled weather-info">
                                    <li><span className="field-name">CH2</span><span className="pull-right field-value-component"><input type="number" size={4} defaultValue={_data.ch2} /></span></li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class CheckEnablesPanel extends React.Component {

    render() {
        let _data = this.props.data;//CheckEnables 
        return (
            <div className="col-md-12">
                <div className="panel panel-dark config-inner-panel">
                    <div className="panel-heading">
                        <h4 className="panel-title">Check Enables</h4>
                    </div>
                    <div className="panel-body">
                        <div className="row">
                            <div className="col-md-3">
                                <ul className="list-unstyled weather-info">
                                    <li><span className="field-name">Scan1</span><span className="pull-right field-value-component">
                                        <Choice selectIndex={_data.scan1} labels={['Enable', 'Disable']} />
                                    </span></li>
                                    <li><span className="field-name">Scan2</span><span className="pull-right field-value-component">
                                        <Choice selectIndex={_data.scan2} labels={['Enable', 'Disable']} />
                                    </span></li>
                                </ul>
                            </div>
                            <div className="col-md-3">
                                <ul className="list-unstyled weather-info">
                                    <li><span className="field-name">T1</span><span className="pull-right field-value-component">
                                        <Choice selectIndex={_data.t1} labels={['Enable', 'Disable']} />
                                    </span></li>
                                    <li><span className="field-name">T2</span><span className="pull-right field-value-component">
                                        <Choice selectIndex={_data.t2} labels={['Enable', 'Disable']} />
                                    </span></li>
                                </ul>
                            </div>
                            <div className="col-md-3">
                                <ul className="list-unstyled weather-info">
                                    <li><span className="field-name">DA1</span><span className="pull-right field-value-component">
                                        <Choice selectIndex={_data.da1} labels={['Enable', 'Disable']} />
                                    </span></li>
                                    <li><span className="field-name">DA2</span><span className="pull-right field-value-component">
                                        <Choice selectIndex={_data.da2} labels={['Enable', 'Disable']} />
                                    </span></li>
                                </ul>
                            </div>
                            <div className="col-md-3">
                                <ul className="list-unstyled weather-info">
                                    <li><span className="field-name">FRAM</span><span className="pull-right field-value-component">
                                        <Choice selectIndex={_data.fram} labels={['Enable', 'Disable']} />
                                    </span></li>
                                    <li><span className="field-name"></span><span className="pull-right field-value-component">

                                    </span></li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

class DetailSystemSettingsPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = { data: undefined };
    }

    render() {
        let _data = this.state.data;
        if (_data == undefined) {
            //loading
            return (
                <div className="progress">
                    <div className="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{ width: "100%" }}>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="row">
                    <VersionInfoPanel data={_data.version_info} />
                    <CheckEnablesPanel data={_data.check_enables} />
                    <ChannelsPanel data={_data} />
                </div>
            )
        }

    };

}

module.exports = DetailSystemSettingsPanel;