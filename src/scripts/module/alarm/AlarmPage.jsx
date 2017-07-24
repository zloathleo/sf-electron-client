import React from 'react';

import Const from '../Const.jsx'
import EventProxy from '../EventProxy.jsx'

class AlarmPage extends React.Component {

    constructor(props) {
        super(props);
        this.requestInitDatas = this.requestInitDatas.bind(this);

        //ui
        this.buttonSearch = undefined;
    }

    componentDidMount() {
        this.requestInitDatas();
    }

    //初始化数据
    requestInitDatas() {
        setTimeout(this.onRequestInitDatasLoaded, 1000);
    }

    onRequestInitDatasLoaded() {
        EventProxy.trigger(Const.Event_DataLoading, 1);
    }

    render() {
        return (

            <div className="panel panel-dark">
                <div className="panel-heading">

                    <div className="btn-group">
                        <button type="button" className="btn btn-success">AMP ID</button>
                        <button type="button" className="btn btn-success dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span className="caret"></span>
                            <span className="sr-only">Toggle Dropdown</span>
                        </button>
                        <ul className="dropdown-menu">
                            <li><a href="#">1</a></li>
                            <li><a href="#">2</a></li>
                            <li><a href="#">3</a></li>
                            <li><a href="#">4</a></li>
                        </ul>
                    </div>

                    <button type="button" ref={(ref) => this.buttonSearch = ref} className="btn btn-primary panel-head-button">Search</button>

                    <div className="panel-head-right">
                        <button type="button" className="btn btn-primary panel-head-button">Save To File</button>
                        <button type="button" className="btn btn-primary panel-head-button">Clear</button>
                    </div>

                </div>

                <div className="panel-body">
                    <div className="table-responsive">
                        <div className="dataTables_wrapper">

                            <table className="table table-striped" style={{ width: '100%', cellspacing: 0 }} role="grid" >
                                <thead>
                                    <tr role="row">
                                        <th style={{ width: '100px' }} >Timestamp</th>
                                        <th style={{ width: '100px' }}>AMP ID</th>
                                        <th style={{ width: '100px' }} >Scanner ID</th>
                                        <th style={{ width: '100px' }} >DC</th>
                                        <th style={{ width: '100px' }}>AC</th>
                                        <th style={{ width: '100px' }}>FREQ</th>

                                        <th style={{ width: '100px' }}>Type</th>
                                        <th style={{ width: '100px' }}>Satus</th>
                                        <th style={{ width: '100px' }}>TEMP</th>
                                        <th style={{ width: '100px' }}>Fault</th>
                                        <th style={{ width: '100px' }}>AC Gain</th>

                                        <th style={{ width: '100px' }}>AC OnTH_H</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr role="row" >
                                        <td>17-07-01 10:00:00</td>
                                        <td>1</td>
                                        <td>CH1</td>
                                        <td>411</td>
                                        <td>1999</td>
                                        <td>99</td>

                                        <td>IR</td>
                                        <td>ON</td>
                                        <td>35</td>
                                        <td>0</td>
                                        <td>1</td>
                                        <td>99</td>
                                        <td>1999</td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
module.exports = AlarmPage;