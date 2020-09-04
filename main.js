const BASE_URL = `http://localhost:3000`
$(document).ready(function(){
  checkAuth()
})
function login(event){
  event.preventDefault();
  let email = $('#login-email').val()
  let password = $('#login-password').val()

// $(document).ready(function() {
//   checkAuth()
// })
  $.ajax(`http://localhost:3000/user/login`,{
    method: 'Post',
    data:{
      email,
      password
    }
  })
  .done(response =>{
    console.log(response)
    localStorage.setItem('token',response.token)
    console.log('Login')
    showHome()
    // $('#login-email').val('')
    // $('#login-password').val('')
    // checkAuth()
  })
  .fail(err =>{
    console.log(err)
  })
  .always(_ =>{
    console.log('done')
  })
}

function showHome(){
  fetchRestoran()
  $('#search-sec').hide()
  $('#navbar-sec').show()
  $('#footer-sec').show()
  $('#Restoran').show()
  $('#Fav_List').hide()
  $('#login').hide()
}

function Fav_List(){
  $('#search-sec').
  $('#navbar-sec').show()
  $('#footer-sec').show()
  $('#Restoran').hide()
  $('#Fav_List').show()
  $('#login').hide()
  fetchFav()
}
function checkAuth(){
  if(localStorage.token){
    showHome()
    $('#login').hide()
    showHome()
  }
  else{
    $('#search-sec').hide()
    $('#navbar-sec').hide()
    $('#footer-sec').hide()
    $('#Restoran').hide()
    $('#Fav_List').hide()
    $('#login').show()
  }
}


function fetchRestoran(){
  $.ajax(`${BASE_URL}/restoran`,{
    method:'GET',
    headers:{
      token: localStorage.token
    }
  }).done(response =>{
    $('#table-restoran-all').empty()
    $('#table-restoran-all').append(`<tr>
      <th>Name</th>
      <th>Address</th>
      <th>Rate</th>
    </tr>`)
    response.forEach((restoran) => {
      let template = `<tr>
          <th>${restoran.name}</th>
          <th>${restoran.address}</th>
          <th>${restoran.rate}</th>
          <th><button type="button" class="btn btn-warning">&nbsp; Add To Fav &nbsp;</button> || <button onclic k="deleteRestoran(${restoran.id})" id="delete" class="btn btn-danger">Delete</button></th>
      </tr>`
      $('#table-restoran-all').append(template)
    });

    console.log(response)
  })
  .fail(err =>{
    console.log(err)
  })
  .always(_ =>{
    console.log('done')
  })
}

function fetchFav(){
  $.ajax(`${BASE_URL}/fav_res`,{
    method:'GET',
    headers:{
      token: localStorage.token
    }
  }).done(response =>{
    $('#fav-list').empty()
    $('#fav-list').append(`<tr>
      <th>Restoran Name</th>
      <th>Restoran Rate</th>
      <th>User</th>
    </tr>`)
    response.forEach((favorite) => {
      favorite.Restoran.forEach((restoran) => {
        restoran.User.forEach((element) =>{
          let template = `<tr>
              <th>${restoran.name}</th>
              <th>${restoran.rate}</th>
              <th>${element.name}</th>
              <th><button type="button" class="btn btn-warning">&nbsp; Edit &nbsp;</button> || <button onclick="deleteTodos(${restoran.id})" id="delete" class="btn btn-danger">Delete</button></th>
          </tr>`
          $('#table-restoran-all').append(template)
        })
      });
    });

    console.log(response)
  })
  .fail(err =>{
    console.log(err)
  })
  .always(_ =>{
    console.log('done')
  })
}

  // function signOut() {
  //   var auth2 = gapi.auth2.getAuthInstance();
  //   auth2.signOut().then(function () {
  //     console.log('User signed out.');
  //     window.location.href = "index.html";
  //   })
  //   .catch(function(err){
  //     console.log(err)
  //   })
  // }
function searchAdd(){
  $('#search-sec').show()
  $('#navbar-sec').show()
  $('#footer-sec').show()
  $('#Restoran').hide()
  $('#Fav_List').hide()
  $('#login').hide()
}
function onSignIn(googleUser) {
  // Useful data for your client-side scripts:
  let profile = googleUser.getBasicProfile();
  console.log("ID: " + profile.getId()); // Don't send this directly to your server!
  console.log('Full Name: ' + profile.getName());
  console.log('Given Name: ' + profile.getGivenName());
  console.log('Family Name: ' + profile.getFamilyName());
  console.log("Image URL: " + profile.getImageUrl());
  console.log("Email: " + profile.getEmail());

  // The ID token you need to pass to your backend:
  let id_token = googleUser.getAuthResponse().id_token;
  console.log("ID Token: " + id_token);
  $.ajax({
  method: 'POST',
  url: `http://localhost:3000/user/tokensignin`,    //ini url backend kita, nanti gw bikin endpoint tokensignin
  data: { id_token: id_token }
  })
  .done((response)=>{
    localStorage.setItem('token',response.token)
    window.location.href = "dashboard.html";
  })
  .fail((jqXHR, textStatus)=>{
    console.log(textStatus)
  })
}
// next on restoran fav list. cari di backend cara fetch nya
// next edit form. then it's done
