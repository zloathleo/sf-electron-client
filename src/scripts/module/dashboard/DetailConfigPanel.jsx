import React from 'react';
import Switch from 'react-bootstrap-switch';

class FilePanel extends React.Component {
    render() {
        return (
            <ul className="list-unstyled weather-info">
                <li><span className="field-name">AC Gain</span><span className="pull-right"><input type="text" defaultValue='safefire.png' /></span></li>
                <li><span className="field-name">Fx</span><span className="pull-right"><input type="text" defaultValue='safefire.png' /></span></li>
                <li><span className="field-name">AC ON_TH</span><span className="pull-right"><input type="text" defaultValue='safefire.png' /></span></li>
                <li><span className="field-name">AC ON_TL</span><span className="pull-right"><input type="text" defaultValue='safefire.png' /></span></li>
                <li><span className="field-name">Max</span><span className="pull-right"><input type="text" defaultValue='safefire.png' /></span></li>
                <li><span className="field-name">Min</span><span className="pull-right"><input type="text" defaultValue='safefire.png' /></span></li>
                <li><span className="field-name">DC Gain</span><span className="pull-right"><input type="text" defaultValue='safefire.png' /></span></li>
                <li><span className="field-name">DC ON_TH</span><span className="pull-right"><input type="text" defaultValue='safefire.png' /></span></li>
                <li><span className="field-name">DC ON_TL</span><span className="pull-right"><input type="text" defaultValue='safefire.png' /></span></li>

                <li><span className="field-name">FREQ ON_TH</span><span className="pull-right"><input type="text" defaultValue='safefire.png' /></span></li>
                <li><span className="field-name">FREQ ON_TL</span><span className="pull-right"><input type="text" defaultValue='safefire.png' /></span></li>
                <li><span className="field-name">OTD</span><span className="pull-right"><input type="text" defaultValue='safefire.png' /></span></li>
                <li><span className="field-name">FFRT</span><span className="pull-right"><input type="text" defaultValue='safefire.png' /></span></li>
            </ul>
        )
    }
}
class TwoFilePanel extends React.Component {

    render() {
        return (
            <div>

                <ul className="nav nav-tabs">
                    <li role="presentation" className="active"><a href="#filea" data-toggle="tab">FILE A</a></li>
                    <li role="presentation"><a href="#fileb" data-toggle="tab">FILE B</a></li>
                </ul>

                <div className="tab-content">
                    <div className="tab-pane fade in active" id="filea">
                        <FilePanel />
                    </div>

                    <div className="tab-pane fade" id="fileb">
                        <FilePanel />
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
        return (
            <ul className="list-unstyled weather-info">
                <li><span className="field-name">Burner Type</span><span className="pull-right">
                    <div className="btn-group" data-toggle="buttons">
                        <label className="btn btn-primary active">
                            <input type="radio" name="option1" autoComplete="off" defaultChecked />IR
                        </label>
                        <label className="btn btn-primary">
                            <input type="radio" name="option2" id="option1" autoComplete="off" />UV
                        </label>
                    </div>
                </span></li>
                <li><span className="field-name">Channel EN</span><span className="pull-right">
                    <div className="btn-group" data-toggle="buttons">
                        <label className="btn btn-primary active">
                            <input type="radio" name="option1" autoComplete="off" defaultChecked />Enable
                        </label>
                        <label className="btn btn-primary">
                            <input type="radio" name="option2" autoComplete="off" />Disable
                        </label>
                    </div>
                </span></li>
                <li><span className="field-name">File</span><span className="pull-right">
                    <div className="btn-group" data-toggle="buttons">
                        <label className="btn btn-primary active">
                            <input type="radio" name="option1" autoComplete="off" defaultChecked />FILE A
                        </label>
                        <label className="btn btn-primary">
                            <input type="radio" name="option2" autoComplete="off" />FILE B
                        </label>
                    </div>
                </span></li>
            </ul>
        )
    }
}

class DetailConfigPanel extends React.Component {



    render() {
        return (
            <div>
                <ul className="nav nav-tabs">
                    <li role="presentation" className="active"><a href="#ch1" data-toggle="tab">CH1</a></li>
                    <li role="presentation"><a href="#ch2" data-toggle="tab">CH2</a></li>
                </ul>

                <div className="tab-content">
                    <div className="tab-pane fade in active" id="ch1">
                        <ChannelPanel />
                        <TwoFilePanel />
                    </div>

                    <div className="tab-pane fade" id="ch2">
                        <ChannelPanel />
                        <TwoFilePanel />
                    </div>
                </div>
            </div>

        )
    };
}

module.exports = DetailConfigPanel;