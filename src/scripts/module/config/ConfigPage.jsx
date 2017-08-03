import React from 'react';

import Global from '../common/Global.jsx'
import EventProxy from '../common/EventProxy.jsx'

class ConfigPage extends React.Component {

    constructor(props) {
        super(props);
        this.requestInitDatas = this.requestInitDatas.bind(this);
    }

    componentDidMount() {
        this.requestInitDatas();
    }

    //初始化数据
    requestInitDatas() {
        setTimeout(this.onRequestInitDatasLoaded, 1000);
    }

    onRequestInitDatasLoaded() {
        EventProxy.trigger(Global.Const.Event_DataLoading, Global.Const.Key_DataLoading_Finish);
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="panel panel-dark detail-panel">
                        <div className="panel-heading">
                            <h4 className="panel-title">Server Config</h4>
                            <div className="panel-control">
                                <button type="button" className="btn btn-primary">Save</button>
                            </div>
                        </div>
                        <div className="panel-body">
                            <ul className="list-unstyled weather-info">
                                <li><span className="field-name">History File Max Size</span><span className="pull-right field-value-component"><input type="number" defaultValue={360} /></span></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="col-md-12">
                    <div className="panel panel-dark detail-panel">
                        <div className="panel-heading">
                            <h4 className="panel-title">Communication Config</h4>
                            <div className="panel-control">
                                <button type="button" className="btn btn-primary">Save</button>
                            </div>
                        </div>
                        <div className="panel-body">
                            <ul className="list-unstyled weather-info">
                                <li><span className="field-name">I/O Port</span><span className="pull-right field-value-component">

                                    <div className="btn-group">
                                        <button type="button" className="btn btn-success">I/O Port</button>
                                        <button type="button" className="btn btn-success dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <span className="caret"></span>
                                            <span className="sr-only">Toggle Dropdown</span>
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li><a href="#" >COM3</a></li>
                                            <li><a href="#" >COM4</a></li>
                                        </ul>
                                    </div>

                                </span></li>
                                <li><span className="field-name">Boad Rate</span><span className="pull-right field-value-component"><input type="number" defaultValue={9600} /></span></li>
                            </ul>
                        </div>
                    </div>
                </div>


                <div className="col-md-12">
                    <div className="panel panel-dark detail-panel">
                        <div className="panel-heading">
                            <h4 className="panel-title">License Config</h4>
                            <div className="panel-control">
                                <button type="button" className="btn btn-primary">Save</button>
                            </div>
                        </div>
                        <div className="panel-body">
                            <ul className="list-unstyled weather-info">
                                <li><span className="field-name">This Product is Licensed to</span><span className="pull-right field-value-component"><input type="text" defaultValue='Safefire' /></span></li>
                                <li><span className="field-name">Company/Organization Logo</span><span className="pull-right field-value-component"><input type="text" defaultValue='safefire.png' /></span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
module.exports = ConfigPage;