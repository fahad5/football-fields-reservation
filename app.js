


// function myMap() {
//     var mapProp = {
//         center: new google.maps.LatLng(24.774265, 46.738586),
//         zoom: 10,
//     };
//     var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
//  }
 
 
 var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
 };
 var coord = {
     
 }
 console.log("this is my lat " + coord)

 var lat ;
 var lng ;
 function success(pos) {
    var crd = pos.coords;
    console.log()
     lat = pos.coords.latitude;
     lng = pos.coords.longitude;
    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
    $("#lat").append('<h3>' + lat + '</h3>');
    $("#lng").append("<h3>" + lng + "</h3>");

    distance();
 
 }

 
 function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
 }
 
 navigator.geolocation.getCurrentPosition(success, error, options);
 
 function distance() {
     console.log(lat)
 
    $.ajax({
        url:
            "https://api.tomtom.com/routing/1/calculateRoute/" + lat+ ","+ lng+ ":24.774265,46.738586/json?key=KRHewZJa28VGKxRgVdG3DloKJCPlmU2K",
        type: "GET",
        data: {
      
        },
        success: function (response) {
            // weather = response.coord;
            var time = response.routes[0].summary.travelTimeInSeconds;
            var dis = response.routes[0].summary.lengthInMeters;
            console.log("the time needed to be there is "+ Math.round((time / 60)));
            console.log("distance is "+dis / 1000);
        }
    });
 
 }

 
 
 $(document).ready(function() {

    var $messageBoardDiv = $('.gallery');

    firebase.initializeApp( {
 
        apiKey: "AIzaSyDy2rGZc9YRXeFYenti7RbQBResVno9wOw",
       authDomain: "finalproject-misk.firebaseapp.com",
       databaseURL: "https://finalproject-misk.firebaseio.com",
       projectId: "finalproject-misk",
       storageBucket: "finalproject-misk.appspot.com",
       messagingSenderId: "758538121658",
       appId: "1:758538121658:web:7eb332b04d186abf"});
 
    var messageAppReference = firebase.database();
    var messageAppAuth = firebase.auth();
   var firebaseCurrentUser = {};

   var storageRef = firebase.storage().ref();



  // ...
  $('#Registerbtn').on('click', function (event) {
    event.preventDefault()
    var name = $('#name').val()
    var fname = $('#fname').val()
    var price = $('#price').val()
    var date = $('#date').val()
    var time = $('#time').val()
    var phone = $('#phone').val()
    var email = $('#email').val()
    var password = $('#password').val()
    var pic = $('#pic').val()
    var lat1 = $('#lat').val()
    var lng1 = $('#lng').val()


    var messagesReference = messageAppReference.ref('fahad');
 
    messagesReference.push({
      name: name,
     fname:fname,
     price:price,
     date:date,
     time:time,
     phone:phone,
    user: messageAppAuth.currentUser.uid,
    email: messageAppAuth.currentUser.email,
     password:password,
     pic:pic,
     lat:lat1,
     lng:lng1

    })
  }) 

  

  function getFanMessages() {    


    console.log(firebaseCurrentUser)

    var firebaseCurrentUser = {};
    console.log(firebaseCurrentUser)
    // console.log(firebaseCurrentUserId)

    messageAppReference.ref('fahad').on('value', (results) => {
    //   $messageBoardDiv.empty()
      // VAL() IS A FIREBASE METHOD
      let allMessages = results.val()
      console.log(allMessages);
      for (let msg in allMessages) {        
        console.log(allMessages[msg].pic)
        var pic = allMessages[msg].pic ;
        var price = allMessages[msg].price;
        var fname = allMessages[msg].fname;
        let newArticle = `
                    <div class="gallery">
  <a target="_blank" href="${pic}">
    <img src="${pic}" alt="Cinque Terre" width="1200" height="800">
  </a>
      <div class="distance"> 15KM -- 10min</div>
      <button id="delete">delete </button>
  <div class="desc"> ${fname}
	    	<div class="price">${price}</div>
	    	<div class="rate">
	    
        <div class="reservation"><a href =reservation.html >Book Now</a></div>
	    	</div>

  </div></div>
                    `;
        $(".container").append(newArticle);




       
        // var $deleteElement = document.getElementById('delete');

        // $deleteElement.on('click', (e) => {
        //   let id = e.target.parentNode.id
        //   let userId = e.target.parentNode.getAttribute('data-user')
          
        //   console.log(userId)
        //   console.log(messageAppAuth.currentUser.uid)
          
        //   if (userId === messageAppAuth.currentUser.uid) {
        //     messageAppReferenceref(`fahad/${id}`).remove()
        //       .then(() => { console.log("Remove succeeded.") })
        //       .catch(error => { console.log("Remove failed: " + error.message) });
        //   } else {
        //     alert(`Only ${userId} can delete that!!`)
        //   }
        // })


        // let $newMessage = $(`<div id=${msg} data-user=${allMessages[msg].user} data-votes=${allMessages[msg].votes}>${allMessages[msg].message}</li>`);
        // var $firebaseCurrentUser = $(`<div class="pull-right">${allMessages[msg].email}</div>`)
        // $newMessage.append(pic).append(price).append(fname).append($deleteElement).append($downVoteElement).append($firebaseCurrentUser)
        // $messageBoardDiv.append($newMessage);
      }
    })
  }  
   getFanMessages()
  //  function toggleSignIn() {
  //    if (messageAppAuth.currentUser) {
  //      firebaseCurrentUser = messageAppAuth.currentUser
  //      console.log(firebaseCurrentUser)
  //      // [START signout]
  //      messageAppAuth.signOut();
  //      // [END signout]
  //    } else {
  //      firebaseCurrentUser = "Not Logged In"
  //      var email = document.getElementById('email').value;
  //      var password = document.getElementById('password').value;
  //      if (email.length < 4) {
  //        alert('Please enter an email address.');
  //        return;
  //      }
  //      if (password.length < 4) {
  //        alert('Please enter a password.');
  //        return;
  //      }
  //      // Sign in with email and pass.
  //      // [START authwithemail]
  //      messageAppAuth.signInWithEmailAndPassword(email, password)
  //        .then(response => {
  //          console.log(response.user.uid)
  //        })
  //        .catch(function (error) {
  //          // Handle Errors here.
  //          var errorCode = error.code;
  //          var errorMessage = error.message;
  //          // [START_EXCLUDE]
  //          if (errorCode === 'auth/wrong-password') {
  //            alert('Wrong password.');
  //          } else {
  //            alert(errorMessage);
  //          }
  //          console.log(error);
  //          document.getElementById('quickstart-sign-in').disabled = false;
  //          // [END_EXCLUDE]
  //        });
  //      // [END authwithemail]
  //    }
  //    document.getElementById('quickstart-sign-in').disabled = true;
  //  }
  //   /**
  // * Handles the sign up button press.
  // */

  //  function handleSignUp() {
  //    var email = document.getElementById('email').value;
  //    var password = document.getElementById('password').value;
  //    if (email.length < 4) {
  //      alert('Please enter an email address.');
  //      return;
  //    }
  //    if (password.length < 4) {
  //      alert('Please enter a password.');
  //      return;
  //    }
  //    // Sign in with email and pass.
  //    // [START createwithemail]
  //    messageAppAuth.createUserWithEmailAndPassword(email, password).catch(function (error) {
  //      // Handle Errors here.
  //      var errorCode = error.code;
  //      var errorMessage = error.message;
  //      // [START_EXCLUDE]
  //      if (errorCode == 'auth/weak-password') {
  //        alert('The password is too weak.');
  //      } else {
  //        alert(errorMessage);
  //      }
  //      console.log(error);
  //      // [END_EXCLUDE]
  //    });
  //    // [END createwithemail]
  //  }
  //   /**
  // * Sends an email verification to the user.
  // */
  //  function sendEmailVerification() {
  //    // [START sendemailverification]
  //    messageAppAuth.currentUser.sendEmailVerification().then(function () {
  //      // Email Verification sent!
  //      // [START_EXCLUDE]
  //      alert('Email Verification Sent!');
  //      // [END_EXCLUDE]
  //    });
  //    // [END sendemailverification]
  //  }
  //  function sendPasswordReset() {
  //    var email = document.getElementById('email').value;
  //    // [START sendpasswordemail]
  //    messageAppAuth.sendPasswordResetEmail(email).then(function () {
  //      // Password Reset Email Sent!
  //      // [START_EXCLUDE]
  //      alert('Password Reset Email Sent!');
  //      // [END_EXCLUDE]
  //    }).catch(function (error) {
  //      // Handle Errors here.
  //      var errorCode = error.code;
  //      var errorMessage = error.message;
  //      // [START_EXCLUDE]
  //      if (errorCode == 'auth/invalid-email') {
  //        alert(errorMessage);
  //      } else if (errorCode == 'auth/user-not-found') {
  //        alert(errorMessage);
  //      }
  //      console.log(error);
  //      // [END_EXCLUDE]
  //    });
  //    // [END sendpasswordemail];
  //  }
  //  /**
  //   * initApp handles setting up UI event listeners and registering Firebase auth listeners:
  //   *  - messageAppAuth.onAuthStateChanged: This listener is called when the user is signed in or
  //   *    out, and that is where we update the UI.
  //   */
  //  function initApp() {
  //    // Listening for auth state changes.
  //    // [START authstatelistener]
  //    messageAppAuth.onAuthStateChanged(function (user) {
  //      // [START_EXCLUDE silent]
  //      document.getElementById('quickstart-verify-email').disabled = true;
  //      // [END_EXCLUDE]
  //      if (user) {
  //        // User is signed in.
  //        var displayName = user.displayName;
  //        var email = user.email;
  //        var emailVerified = user.emailVerified;
  //        var photoURL = user.photoURL;
  //        var isAnonymous = user.isAnonymous;
  //        var uid = user.uid;
  //        var providerData = user.providerData;
  //        // [START_EXCLUDE]
  //        document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
  //        document.getElementById('quickstart-sign-in').textContent = 'Sign out';
  //        document.getElementById('quickstart-account-details').textContent = JSON.stringify({ uid: user.uid, email: user.email }, null, '  ');
  //        if (!emailVerified) {
  //          document.getElementById('quickstart-verify-email').disabled = false;
  //        }
  //        // [END_EXCLUDE]
  //      } else {
  //        // User is signed out.
  //        // [START_EXCLUDE]
  //        document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
  //        document.getElementById('quickstart-sign-in').textContent = 'Sign in';
  //        document.getElementById('quickstart-account-details').textContent = 'null';
  //        // [END_EXCLUDE]
  //      }
  //      // [START_EXCLUDE silent]
  //      document.getElementById('quickstart-sign-in').disabled = false;
  //      // [END_EXCLUDE]
  //    });
  //    // [END authstatelistener]
  //    document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
  //    document.getElementById('quickstart-sign-up').addEventListener('click', handleSignUp, false);
  //    document.getElementById('quickstart-verify-email').addEventListener('click', sendEmailVerification, false);
  //    document.getElementById('quickstart-password-reset').addEventListener('click', sendPasswordReset, false);

  //  }
  //  initApp();
 
})