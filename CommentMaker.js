class Comment {
    constructor(date, text) {
        this.commentElement = this.create(date, text);
    }

    create(dateValue, textValue) {
        const commentItem = document.createElement('div');
        commentItem.classList.add('popup__comment');
        commentItem.classList.add('comment');

        const commentDate = document.createElement('span');
        commentDate.classList.add('comment__date');
        commentDate.textContent = dateValue;

        const commentText = document.createElement('span');
        commentText.classList.add('comment__text');
        commentText.textContent = textValue;

        commentItem.appendChild(commentDate);
        commentItem.appendChild(commentText);

        return commentItem;
    }
}

class CommentList {
    constructor(container, items) {
        this.container = container;
        this.items = items;

        this.render();
    }

    addComment(date, text) {
        const { commentElement } = new Comment(date, text);
        this.container.appendChild(commentElement);
    }

    render() {
        console.log(this.items);
        this.items.comments.forEach((comment) => {
            const dateToFormat = new Date(comment.date);
            const year = dateToFormat.getFullYear();
            const month = dateToFormat.getMonth();
            const date = dateToFormat.getDate();
            const finalDate = `${date}.${month + 1}.${year}`;

            this.addComment(finalDate, comment.text);
        })
    }
}

let commentList;
api.getPictures()
    .then((data) => {
        data.forEach((item) => {
            fetch(`example.com`)
                .then(res => res.json())
                .then((data) => {
                    commentList = new CommentList(commentContainer, data)
                })
                .catch((err) => {
                    console.log(err);
                })
        })
    })
    .catch((err) => console.log(err));