document.getElementById("userloginbtn").onclick = function(){
    let email = document.getElementById("loginemail").value;
    let password = document.getElementById("loginpass").value;

    firebase.auth().signInWithEmailAndPassword(email, password).then((usercred) => {

        window.location.reload;
        
    }).then(() => {

        window.location.href = "homepage.html";
    }).catch((error) => {

        alert("Incorrect username or password");
    })
}