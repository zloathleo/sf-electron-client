import React from 'react';
import Switch from 'react-bootstrap-switch';

import Const from '../Const.jsx'
import EventProxy from '../EventProxy.jsx'

import Choice from '../common/Choice.jsx'
//用户配置界面

class FilePanel extends React.Component {
    render() {
        let _data = this.props.data;//file 
        return (
            <div className="row">
                <div className="col-md-6">
                    <ul className="list-unstyled weather-info">
                        <li><span className="field-name">AC Gain</span><span className="pull-right"><input type="text" defaultValue={_data.ac_gain} /></span></li>
                        <li><span className="field-name">Fx</span><span className="pull-right"><input type="text" defaultValue={_data.fc} /></span></li>
                        <li><span className="field-name">AC ON_TH</span><span className="pull-right"><input type="text" defaultValue={_data.ac_on_th} /></span></li>
                        <li><span className="field-name">AC ON_TL</span><span className="pull-right"><input type="text" defaultValue={_data.ac_on_tl} /></span></li>
                        <li><span className="field-name">Max</span><span className="pull-right"><input type="text" defaultValue={_data.max} /></span></li>
                        <li><span className="field-name">Min</span><span className="pull-right"><input type="text" defaultValue={_data.min} /></span></li>
                    </ul>
                </div>
                <div className="col-md-6">
                    <ul className="list-unstyled weather-info">
                        <li><span className="field-name">DC Gain</span><span className="pull-right"><input type="text" defaultValue={_data.dc_gain} /></span></li>
                        <li><span className="field-name">DC ON_TH</span><span className="pull-right"><input type="text" defaultValue={_data.dc_on_th} /></span></li>
                        <li><span className="field-name">DC ON_TL</span><span className="pull-right"><input type="text" defaultValue={_data.dc_on_tl} /></span></li>
                        <li><span className="field-name">FREQ ON_TH</span><span className="pull-right"><input type="text" defaultValue={_data.freq_on_th} /></span></li>
                        <li><span className="field-name">FREQ ON_TL</span><span className="pull-right"><input type="text" defaultValue={_data.freq_on_tl} /></span></li>
                        <li><span className="field-name">OTD</span><span className="pull-right"><input type="text" defaultValue={_data.otd} /></span></li>
                        <li><span className="field-name">FFRT</span><span className="pull-right"><input type="text" defaultValue={_data.ffrt} /></span></li>
                    </ul>
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

    handleSwitchFile(elem, state) {
        if (state) {
        } else {
        }
    }

    render() {
        let _data = this.props.data;
        return (
            <ul className="list-unstyled weather-info">
                <li><span className="field-name">Burner Type</span><span className="pull-right">
                    <Choice selectIndex={_data.burner_type} labels={['IR', 'UV']} />
                </span></li>
                <li><span className="field-name">Channel EN</span><span className="pull-right">
                    <Choice selectIndex={_data.channel_en} labels={['Enable', 'Disable']} />
                </span></li>
                <li><span className="field-name">File</span><span className="pull-right">
                    <Choice selectIndex={_data.file} labels={['FILE A', 'FILE B']} />
                </span></li>
            </ul>
        )
    }
}

class DetailConfigPanel extends React.Component {

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
                <div>
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

            )
        }

    };
}

module.exports = DetailConfigPanel;