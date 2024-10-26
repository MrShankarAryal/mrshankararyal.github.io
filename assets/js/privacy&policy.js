 // Get the modal elements
 var termsPopup = document.getElementById("termsPopup");
 var privacyPopup = document.getElementById("privacyPopup");

 // Get the button that opens the modal
 var termsLink = document.getElementById("termsLink");
 var privacyLink = document.getElementById("privacyLink");

 // Get the <span> elements that close the modals
 var closeButtons = document.getElementsByClassName("close");

 // When the user clicks on the button, open the modal
 termsLink.onclick = function(e) {
     e.preventDefault();
     termsPopup.style.display = "block";
 }

 privacyLink.onclick = function(e) {
     e.preventDefault();
     privacyPopup.style.display = "block";
 }

 // When the user clicks on <span> (x), close the modal
 for (var i = 0; i < closeButtons.length; i++) {
     closeButtons[i].onclick = function() {
         termsPopup.style.display = "none";
         privacyPopup.style.display = "none";
     }
 }

 // When the user clicks anywhere outside of the modal, close it
 window.onclick = function(event) {
     if (event.target == termsPopup) {
         termsPopup.style.display = "none";
     }
     if (event.target == privacyPopup) {
         privacyPopup.style.display = "none";
     }
 }