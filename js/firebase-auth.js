// YouTube Video Reference: https://youtu.be/-OKrloDzGpU
// Documentation: https://firebase.google.com/docs/auth/web/password-auth?utm_campaign=Firebase_featureoverview_education_auth_en_07-26-16&utm_source=Firebase&utm_medium=yt-desc

// Get Auth Elements
const txtEmail = document.getElementById('txtEmail');
const txtPassword = document.getElementById('txtPassword');
const btnLogin = document.getElementById('btnLogin');
const btnLoginModal = document.getElementById('btnLoginModal');
const btnSignUp = document.getElementById('btnSignUp');
const btnLogout = document.getElementById('btnLogout');

// On Login Event
btnLogin.addEventListener('click', e => {
    // Get email and pass
    const email = txtEmail.value; 
    const pass = txtPassword.value;
    const auth = firebase.auth(); 
    // Sign in
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
});

// On SignUp Event
btnSignUp.addEventListener('click', e => {
    // Get email and pass
    // TODO: CHECK FOR REAL EMAILS
    const email = txtEmail.value; 
    const pass = txtPassword.value; 
    const auth = firebase.auth(); 
    // Sign in
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
});

btnLogout.addEventListener('click', e => {
    firebase.auth().signOut().then(function() {
        console.log('Signed Out');
    }, function(error) {
        console.error('Sign Out Error', error);
    });
    alert("warning", "You have logged out. Come back and see us!");
});

// When the authentication state changes: 
firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser) {
        // console.log(firebaseUser);
//        btnLogout.classList.remove('d-none');
//        btnLoginModal.classList.add('d-none');
        // TODO: Display user's email outside of alert.  
        alert("primary", "Welcome " + firebase.auth().currentUser.email + "!");
    }
    else {
        console.log("Not Logged In");
//        btnLoginModal.classList.remove('d-none');
//        btnLogout.classList.add('d-none');
    }
});