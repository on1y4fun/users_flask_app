var login_page = `
            <form method="POST" action="/login/">
            <div class="form-group">
                <label>Username</label>
                <input
                type="text"
                name="username"
                class="form-control"
                id="username"
                />
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" name="password" class="form-control" id="password" />
            </div>
            <div>
            <button type="submit" onclick="userLogin()" class="btn btn-primary">Login</button>
            </div>
            </form>`

function loadLoginPage(){
    const xhr = new XMLHttpRequest();
    const container = document.getElementsByClassName("container py-5")[0];
    xhr.open('get', 'login/');
    xhr.onload = function() {
        if (this.status === 200) {
            container.innerHTML = login_page;
        }
    }
    xhr.send();
}

function userLogin(){
    const xhr = new XMLHttpRequest();
    xhr.open('post', 'login/');
    xhr.onload = function() {
        if (this.status === 200) {
            window.location = "/";
        }
    }
}

function userData(){
    const xhr = new XMLHttpRequest();
    xhr.open('get', 'users/<int:id>/');
    xhr.onload = function(response) {
        if (this.status === 200) {
            console.log(response.user);
        }
    }
}

xhr = new XMLHttpRequest()
xhr.open('get', 'users/<int:id>/');
xhr.onload = function(response) {
    if (this.status === 200) {
        console.log(response.user);
    }
}