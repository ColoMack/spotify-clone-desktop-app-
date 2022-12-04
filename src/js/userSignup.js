document.getElementById("submitsignupBtn").onclick = function(){
    
    let email = document.getElementById("newUserEmail").value;
    let password = document.getElementById("newUserPass").value;
    
    firebase.auth().createUserWithEmailAndPassword(email, password).then((userCredential) => {

        let user = userCredential.user;
        let userId = user.uid;
        let profileName = document.getElementById("newUserProfileName").value;

        let Bday = document.getElementById("dobDay").value;

        // function for getting the value of month from a select tag..
        function getmonth(){
            let monthvalue = document.getElementById("dobMonth").value;
            return monthvalue;       
        }
        let Bmonth = getmonth();
        let BYear = document.getElementById("dobYear").value;
        //let stringdate = Bday + "/" + Bmonth + "/" + BYear;

        let dobDate = new Date(Bday + "/" + Bmonth + "/" + BYear).toDateString();
        let signupDate = new Date();

        firebase.firestore().collection("userCredentials").doc(userId).set({
            theUserId:userId,
            theProfilename: profileName,
            theEmail:email,
            theDOB:dobDate,
            signupTimestamp: signupDate
        }).then(() => {

            window.location.reload;
            window.location.href = "homepage.html";

        }).catch(() => {

            alert("firestore error...check code");

        })

    
    }) .catch ((error) => {
    
        let errorcode = error.code;
        let errorMessage = error.message;
        
        alert("auth error..check code");
    });
}