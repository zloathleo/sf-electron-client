import React from 'react';
import Switch from 'react-bootstrap-switch';

class DetailHelp extends React.Component {

    componentDidMount() {
    }

    handleSwitch(elem, state) {
        if (state) {
            console.log("摄氏度");
        } else {
            console.log("华氏度");
        }
    }

    render() {
        const data = this.props.data;
        return (
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
                                    <li><span className="pull-right"><Switch offColor="success" offText="&deg;F" onText="&deg;C" onChange={(el, state) => this.handleSwitch(el, state)} /></span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    };

}

module.exports = DetailHelp;