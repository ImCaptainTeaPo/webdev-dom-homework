// все из main
import {
    getCurrentDateTime,
    stripHTMLTags,
    fetchComments,
    postComment,
} from './api.js'
import { setComments } from './state.js'
import { renderComments } from './render.js'

function hideLoading() {
    document.querySelector('.loading-text').style.display = 'none'
}

function showAdding() {
    document.querySelector('.adding-text').style.display = 'block'
    document.querySelector('.add-form').style.display = 'none'
}

function hideAdding() {
    document.querySelector('.adding-text').style.display = 'none'
    document.querySelector('.add-form').style.display = 'block'
}

function loadAndRenderComments() {
    return fetchComments()
        .then((loadedComments) => {
            setComments(loadedComments)
            renderComments()
        })
        .catch((error) => {
            alert('Не удалось загрузить комментарии: ' + error.message)
        })
        .finally(() => {
            hideLoading()
        })
}

export function initApp() {
    const nameInput = document.querySelector('.add-form-name')
    const commentInput = document.querySelector('.add-form-text')
    const addButton = document.querySelector('.add-form-button')

    loadAndRenderComments()

    addButton.addEventListener('click', () => {
        const name = stripHTMLTags(nameInput.value.trim())
        const text = commentInput.value.trim()

        if (name.length < 3 || text.length < 3) {
            alert('Имя и комментарий должны содержать хотя бы 3 символа!')
            return
        }

        showAdding()

        postComment({ name, text })
            .then(() => loadAndRenderComments())
            .then(() => {
                nameInput.value = ''
                commentInput.value = ''
            })
            .catch((error) => {
                alert('Ошибка при добавлении комментария: ' + error.message)
            })
            .finally(() => {
                hideAdding()
            })
    })
}
