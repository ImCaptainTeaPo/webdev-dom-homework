// дата и очистка тегов
const API_URL = 'https://wedev-api.sky.pro/api/v1/golovin-semen/comments'

export async function fetchComments() {
    try {
        const response = await fetch(API_URL)
        if (!response.ok) {
            if (response.status >= 500) {
                throw new Error('Сервер сломался, попробуй позже')
            }
            throw new Error('Ошибка загрузки комментариев')
        }
        const data = await response.json()
        return data.comments.map((comment) => ({
            name: comment.author.name,
            date: new Date(comment.date).toLocaleString(),
            text: comment.text,
            likes: comment.likes,
            isLiked: false,
        }))
    } catch (error) {
        if (error.name === 'TypeError') {
            throw new Error(
                'Кажется, у вас сломался интернет, попробуйте позже',
            )
        }
        throw error
    }
}

export async function postComment({ name, text }) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify({ name, text, forceError: true }),
        })

        if (response.status === 400) {
            const errorData = await response.json()
            throw new Error(errorData.error)
        }

        if (!response.ok) {
            if (response.status >= 500) {
                throw new Error('Сервер сломался, попробуй позже')
            }
            throw new Error('Ошибка отправки комментария')
        }

        return response.json()
    } catch (error) {
        if (error.name === 'TypeError') {
            throw new Error(
                'Кажется, у вас сломался интернет, попробуйте позже',
            )
        }
        throw error
    }
}

export function getCurrentDateTime() {
    const now = new Date()
    const day = now.getDate().toString().padStart(2, '0')
    const month = (now.getMonth() + 1).toString().padStart(2, '0')
    const year = now.getFullYear().toString().slice(2)
    const hours = now.getHours().toString().padStart(2, '0')
    const minutes = now.getMinutes().toString().padStart(2, '0')
    return `${day}.${month}.${year} ${hours}:${minutes}`
}

export function stripHTMLTags(input) {
    return input.replace(/<\/?[^>]+(>|$)/g, '')
}
