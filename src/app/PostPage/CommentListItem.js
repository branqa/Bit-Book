import React, { Component } from 'react';
import { Image, List,  } from 'semantic-ui-react';
import { dataServices } from '../../service/dataService';
import ErrorComponent from '../sharedComponents/ErrorComponent';



class CommentListItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userAvatar: ''

    }
  }

  componentDidMount() {
    dataServices.getUser(this.props.oneComment.authorId)
      .then((myUser) => {
        if(myUser.error){
          this.setState({
            error: myUser.error
        })
        } else {
        this.setState({
          userAvatar: myUser.avatarUrl
        })
      }
      })
  }


  render() {
    return (
      <React.Fragment>
      <ErrorComponent errorMessage={this.state.error} />
     
        <List.Item className="list-item">
          <Image src={this.state.userAvatar} alt={this.props.oneComment.authorName} avatar />
          <List.Content>
            <List.Header>{this.props.oneComment.authorName}</List.Header>
            <List.Description>
              {this.props.oneComment.body}
            </List.Description>
          </List.Content>
        </List.Item>
     
      </React.Fragment>


    )
  }
}

export default CommentListItem;