import React from 'react';

import Global from '../common/Global.jsx'
import EventProxy from '../common/EventProxy.jsx'
import HttpRequest from '../common/HttpRequest.jsx';

class AlarmPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = { uiUpdate: 0 };

        this.alarmData = undefined;

        this.refreshDataInterval = undefined;
        //init 
        this.refreshData = this.refreshData.bind(this);
        this.onRequestInitDatasLoaded = this.onRequestInitDatasLoaded.bind(this);
        //ui
        this.buttonSearch = undefined;
    }

    componentDidMount() {
        this.refreshData();
    }

    componentWillUnmount() {
        clearTimeout(this.refreshDataInterval);
    }

    //刷新实时
    refreshData() {
        HttpRequest.axios.get('/alarms?timestamp=' + parseInt(new Date().getTime() / 1000 - 60 * 60 * 24)).then(this.onRequestInitDatasLoaded);
    }

    onRequestInitDatasLoaded(response) {
        this.alarmData = response.data;
        this.setState({ uiUpdate: (this.state.uiUpdate++) });

        this.refreshDataInterval = setTimeout(this.refreshData, 1000 * 5);
    }

    buildRows(row, i) {
        return (
            <tr role="row" key={i}>
                <td>{row.timestamp}</td>
                <td>{row.amp_id}</td>
                <td>{row.name}</td>
                <td>{row.code}</td>
            </tr>
        )
    }

    render() {
        let _data = this.alarmData;
        return (
            <div className="panel panel-dark">
                <div className="panel-heading">

                    {/* <div className="btn-group">
                        <button type="button" className="btn btn-primary">AMP ID</button>
                        <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span className="caret"></span>
                            <span className="sr-only">Toggle Dropdown</span>
                        </button>
                        <ul className="dropdown-menu">
                            <li><a href="#">1</a></li>
                            <li><a href="#">2</a></li>
                            <li><a href="#">3</a></li>
                            <li><a href="#">4</a></li>
                        </ul>
                    </div> */}

                    {/* <button type="button" ref={(ref) => this.buttonSearch = ref} className="btn btn-success panel-head-button">Search</button> */}

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
                                        <th style={{ width: '100px' }} >AMP Name</th>
                                        <th style={{ width: '100px' }} >Code</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {_data == undefined ? null : _data.rows.map(this.buildRows)}
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