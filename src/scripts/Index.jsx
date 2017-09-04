import React from 'react';
import ReactDOM from 'react-dom';

import Global from './module/common/Global.jsx'
import EventProxy from './module/common/EventProxy.jsx'
import HttpRequest from './module/common/HttpRequest.jsx';

import XModalConfirm from './module/commonui/XModalConfirm.jsx';

import IndexNavBar from './module/IndexNavBar.jsx';
import IndexSidebarMenu from './module/IndexSidebarMenu.jsx';
import IndexPageInner from './module/IndexPageInner.jsx';

import LoadingPage from './module/loading/LoadingPage.jsx';
import UserSinglePage from './module/login/UserSinglePage.jsx';

class IndexBody extends React.Component {

    constructor(props) {
        super(props);
        this.state = { uiName: Global.Const.Key_UIChange_Loading, moduleName: Global.Const.Key_ModuleChange_Dashboard };

        //全局确认diaolog
        this.globalConfirmModal = undefined;
        toastr.options.positionClass = "toast-bottom-center";
    }

    componentDidMount() {
        //login index 切换
        EventProxy.on(Global.Const.Event_UIChange, (key) => {
            if (key == Global.Const.Key_UIChange_AdminLogin || key == Global.Const.Key_UIChange_RootLogin) {
                this.setState({ uiName: key, moduleName: Global.Const.Key_ModuleChange_Dashboard });
            } else if (key == Global.Const.Key_UIChange_AdminLogout) {
                this.setState({ uiName: Global.Const.Key_UIChange_Index, moduleName: Global.Const.Key_ModuleChange_Dashboard });
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
            if (_state == Global.Const.Key_DataLoading_Doing) {
                waitingDialog.show('Loading ...');
            } else {
                waitingDialog.hide();
            }
        });

        //数据加载
        EventProxy.on(Global.Const.Event_ConfirmModal, (_params) => { 
            this.globalConfirmModal.title = _params.title;
            this.globalConfirmModal.okFunc = _params.okFunc;
            this.globalConfirmModal.openModal();
        });

        let _initalize = HttpRequest.init(function () {
            this.setState({ uiName: Global.Const.Key_UIChange_Index });
        }.bind(this), function () {
            this.setState({ uiName: Global.Const.Key_UIChange_GuestEnter });
        }.bind(this));

        //未缓存服务器url
        if (_initalize) {
            this.setState({ uiName: Global.Const.Key_UIChange_GuestEnter });
        }
    }

    componentWillUnmount() {
        EventProxy.off(Global.Const.Event_UIChange);
        EventProxy.off(Global.Const.Event_ModuleChange);
        EventProxy.off(Global.Const.Event_DataLoading);
    }

    render() {
        if (this.state.uiName == Global.Const.Key_UIChange_Loading) {
            return (
                <LoadingPage />
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

                    {/**全局确认对话框**/}
                    <XModalConfirm ref={(ref) => this.globalConfirmModal = ref} title="Confirm" />

                    <IndexPageInner moduleName={this.state.moduleName} />
                </main>
            )
        } else {
            let requestUserName = undefined;
            let userPageType = undefined;
            if (this.state.uiName == Global.Const.Key_UIChange_GuestEnter) {
                userPageType = 'guest.enter';
            } else if (this.state.uiName == Global.Const.Key_UIChange_AdminLogin) {
                userPageType = 'user.login';
                requestUserName = Global.Const.Value_User_Admin;
            } else if (this.state.uiName == Global.Const.Key_UIChange_RootLogin) {
                userPageType = 'user.login';
                requestUserName = Global.Const.Value_User_Root;
            } else if (this.state.uiName == Global.Const.RootResetPassword) {
                userPageType = 'root.resetpassword';
            } else if (this.state.uiName == Global.Const.Key_UIChange_Lock) {
                userPageType = 'screen.lock';
                requestUserName = Global.Status.UserName;
            }
            return (
                <UserSinglePage type={userPageType} userName={requestUserName} />
            )

        }
    };
}

ReactDOM.render(
    <IndexBody />,
    document.getElementById('root')
);