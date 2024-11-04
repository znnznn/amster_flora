export const googleAuth = async (token: string) => {
    fetch('https://api.amster.org.ua/auth/google/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token
        })
    })
}

interface LoginData {
    phone: string
    password: string
}

export const login = async ({ phone, password }: LoginData) => {
    const response = await fetch('https://api.amster.org.ua/auth/token/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            phone,
            password
        })
    })

    return response.json()
}
