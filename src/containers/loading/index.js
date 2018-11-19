import React, { Component } from 'react';
import './loading.css';
import { connect } from 'react-redux';
import Overlay from '../common/overlay.react';


class Loading extends Component {

    showLoader = () => {
        if (this.props.showLoader) {
            return (
                <Overlay className = {"transparent-background"}>
                    <div className={"progress"}>
                        <div className={"indeterminate"}></div>
                    </div>
                </Overlay>
            )
        }
        return null;
    }

    render() {
        return (
            <div>
                {this.showLoader()}
            </div>
        )
    }
}

const mapStateToProps = ({ Category, User, Article }) => ({
    showLoader: Category.isFetching || User.isFetching || Article.isFetching || false
});

export default connect(mapStateToProps, null)(Loading);

