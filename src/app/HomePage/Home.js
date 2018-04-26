import React, { Component } from 'react';
import PostList from './PostList';
import MenuAllPosts from './MenuAllPosts';
import NewPostButton from './NewPostButton';
import ErrorComponent from '../sharedComponents/ErrorComponent';
import { dataServices } from '../../service/dataService';
import Modal from 'react-modal';
import { Form, Input, Button, Container, Icon, Pagination, Grid } from 'semantic-ui-react';


class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            textPosts: [],
            videoPosts: [],
            imagePosts: [],
            modalIsOpen: false,
            currentModal: '',
            input: "",
            feedPosts: [],
            selectedPosts: [],
            message: '',
            buttonDisabled: true,
            selectedPhoto: '',
            activePage: 1,
            numberOfAllPage:0,
           error: '',
        }
    }

    /* Getting all text posts, image posts, video posts from API response */


    getAllPosts = (page) => {
        dataServices.getPosts(page)
            .then(myPosts => {
                if (myPosts.error) {
                    this.setState({
                        error: myPosts.error
                    })
                } else {
                    let { textPosts, videoPosts, imagePosts } = myPosts;
                    let feedPosts = [...textPosts, ...videoPosts, ...imagePosts]
                    this.setState({
                        textPosts,
                        videoPosts,
                        imagePosts,
                        feedPosts,
                        selectedPosts: feedPosts,
                        buttonDisabled: true
                    })
                }
            });
    }

    componentDidMount() {
        dataServices.getPostsCount()
                .then(countPosts=>{
                    this.setState({
                       numberOfAllPage: Math.ceil(countPosts/10)
                    })
                    this.getAllPosts(0);
                })
      
    }

componentWillReceiveProps(nextProps) {
    if(nextProps.match.path === '/'){
        this.getAllPosts(0);
        this.setState({
            activePage:1
        })
    }
}

    /* Changing state of input for all new posts */

    textValidation = (text) => {
        if (text.length > 100) {
            this.setState({
                message: 'Text is too long',
                buttonDisabled: true
            });
        } else if (text === '') {
            this.setState({
                message: 'Text is missing',
                buttonDisabled: true
            });
        } else {
            this.setState({
                message: '',
                buttonDisabled: false
            })
            return true;
        }
    }

    handleInputTextChange = (event) => {
        this.setState({
            input: event.target.value
        })
        this.textValidation(event)
    }

    /* Validation of text posts */

    checkTextInput = () => {
        if (this.textValidation(this.state.input)){
            dataServices.addNewTextPost(this.state.input)
                .then((response) => {
             if (response.error) {
                        this.setState({
                            error: response.error
                        })
                } else {
                        this.getAllPosts(this.state.activePage-1);
                        this.closeModal();
                        this.setState({
                           activePage: 0
                    })
                    }                  
                }
                )
        }
    }

    imageValidation = (image) => {
        const cutUrl = image.slice(- 3);
        const cutUrlJpeg = image.slice(- 4);

        if (cutUrl !== 'jpg' && cutUrl !== 'png' && cutUrl !== 'gif' && cutUrlJpeg !== 'jpeg') {
            this.setState({
                message: 'Post is not image',
                buttonDisabled: true
            });
        } else {
            this.setState({
                message: '',
                buttonDisabled: false
            })
            return true;
        }
    }

    handleInputImageChange = (event) => {
        this.setState({
            input: event.target.value
        })
        this.imageValidation(event.target.value)
    }

    /* Validation of image posts */

    checkImageInput = () => {
        if (this.imageValidation(this.state.input) === true) {
            dataServices.addNewImagePost(this.state.input)
                .then((response) => {
                if (response.error) {
                        this.setState({
                            error: response.error
                        })
                     } else {
                        this.getAllPosts(this.state.activePage-1);
                        this.closeModal();
                    }
                }
            )
        }
    }

    handleInputVideoChange = (event) =>{
        this.setState({
            input: event.target.value
        })
        this.videoValidation(event.target.value)
    } 
    /* Validation of video posts */

    videoValidation = (video) =>{
        if (video.includes("watch?v=")) {
            let newVideo=video.replace("watch?v=", "embed/");
            return newVideo
        } else{
            this.setState({
                message: 'Post is not video'
            }) 
            return false;
        }
    }

    checkVideoInput = () => {
       if(this.videoValidation(this.state.input)){
          
            dataServices.addNewVideoPost(this.videoValidation(this.state.input))
                .then((response) => {
                       if (response.error) {
                        this.setState({
                            error: response.error
                        })
                    } else {
                        this.getAllPosts(this.state.activePage-1);
                        this.closeModal();
                    }
                })
            }
        }


    /* Selected type of posts */


    handleChange = (event, data) => {

        if (data.value === "text") {
            this.setState({
                selectedPosts: this.state.textPosts
            })
        } else if (data.value === "images") {
            this.setState({
                selectedPosts: this.state.imagePosts
            })
        } else if (data.value === "video") {
            this.setState({
                selectedPosts: this.state.videoPosts
            })
        } else {
            this.setState({
                selectedPosts: this.state.feedPosts
            })
        }

    }

    handleBigPhoto = (photo) => {
        this.setState({
            selectedPhoto: photo
        })
    }
    /* React Modals for new posts */


    openModal = (event, data) => {
        const modalName = data.value;

        this.setState({ modalIsOpen: true, currentModal: modalName });
    }

    closeModal = () => {
        
        this.setState({
            modalIsOpen: false,
            input: '',
            message: ''
        });
    }


    renderTextModal = () => {
       
        return (
            <Container >
                 <ErrorComponent errorMessage={this.state.error} />
                <Form>
                    <h2 ref={subtitle => this.subtitle = subtitle} className='headline'>New text post</h2>
                    <Form.Group>
                        <Form.Field control={Input} label='Text content' width={14} type='text' value={this.state.input} onChange={this.handleInputTextChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Field control={Button} onClick={this.checkTextInput} disabled={this.state.buttonDisabled} className='post-btn'>POST</Form.Field>
                        <Form.Field control={Button} onClick={this.closeModal} className='close-btn'>CLOSE</Form.Field>
                    </Form.Group>
                    <div id='warning' className={this.state.message ? 'visible' : 'invisible'}>{this.state.message}</div>
                </Form>
            </Container>
        )

    }

    renderImageModal = () => {

        return (
            <Container >
                 <ErrorComponent errorMessage={this.state.error} />
                <Form>
                    <h2 ref={subtitle => this.subtitle = subtitle} className='headline'>New image post</h2>
                    <Form.Group>
                        <Form.Field control={Input} label='Image source' width={14} type='url' onChange={this.handleInputImageChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Field control={Button} onClick={this.checkImageInput} disabled={this.state.buttonDisabled} className='post-btn'>POST</Form.Field>
                        <Form.Field control={Button} onClick={this.closeModal} className='close-btn'>CLOSE</Form.Field>
                    </Form.Group>
                    <div id='warning' className={this.state.message ? 'visible' : 'invisible'}>{this.state.message}</div>
                </Form>
            </Container>


        )
    }


    renderVideoModal = () => {
        return (

            <Container >
                 <ErrorComponent errorMessage={this.state.error} />
                <Form>
                    <h2 ref={subtitle => this.subtitle = subtitle} className='headline'>New video post</h2>
                    <Form.Group>
                        <Form.Field control={Input} label='YouTube video link' width={14} type='url' onChange={this.handleInputVideoChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Field control={Button} onClick={this.checkVideoInput} className='post-btn'>POST</Form.Field>
                        <Form.Field control={Button} onClick={this.closeModal} className='close-btn'>CLOSE</Form.Field>
                    </Form.Group>
                    <div id='warning' className={this.state.message ? 'visibleDiv' : 'invisible'}>{this.state.message}</div>
                </Form>
            </Container>
        )
    }

    renderModalComponent = () => {
        switch (this.state.currentModal) {
            case "text": return this.renderTextModal()
            case "image": return this.renderImageModal()
            case "video": return this.renderVideoModal()
        }
    }
    closeBigPhoto = () => {
        this.setState({
            selectedPhoto: ''
        })
    }

    handlePageChange = (e, { activePage }) => {
        this.setState({
            activePage: activePage,
            modalIsOpen: false
        })
       
        this.getAllPosts(activePage-1)
    }

    render() {
console.log(this.props.match.path);
        return <Grid stackable columns={7}>
            <Grid.Column width = {1}/>
            <Grid.Column computer = {2} tablet={3}>
            <NewPostButton className="dropdown" openPost={this.openModal} />
            <MenuAllPosts handleChange={this.handleChange} />
            </Grid.Column>
            <Grid.Column width = {1}/>
                    
            <Grid.Column  width = {8}>
                    <PostList posts={this.state.selectedPosts} handleBigPhoto={this.handleBigPhoto} />
                   <Grid>
                   <Grid.Column width = {2}>
                   </Grid.Column>
                   <Grid.Column  width = {8}>
                    <Pagination id='pagination'
                        activePage={this.state.activePage}
                        firstItem={null}
                        lastItem={null}
                        pointing
                        secondary
                        totalPages={this.state.numberOfAllPage}
                        onPageChange={this.handlePageChange}
                    />
                     </Grid.Column>
                    <Grid.Column width = {2}/>
                    </Grid>
                    <ErrorComponent errorMessage={this.state.error} />

                </Grid.Column>
                <Grid.Column width = {4}/>
              

            <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} className="Modal" contentLabel="Example Modal" ariaHideApp={false} >
                {this.renderModalComponent()}
            </Modal>
            <div id='theaterMode' className={this.state.selectedPhoto ? 'visible' : 'invisible'}>
                <Button onClick={this.closeBigPhoto}>
                    <Icon name='close' />
                </Button>
                <img src={this.state.selectedPhoto} alt='selected'/>
            </div>
        </Grid>;


    }
}

export default Home;