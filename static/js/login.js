login_page = `
            <form method="POST" action="/login">
            <div class="form-group">
            <label for="exampleInputEmail1">Username</label>
            <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            />
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" />
            </div>
            <button type="submit" class="btn btn-primary">Login</button>
            </form>
            `

function loadLoginPage(){
    $.ajax({
        url: "/login",
        type: "GET",
        dataType: "application/json",
        sucess: function(login_page){
            document.getElementsByClassName("container py-5").replaceWith(login_page)
        }
    })
}

function userLogin(){
    $.ajax({
        url: "/login",
        type: "POST",
        dataType: "application/json",
        sucess: function(){
            window.location.href = "index";
        }
    })
}