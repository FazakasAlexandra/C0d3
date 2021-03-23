export const db = {
    c0de: (path, body) => {
        return fetch(`https://js5.c0d3.com/${path}`, {
            method: "POST",
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(res => res.json())
    },
    session: (jwt, successHandler) => {
        fetch('/api/session', {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        }).then((res) => {
            if (res.status === 403) {
                redirectLogIn()
            }
            successHandler()
        })
    },
    chatroom: {
        post: (jwt, chatroomName, message) => {
            return fetch(`/api/${chatroomName}/messages`, {
                headers: {
                    'content-type': 'application/json',
                    Authorization: `Bearer ${jwt}`
                },
                method: "POST",
                body: JSON.stringify(message)
            }).then(res => {
                if (res.status === 403) {
                    redirectLogIn()
                }
                return res
            }).then(res => res.json())
        },
        get: (jwt, chatroomName) => {
            return fetch(`/api/${chatroomName}/messages`, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            }).then((res) => {
                if (res.status === 403) {
                    redirectLogIn()
                }
                return res
            }).then(res => res.json())
        }
    }
}

function redirectLogIn() {
    localStorage.clear()
    window.location = '/chatroom/login.html'
}

export const register = (url, body) => {
    db.c0de(url, body).then((data) => {
        if (data.error) {
            document.querySelector('#error').innerText = data.error.message
            return
        }

        localStorage.setItem('jwt', data.jwt)
        window.location = '/chatroom/index.html'
    })
}