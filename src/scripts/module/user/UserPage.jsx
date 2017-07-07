import React from 'react';

class UserPage extends React.Component {
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

                                        <th style={{ width: '100px' }}>Fault</th>
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
module.exports = UserPage;