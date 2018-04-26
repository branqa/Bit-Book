import React from 'react';
import { Container } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment/Segment';



const PostItem = (props) => {

    let userId = JSON.parse(sessionStorage.getItem('userId'));
    if (props.onePost.type === "text") {
        return <Container className="ui card">
            <Segment id='post-card' as='a' href={`#feeds/${props.onePost.type}/${props.onePost.id}`} >
                <div className="content">
                    <p>{props.onePost.text}</p>
                </div>
            </Segment>

            <div className="content">
                <span className="right floated">
                    <i className="comment icon "></i>
                    {props.onePost.commentsNum}
                </span>

                <div className='content'>
                    <button onClick={props.deleteMyPost} className={(window.location.hash.includes('#/feeds/text/'))&&(userId===props.onePost.userId) ? 'visible' : 'invisible'}>Delete</button>
                </div>
                <i className="file alternate icon icon-type"></i>
                {props.onePost.type}
            </div>
        </Container>

    } else if (props.onePost.type === "image") {
        return <React.Fragment>
            <Container className="ui card">
                <Segment as="a" href={`#feeds/${props.onePost.type}/${props.onePost.id}`} >
                    <div className="image">
                        <img src={props.onePost.imageUrl} id='segmentPhoto' alt={props.onePost.id}/>
                    </div>
                </Segment>
                <div className="content">
                    <span className="right floated">
                        <i className="comment icon"></i>
                        {props.onePost.commentsNum}
                    </span>
                    <div className='content'>
                        <button onClick={props.deleteMyPost}  className={window.location.hash === `#/feeds/image/${props.onePost.id}`&&(userId===props.onePost.userId) ? 'visible' : 'invisible'}>Delete</button>
                        <button  className={window.location.hash !== `#/feeds/image/${props.onePost.id}` ? 'visible' : 'invisible'} onClick={() => { props.handleBigPhoto(props.onePost.imageUrl) }}>Image preview</button>
                    </div>
                    <i className="image icon icon-type"></i>
                    {props.onePost.type}
                </div>

            </Container>
        </React.Fragment>

    } else {
        return <Container  className="ui card">
            <iframe height="315" src={props.onePost.videoUrl} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
            <div className="content">
                
                    <span className="right floated">
                        <i className="comment icon"></i>
                        {props.onePost.commentsNum}
                    </span>
            
                <div className='content'>
                
               <a href={`#feeds/${props.onePost.type}/${props.onePost.id}`}>
               <i className="video icon icon-type"></i>
               {props.onePost.type}
                </a>
                <button onClick={props.deleteMyPost} className={window.location.hash === `#/feeds/video/${props.onePost.id}`&&(userId===props.onePost.userId) ? 'visible' : 'invisible'}>Delete</button>
               </div>
            </div>
                    
        </Container>

    }
}

export default PostItem;
