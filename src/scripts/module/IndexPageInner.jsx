import React from 'react';
import PropTypes from 'prop-types';

import Global from './common/Global.jsx'
import EventProxy from './common/EventProxy.jsx'

import DashboardPage from './dashboard/DashboardPage.jsx';
import AlarmPage from './alarm/AlarmPage.jsx';
import ConfigPage from './config/ConfigPage.jsx';
import UserPage from './user/UserPage.jsx';


/**
 * 导航
 */
class IndexPageInnerBreadcrumb extends React.Component {
    render() {
        return (
            <ol className="breadcrumb">
                <li><a href="overview.html">Home</a></li>
                <li className="active">{this.props.moduleName}</li>
            </ol>
        )
    }
}

/**
 * 主内容
 */
class IndexPageMain extends React.Component {


    render() {
        EventProxy.trigger(Global.Const.Event_DataLoading, 0);
        switch (this.props.moduleName) {
            case Global.Const.Key_ModuleChange_Dashboard: {
                return (
                    <DashboardPage />
                )
            }
            case Global.Const.Key_ModuleChange_Alarm: {
                return (
                    <AlarmPage />
                )
            }
            case Global.Const.Key_ModuleChange_Configuration: {
                return (
                    <ConfigPage />
                )
            }
            case Global.Const.Key_ModuleChange_User: {
                return (
                    <UserPage />
                )
            }
        }


    }
}
IndexPageMain.PropsType = {
    moduleName: PropTypes.string,
}

/**
 * 主内容页
 */
class IndexPageInner extends React.Component {

    constructor(props) {
        super(props);


    }

    render() {
        // <div className="page-title">
        //         <div className="page-breadcrumb">
        //             {/**导航**/}
        //             <IndexPageInnerBreadcrumb moduleName={this.props.moduleName} />
        //         </div>
        //     </div>
        return (
            <div className="page-inner">

                <div>
                    {/**主内容**/}
                    <IndexPageMain moduleName={this.props.moduleName} />
                </div>
                <div className="page-footer">
                    <p className="no-s">2017 &copy; Power By Safefire.</p>
                </div>
            </div>
        )
    };
}

IndexPageInner.PropsType = {
    moduleName: PropTypes.string,
}

module.exports = IndexPageInner;