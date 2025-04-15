// все из main
import {
    getCurrentDateTime,
    stripHTMLTags,
    fetchComments,
    postComment,
} from './api.js'

import { addComment, setComments } from './state.js'
import { renderComments } from './render.js'

export function initApp() {
    const nameInput = document.querySelector('.add-form-name')
    const commentInput = document.querySelector('.add-form-text')
    const addButton = document.querySelector('.add-form-button')

    // 1. Загружаем комментарии при старте
    fetchComments()
        .then((loadedComments) => {
            setComments(loadedComments)
            renderComments()
        })
        .catch((error) => {
            alert('Не удалось загрузить комментарии: ' + error.message)
        })

    // 2. Обработка добавления нового комментария
    addButton.addEventListener('click', () => {
        const name = stripHTMLTags(nameInput.value.trim())
        const text = commentInput.value.trim()

        if (name.length < 3 || text.length < 3) {
            alert('Имя и комментарий должны содержать хотя бы 3 символа!')
            return
        }

        postComment({ name, text })
            .then(() => {
                return fetchComments()
            })
            .then((loadedComments) => {
                setComments(loadedComments)
                renderComments()
                nameInput.value = ''
                commentInput.value = ''
            })
            .catch((error) => {
                alert('Ошибка при добавлении комментария: ' + error.message)
            })
    })
}
