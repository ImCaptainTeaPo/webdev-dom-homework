// все из main
import { getCurrentDateTime, stripHTMLTags } from './api.js'
import { addComment } from './state.js'
import { renderComments } from './render.js'

export function initApp() {
    const nameInput = document.querySelector('.add-form-name')
    const commentInput = document.querySelector('.add-form-text')
    const addButton = document.querySelector('.add-form-button')

    addButton.addEventListener('click', () => {
        const name = stripHTMLTags(nameInput.value.trim())
        const text = commentInput.value.trim()

        if (name === '' || text === '') {
            alert('Введите имя и комментарий!')
            return
        }

        addComment({
            name,
            text,
            date: getCurrentDateTime(),
            likes: 0,
            isLiked: false,
        })

        nameInput.value = ''
        commentInput.value = ''

        renderComments()
    })

    renderComments()
}
