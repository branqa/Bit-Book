import React, { Component } from 'react';
import { dataServices } from '../../service/dataService';
import PostList from '../HomePage/PostList';
import PostItem from '../sharedComponents/PostItem';
import AddCommentForm from './AddCommentForm';
import CommentList from './CommentList'

class ImagePostDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            post: {},
            comments : []
        }
    }

    getAllComments = (id) => {
        dataServices.getComment(id)
            .then((myComments) => {
                this.setState({
                    comments: myComments
                })
             
            })
    }

    /* Getting image post details from API response and comments about that post */

    componentDidMount() {
        dataServices.getImagePost(this.props.match.params.id)
            .then((myPost) => {
                this.setState({
                    post: myPost
                })            
                this.getAllComments(myPost.id)
        })
    }

    /* Loading comments */

    onInvalidate = () => {
        this.getAllComments(this.state.post.id)
    }

    /* Deleting image posts */

    deleteMyImagePost = (event) => {
        event.preventDefault() 
        dataServices.deletePosts(this.state.post.id)
        .then((textPost) => {
            window.location.assign("http://localhost:3000/#/");
        })
    }

    render() {
        console.log(this.state.comments);
        return (
            <div className="ui three column grid">
                <div className="row">
                    <div className='four wide column'></div>
                    <div className='eight wide column'>
                    <div className="ui one cards">
                        <PostItem onePost={this.state.post} deleteMyPost={this.deleteMyImagePost} />
                        </div>
                        <AddCommentForm postId={this.state.post.id} invalidate={this.onInvalidate}/>
                        <CommentList comments={this.state.comments}/>
                    </div>
                    <div className='four wide column'>
                    </div>
                </div>
            </div>

        )
    }
}

export default ImagePostDetails;