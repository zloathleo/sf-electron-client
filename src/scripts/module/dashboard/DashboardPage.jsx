import React from 'react'; 

import Global from '../common/Global.jsx'
import EventProxy from '../common/EventProxy.jsx'

import Detail from './Detail.jsx';
import DashboardLayout from './DashboardLayout.jsx';

//布局页
class DashboardPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = { uiIndex: 1, param: undefined };
    }

    componentDidMount() {
        //layout - detail 切换
        EventProxy.on(Global.Const.Event_DashboardChange, (key) => {
            this.setState({ uiIndex: key.index, param: key.selectItemName });
        });
    }
    componentWillUnmount() {
        //layout - detail 切换
        EventProxy.off(Global.Const.Event_DashboardChange);
    }

    render() {
        if (this.state.uiIndex == 1) {
            return (
                <DashboardLayout />
            );
        } else if (this.state.uiIndex == 2) {
            return (
                <div>
                    <Detail detailName={this.state.param} />
                </div>
            );
        }
    }
}

module.exports = DashboardPage;


