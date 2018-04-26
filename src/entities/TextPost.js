import Post from './Post'

class TextPost extends Post {
    constructor(post){
        super(post)
        this.text = post.text;
    }
}

export default TextPost;