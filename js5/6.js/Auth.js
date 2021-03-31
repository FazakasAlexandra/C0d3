const Auth = {
    signup = (data) => {
        return fetch('http://localhost:3000/api/users', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
    },
    login = (data) => {
        return fetch('http://localhost:3000/api/session', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
    },
    getSession = (jwt) => {
        return fetch('http://localhost:3000/api/session', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            }
        }).then(res => res.json())
    },
    logout = () => {
        Auth.getSession(0).then((res) => console.log(res.errors.message))
    }
}