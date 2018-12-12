import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message } from '../../modules/actions';
import './message.css'

class Message extends Component {

    constructor(props) {
        super(props);
        this.snackRef = React.createRef();
    }

    showSnack = () => {
        if (this.props.message) {
            this.snackRef.current.className += ' show';
            setTimeout(() => {
                this.props.removeMessage('');
                this.snackRef.current.className = this.snackRef.current.className.replace(" show", "");
            }, 3000);
        }
    }

    render() {
        this.showSnack()
        return (
            <div ref={this.snackRef} className={'snackbar'}>{this.props.message}</div>
        )
    }
}

const mapStateToProps = ({ Message }) => ({
    message: Message.message
});

export default connect(
    mapStateToProps,
    {
        removeMessage: (msg) => message.update(msg)
    }
)(Message);