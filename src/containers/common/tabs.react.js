import React, { Component } from 'react';

export class Tabs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0
        };
    }

    handleOnClick = (key) => {
        this.setState({
            activeIndex: key
        });
    }

    renderNavItem = (key) => {
        let tab = this.props.children[key];
        return (
            <li key={key}>
                <span className={"tab-title" + (this.state.activeIndex == key ? " active-tab" : '')} >
                    <a href="#" onClick={() => this.handleOnClick(key)}>{tab.props.title}</a>
                </span>
            </li>
        );
    }

    render() {

        let index = 0;
        let active = this.state.activeIndex;

        let tabs = React.Children.map(this.props.children, (child) => {
            return React.cloneElement(child, {
                active: child.props.active === true ? true : (active == index++)
            });
        });

        return (
            <div className={this.props.className}>
                <div className={'flexTop tab-header'}>
                    {Object.keys(this.props.children).map(key => this.renderNavItem(key))}
                </div>
                <div className="tabs-content">
                    {tabs}
                </div>
            </div>
        )
    }
}

export const Tab = ({ active, children }) => {
    return (
        <div className={"tab-panel" + (active ? ' active' : '')}>
            {children}
        </div>
    )
}
