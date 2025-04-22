// все из main
import {
    getCurrentDateTime,
    stripHTMLTags,
    fetchComments,
    postComment,
} from './api.js'
import { setComments, getUserName } from './state.js'
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
    document.querySelector('.add-form').style.display = 'flex'
}

function loadAndRenderComments() {
    return fetchComments()
        .then((loadedComments) => {
            setComments(loadedComments)
            renderComments()
        })
        .catch((error) => {
            alert(error.message)
        })
        .finally(() => {
            hideLoading()
        })
}

function initApp() {
    const nameInput = document.querySelector('.add-form-name')
    const commentInput = document.querySelector('.add-form-text')
    const addButton = document.querySelector('.add-form-button')

    nameInput.value = getUserName()
    nameInput.setAttribute('readonly', true)

    loadAndRenderComments()

    addButton.addEventListener('click', () => {
        const text = commentInput.value.trim()
        const name = getUserName()

        if (name.length < 3 || text.length < 3) {
            alert('Имя и комментарий должны быть не короче 3 символов')
            return
        }

        showAdding()

        postComment({ name, text })
            .then(() => loadAndRenderComments())
            .then(() => {
                commentInput.value = ''
            })
            .catch((error) => {
                alert(error.message)
            })
            .finally(() => {
                hideAdding()
            })
    })
}

export { initApp, hideLoading }
