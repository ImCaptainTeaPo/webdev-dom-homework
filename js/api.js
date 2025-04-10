// дата и очистка тегов
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
