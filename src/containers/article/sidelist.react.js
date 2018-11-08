import React from 'react';
import CategoryBanner from '../../assets/images/DidYouKnow.jpg';

const SideList = (props) => {

    const displayRow = () => {
        return (
            [1, 2, 3].map(ele => <SideRow />)
            // <SideRow />
        );
    }

    return (
        <div style={{ position: 'fixed', maxWidth: '15%', overflow: 'hidden', left: '25px'}}>
            <div style={{ display: 'flex', flexFlow: 'column nowrap' }}>
                <div>
                    <img src={CategoryBanner} style={{ width: '13em', maxHeight: '15em' }} />
                </div>
                {displayRow()}
            </div>
        </div>
    )
}

const SideRow = () => {
    return (
        <div style={{margin: '15px 0 0 0'}}>
            <h3 className={'side-listh3'} style={{WebkitBoxOrient: 'vertical'}}>Test sdjkbsdkjbsdjkkjsdd kjsdhfjksdn kjsddhkj</h3>
            <p className={'pname'} style={{ margin: 0, color: '#777777' }}>
                Nandan A
            </p>
        </div>
    )
}


export default SideList;