import React from 'react';

class IndexNavBar extends React.Component {

    componentDidMount() { 
    }

    render() {
        return (
            <div className="navbar-inner">
                <div className="logo-box">
                    <a href="overview.html" className="logo-text"><span>RodinX</span></a>
                </div>
                <div className="topmenu-outer">
                    <div className="top-menu">

                        <ul className="nav navbar-nav navbar-right">

                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle waves-effect waves-button waves-classNameic" data-toggle="dropdown">
                                    <span className="user-name">Admin<i className="fa fa-angle-down"></i></span>
                                    <span className="menu-icon glyphicon glyphicon-user"></span>
                                </a>
                                <ul className="dropdown-menu dropdown-list" role="menu">
                                    <li role="presentation"><a href="profile.html"><i className="fa fa-user"></i>Profile</a></li>
                                    <li role="presentation"><a href="calendar.html"><i className="fa fa-calendar"></i>Calendar</a></li>
                                    <li role="presentation"><a href="inbox.html"><i className="fa fa-envelope"></i>Inbox<span className="badge badge-success pull-right">4</span></a></li>
                                    <li role="presentation" className="divider"></li>
                                    <li role="presentation"><a href="lock-screen.html"><i className="fa fa-lock"></i>Lock screen</a></li>
                                    <li role="presentation"><a href="login.html"><i className="fa fa-sign-out m-r-xs"></i>Log out</a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="login.html" className="log-out waves-effect waves-button waves-classNameic">
                                    <span><i className="fa fa-sign-out m-r-xs"></i>Log out</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    };
}

module.exports = IndexNavBar;