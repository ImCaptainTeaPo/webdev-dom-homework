// Хранилище комментариев и пользователя
let comments = []
let token = null
let userName = null

export function getComments() {
    return comments
}

export function setComments(newComments) {
    comments = newComments
}

export function addComment(comment) {
    comments.push(comment)
}

export function setToken(newToken) {
    token = newToken
}

export function getToken() {
    return token
}

export function setUserName(name) {
    userName = name
}

export function getUserName() {
    return userName
}
