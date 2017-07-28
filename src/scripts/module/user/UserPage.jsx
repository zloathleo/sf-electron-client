import React from 'react';

import Const from '../Const.jsx'
import EventProxy from '../EventProxy.jsx'

import HttpRequest from '../common/HttpRequest.jsx';

class UserPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = { uiUpdate: 0 };

        this.userData = undefined;

        this.requestInitDatas = this.requestInitDatas.bind(this);
        this.onRequestInitDatasLoaded = this.onRequestInitDatasLoaded.bind(this);
    }

    componentDidMount() {
        this.requestInitDatas();
    }

    //初始化数据
    requestInitDatas() {
        HttpRequest.axios.get('/users').then(this.onRequestInitDatasLoaded);
    }

    onRequestInitDatasLoaded(response) {
        this.userData = response.data;
        this.setState({ uiIndex: 1 });
    }

    render() {
        let _data = this.userData;
        if (!_data) {
            return null;
        } else {
            return (
                <div className="panel panel-dark">
                    <div className="panel-heading">

                        <div className="btn-group">
                            <button type="button" className="btn btn-primary">Type</button>
                            <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span className="caret"></span>
                                <span className="sr-only">Toggle Dropdown</span>
                            </button>
                            <ul className="dropdown-menu">
                                <li><a href="#">Manager</a></li>
                                <li><a href="#">Guest</a></li>
                            </ul>
                        </div>

                        <button type="button" className="btn btn-primary panel-head-button">Search</button>

                        <div className="panel-head-right">
                            <button type="button" className="btn btn-primary panel-head-button">Create User</button>
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
                                        {_data.rows.map(function (row, i) {
                                            return (
                                                <tr role="row" key={i} >
                                                    <td>{row.index}</td>
                                                    <td>{row.name}</td>
                                                    <td>{row.type}</td>
                                                    <td>{row.create_time}</td>
                                                    <td>{row.enable}</td>
                                                </tr>);
                                        })}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

    }
}
module.exports = UserPage;