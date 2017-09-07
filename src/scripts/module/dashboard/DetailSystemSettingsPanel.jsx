import React from 'react';

import Choice from '../commonui/Choice.jsx'

import HttpRequest from '../common/HttpRequest.jsx';
//系统配置界面

class FrequencyPanel extends React.Component {

    constructor(props) {
        super(props);
        this.parseInput = this.parseInput.bind(this);
    }

    parseInput() {
        let _data = this.props.data;//file 
        _data.frequency.raise_v1 = parseFloat(this.inputRaise_v1.value);
        _data.frequency.raise_v2 = parseFloat(this.inputRaise_v2.value);
        _data.frequency.raise_num = parseFloat(this.inputRaise_num.value);
        _data.frequency.weight_pl = parseFloat(this.inputWeight_pl.value);

        _data.frequency.drop_v1 = parseFloat(this.inputDrop_v1.value);
        _data.frequency.drop_v2 = parseFloat(this.inputDrop_v2.value);
        _data.frequency.drop_num = parseFloat(this.inputDrop_num.value);
        _data.frequency.weight_ph = parseFloat(this.inputWeight_ph.value);


        _data.frequency.weight_n = [parseFloat(this.input_weight_n0.value), parseFloat(this.input_weight_n1.value), parseFloat(this.input_weight_n2.value), parseFloat(this.input_weight_n3.value)];
        _data.frequency.weight_l = [parseFloat(this.input_weight_l0.value), parseFloat(this.input_weight_l1.value), parseFloat(this.input_weight_l2.value), parseFloat(this.input_weight_l3.value)];
        _data.frequency.weight_h = [parseFloat(this.input_weight_h0.value), parseFloat(this.input_weight_h1.value), parseFloat(this.input_weight_h2.value), parseFloat(this.input_weight_h3.value)];
    }
    render() {
        let _data = this.props.data;//file 
        return (
            <div className="panel panel-default" style={{ padding: '0px', background: 'rgba(0, 0, 0, 0)' }}>
                <div className="panel-heading" style={{ background: 'rgba(0, 0, 0, 0)' }}>
                    <h3 className="panel-title">Frequency</h3>
                </div>
                <div className="panel-body">
                    <div className="row">
                        <div className="col-md-6 system-settings-value" style={{ paddingRight: '5px' }}>
                            <ul className="list-unstyled weather-info">
                                <li><span className="field-name">raise_v1</span><span className="pull-right field-value-component">
                                    <input type="text" size={3} ref={(ref) => this.inputRaise_v1 = ref} defaultValue={_data.frequency.raise_v1} />
                                </span></li>
                                <li><span className="field-name">raise_v2</span><span className="pull-right field-value-component">
                                    <input type="text" size={3} ref={(ref) => this.inputRaise_v2 = ref} defaultValue={_data.frequency.raise_v2} />
                                </span></li>
                                <li><span className="field-name">raise_num</span><span className="pull-right field-value-component">
                                    <input type="text" size={3} ref={(ref) => this.inputRaise_num = ref} defaultValue={_data.frequency.raise_num} />
                                </span></li>
                                <li><span className="field-name">weight_pL</span><span className="pull-right field-value-component">
                                    <input type="text" size={3} ref={(ref) => this.inputWeight_pl = ref} defaultValue={_data.frequency.weight_pl} />
                                </span></li>
                                <li><span className="field-name"></span></li>
                            </ul>
                        </div>
                        <div className="col-md-6 system-settings-value" style={{ paddingLeft: '0px' }}>
                            <ul className="list-unstyled weather-info">
                                <li><span className="field-name">drop_v1</span><span className="pull-right field-value-component">
                                    <input type="text" size={3} ref={(ref) => this.inputDrop_v1 = ref} defaultValue={_data.frequency.drop_v1} />
                                </span></li>
                                <li><span className="field-name">drop_v2</span><span className="pull-right field-value-component">
                                    <input type="text" size={3} ref={(ref) => this.inputDrop_v2 = ref} defaultValue={_data.frequency.drop_v2} />
                                </span></li>
                                <li><span className="field-name">drop_num</span><span className="pull-right field-value-component">
                                    <input type="text" size={3} ref={(ref) => this.inputDrop_num = ref} defaultValue={_data.frequency.drop_num} />
                                </span></li>
                                <li><span className="field-name">weight_pH</span><span className="pull-right field-value-component">
                                    <input type="text" size={3} ref={(ref) => this.inputWeight_ph = ref} defaultValue={_data.frequency.weight_ph} />
                                </span></li>
                                <li><span className="field-name"></span></li>
                            </ul>
                        </div>
                    </div>

                    <div className="row">
                        <ul className="list-unstyled weather-info" style={{ paddingLeft: '10px' }}>
                            <li style={{ padding: '0px' }}><span style={{ paddingRight: '10px' }}>weight.N</span>
                                <input type="text" size={2} ref={(ref) => this.input_weight_n0 = ref} defaultValue={_data.frequency.weight_n[0]} />
                                <input type="text" size={2} ref={(ref) => this.input_weight_n1 = ref} defaultValue={_data.frequency.weight_n[1]} />
                                <input type="text" size={2} ref={(ref) => this.input_weight_n2 = ref} defaultValue={_data.frequency.weight_n[2]} />
                                <input type="text" size={2} ref={(ref) => this.input_weight_n3 = ref} defaultValue={_data.frequency.weight_n[3]} />
                            </li>

                            <li style={{ padding: '0px' }}><span style={{ paddingRight: '13px' }}>weight.L</span>
                                <input type="text" size={2} ref={(ref) => this.input_weight_l0 = ref} defaultValue={_data.frequency.weight_l[0]} />
                                <input type="text" size={2} ref={(ref) => this.input_weight_l1 = ref} defaultValue={_data.frequency.weight_l[1]} />
                                <input type="text" size={2} ref={(ref) => this.input_weight_l2 = ref} defaultValue={_data.frequency.weight_l[2]} />
                                <input type="text" size={2} ref={(ref) => this.input_weight_l3 = ref} defaultValue={_data.frequency.weight_l[3]} />
                            </li>

                            <li style={{ padding: '0px' }}><span style={{ paddingRight: '10px' }}>weight.H</span>
                                <input type="text" size={2} ref={(ref) => this.input_weight_h0 = ref} defaultValue={_data.frequency.weight_h[0]} />
                                <input type="text" size={2} ref={(ref) => this.input_weight_h1 = ref} defaultValue={_data.frequency.weight_h[1]} />
                                <input type="text" size={2} ref={(ref) => this.input_weight_h2 = ref} defaultValue={_data.frequency.weight_h[2]} />
                                <input type="text" size={2} ref={(ref) => this.input_weight_h3 = ref} defaultValue={_data.frequency.weight_h[3]} />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

class DCPanel extends React.Component {

    constructor(props) {
        super(props);
        this.parseInput = this.parseInput.bind(this);
    }

    parseInput() {
        let _data = this.props.data;//file  
        _data.dc.weight_pl = parseFloat(this.input_dc_weight_pl.value);
        _data.dc.weight_ph = parseFloat(this.input_dc_weight_ph.value);

        _data.dc.weight_n = [parseFloat(this.input_dc_weight_n0.value), parseFloat(this.input_dc_weight_n1.value), parseFloat(this.input_dc_weight_n2.value), parseFloat(this.input_dc_weight_n3.value)];
        _data.dc.weight_l = [parseFloat(this.input_dc_weight_l0.value), parseFloat(this.input_dc_weight_l1.value), parseFloat(this.input_dc_weight_l2.value), parseFloat(this.input_dc_weight_l3.value)];
        _data.dc.weight_h = [parseFloat(this.input_dc_weight_h0.value), parseFloat(this.input_dc_weight_h1.value), parseFloat(this.input_dc_weight_h2.value), parseFloat(this.input_dc_weight_h3.value)];
    }

    render() {
        let _data = this.props.data;//file 
        return (
            <div className="panel panel-default" style={{ padding: '0px', background: 'rgba(0, 0, 0, 0)' }}>
                <div className="panel-heading" style={{ background: 'rgba(0, 0, 0, 0)' }}>
                    <h3 className="panel-title">DC</h3>
                </div>
                <div className="panel-body">
                    <div className="row">
                        <div className="col-md-6 system-settings-value" style={{ paddingRight: '5px' }}>
                            <ul className="list-unstyled weather-info">
                                <li> <span className="field-name"></span></li>
                                <li> <span className="field-name"></span></li>
                                <li> <span className="field-name"></span></li>
                                <li><span className="field-name">weight_pL</span><span className="pull-right field-value-component">
                                    <input type="text" size={3} ref={(ref) => this.input_dc_weight_pl = ref} defaultValue={_data.dc.weight_pl} />
                                </span></li>
                                <li> <span className="field-name"></span></li>
                            </ul>
                        </div>
                        <div className="col-md-6 system-settings-value" style={{ paddingLeft: '0px' }}>
                            <ul className="list-unstyled weather-info">
                                <li> <span className="field-name"></span></li>
                                <li> <span className="field-name"></span></li>
                                <li> <span className="field-name"></span></li>
                                <li><span className="field-name">weight_pH</span><span className="pull-right field-value-component">
                                    <input type="text" size={3} ref={(ref) => this.input_dc_weight_ph = ref} defaultValue={_data.dc.weight_ph} />
                                </span></li>
                                <li> <span className="field-name"></span></li>
                            </ul>
                        </div>
                    </div>

                    <div className="row">
                        <ul className="list-unstyled weather-info" style={{ paddingLeft: '10px' }}>
                            <li style={{ padding: '0px' }}><span style={{ paddingRight: '10px' }}>weight.N</span>
                                <input type="text" size={2} ref={(ref) => this.input_dc_weight_n0 = ref} defaultValue={_data.dc.weight_n[0]} />
                                <input type="text" size={2} ref={(ref) => this.input_dc_weight_n1 = ref} defaultValue={_data.dc.weight_n[1]} />
                                <input type="text" size={2} ref={(ref) => this.input_dc_weight_n2 = ref} defaultValue={_data.dc.weight_n[2]} />
                                <input type="text" size={2} ref={(ref) => this.input_dc_weight_n3 = ref} defaultValue={_data.dc.weight_n[3]} />
                            </li>

                            <li style={{ padding: '0px' }}><span style={{ paddingRight: '13px' }}>weight.L</span>
                                <input type="text" size={2} ref={(ref) => this.input_dc_weight_l0 = ref} defaultValue={_data.dc.weight_l[0]} />
                                <input type="text" size={2} ref={(ref) => this.input_dc_weight_l1 = ref} defaultValue={_data.dc.weight_l[1]} />
                                <input type="text" size={2} ref={(ref) => this.input_dc_weight_l2 = ref} defaultValue={_data.dc.weight_l[2]} />
                                <input type="text" size={2} ref={(ref) => this.input_dc_weight_l3 = ref} defaultValue={_data.dc.weight_l[3]} />
                            </li>

                            <li style={{ padding: '0px' }}><span style={{ paddingRight: '10px' }}>weight.H</span>
                                <input type="text" size={2} ref={(ref) => this.input_dc_weight_h0 = ref} defaultValue={_data.dc.weight_h[0]} />
                                <input type="text" size={2} ref={(ref) => this.input_dc_weight_h1 = ref} defaultValue={_data.dc.weight_h[1]} />
                                <input type="text" size={2} ref={(ref) => this.input_dc_weight_h2 = ref} defaultValue={_data.dc.weight_h[2]} />
                                <input type="text" size={2} ref={(ref) => this.input_dc_weight_h3 = ref} defaultValue={_data.dc.weight_h[3]} />
                            </li>
                        </ul>
                    </div>


                </div>
            </div>
        )
    }
}

class ACPanel extends React.Component {

    constructor(props) {
        super(props);
        this.parseInput = this.parseInput.bind(this);
    }

    parseInput() {
        let _data = this.props.data;//file 
        _data.ac.l_band = parseFloat(this.input_ac_l_band.value);
        _data.ac.l_weight = parseFloat(this.input_ac_l_weight.value);
        _data.ac.l_d = parseFloat(this.input_ac_l_d.value);
        _data.ac.weight_pl = parseFloat(this.input_ac_weight_pl.value);
        _data.ac.line_turn = parseFloat(this.input_ac_line_turn.value);

        _data.ac.r_band = parseFloat(this.input_ac_r_band.value);
        _data.ac.r_weight = parseFloat(this.input_ac_r_weight.value);
        _data.ac.r_d = parseFloat(this.input_ac_r_d.value);
        _data.ac.weight_ph = parseFloat(this.input_ac_weight_ph.value);
        _data.ac.line_param = parseFloat(this.input_ac_line_param.value);

        _data.ac.weight_n = [parseFloat(this.input_weight_n0.value), parseFloat(this.input_weight_n1.value), parseFloat(this.input_weight_n2.value), parseFloat(this.input_weight_n3.value)];
        _data.ac.weight_l = [parseFloat(this.input_weight_l0.value), parseFloat(this.input_weight_l1.value), parseFloat(this.input_weight_l2.value), parseFloat(this.input_weight_l3.value)];
        _data.ac.weight_h = [parseFloat(this.input_weight_h0.value), parseFloat(this.input_weight_h1.value), parseFloat(this.input_weight_h2.value), parseFloat(this.input_weight_h3.value)];
    }

    render() {
        let _data = this.props.data;//file 
        return (
            <div className="panel panel-default" style={{ padding: '0px', background: 'rgba(0, 0, 0, 0)' }}>
                <div className="panel-heading" style={{ background: 'rgba(0, 0, 0, 0)' }}>
                    <h3 className="panel-title">AC</h3>
                </div>
                <div className="panel-body">
                    <div className="row">
                        <div className="col-md-6 system-settings-value" style={{ paddingRight: '5px' }}>
                            <ul className="list-unstyled weather-info">
                                <li><span className="field-name">l_band</span><span className="pull-right field-value-component">
                                    <input type="text" size={3} ref={(ref) => this.input_ac_l_band = ref} defaultValue={_data.ac.l_band} />
                                </span></li>
                                <li><span className="field-name">l_weight</span><span className="pull-right field-value-component">
                                    <input type="text" size={3} ref={(ref) => this.input_ac_l_weight = ref} defaultValue={_data.ac.l_weight} />
                                </span></li>
                                <li><span className="field-name">l_d</span><span className="pull-right field-value-component">
                                    <input type="text" size={3} ref={(ref) => this.input_ac_l_d = ref} defaultValue={_data.ac.l_d} />
                                </span></li>
                                <li><span className="field-name">weight_pL</span><span className="pull-right field-value-component">
                                    <input type="text" size={3} ref={(ref) => this.input_ac_weight_pl = ref} defaultValue={_data.ac.weight_pl} />
                                </span></li>
                                <li><span className="field-name">line_turn</span><span className="pull-right field-value-component">
                                    <input type="text" size={3} ref={(ref) => this.input_ac_line_turn = ref} defaultValue={_data.ac.line_turn} />
                                </span></li>
                            </ul>
                        </div>
                        <div className="col-md-6 system-settings-value" style={{ paddingLeft: '0px' }}>
                            <ul className="list-unstyled weather-info">
                                <li><span className="field-name">r_band</span><span className="pull-right field-value-component">
                                    <input type="text" size={3} ref={(ref) => this.input_ac_r_band = ref} defaultValue={_data.ac.r_band} />
                                </span></li>
                                <li><span className="field-name">r_weight</span><span className="pull-right field-value-component">
                                    <input type="text" size={3} ref={(ref) => this.input_ac_r_weight = ref} defaultValue={_data.ac.r_weight} />
                                </span></li>
                                <li><span className="field-name">r_d</span><span className="pull-right field-value-component">
                                    <input type="text" size={3} ref={(ref) => this.input_ac_r_d = ref} defaultValue={_data.ac.r_d} />
                                </span></li>
                                <li><span className="field-name">weight_pH</span><span className="pull-right field-value-component">
                                    <input type="text" size={3} ref={(ref) => this.input_ac_weight_ph = ref} defaultValue={_data.ac.weight_ph} />
                                </span></li>
                                <li><span className="field-name">line_param</span><span className="pull-right field-value-component">
                                    <input type="text" size={3} ref={(ref) => this.input_ac_line_param = ref} defaultValue={_data.ac.line_param} />
                                </span></li>
                            </ul>
                        </div>
                    </div>

                    <div className="row">
                        <ul className="list-unstyled weather-info" style={{ paddingLeft: '10px' }}>
                            <li style={{ padding: '0px' }}><span style={{ paddingRight: '10px' }}>weight.N</span>
                                <input type="text" size={2} ref={(ref) => this.input_weight_n0 = ref} defaultValue={_data.ac.weight_n[0]} />
                                <input type="text" size={2} ref={(ref) => this.input_weight_n1 = ref} defaultValue={_data.ac.weight_n[1]} />
                                <input type="text" size={2} ref={(ref) => this.input_weight_n2 = ref} defaultValue={_data.ac.weight_n[2]} />
                                <input type="text" size={2} ref={(ref) => this.input_weight_n3 = ref} defaultValue={_data.ac.weight_n[3]} />
                            </li>

                            <li style={{ padding: '0px' }}><span style={{ paddingRight: '13px' }}>weight.L</span>
                                <input type="text" size={2} ref={(ref) => this.input_weight_l0 = ref} defaultValue={_data.ac.weight_l[0]} />
                                <input type="text" size={2} ref={(ref) => this.input_weight_l1 = ref} defaultValue={_data.ac.weight_l[1]} />
                                <input type="text" size={2} ref={(ref) => this.input_weight_l2 = ref} defaultValue={_data.ac.weight_l[2]} />
                                <input type="text" size={2} ref={(ref) => this.input_weight_l3 = ref} defaultValue={_data.ac.weight_l[3]} />
                            </li>

                            <li style={{ padding: '0px' }}><span style={{ paddingRight: '10px' }}>weight.H</span>
                                <input type="text" size={2} ref={(ref) => this.input_weight_h0 = ref} defaultValue={_data.ac.weight_h[0]} />
                                <input type="text" size={2} ref={(ref) => this.input_weight_h1 = ref} defaultValue={_data.ac.weight_h[1]} />
                                <input type="text" size={2} ref={(ref) => this.input_weight_h2 = ref} defaultValue={_data.ac.weight_h[2]} />
                                <input type="text" size={2} ref={(ref) => this.input_weight_h3 = ref} defaultValue={_data.ac.weight_h[3]} />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }

}

class FilePanel extends React.Component {

    constructor(props) {
        super(props);
        this.parseInput = this.parseInput.bind(this);
    }

    parseInput() {
        this.acPanel.parseInput();
        this.dcPanel.parseInput();
        this.frequencyPanel.parseInput();
    }

    render() {
        let _data = this.props.data;//file 
        return (
            <div className="row">
                <div className="col-md-4" style={{ paddingRight: '10px', paddingLeft: '10px' }}>
                    <ACPanel ref={(ref) => this.acPanel = ref} data={_data} />
                </div>
                <div className="col-md-4" style={{ paddingRight: '10px', paddingLeft: '10px' }}>
                    <DCPanel ref={(ref) => this.dcPanel = ref} data={_data} />
                </div>
                <div className="col-md-4" style={{ paddingRight: '10px', paddingLeft: '10px' }}>
                    <FrequencyPanel ref={(ref) => this.frequencyPanel = ref} data={_data} />
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
        this.fileAPanel.parseInput();
        this.fileBPanel.parseInput();
    }

    render() {
        let _data = this.props.data;//ch 
        return (
            <div>
                <ul className="nav nav-tabs">
                    <li role="presentation" className="active" style={{ padding: '0px' }}><a href={"#filea" + _data.name} data-toggle="tab">FILE A</a></li>
                    <li role="presentation" style={{ padding: '0px' }}><a href={"#fileb" + _data.name} data-toggle="tab">FILE B</a></li>
                </ul>
                <div className="tab-content">
                    <div className="tab-pane fade in active" id={"filea" + _data.name}>
                        <FilePanel ref={(ref) => this.fileAPanel = ref} data={_data.filea} />
                    </div>
                    <div className="tab-pane fade" id={"fileb" + _data.name}>
                        <FilePanel ref={(ref) => this.fileBPanel = ref} data={_data.fileb} />
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
        let _data = this.props.data;//ch
        _data.ao_value.ao_4ma_value = parseInt(this.inputao_4ma_value.value);
        _data.ao_value.ao_20ma_value = parseInt(this.inputao_20ma_value.value);
    }

    render() {
        let _data = this.props.data;//ch
        return (
            <div className="row">
                <div className="col-md-5">
                    <ul className="list-unstyled weather-info">
                        <li><span className="field-name">ao_4mA_Value</span><span className="pull-right field-value-component"><input ref={(ref) => this.inputao_4ma_value = ref} type="text" defaultValue={_data.ao_value.ao_4ma_value} /></span></li>
                    </ul>
                </div>
                <div className="col-md-5">
                    <ul className="list-unstyled weather-info">
                        <li><span className="field-name">ao_20mA_Value</span><span className="pull-right field-value-component"><input ref={(ref) => this.inputao_20ma_value = ref} type="text" defaultValue={_data.ao_value.ao_20ma_value} /></span></li>
                    </ul>
                </div>
            </div>
        )
    }

}

class ChannelsPanel extends React.Component {

    constructor(props) {
        super(props);
        this.parseInput = this.parseInput.bind(this);
    }

    parseInput() {
        this.inputCh1ChPanel.parseInput();
        this.inputCh1TwoFilePanel.parseInput();
        this.inputCh2ChPanel.parseInput();
        this.inputCh2TwoFilePanel.parseInput();
    }

    render() {
        let _data = this.props.data;//system setting 
        return (

            <div className="col-md-12">
                <div className="panel panel-dark config-inner-panel">

                    <div className="panel-body" style={{ display: 'flex', margin: '10px 0px 0px 0px', padding: '0px!important' }}>
                        <ul className="nav nav-pills nav-stacked">
                            <li role="presentation" className="active" style={{ padding: '0px' }}><a href="#ch1" data-toggle="tab">CH1</a></li>
                            <li role="presentation" style={{ padding: '0px' }}><a href="#ch2" data-toggle="tab">CH2</a></li>
                        </ul>

                        <div className="tab-content system-settings-chan-tab" style={{ paddingRight: '30px' }} >
                            <div className="tab-pane fade in active" id="ch1">
                                <ChannelPanel ref={(ref) => this.inputCh1ChPanel = ref} data={_data.ch1} />
                                <TwoFilePanel ref={(ref) => this.inputCh1TwoFilePanel = ref} data={_data.ch1} />
                            </div>
                            <div className="tab-pane fade" id="ch2">
                                <ChannelPanel ref={(ref) => this.inputCh2ChPanel = ref} data={_data.ch2} />
                                <TwoFilePanel ref={(ref) => this.inputCh2TwoFilePanel = ref} data={_data.ch2} />
                            </div>
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
        this.parseInput = this.parseInput.bind(this);
    }

    parseInput() {
        console.log('this.versionInfoPanel:' + this.versionInfoPanel);

        let _data = this.props.data;//version 
        _data.amp_version = parseInt(this.inputAmpVersion.value);
        _data.fw_version = parseInt(this.inputFwVersion.value);
        _data.ch1 = parseInt(this.inputCh1.value);
        _data.ch2 = parseInt(this.inputCh2.value);
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
                                    <li><span className="field-name">AMP Version</span><span className="pull-right field-value-component"><input ref={(ref) => this.inputAmpVersion = ref} type="text" size={4} defaultValue={_data.amp_version} /></span></li>
                                </ul>
                            </div>
                            <div className="col-md-3">
                                <ul className="list-unstyled weather-info">
                                    <li><span className="field-name">FW Version</span><span className="pull-right field-value-component"><input ref={(ref) => this.inputFwVersion = ref} type="text" size={4} defaultValue={_data.fw_version} /></span></li>
                                </ul>
                            </div>
                            <div className="col-md-3">
                                <ul className="list-unstyled weather-info">
                                    <li><span className="field-name">CH1</span><span className="pull-right field-value-component"><input ref={(ref) => this.inputCh1 = ref} type="text" size={4} defaultValue={_data.ch1} /></span></li>
                                </ul>
                            </div>
                            <div className="col-md-3">
                                <ul className="list-unstyled weather-info">
                                    <li><span className="field-name">CH2</span><span className="pull-right field-value-component"><input ref={(ref) => this.inputCh2 = ref} type="text" size={4} defaultValue={_data.ch2} /></span></li>
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

    constructor(props) {
        super(props);
        this.parseInput = this.parseInput.bind(this);
    }

    parseInput() {
        let _data = this.props.data;//version 
        _data.scan1 = this.inputScan1.getSelectIndex();
        _data.scan2 = this.inputScan2.getSelectIndex();
        _data.t1 = this.inputT1.getSelectIndex();
        _data.t2 = this.inputT2.getSelectIndex();
        _data.da1 = this.inputDa1.getSelectIndex();
        _data.da2 = this.inputDa2.getSelectIndex();
        _data.fram = this.inputFram.getSelectIndex();
    }

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
                                        <Choice ref={(ref) => this.inputScan1 = ref} selectIndex={_data.scan1} labels={['Disable', 'Enable']} />
                                    </span></li>
                                    <li><span className="field-name">Scan2</span><span className="pull-right field-value-component">
                                        <Choice ref={(ref) => this.inputScan2 = ref} selectIndex={_data.scan2} labels={['Disable', 'Enable']} />
                                    </span></li>
                                </ul>
                            </div>
                            <div className="col-md-3">
                                <ul className="list-unstyled weather-info">
                                    <li><span className="field-name">T1</span><span className="pull-right field-value-component">
                                        <Choice ref={(ref) => this.inputT1 = ref} selectIndex={_data.t1} labels={['Disable', 'Enable']} />
                                    </span></li>
                                    <li><span className="field-name">T2</span><span className="pull-right field-value-component">
                                        <Choice ref={(ref) => this.inputT2 = ref} selectIndex={_data.t2} labels={['Disable', 'Enable']} />
                                    </span></li>
                                </ul>
                            </div>
                            <div className="col-md-3">
                                <ul className="list-unstyled weather-info">
                                    <li><span className="field-name">DA1</span><span className="pull-right field-value-component">
                                        <Choice ref={(ref) => this.inputDa1 = ref} selectIndex={_data.da1} labels={['Disable', 'Enable']} />
                                    </span></li>
                                    <li><span className="field-name">DA2</span><span className="pull-right field-value-component">
                                        <Choice ref={(ref) => this.inputDa2 = ref} selectIndex={_data.da2} labels={['Disable', 'Enable']} />
                                    </span></li>
                                </ul>
                            </div>
                            <div className="col-md-3">
                                <ul className="list-unstyled weather-info">
                                    <li><span className="field-name">FRAM</span><span className="pull-right field-value-component">
                                        <Choice ref={(ref) => this.inputFram = ref} selectIndex={_data.fram} labels={['Disable', 'Enable']} />
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

        this.parseInput = this.parseInput.bind(this);
    }

    parseInput() {
        console.log('this.versionInfoPanel:' + this.versionInfoPanel);

        this.versionInfoPanel.parseInput();
        this.checkEnablesPanel.parseInput();
        this.channelsPanel.parseInput();

        let _json = JSON.stringify(this.state.data);

        var params = new URLSearchParams();
        params.append('content', _json);

        HttpRequest.axios.put('/detail/' + this.state.data.name + '/systemsettings', params).then(function (response) {
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
            return (
                <div className="row">
                    <VersionInfoPanel ref={(ref) => this.versionInfoPanel = ref} data={_data.version_info} />
                    <CheckEnablesPanel ref={(ref) => this.checkEnablesPanel = ref} data={_data.check_enables} />
                    <ChannelsPanel ref={(ref) => this.channelsPanel = ref} data={_data} />
                </div>
            )
        }

    };

}

module.exports = DetailSystemSettingsPanel;