// Хранилище комментариев
let comments = []

export function getComments() {
    return comments
}

export function setComments(newComments) {
    comments = newComments
}

export function addComment(comment) {
    comments.push(comment)
}
