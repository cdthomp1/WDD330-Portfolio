const newComment = {
    name: '',
    date: new Date(),
    content: comment
};

class Comment {
    constructor(type) {
        this.type = type;
        this.comments = this.getAllComments();
        document.getElementById('commentAddBtn').addEventListener('click', this.addAComment);
    }

    // get all comments
    getAllComments() {
        let thing = [];
        if (JSON.parse(window.localStorage.getItem("comments")) === null) {
            console.log('yo-yo');
            return thing;
        } else {
            console.log('yo');
            return JSON.parse(window.localStorage.getItem("comments"));
        }


    }

    // add a comment
    addAComment() {

        this.content = document.getElementById('comment').value;
        this.name = document.getElementById('name').value;
        let comment = newComment;
        comment.name = this.name;
        comment.date = new Date();
        comment.content = this.content;
        console.log(comment);
        this.comments = this.getAllComments();
        console.log(Array.isArray(this.comments));
        this.comments.push(comment);


        window.localStorage.setItem("comments", JSON.stringify(this.comments))
    }

    // render comments 
    renderComments() {
        //let commentsArray = getAllComments();
    }

    // filter comments
    filterComments(filter) {

    }

}


export default Comment;


var todoList = getFromStorage();

