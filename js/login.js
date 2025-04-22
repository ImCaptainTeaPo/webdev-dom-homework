import { loginUser } from './api.js'
import { setToken, setUserName } from './state.js'
import { initApp } from './app.js'

export function renderLoginComponent() {
    const loginSection = document.querySelector('.login-section')
    loginSection.innerHTML = `
        <div class="login-form">
            <h3>Вход</h3>
            <input
                type="text"
                class="login-input"
                placeholder="Введите логин"
            />
            <input
                type="password"
                class="password-input"
                placeholder="Введите пароль"
            />
            <button class="login-button">Войти</button>
        </div>
    `
    loginSection.style.display = 'block'

    const loginInput = document.querySelector('.login-input')
    const passwordInput = document.querySelector('.password-input')
    const loginButton = document.querySelector('.login-button')

    loginButton.addEventListener('click', () => {
        const login = loginInput.value.trim()
        const password = passwordInput.value.trim()

        if (!login || !password) {
            alert('Введите логин и пароль')
            return
        }

        loginUser({ login, password })
            .then(({ token, name }) => {
                setToken(token)
                setUserName(name)

                loginSection.style.display = 'none'
                document.querySelector('.unauthorized').style.display = 'none'
                document.querySelector('.form-wrapper').style.display = 'flex'

                initApp()
            })
            .catch((error) => {
                alert(error.message)
            })
    })
}
