function displayLogin() {
  return (document.getElementById("id01").style.display = "block");
}

function displaySignup() {
  return (document.getElementById("id02").style.display = "block");
}

var modal = document.getElementById("id01");

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
