import React from 'react';

class DashboardContextMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = { visible: false };

        this.selectItemName = undefined;

        this._handleContextMenu = this._handleContextMenu.bind(this);
        this._handleClick = this._handleClick.bind(this);
        this._handleScroll = this._handleScroll.bind(this);

        this.isSelfMount = false;
    }

    componentDidMount() {
        this.isSelfMount = true;
        document.addEventListener('contextmenu', this._handleContextMenu);
        document.addEventListener('click', this._handleClick);
        document.addEventListener('scroll', this._handleScroll);
    };

    componentWillUnmount() {
        this.isSelfMount = false;
        document.removeEventListener('contextmenu', this._handleContextMenu);
        document.removeEventListener('click', this._handleClick);
        document.removeEventListener('scroll', this._handleScroll);
    }

    _isContextMenuIn(_event) {
        let _target = _event.target;
        for (let i = 0; i < 5; i++) {
            if (_target) {
                if (_target.className == 'amplifier-content-all') {
                    return _target.parentNode.getAttribute('data-itemname');
                } else {
                    _target = _target.parentNode;
                }
            } else {
                return undefined;
            }
        }
        return undefined;
    }

    _handleContextMenu(event) {
        event.preventDefault();

        this.selectItemName = this._isContextMenuIn(event);
        if (!this.selectItemName) {
            return;
        }

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
        if (visible) {
            const _key = event.target.getAttribute('data-key');
            const wasOutside = (_key == undefined);

            if (!wasOutside) {
                if (this.props.onItemClick) {
                    this.props.onItemClick(_key, this.selectItemName);
                }
            }

            if (this.isSelfMount) {
                this.setState({ visible: false });
            }
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
                <div className="contextMenu--option" data-key="config"><i className="fa fa-cog context-menu-icon"></i>Config Item</div>
            </div>
    };
}

module.exports = DashboardContextMenu;