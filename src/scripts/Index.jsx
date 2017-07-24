import React from 'react';
import ReactDOM from 'react-dom';

import Const from './module/Const.jsx'
import EventProxy from './module/EventProxy.jsx'

import IndexNavBar from './module/IndexNavBar.jsx';
import IndexSidebarMenu from './module/IndexSidebarMenu.jsx';
import IndexPageInner from './module/IndexPageInner.jsx';

import Login from './module/login/Login.jsx';
import LockScreen from './module/lockscreen/LockScreen.jsx';

class IndexBody extends React.Component {

    constructor(props) {
        super(props);
        this.state = { uiName: Const.Key_UIChange_Login, moduleName: Const.Key_ModuleChange_Dashboard };

        //login index 切换
        EventProxy.on(Const.Event_UIChange, (key) => {
            if (key == Const.Key_UIChange_Login) {
                this.setState({ uiName: key, moduleName: Const.Key_ModuleChange_Dashboard });
            } else {
                this.setState({ uiName: key });
            }
        });

        //模块切换
        EventProxy.on(Const.Event_ModuleChange, (key) => {
            this.setState({ moduleName: key });
        });

        //数据加载
        EventProxy.on(Const.Event_DataLoading, (_state) => {
            if (_state == 0) {
                waitingDialog.show('Loading ...');
            } else {
                waitingDialog.hide();
            }
        });

        toastr.options.positionClass = "toast-bottom-center";
    }

    componentDidMount() {

    }

    render() {
        if (this.state.uiName == Const.Key_UIChange_Login) {
            return (
                <Login />
            )
        } else if (this.state.uiName == Const.Key_UIChange_Lock) {
            return (
                <LockScreen />
            )
        } else if (this.state.uiName == Const.Key_UIChange_Index) {
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