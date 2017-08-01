import React from 'react'; 

class LoadingPage extends React.Component {
    render() {
        return (
            <main style={{
                textAlign: 'center',
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginLeft: '-26px',
                marginTop: '-50px'
            }}>
                <i className="fa fa-spinner fa-spin fa-3x fa-fw margin-bottom"></i>
            </main>
        );
    }
}

module.exports = LoadingPage;