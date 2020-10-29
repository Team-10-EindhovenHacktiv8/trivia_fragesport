function onSignIn(googleUser) {
    console.log('MASUK', googleUser)
    // var profile = googleUser.getBasicProfile();
    // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    // console.log('Name: ' + profile.getName());
    // console.log('Image URL: ' + profile.getImageUrl());
    // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    var google_access_token = googleUser.getAuthResponse().id_token;
    // localStorage.setItem('access_token', )
    $.ajax({
        method:'POST',
        url:'http://localhost:3000/googleLogin',
        data:{
            google_access_token
        }
    }) 
    .done(response => {
        console.log(response)
    })
    .failer(err => {
        console.log(err)
    })
}

  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }
