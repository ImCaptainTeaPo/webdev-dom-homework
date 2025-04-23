// лайки+цитаты
import { getComments, getToken } from './state.js'
import { renderComments } from './render.js'

export function setLikeHandlers() {
    const comments = getComments()
    const isAuthorized = !!getToken()

    document.querySelectorAll('.like-button').forEach((button) => {
        if (!isAuthorized) return

        button.addEventListener('click', (event) => {
            event.stopPropagation()
            const index = button.getAttribute('data-index')
            comments[index].isLiked = !comments[index].isLiked
            comments[index].likes += comments[index].isLiked ? 1 : -1
            renderComments()
        })
    })
}

export function setReplyHandlers() {
    const comments = getComments()
    document.querySelectorAll('.comment').forEach((commentElement, index) => {
        commentElement.addEventListener('click', (event) => {
            if (!event.target.classList.contains('like-button')) {
                const commentInput = document.querySelector('.add-form-text')
                commentInput.value = `> ${comments[index].text}\n`
            }
        })
    })
}
