class Comment {
    constructor(comment){
        this.id = comment.id;
        this.dateCreated = comment.dateCreated;
        this.body = comment.body;
        this.postId = comment.postId;
        this.authorName = comment.authorName;
        this.authorId = comment.authorId
    }
}

export default Comment;