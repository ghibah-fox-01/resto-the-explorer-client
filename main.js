#here is jQuery

function login(event){
  event.preventDefault();
  let email = $('#login-email').val()
  let password = $('#login-password').val()

$(document).ready(function() {
  checkAuth()
})

  $.ajax(`${baseUrl}/user/login`,{
    method: 'Post',
    data:{
      email,
      password
    }
  })
  .done(response =>{
    console.log(response)
    localStorage.setItem('token',response.access_token)
    $('#login-email').val('')
    $('#login-password').val('')
    checkAuth()
  })
  .fail(err =>{
    console.log(err)
  })
  .always(_ =>{
    console.log('done ')
  })
}

function checkAuth(){
  if(localStorage.token){
  window.location.href = "dashboard.html";
    fetchRestoran()
  }
  else{
    window.location.href = "index.html";
  }
}

function fetchRestoran(){
  $.ajax(`${baseUrl}/restoran`,{
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
          <th><button onclick="deleteTodos(${restoran.id})" id="delete">Delete</button></th>
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
  $.ajax(`${baseUrl}/fav_res`,{
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
    response.forEach((restoran) => {
      let template = `<tr>
          <th>${restoran.name}</th>
          <th>${restoran.address}</th>
          <th>${restoran.rate}</th>
          <th><button onclick="deleteTodos(${restoran.id})" id="delete">Delete</button></th>
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
  url: 'http://localhost:58155/tokensignin',    //ini url backend kita, nanti gw bikin endpoint tokensignin
  data: { id_token: id_token }
  })
  .done((response)=>{

  })
  .fail((jqXHR, textStatus)=>{

  })
}
