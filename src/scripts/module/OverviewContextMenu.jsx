import React from 'react';

class OverviewContextMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = { visible: false };

        this._handleContextMenu = this._handleContextMenu.bind(this);
        this._handleClick = this._handleClick.bind(this);
        this._handleScroll = this._handleScroll.bind(this);
    }

    componentDidMount() {
        document.addEventListener('contextmenu', this._handleContextMenu);
        document.addEventListener('click', this._handleClick);
        document.addEventListener('scroll', this._handleScroll);
    };

    componentWillUnmount() {
        document.removeEventListener('contextmenu', this._handleContextMenu);
        document.removeEventListener('click', this._handleClick);
        document.removeEventListener('scroll', this._handleScroll);
    }

    _handleContextMenu(event) {
        event.preventDefault();

        this.setState({ visible: true });

        const clickX = event.clientX;
        const clickY = event.clientY;
        const screenW = window.innerWidth;
        const screenH = window.innerHeight;
        const rootW = this.root.offsetWidth;
        const rootH = this.root.offsetHeight;

        const right = (screenW - clickX) > rootW;
        const left = !right;
        const top = (screenH - clickY) > rootH;
        const bottom = !top;

        if (right) {
            this.root.style.left = `${clickX + 5}px`;
        }

        if (left) {
            this.root.style.left = `${clickX - rootW - 5}px`;
        }

        if (top) {
            this.root.style.top = `${clickY + 5}px`;
        }

        if (bottom) {
            this.root.style.top = `${clickY - rootH - 5}px`;
        }
    };

    _handleClick(event) {

        const { visible } = this.state;
 
        const _key = event.target.getAttribute('data-key');
        const wasOutside = (_key == undefined); 
        console.log(wasOutside);

        if (visible) {
            if (!wasOutside) {
                if (this.props.onItemClick) {
                    this.props.onItemClick(_key);
                }
            }
            this.setState({ visible: false, });
        }

    };

    _handleScroll() {
        const { visible } = this.state;

        if (visible) this.setState({ visible: false, });
    };

    render() {
        const { visible } = this.state;

        return (visible || null) &&
            <div ref={ref => { this.root = ref }} className="contextMenu">
                <div className="contextMenu--option" data-key="detail"><i className="fa fa-thermometer-quarter context-menu-icon-detail"></i>Detail</div>
                <div className="contextMenu--option" data-key="config"><i className="fa fa-cog context-menu-icon"></i>Config</div>
                <div className="contextMenu--option" data-key="delete"><i className="fa fa-cog context-menu-icon"></i>Delete</div>
            </div>
    };
}

module.exports = OverviewContextMenu;