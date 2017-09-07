import React from 'react';

import Choice from '../commonui/Choice.jsx'

import HttpRequest from '../common/HttpRequest.jsx';
//用户配置界面

class FilePanel extends React.Component {

    constructor(props) {
        super(props);
        this.parseInput = this.parseInput.bind(this);
    }

    parseInput() {
        let _data = this.props.data;//file 
        _data.ac_gain = parseInt(this.inputAcGain.value);
        _data.fc = parseInt(this.inputFc.value);
        _data.ac_on_th = parseInt(this.inputAcOnTh.value);
        _data.ac_on_tl = parseInt(this.inputAcOnTL.value);
        _data.max = parseInt(this.inputMax.value);
        _data.min = parseInt(this.inputMin.value);

        _data.dc_gain = parseInt(this.inputDcGain.value);
        _data.dc_on_th = parseInt(this.inputDcOnTh.value);
        _data.dc_on_tl = parseInt(this.inputDcOnTL.value);
        _data.freq_on_th = parseInt(this.inputFreqOnTh.value);
        _data.freq_on_tl = parseInt(this.inputFreqOnTL.value);
        _data.otd = parseInt(this.inputOtd.value);
        _data.ffrt = parseInt(this.inputFfrt.value);
    }

    render() {
        let _data = this.props.data;//file 
        return (
            <div className="row">
                <div className="col-md-6">
                    <ul className="list-unstyled weather-info">
                        <li><span className="field-name">AC Gain</span><span className="pull-right field-value-component"><input ref={(ref) => this.inputAcGain = ref} type="text" size="8" defaultValue={_data.ac_gain} /></span></li>
                        <li><span className="field-name">Fx</span><span className="pull-right field-value-component"><input ref={(ref) => this.inputFc = ref} type="text" size="8" defaultValue={_data.fc} /></span></li>
                        <li><span className="field-name">AC ON_TH</span><span className="pull-right field-value-component"><input ref={(ref) => this.inputAcOnTh = ref} type="text" size="8" defaultValue={_data.ac_on_th} /></span></li>
                        <li><span className="field-name">AC ON_TL</span><span className="pull-right field-value-component"><input ref={(ref) => this.inputAcOnTL = ref} type="text" size="8" defaultValue={_data.ac_on_tl} /></span></li>
                        <li><span className="field-name">Max</span><span className="pull-right field-value-component"><input ref={(ref) => this.inputMax = ref} type="text" size="8" defaultValue={_data.max} /></span></li>
                        <li><span className="field-name">Min</span><span className="pull-right field-value-component"><input ref={(ref) => this.inputMin = ref} type="text" size="8" defaultValue={_data.min} /></span></li>
                    </ul>
                </div>
                <div className="col-md-6">
                    <ul className="list-unstyled weather-info">
                        <li><span className="field-name">DC Gain</span><span className="pull-right field-value-component"><input ref={(ref) => this.inputDcGain = ref} type="text" size="8" defaultValue={_data.dc_gain} /></span></li>
                        <li><span className="field-name">DC ON_TH</span><span className="pull-right field-value-component"><input ref={(ref) => this.inputDcOnTh = ref} type="text" size="8" defaultValue={_data.dc_on_th} /></span></li>
                        <li><span className="field-name">DC ON_TL</span><span className="pull-right field-value-component"><input ref={(ref) => this.inputDcOnTL = ref} type="text" size="8" defaultValue={_data.dc_on_tl} /></span></li>
                        <li><span className="field-name">FREQ ON_TH</span><span className="pull-right field-value-component"><input ref={(ref) => this.inputFreqOnTh = ref} type="text" size="8" defaultValue={_data.freq_on_th} /></span></li>
                        <li><span className="field-name">FREQ ON_TL</span><span className="pull-right field-value-component"><input ref={(ref) => this.inputFreqOnTL = ref} type="text" size="8" defaultValue={_data.freq_on_tl} /></span></li>
                        <li><span className="field-name">OTD</span><span className="pull-right field-value-component"><input ref={(ref) => this.inputOtd = ref} type="text" size="8" defaultValue={_data.otd} /></span></li>
                        <li><span className="field-name">FFRT</span><span className="pull-right field-value-component"><input ref={(ref) => this.inputFfrt = ref} type="text" size="8" defaultValue={_data.ffrt} /></span></li>
                    </ul>
                </div>
            </div>
        )
    }
}

class TwoFilePanel extends React.Component {

    constructor(props) {
        super(props);
        this.parseInput = this.parseInput.bind(this);
    }

    parseInput() {
        this.filePanelA.parseInput();
        this.filePanelB.parseInput();
    }

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
                        <FilePanel ref={(ref) => this.filePanelA = ref} data={_data.filea} />
                    </div>
                    <div className="tab-pane fade" id={"fileb" + _data.name}>
                        <FilePanel ref={(ref) => this.filePanelB = ref} data={_data.fileb} />
                    </div>
                </div>
            </div>
        )
    }
}

class ChannelPanel extends React.Component {

    constructor(props) {
        super(props);
        this.parseInput = this.parseInput.bind(this);
    }

    parseInput() {
        let _data = this.props.data;
        _data.type = this.inputType.getSelectIndex() == 0 ? 'IR' : 'UV';
        _data.enable = this.inputEnable.getSelectIndex() == 0 ? true : false;
        _data.file = this.inputFile.getSelectIndex();
    }


    render() {
        let _data = this.props.data;
        let _typeIndex = _data.type == 'IR' ? 0 : 1;
        let _enableIndex = _data.enable == true ? 0 : 1;

        return (
            <ul className="list-unstyled weather-info">
                <li><span className="field-name">Burner Type</span><span className="pull-right field-value-component">
                    <Choice ref={(ref) => this.inputType = ref} selectIndex={_typeIndex} labels={['IR', 'UV']} />
                </span></li>
                <li><span className="field-name">Channel EN</span><span className="pull-right field-value-component">
                    <Choice ref={(ref) => this.inputEnable = ref} selectIndex={_enableIndex} labels={['Enable', 'Disable']} />
                </span></li>
                <li><span className="field-name">File</span><span className="pull-right field-value-component">
                    <Choice ref={(ref) => this.inputFile = ref} selectIndex={_data.file} labels={['FILE A', 'FILE B']} />
                </span></li>
            </ul>
        )
    }
}

class DetailUserSettingsPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = { data: undefined };

        this.parseInput = this.parseInput.bind(this);
    }

    renderNav(chn) {
        if (chn == 1) {
            return (
                <ul className="nav nav-tabs">
                    <li role="presentation" className="active"><a href="#ch1" data-toggle="tab">CH1</a></li>
                    <li role="presentation"><a href="#ch2" data-toggle="tab">CH2</a></li>
                </ul>
            )
        } else {
            return (
                <ul className="nav nav-tabs">
                    <li role="presentation" ><a href="#ch1" data-toggle="tab">CH1</a></li>
                    <li role="presentation" className="active"><a href="#ch2" data-toggle="tab">CH2</a></li>
                </ul>
            )
        }
    }

    parseInput() {
        this.ch1Panel.parseInput();
        this.ch1TwoFilePanel.parseInput();
        this.ch2Panel.parseInput();
        this.ch2TwoFilePanel.parseInput();
        let _json = JSON.stringify(this.state.data);

        var params = new URLSearchParams();
        params.append('content', _json);

        HttpRequest.axios.put('/detail/' + this.state.data.name + '/usersettings', params).then(function (response) {
            console.log(response);
        }.bind(this));

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
            let chn = this.props.chn;
            return (
                <div>
                    {this.renderNav(chn)}
                    <div className="tab-content">
                        <div className="tab-pane fade in active" id="ch1">
                            <ChannelPanel ref={(ref) => this.ch1Panel = ref} data={_data.ch1} />
                            <TwoFilePanel ref={(ref) => this.ch1TwoFilePanel = ref} data={_data.ch1} />
                        </div>
                        <div className="tab-pane fade" id="ch2">
                            <ChannelPanel ref={(ref) => this.ch2Panel = ref} data={_data.ch2} />
                            <TwoFilePanel ref={(ref) => this.ch2TwoFilePanel = ref} data={_data.ch2} />
                        </div>
                    </div>
                </div>
            )
        }
    };
}

module.exports = DetailUserSettingsPanel;