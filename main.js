#here is jQuery
const BASE_URL = `http://localhost:3000`
function login(event){
  event.preventDefault();
  let email = $('#login-email').val()
  let password = $('#login-password').val()

// $(document).ready(function() {
//   checkAuth()
// })

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
    console.log()
    // $('#login-email').val('')
    // $('#login-password').val('')
    // checkAuth()
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
// next on restoran fav list. cari di backend cara fetch nya
// next edit form. then it's done

}
