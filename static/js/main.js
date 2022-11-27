function controller() {
    console.log(window.location.pathname)
    if (window.location.pathname === '/') {
        loadIndexPage()
    }
    else if (window.location.pathname === '/login/') {
        loadLoginPage()
    }
    else if (window.location.pathname === '/edit/') {
        userEditPage()
    }
    else if (window.location.pathname === '/register/') {
        loadRegistrationPage()
    }
}

function goTo(path) {
    window.history.pushState({}, "", path)
    controller()
}   

function loadIndexPage(){
    console.log()
    const xhr = new XMLHttpRequest();
    const container = document.getElementsByClassName("container py-5")[0];
    xhr.open('get', '/api/users/')
    xhr.responseType = 'json'
    xhr.onload = function() {
        const data = xhr.response;
        var users = ""
        data.forEach((user) => {
            user_info = `<tr>
                        <th scope="row" id='id'>${user["id"]}</th>
                        <td id='first_name'>${user["first_name"]}</td>
                        <td id='last_name'>${user["last_name"]}</td>
                        <td id='username'>${user["username"]}</td>
                        <td id='date_created'>${user["date_created"]}</td>
                        <td><input type="submit" onclick="userEditPage(${user["id"]})" class="btn btn-primary" value="Edit" /></td>
                        </tr>`
            users = users + user_info
        })
        if (this.status === 200) {
            container.innerHTML = index_page;
            const user_data = document.getElementsByClassName("user_data")[0]
            user_data.innerHTML = users
        }
    }
    xhr.send();
}
function loadLoginPage(){
    const xhr = new XMLHttpRequest();
    const container = document.getElementsByClassName("container py-5")[0];
    xhr.open('get', '/login/')
    xhr.onload = function() {
        if (this.status === 200) {
            container.innerHTML = login_page;
        }
    }
    xhr.send();
}

function loadRegistrationPage(){
    const xhr = new XMLHttpRequest();
    const container = document.getElementsByClassName("container py-5")[0];
    xhr.open('get', '/register/')
    xhr.onload = function() {
        if (this.status === 200) {
            container.innerHTML = registration_page;
        }
    }
    xhr.send();
}

function userRegister(){
    const form = document.getElementById("signup-form");
    let inputs = form.getElementsByTagName("input");
    let data = {first_name: inputs.first_name.value, 
                last_name: inputs.last_name.value, 
                username: inputs.username.value, 
                password: inputs.password.value};
    var json = JSON.stringify(data)
    var  xhr = new XMLHttpRequest();
    xhr.open('post', '/api/users/', true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.send(json);
    xhr.onload = function() {
        if (this.status === 200) {
            goTo('/');
        }
    }
}

function userEditPage(user_id){
    
    const container = document.getElementsByClassName("container py-5")[0];
    const xhr = new XMLHttpRequest();
    xhr.open('get', '/api/users/' + user_id + '/')
    xhr.responseType = 'json'
    xhr.onload = function() {
        if (this.status === 200) {
            const data = xhr.response;
            container.innerHTML = edit_page;
            user_data = document.getElementsByClassName("form-control")
            submit_data = document.getElementsByTagName("button")
            user_data.first_name.value = data["first_name"]
            user_data.last_name.value = data["last_name"]
            user_data.username.value = data["username"]
            window.history.pushState({}, "", '/api/users/' + user_id + '/')
        }
    }
    xhr.send();
}

function userEdit(){
    var user_path = window.location.pathname
    const form = document.getElementsByClassName("form-control")
    let data = {first_name: form.first_name.value, 
                last_name: form.last_name.value, 
                username: form.username.value};
    var json = JSON.stringify(data)
    var  xhr = new XMLHttpRequest();
    xhr.open('patch', user_path, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.send(json);
    xhr.onload = function() {
        if (this.status === 200) {
            goTo('/');
        }
    }
}

var login_page = `
            <div>
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
            <input type="submit" onclick="userLogin()" class="btn btn-primary" />
            </div>
            </div>`


var registration_page = `
<div id="signup-form">
    <div class="form-group">
      <label for="first_name">First name</label>
      <input
        type="text"
        class="form-control"
        name="first_name"
        id="first_name"
      />
    </div>
    <div class="form-group">
      <label for="last_name">Last name</label>
      <input type="text" class="form-control" name="last_name" id="last_name" />
    </div>
    <div class="form-group">
      <label for="username">Username</label>
      <input type="text" class="form-control" name="username" id="username" />
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input
        type="password"
        class="form-control"
        name="password"
        id="password"
      />
    </div>
    <div style="margin-top: 10px">
    <button type="submit" onclick="userRegister()" class="btn btn-primary">Submit</button>
    </div>
  </div>`
  
  var edit_page = `
  <div id="edit-form">
      <div class="form-group">
        <label for="first_name">First name</label>
        <input
          type="text"
          class="form-control"
          name="first_name"
          id="first_name"
        />
      </div>
      <div class="form-group">
        <label for="last_name">Last name</label>
        <input type="text" class="form-control" name="last_name" id="last_name" />
      </div>
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" class="form-control" name="username" id="username" />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          class="form-control"
          name="password"
          id="password"
        />
      </div>
      <div style="margin-top: 10px">
      <button type="submit" onclick="userEdit()" class="btn btn-primary">Submit</button>
      </div>
    </div>`

var user_page = `
<table class="table">
<thead class="thead-dark">
  <tr>
    <th scope="col">#</th>
    <th scope="col">Имя</th>
    <th scope="col">Фамилия</th>
    <th scope="col">Username</th>
    <th scope="col">Дата добавления</th>
  </tr>
</thead>
<tbody class="user_data"></tbody>
</table>
<button type="submit" onclick="loadRegistrationPage()" class="btn btn-primary">Add new user</button>
<button type="submit" onclick="loadLoginPage()" class="btn btn-primary">Login</button>`

var index_page = `
  <table class="table">
    <thead class="thead-dark">
      <tr>
        <th scope="col">#</th>
        <th scope="col">Имя</th>
        <th scope="col">Фамилия</th>
        <th scope="col">Username</th>
        <th scope="col">Дата добавления</th>
      </tr>
    </thead>
    <tbody class="user_data"></tbody>
  </table>
  <button type="submit" onclick="goTo('register/')" class="btn btn-primary">Add new user</button>
  <button type="submit" onclick="goTo('login/')" class="btn btn-primary">Login</button>`

controller()