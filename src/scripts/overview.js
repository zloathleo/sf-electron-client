
import overviewInit from './overview-init';
import React from 'react';
import ReactDOM from 'react-dom';

overviewInit();

class AmplifierRow extends React.Component {

    constructor(props) {
        super(props);
        this.state = { finishInit: false, data: undefined };
        this.requestInitDatas = this.requestInitDatas.bind(this);
        this.onRequestInitDatasLoaded = this.onRequestInitDatasLoaded.bind(this);

        this.buildRows = this.buildRows.bind(this);
        this.actionAddItem = this.actionAddItem.bind(this);
    }

    //初始化数据
    requestInitDatas() {
        setTimeout(this.onRequestInitDatasLoaded, 1000);
    }

    onRequestInitDatasLoaded() {
        var _overviewData = require('../assets/datas/overview.json');
        waitingDialog.hide();
        this.setState({ finishInit: true, data: _overviewData });
    }

    actionAddItem() {

    }

    buildItems(item, i) {
        return (<div className="col-xs-2 amplifier" key={i} >
            <div className="amplifier-content-all">
                <div className="amplifier--ribbon-wrapper">
                    <div className="amplifier-ribbon">
                        No.1
                                                </div>
                </div>
                <div className="amplifier-content">
                    <div className="amplifier-fire-div">
                        <i className="amplifier-fire glyphicon glyphicon-fire" style={{ color: '#f44336' }} aria-hidden="true"></i>
                        <span className="amplifier-label">CH1</span>
                    </div>
                    <div className="amplifier-fire-div">
                        <i className="amplifier-fire glyphicon glyphicon-fire" style={{ color: '#FFEB3B' }} aria-hidden="true"></i>
                        <span className="amplifier-label">CH2</span>
                    </div>
                </div>

                <div className="amplifier-action-buttons">
                    <button type="button" className="btn btn-sm btn-primary fa fa-cog"  ></button>
                    <button type="button" className="btn btn-sm btn-danger fa fa-times"  ></button>
                </div>
            </div>
        </div>);
    }

    buildRows(row, i) {
        console.log(row);
        return (<div className="row" key={i}>
            <div className="col-xs-12">
                <div className="panel panel-dark">
                    <div className="panel-heading">
                        <h2 className="panel-title">{row.title}</h2>
                        <div className="panel-control">
                            <button type="button" className="btn btn-success btn-addon" onClick={this.actionAddItem}><i className="fa fa-plus"></i>Add Item</button>
                            <button type="button" className="btn btn-danger btn-addon"><i className="fa fa-times"></i>Destory</button>
                        </div>
                    </div>
                    <div className="panel-body">

                        <div className="row">
                            {row.items.map(this.buildItems)}
                        </div>

                    </div>
                </div>
            </div>
        </div >);
    }

    componentDidMount() {
        console.log('componentDidMount');
        waitingDialog.show('Loading Something...', {
            onShow: this.requestInitDatas,
        });
    }

    render() {
        let _data = this.state.data;
        if (!_data) {
            return (
                <div />
            );
        } else {
            return (
                <div>
                    {_data.rows.map(this.buildRows)}
                </div>
            );
        }

    }
}

ReactDOM.render(
    <AmplifierRow />,
    document.getElementById('main-wrapper')
);


