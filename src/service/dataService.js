import TextPost from '../entities/TextPost';
import ImagePost from '../entities/ImagePost';
import VideoPost from '../entities/VideoPost';
import User from '../entities/User';
import Comment from '../entities/Comment';
import { sessionService } from './sessionService'



class DataServices {

    getPosts = (page) => {
        return fetch(`http://bitbookapi.azurewebsites.net/api/Posts?$top=10&$skip=${page * 10}&$orderby=DateCreated desc`, {
            headers: sessionService.makeHeader(),
            method: 'GET'
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.message) {
                    var error = new Error(data.message);
                    throw error
                }
                return data;
            })
            .then((postList) => {
                let textPosts = postList.filter((post) => post.type === "text");
                let videoPosts = postList.filter((post) => post.type === "video");
                let imagePosts = postList.filter((post) => post.type === "image")
                let objectPosts = {
                    textPosts: textPosts.map((post) => new TextPost(post)),
                    videoPosts: videoPosts.map((post) => new VideoPost(post)),
                    imagePosts: imagePosts.map((post) => new ImagePost(post))
                }

                return objectPosts
            })
            .catch((error) => {
                return { error: error.message }
            })
    }
    getPostsCount = () => {
        return fetch(`http://bitbookapi.azurewebsites.net/api/posts/count`, {
            headers: sessionService.makeHeader(),
            method: 'GET'
        })
            .then(response => response.json())
    }

    getTextPost = (id) => {
        return fetch(`http://bitbookapi.azurewebsites.net/api/TextPosts/${id}`, {
            headers: sessionService.makeHeader(),
            method: 'GET'
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.message) {
                    var error = new Error(data.message);
                    throw error
                }
                return data;
            })
            .then((postItem) => new TextPost(postItem))
            .catch((error) => {
                return { error: error.message }
            })
    }

    getImagePost = (id) => {
        return fetch(`http://bitbookapi.azurewebsites.net/api/ImagePosts/${id}`, {
            headers: sessionService.makeHeader(),
            method: 'GET'
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.message) {
                    var error = new Error(data.message);
                    throw error
                }
                return data;
            })
            .then((postItem) => new ImagePost(postItem))
            .catch((error) => {
                return { error: error.message }
            })
    }

    getVideoPost = (id) => {
        return fetch(`http://bitbookapi.azurewebsites.net/api/VideoPosts/${id}`, {
            headers: sessionService.makeHeader(),
            method: 'GET'
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.message) {
                    var error = new Error(data.message);
                    throw error
                }
                return data;
            })
            .then((postItem) => new VideoPost(postItem))
            .catch((error) => {
                return { error: error.message }
            })
    }

    getUsers = () => {
        return fetch('http://bitbookapi.azurewebsites.net/api/users', {
            headers: sessionService.makeHeader(),
            method: 'GET'
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.message) {
                    var error = new Error(data.message);
                    throw error
                }
                return data;
            })
            .then((userList) => userList.map((user) => new User(user)))
            .catch((error) => {
                return { error: error.message }
            })
    }

    getUser = (id) => {
        return fetch(`http://bitbookapi.azurewebsites.net/api/users/${id}`, {
            headers: sessionService.makeHeader(),
            method: 'GET'
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.message) {
                    var error = new Error(data.message);
                    throw error
                }
                return data;
            })
            .then((user) => new User(user))
            .catch((error) => {
                return { error: error.message }
            })
    }
    getProfile = () => {
        return fetch(`http://bitbookapi.azurewebsites.net/api/profile`, {
            headers: sessionService.makeHeader(),
            method: 'GET'
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.message) {
                    var error = new Error(data.message);
                    throw error
                }
                return data;
            })
            .then((user) => user.userId)
            .catch((error) => {
                return { error: error.message }
            })
    }

    addNewTextPost = (newTextPost) => {
        return fetch('http://bitbookapi.azurewebsites.net/api/TextPosts', {
            headers: sessionService.makeHeader(),
            method: 'POST',
            body: JSON.stringify({
                text: newTextPost
            })
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.message) {
                    var error = new Error(data.message);
                    throw error
                }
                return data;
            })
            .catch((error) => {
                return { error: error.message }
            })
    }

    addNewImagePost = (newImagePost) => {
        return fetch('http://bitbookapi.azurewebsites.net/api/ImagePosts', {
            headers: sessionService.makeHeader(),
            method: 'POST',
            body: JSON.stringify({
                imageUrl: newImagePost
            })
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.message) {
                    var error = new Error(data.message);
                    throw error
                }
                return data;
            })
            .catch((error) => {
                return { error: error.message }
            })
    }


    addNewVideoPost = (newVideoPost) => {
        return fetch('http://bitbookapi.azurewebsites.net/api/VideoPosts', {
            headers: sessionService.makeHeader(),
            method: 'POST',
            body: JSON.stringify({
                videoUrl: newVideoPost
            })
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.message) {
                    var error = new Error(data.message);
                    throw error
                }
                return data;
            })
            .catch((error) => {
                return { error: error.message }
            })
    }


    addComment = (data) => {
        return fetch('http://bitbookapi.azurewebsites.net/api/comments', {
            headers: sessionService.makeHeader(),
            body: JSON.stringify(data),
            method: 'POST'
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.message) {
                    var error = new Error(data.message);
                    throw error
                }
                return data;
            })
            .catch((error) => {
                return { error: error.message }
            })
    }

    getComment = (id) => {
        return fetch(`http://bitbookapi.azurewebsites.net/api/comments?postId=${id}`, {
            headers: sessionService.makeHeader(),
            method: 'GET'
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.message) {
                    var error = new Error(data.message);
                    throw error
                }
                return data;
            })
            .then((comments) => comments.map((comment) => new Comment(comment)))
            .catch((error) => {
                return { error: error.message }
            })
    }


    uploadPhoto = (data) => {
        return fetch('http://bitbookapi.azurewebsites.net/api/upload/', {
            headers: {
                'Key': '516AE7C',
                'SessionId': JSON.parse(sessionStorage.getItem('user')).sessionId,
            },
            body: data,
            method: 'POST'
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.message) {
                    var error = new Error(data.message);
                    throw error
                }
                return data;
            })
            .catch((error) => {
                return { error: error.message }
            })
    }

    changeProfile = (data) => {
        return fetch('http://bitbookapi.azurewebsites.net/api/profiles', {
            headers: sessionService.makeHeader(),
            body: JSON.stringify(data),
            method: 'PUT'
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.message) {
                    var error = new Error(data.message);
                    throw error
                }
                return data;
            })
            .catch((error) => {
                return { error: error.message }
            })
    }

    deletePosts = (id) => {
        return fetch(`http://bitbookapi.azurewebsites.net/api/Posts/${id}`, {
            headers: sessionService.makeHeader(),
            method: 'DELETE'
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.message) {
                    var error = new Error(data.message);
                    throw error
                }
                return data;
            })
            .catch((error) => {
                return { error: error.message }
            })
    }

    login = (data) => {
        return fetch('http://bitbookapi.azurewebsites.net/api/login', {

            headers: {
                'Content-Type': 'application/json',
                'Key': '516AE7C'
            },
            body: JSON.stringify(data),
            method: 'POST'
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.error) {
                    var error = new Error(data.error.message);
                    throw error
                }
                return data;
            })
            .catch((error) => {
                return { error: error.message }
            })
    }

    register = (data) => {
        return fetch('http://bitbookapi.azurewebsites.net/api/register', {

            headers: {
                'Content-Type': 'application/json',
                'Key': '516AE7C'

            },
            body: JSON.stringify(data),
            method: 'POST'
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.error) {
                    var error = new Error(data.error.message);
                    throw error
                }
                return data;
            })
            .catch((error) => {
                return { error: error.message }
            })
    }
}

export const dataServices = new DataServices();