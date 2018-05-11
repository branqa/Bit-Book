import React from 'react';
import CommentListItem from './CommentListItem';
import { List } from 'semantic-ui-react'

const CommentList = (props) => {

    if (props.comments.length === 0) {
        return <List>
            <List.Item className="list-item">
                <List.Content>
                    <List.Description>
                        There are no comments
            </List.Description>
                </List.Content>
            </List.Item>
        </List>
    } else {
        return (
            <List divided verticalAlign="middle">
                {props.comments.map((comment) => <CommentListItem oneComment={comment} key={comment.id} />)}
            </List>
        )
    }
}

export default CommentList;