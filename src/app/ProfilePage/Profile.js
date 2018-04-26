import React, { Component } from 'react';
import { dataServices } from '../../service/dataService';
import UserCard from './UserCard';
import PostAndCommentsCount from './PostAndCommentsCount';
import Modal from 'react-modal';
import { Form ,Image, Input, Button, Container} from 'semantic-ui-react';
import ErrorComponent from '../sharedComponents/ErrorComponent';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            modalIsOpen: false,
            selectedFile: '',
            newName: '',
            newAbout: '',
            newPhotoUrl: '',
            errorMessage: '',
            buttonDisabled: true
        }
    }

   /* Getting one user from API response */

    getUserData = () => {
    dataServices.getUser(this.props.match.params.id)
    .then((myUser) => {
        if(myUser.error){
            this.setState({
                error: myUser.error
            })
        } else {
        this.setState({
            user: myUser,
            newPhotoUrl: myUser.avatarUrl,
            newAbout: myUser.about,
            newName: myUser.name,
        })
    }
    })
}




    componentDidMount() {
       this.getUserData()
    }

    /* React Modal for updating profile */

    openModal = (event) => {
        this.setState({ modalIsOpen: true });
      
    }

    closeModal = () => {
        this.setState({
            modalIsOpen: false,
        });
    }

    /* Uploading photo */

    fileChangeHandler = (event) => {
        const file = event.target.files[0];
        this.setState({ selectedFile: file })
    }

    addPhoto = () => {
        const formData = new FormData()
        formData.append('file', this.state.selectedFile)

        dataServices.uploadPhoto(formData)
            .then((result) => {
                if(result.error){
                    this.setState({
                        error: result.error
                    })
                } else {
                this.setState({
                    newPhotoUrl: result,
                })
            }
            })
    }

    /* Changing name */

    handleInputNameChange = (event) => {
        this.setState({
            newName : event.target.value
        })
        this.inputValidation(event);
    }

    /* Changing about */

    handleInputAboutChange = (event) => {
        this.setState({
            newAbout : event.target.value
        })
        this.inputValidation(event);
    }

    /* Changing URL */

    handleInputUrlChange = (event) => {
        this.setState({
            newPhotoUrl: event.target.value
        })
        this.inputValidation(event);
    }

     /* Updating user data */

    checkData = () => {
        let data = {
            'email':"email",
            'name': this.state.newName,
            'about': this.state.newAbout,
            "aboutShort": this.state.newAbout.slice(0,50),
            'avatarUrl': this.state.newPhotoUrl
        }
        dataServices.changeProfile(data)
        .then((result) => {
            if(result.error){
                this.setState({
                    error: result.error
                })
            } else {
            this.setState({
                modalIsOpen: false
            })
            this.getUserData()
        }
        })
    }

    /* Validation input data */

    inputValidation = (event) => {
        if(event.target.value){
           this.setState({
               buttonDisabled: false,
               errorMessage: ''
           })
        } 
        if(this.state.newName.length > 40){
            this.setState({
                errorMessage: 'Name is too long',
                buttonDisabled: true               
            });
        }
        if(this.state.newAbout.length > 400){
            this.setState({
                errorMessage: 'About is too long',
                buttonDisabled: true               
            });
        }
        const myUrlLength = this.state.newPhotoUrl.length;
        const cutUrl = this.state.newPhotoUrl.slice(myUrlLength - 3);
        const cutUrlJpeg = this.state.newPhotoUrl.slice(myUrlLength - 4);

        if (cutUrl !== 'jpg' && cutUrl !== 'png' && cutUrl !== 'gif' && cutUrlJpeg !== 'jpeg') {
            this.setState({
                errorMessage: 'Post is not image',
                buttonDisabled:true
            });
        } else {
            this.setState({
                errorMessage: ''
            })
        }
        if(!event.target.value) {
            this.setState({
                buttonDisabled: true,
                errorMessage: 'All data is required'
            })
        }
    }

    renderModal = () => {
        return (
            <Container >
           
                <h2 ref={subtitle => this.subtitle = subtitle} className='headline'>Edit profile</h2>
                <ErrorComponent errorMessage={this.state.error} />
                <Form>
                <Form.Group id="photoForm">
                    <Form.Field control={Input} type="file" accept=".jpg, .jpeg, .png" onChange={this.fileChangeHandler} width={8}/>
                    <Form.Field control={Image} src={this.state.newPhotoUrl} width={1}/>
                    <Form.Field control={Button} onClick={this.addPhoto} width={3}>SUBMIT</Form.Field>
                    </Form.Group>
                </Form>
                <Form>
                <Form.Group>
                    <Form.Field control={Input} label = "Name" width={5} type='text' value={this.state.newName} onChange={this.handleInputNameChange} className='input-item' />
                    
                    <Form.Field control={Input} label="Photo Url" width={5} type="url" value={this.state.newPhotoUrl} onChange={this.handleInputUrlChange} className='input-item' />
                
                    <Form.Field control={Input} label='About' type='text' width={5}value={this.state.newAbout} onChange={this.handleInputAboutChange} className='input-item' /> 
                  </Form.Group>
                  <br/>
                  <Form.Group>
                    <div id='warning' className={this.state.errorMessage ? 'visible':'invisible'}>{this.state.errorMessage}</div>
                    </Form.Group>
                  <Form.Group>
                  < Form.Field control={Button} width={2} onClick={this.checkData} disabled={this.state.buttonDisabled}>UPDATE</Form.Field>
                    < Form.Field control={Button} width={2} onClick={this.closeModal}>CLOSE</Form.Field>
                    </Form.Group>
                

            </Form>
            </Container>
        )
    }

    render() {
        return (
            <div className="ui three column grid">
                <div className="row">
                    <div className='four wide column'></div>
                    <div className='eight wide column'>
                <ErrorComponent errorMessage={this.state.error} />
                        <UserCard user={this.state.user} handleClick={this.openModal} />
                        <PostAndCommentsCount user={this.state.user} />
                    </div>
                    <div className='four wide column'>
                    </div>
                </div>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    className="Modal"
                    contentLabel="Example Modal">
                    {this.renderModal()}

                </Modal>
            </div>
        )
    }
}

export default Profile;
