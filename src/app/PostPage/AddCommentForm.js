import React from 'react'
import { Button, Form, Container } from 'semantic-ui-react'
import { dataServices } from '../../service/dataService';
import ErrorComponent from '../sharedComponents/ErrorComponent';

class AddCommentForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          value: ''
        };
    }

  
    handleChange = (event) => {
      this.setState({value: event.target.value});
    }
  
    handleSubmit = (event) => {
      dataServices.addComment({
          body : this.state.value,
        postId : this.props.postId
        })
        .then((result) => {
          if(result.error){
            this.setState({
              error: result.error
          })
          } else {
          this.setState({
            value: ''
          })
          this.props.invalidate()
        }
        })
      
    }


    render() {
      return (
        <Container id='addCommentForm'>
        <ErrorComponent errorMessage={this.state.error} />
        <Form onSubmit={this.handleSubmit}>
        <Form.Field>
            <input type="text" value={this.state.value} onChange={this.handleChange} />
            </Form.Field>
          <Button type="submit" value="Submit" disabled={this.state.value?false:true} id="submitCommentButton">SEND</Button>
        </Form>
        </Container>
      );
    }
  }

  export default AddCommentForm;