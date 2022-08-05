import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
 } from 'firebase/auth';
// Auth init
const auth = getAuth();


// Login user
const login = document.querySelector('.login');
login.addEventListener('submit',(e)=>{
    e.preventDefault();
    const email = login.email.value;
    const password = login.password.value;
    signInWithEmailAndPassword(auth, email, password ).then((loggedInUser)=>{
        console.log("User LoggedIn: ", loggedInUser.user);
        login.reset();
    }).catch(error =>{
        console.log(error.message);
    })
});


// subscribing to auth changes
const unsubAuth =onAuthStateChanged(auth, (user)=>{
    console.log('User status Changed: ', user);
});
// unsubscribe
const unsubBtn = document.querySelector('.unsub');
unsubBtn.addEventListener('click',()=>{
    console.log("unsubscribibtng");
    unsubBooks();
    unsubBook();
    unsubAuth();
})