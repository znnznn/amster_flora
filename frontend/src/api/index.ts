import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://api.amster.org.ua'
})

api.interceptors.request.use(
    (request) => {
        if (true) {
            request.headers['Authorization'] =
                `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMwNzUwOTYzLCJpYXQiOjE3MzA3NTA2NjMsImp0aSI6ImUzZjdlZDhjM2MxNTQ0Njk4MGYzMWMxMWE2Y2M1ZGFjIiwidXNlcl9pZCI6NH0.7ua6Ks3Y9tHJThsm9k1-qRQlx3YCQ7_l1tUTKRbHFi4`
        }
        return request
    },
    (error) => {
        return Promise.reject(error)
    }
)

// api.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         const originalRequest = error.config
//         if (error.response.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true
//             try {
//                 const refreshToken = cookies().get('refresh_token')?.value

//                 const response = await axios.post(
//                     'hhttps://api.amster.org.ua/token/refresh',
//                     {
//                         refreshToken
//                     }
//                 )
//                 const { accessToken, refreshToken: newRefreshToken } = response.data

//                 cookies().set('access_token', accessToken, { path: '/' })
//                 cookies().set('refresh_token', newRefreshToken, { path: '/' })

//                 api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
//                 return api(originalRequest)
//             } catch (refreshError) {
//                 console.error('Token refresh failed:', refreshError)
//                 localStorage.removeItem('access_token')
//                 localStorage.removeItem('refresh_token')
//                 return Promise.reject(refreshError)
//             }
//         }
//         return Promise.reject(error)
//     }
// )
