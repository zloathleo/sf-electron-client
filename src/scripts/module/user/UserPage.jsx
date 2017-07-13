import React from 'react';

import Const from '../Const.jsx'
import EventProxy from '../EventProxy.jsx'

class UserPage extends React.Component {

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
        EventProxy.trigger(Const.Event_DataLoading, 1);
    }

    render() {
        return (
            <div className="panel panel-dark">
                <div className="alarm-table-head">
                    <div>
                        <div className="btn-group">
                            <button type="button" className="btn btn-success">Type</button>
                            <button type="button" className="btn btn-success dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span className="caret"></span>
                                <span className="sr-only">Toggle Dropdown</span>
                            </button>
                            <ul className="dropdown-menu">
                                <li><a href="#">Manager</a></li>
                                <li><a href="#">Guest</a></li>
                            </ul>
                        </div>

                        <button type="button" className="btn btn-info alarm-table-head-button">Search</button>

                        <div className="alarm-table-head-right">
                            <button type="button" className="btn btn-info alarm-table-head-button">Create User</button>
                        </div>
                    </div>
                </div>

                <div className="panel-body">
                    <div className="table-responsive">
                        <div className="dataTables_wrapper">

                            <table className="table table-striped" style={{ width: '100%', cellspacing: 0 }} role="grid" >
                                <thead>
                                    <tr role="row">
                                        <th style={{ width: '100px' }} >Index</th>
                                        <th style={{ width: '100px' }}>User Name</th>
                                        <th style={{ width: '100px' }} >Type</th>
                                        <th style={{ width: '100px' }} >Create Time</th>
                                        <th style={{ width: '100px' }}>Enable</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr role="row" >
                                        <td>1</td>
                                        <td>manager</td>
                                        <td>manager</td>
                                        <td>2017-07-01 12:00:00</td>
                                        <td>Yes</td>
                                    </tr>

                                    <tr role="row" >
                                        <td>2</td>
                                        <td>guest</td>
                                        <td>guest</td>
                                        <td>2017-07-01 12:00:00</td>
                                        <td>Yes</td>
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
module.exports = UserPage;