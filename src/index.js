import {initializeApp} from 'firebase/app';
import {
    getFirestore,
    collection,
    onSnapshot,
    addDoc,
    deleteDoc,
    doc,
    query, 
    where,
    orderBy,
    serverTimestamp,
    getDoc,
    updateDoc
} from 'firebase/firestore';
import { getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
 } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAit1haXmBmFeI-N-3rkBWftUvSjU0EeNI",
    authDomain: "apkgraphics-33516.firebaseapp.com",
    projectId: "apkgraphics-33516",
    storageBucket: "apkgraphics-33516.appspot.com",
    messagingSenderId: "483095076734",
    appId: "1:483095076734:web:a3692fd85cd1d074651d2f"
  };

//   App Initialization
  initializeApp(firebaseConfig);

// firestore init
const db =getFirestore();
// Auth init
const auth = getAuth();

// get Books Collection
const booksCollect = collection(db, 'Books');

// qreries

const bookQuery = query(booksCollect, orderBy('createdAt'))

// get Books documents

const unsubBooks = onSnapshot(bookQuery, (books)=>{
    let allBooks= [];
    books.docs.forEach((book)=>{
        allBooks.push({...book.data(), id: book.id});  
    });
    // console.log(allBooks);
    var ul = document.querySelector('#ulContainer');
    ul.innerHTML = "";
    for ( let i = 0; i <= allBooks.length - 1; i++) {
        // create li element.
        var li = document.createElement('li'); 
        // create a element.    
        var a = document.createElement('a');
        // assigning text to a using array value.
        a.innerHTML = "Title: "+ allBooks[i].title +"\n By Author: "+ allBooks[i].Author;
        // set a id using array value.      
        a.setAttribute('id', allBooks[i].id);  
         // append a to li.
        li.appendChild(a);    
        ul.appendChild(li);    
    }
});
// add a book
const addBook = document.querySelector('.add');

addBook.addEventListener('submit', (e)=>{
    e.preventDefault();
    addDoc(booksCollect,{
        title: addBook.title.value ,
        Author: addBook.author.value,
        createdAt: serverTimestamp(),
    }).then(()=>{
        addBook.reset(),
        addModal.style.display = "none"
    }).catch(error =>{
        // console.log(error.message);
        alert(error.message);

    })
});

// delete a book
// const deleteBook= document.querySelector('.delete');

// deleteBook.addEventListener('submit',(e)=>{
//     e.preventDefault();
//     const bookref = doc(db,'Books', deleteBook.id.value);
//     deleteDoc(bookref).then(()=>{
//         deleteBook.reset();
//     })
// });

// get Book Document

// const bookref = doc(db, 'Books', 'MUwvXu466OLpIAhnF9ZL');

// const unsubBook =onSnapshot(bookref,(book)=>{
//     console.log(book.data(), book.id);
// });

//Update a Book
var bookId;
const updateBook = document.querySelector('.update')
  updateBook.addEventListener('submit', (e)=>{
   e.preventDefault();
   let title = updateBook.title.value;
   let author = updateBook.author.value;
   const bookref = doc(db,'Books', bookId);
   if(document.activeElement.getAttribute('value') == "update"){

       updateDoc(bookref,{
           title: title,
           Author: author
       }).then(
           updateBook.reset(),
           updateModal.style.display = "none",
           alert("book updated")
           ).catch(error =>{
               // console.log(error.message);
           alert(error.message);
   
           })
   }else if(document.activeElement.getAttribute('value') == "delete"){
        deleteDoc(bookref).then(()=>{
            updateBook.reset();
            updateModal.style.display = "none";
            alert("book Deleted")

        });
   }
  }); 
//hanhle on click book to update
const selectedBook = document.querySelector('#ulContainer');
selectedBook.addEventListener('click',(e)=>{
    // console.log(e.target.id +"got clicked");
    bookId= e.target.id;
        updateModal.style.display = "block";
        let str = e.target.innerText;
        const updateForm= document.querySelector('.update');
        updateForm.title.value = str.slice(7,(str.indexOf("By")-1));
        updateForm.author.value = str.slice((str.indexOf("Author")+7),str.length);
})

// Register user
const register = document.querySelector('.register');
register.addEventListener('submit',(e)=>{
    e.preventDefault();
    const email = register.email.value;
    const password = register.password.value;
    createUserWithEmailAndPassword(auth, email, password ).then((regUser)=>{
        // console.log("User Created: ", regUser.user);
        registerModal.style.display = "none";
        register.reset();
    }).catch(error =>{
        // console.log(error.message);
        alert(error.message);

    })
});

// Login user
const login = document.querySelector('.login');
login.addEventListener('submit',(e)=>{
    e.preventDefault();
    const email = login.email.value;
    const password = login.password.value;
    signInWithEmailAndPassword(auth, email, password ).then((loggedInUser)=>{
        // console.log("User LoggedIn: ", loggedInUser.user);
        login.reset();
        loginModal.style.display = "none";
        // document.querySelector('#loggedinName').innerText =" Welcome: "+loggedInUser.user.email;

    }).catch(error =>{
        // console.log(error.message);
        alert(error.message);
    })
});

// Login user
const logOut = document.querySelector('.logout');
logOut.addEventListener('click',(e)=>{
    e.preventDefault();
    signOut(auth).then(()=>{
        // console.log("User Signed Out");
        loginModal.style.display = "block";
    }).catch(error =>{
        // console.log(error.message);
        alert(error.message);
    })
});

// subscribing to auth changes
const unsubAuth =onAuthStateChanged(auth, (user)=>{
    // console.log('User status Changed: ', user);
    if (user == null) {
        loginModal.style.display = "block"; 
        document.querySelector('#loggedinName').innerText ="";

    }else{
        loginModal.style.display = "none";  
        registerModal.style.display = "none";
        document.querySelector('#loggedinName').innerText =" Welcome: "+user.email;
    }

});
// unsubscribe
const unsubBtn = document.querySelector('.unsub');
unsubBtn.addEventListener('click',()=>{
    // console.log("unsubscribibtng");
    unsubBooks();
    // unsubBook();
    unsubAuth()
})