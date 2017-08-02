import React from 'react';
import ReactDOM from 'react-dom';

import Global from './module/common/Global.jsx'
import EventProxy from './module/common/EventProxy.jsx'
import HttpRequest from './module/common/HttpRequest.jsx';

import IndexNavBar from './module/IndexNavBar.jsx';
import IndexSidebarMenu from './module/IndexSidebarMenu.jsx';
import IndexPageInner from './module/IndexPageInner.jsx';

import LoadingPage from './module/loading/LoadingPage.jsx';
import LoginPage from './module/login/LoginPage.jsx';
import GuestEnterPage from './module/login/GuestEnterPage.jsx';
import LockScreenPage from './module/login/LockScreenPage.jsx';

class IndexBody extends React.Component {

    constructor(props) {
        super(props);
        this.state = { uiName: Global.Const.Key_UIChange_Loading, moduleName: Global.Const.Key_ModuleChange_Dashboard };

        toastr.options.positionClass = "toast-bottom-center";
    }

    componentDidMount() {
        //用户切换
        EventProxy.on(Global.Const.Event_UserChange, (userName) => {
            console.log('user:' + userName);
            if (userName == Global.Const.Value_User_Guest) {
                this.setState({ uiName: Global.Const.Key_UIChange_Index, moduleName: Global.Const.Key_ModuleChange_Dashboard });
            } else if (userName == Global.Const.Value_User_Admin) {
                this.setState({ uiName: Global.Const.Key_UIChange_AdminLogin });
            } else if (userName == Global.Const.Value_User_Root) {
                this.setState({ uiName: Global.Const.Key_UIChange_RootLogin });
            }
        });

        //login index 切换
        EventProxy.on(Global.Const.Event_UIChange, (key) => {
            if (key == Global.Const.Key_UIChange_AdminLogin || key == Global.Const.Key_UIChange_RootLogin) {
                this.setState({ uiName: key, moduleName: Global.Const.Key_ModuleChange_Dashboard });
            } else {
                this.setState({ uiName: key });
            }
        });

        //模块切换
        EventProxy.on(Global.Const.Event_ModuleChange, (key) => {
            this.setState({ moduleName: key });
        });

        //数据加载
        EventProxy.on(Global.Const.Event_DataLoading, (_state) => {
            if (_state == 0) {
                waitingDialog.show('Loading ...');
            } else {
                waitingDialog.hide();
            }
        });

        let _initalize = HttpRequest.init(function () {
            this.setState({ uiName: Global.Const.Key_UIChange_Index });
        }.bind(this), function () {
            this.setState({ uiName: Global.Const.Key_UIChange_GuestEnter });
        }.bind(this));

        //未缓存url
        if (_initalize) {
            this.setState({ uiName: Global.Const.Key_UIChange_GuestEnter });
        }
    }

    componentWillUnmount() {
        EventProxy.off(Global.Const.Event_UserChange);
        EventProxy.off(Global.Const.Event_UIChange);
        EventProxy.off(Global.Const.Event_ModuleChange);
        EventProxy.off(Global.Const.Event_DataLoading);
    }

    render() {
        if (this.state.uiName == Global.Const.Key_UIChange_Loading) {
            return (
                <LoadingPage />
            )
        } else if (this.state.uiName == Global.Const.Key_UIChange_GuestEnter) {
            return (
                <GuestEnterPage />
            )
        } else if (this.state.uiName == Global.Const.Key_UIChange_AdminLogin) {
            return (
                <LoginPage userName={Global.Const.Value_User_Admin} />
            )
        } else if (this.state.uiName == Global.Const.Key_UIChange_RootLogin) {
            return (
                <LoginPage userName={Global.Const.Value_User_Root} />
            )
        } else if (this.state.uiName == Global.Const.Key_UIChange_Lock) {
            return (
                <LockScreenPage />
            )
        } else if (this.state.uiName == Global.Const.Key_UIChange_Index) {
            return (
                <main className="page-content content-wrap">
                    <div className="navbar">
                        {/**顶部菜单**/}
                        <IndexNavBar />
                    </div>
                    <div className="page-sidebar sidebar">
                        <div className="page-sidebar-inner slimscroll">
                            {/**左侧菜单**/}
                            <IndexSidebarMenu moduleName={this.state.moduleName} />
                        </div>
                    </div>
                    <IndexPageInner moduleName={this.state.moduleName} />
                </main>
            )
        }
    };
}

ReactDOM.render(
    <IndexBody />,
    document.getElementById('root')
);