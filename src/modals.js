// Get the modal
var addModal = document.getElementById("addModal");
var registerModal = document.getElementById("registerModal");
var loginModal = document.getElementById("loginModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");
var btn2 = document.getElementById("loqinbtn");
var btn3 = document.getElementById("reqbtn");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
var span1 = document.getElementById("close1");
var span2 = document.getElementById("close2");

// When the user clicks the button, open the modal 
btn.onclick = function() {
    addModal.style.display = "block";
}

// btn2.onclick = function() {
//     registerModal.style.display = "block";
// }
btn3.addEventListener('click',()=>{
    registerModal.style.display = "block";
    loginModal.style.display = "none";
    
});

// btn3.onclick = function() {
//     loginModal.style.display = "block";
// }
btn2.addEventListener('click',()=>{
    loginModal.style.display = "block";
    registerModal.style.display = "none";


});

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    addModal.style.display = "none";
}

span1.onclick = function() {
    updateModal.style.display = "none";
}
span2.onclick = function() {
    deleteModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == addModal ) {
    addModal.style.display = "none";
  }else if(event.target == updateModal){
    updateModal.style.display = "none";
  }else if(event.target == deleteModal){
    deleteModal.style.display = "none";
  }
}
var check = function() {
    if (document.getElementById('password').value ==
      document.getElementById('confirm_password').value) {
      document.getElementById('message').style.color = 'green';
      document.getElementById('message').innerHTML = 'Password match';
    } else {
      document.getElementById('message').style.color = 'red';
      document.getElementById('message').innerHTML = 'Password not matching';
    }
  }