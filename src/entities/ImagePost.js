import Post from './Post'

class ImagePost extends Post {
    constructor(post) {
        super(post);
        this.imageUrl = post.imageUrl;
    }
}

export default ImagePost;