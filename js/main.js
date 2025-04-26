// точка входа
import { initApp, hideLoading } from './app.js'
import { getToken, setComments } from './state.js'
import { fetchComments } from './api.js'
import { renderComments } from './render.js'
import { renderLoginComponent } from './login.js'

const isAuthorized = !!getToken()

if (isAuthorized) {
    initApp()
} else {
    fetchComments()
        .then((comments) => {
            setComments(comments)
            renderComments()
            hideLoading()

            // секция с предложением авторизоваться
            document.querySelector('.unauthorized').style.display = 'block'
            document.querySelector('.form-wrapper').style.display = 'none'

            const authLink = document.querySelector('.auth-link')
            authLink.addEventListener('click', (e) => {
                e.preventDefault()
                document.querySelector('.unauthorized').style.display = 'none'
                document.querySelector('.login-section').style.display = 'block'
                renderLoginComponent()
            })
        })
        .catch((error) => {
            alert(error.message)
            hideLoading()
        })
}
