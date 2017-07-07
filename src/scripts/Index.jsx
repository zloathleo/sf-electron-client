import React from 'react';
import ReactDOM from 'react-dom';

import Const from './module/Const.jsx'
import EventProxy from './module/EventProxy.jsx'

import IndexNavBar from './module/IndexNavBar.jsx';
import IndexSidebarMenu from './module/IndexSidebarMenu.jsx';
import IndexPageInner from './module/IndexPageInner.jsx';

class IndexBody extends React.Component {

    constructor(props) {
        super(props);
        this.state = { moduleName: Const.KeyDashboard };
    }

    componentDidMount() {
        EventProxy.on('moduleName', (key) => {
            console.log('EventProxy.on:' + this.state);

            this.setState({ moduleName: key });
            console.log('EventProxy.on key:' + key);
        });
    }

    render() {
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
    };
}

ReactDOM.render(
    <IndexBody />,
    document.getElementById('root')
);