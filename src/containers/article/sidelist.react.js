import React from 'react';

const SideList = (props) => {

    const displayRow = () => {
        return (
            props.articles.map(ele => <SideRow title = {ele.title} author = {ele.author} id={ele._id} key={ele._id} navigateTo={props.navigateToArticle}/>)
        );
    }

    return (        
        <div style={{ position: 'fixed', maxWidth: '15%', overflow: 'hidden', left: '25px'}}>
            <div style={{ display: 'flex', flexFlow: 'column nowrap' }}>
                <div>
                    <img src={props.coverImage} style={{ width: '13em', maxHeight: '15em' }} alt={'ctrBanner'}/>
                </div>
                {displayRow()}
            </div>
        </div>
    )
}

const SideRow = ({title, author, id, navigateTo}) => {
    return (
        <div style={{margin: '15px 0 0 0'}} onClick={() => navigateTo(id)}>
            <h3 className={'side-listh3'} style={{WebkitBoxOrient: 'vertical'}}>{title}</h3>
            <p className={'pname'} style={{ margin: 0, color: '#777777' }}>
                {author.name || 'No name'}
            </p>
        </div>
    )
}


export default SideList;