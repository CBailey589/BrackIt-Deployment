import Auth0 from "auth0-js"
import jwtDecode from "jwt-decode"

const LOGIN_SUCCESS_PAGE = "/profile"
const LOGIN_FAILURE_PAGE = "/"

export default class Auth {
    auth0 = new Auth0.WebAuth({
        domain: "dev-bvzn7841.auth0.com",
        clientID: "WjRwazfW9ijejNoioaByW6Cl3B7zg4U0",
        redirectUri: "http://localhost:3000/callback",
        audience: "https://dev-bvzn7841.auth0.com/userinfo",
        responseType: "token id_token",
        scope: "openid profile",
        returnTo: "https://dev-bvzn7841.auth0.com/v2/logout"
    })

    constructor() {
        this.login = this.login.bind(this)
    }

    login() {
        this.auth0.authorize()
    }

    handleAuthentication() {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                let expiresAt = JSON.stringify((authResult.expiresIn) * 1000 + new Date().getTime())
                localStorage.setItem("brackIt_access_token", authResult.accessToken)
                localStorage.setItem("brackIt_id_token", authResult.idToken)
                localStorage.setItem("brackIt_expires_at", expiresAt)
                window.location.hash = ""
                window.location.pathname = LOGIN_SUCCESS_PAGE
                // this.setSession(authResult);
            } else if (err) {
                window.location.pathname = LOGIN_FAILURE_PAGE
                console.log(err);
                // window.history.replace('/home');
                // alert(`Error: ${err.error}. Check the console for further details.`);
            }
        })
    }

    isAuthenticated() {
        let expiresAt = JSON.parse(localStorage.getItem("brackIt_expires_at"))
        return new Date().getTime() < expiresAt
    }

    logout() {
        localStorage.removeItem("brackIt_access_token")
        localStorage.removeItem("brackIt_id_token")
        localStorage.removeItem("brackIt_expires_at")
        window.location.pathname = LOGIN_FAILURE_PAGE
    }

    getProfile() {
        if (localStorage.getItem("brackIt_id_token")) {
            return jwtDecode(localStorage.getItem("brackIt_id_token"))
        } else {
            return {}
        }
    }
}