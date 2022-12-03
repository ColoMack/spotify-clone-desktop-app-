document.getElementById("submitsignupBtn").onclick = function(){
    
    let email = document.getElementById("newUserEmail").value;
    let password = document.getElementById("newUserPass").value;
    
    firebase.auth().createUserWithEmailAndPassword(email, password).then((userCredential) => {

        let user = userCredential.user;
        let profileName = document.getElementById("newUserProfileName").value;

        let Bday = document.getElementById("dobDay").value;

        // function for getting the value of month from a select tag..
        let selectmonth = documnet.getElementById("dobMonth");
        function gettingmonth(){
            let Bmonth = selectmonth.value;
            document.getElementById("show").value = Bmonth;
        }

        let BYear = document.getElementById("dobYear").value;
    
    }) .catch ((error) => {
    
        let errorcode = error.code;
        let errorMessage = error.message;
        
    });
}