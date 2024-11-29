$(function() {
  // your code here
  // buttons
  const butndec = $("header").children().first()
  const butninc = $("header").children().last()
  // counter
  let counter = 1
  loadInfo(counter)

  // changue the data with the buttons
  // function decrement
  butndec.on("click", function(){
    if(counter == 1){
      counter = 30
    }
    else{
      counter = counter - 1
    }
    loadInfo(counter)
  })
  // function increment
  butninc.on("click", function(){
    if(counter == 30){
      counter = 1
    }
    else{
      counter = counter + 1
    }
    loadInfo(counter)
    post(counter)
    todos(counter)
  })

let res
  // user information
  function loadInfo(num){
    $.ajax({
      url: `https://dummyjson.com/users/${num}`,
      type: 'GET',
      success: function(response){
        res = response
        post(num)
        personalInfo(num,res)
        todos(num)
      },
      error: function(err){
        console.error(err)
      }
    })
  }

  // load html
  function personalInfo(num,res){
    // Organice the information
        // clean the html iNFO content//
        $(".info__content").html("")
        // image
        $("img").attr("src",`${res.image}`)
        // name
        let name =$("<h2></h2>").text(`${res.firstName} ${res.lastName}`)
        // age
        let age = $("<p></p>").text(`Age: ${res.age}`)
        // email
        let email = $("<p></p>").text(`Email: ${res.email}`)
        // phone 
        let phone = $("<p></p>").text(`Phone: ${res.phone}`)
        // apend info
        $(".info__content").append(name, age, email, phone)
        // Post Content //
        $(".posts").find("h3").html("")
        $(".posts").find("h3").text(`${res.firstName}'s Post`)
        // Tod Person //
        $(".todos").find("h3").html("")
        $(".todos").find("h3").text(`${res.firstName}'s To Dos`)
  }

// get the post
function post(id){
  $.ajax({
    url: `https://dummyjson.com/users/${id}/posts`,
    type: 'GET',
    success: function(response){
      res = response.posts
      htmlpost(res)
    },
    error: function(err){
      console.error(err)
    }
  }) 
}

// generate the post
function htmlpost(res){
  $(".posts").find("ul").html("")
  if(res.length != 0){
    res.forEach(post => {
      // li
      let li = $("<li></li>")
      // post title
      let contentTitle = $(`<h4></h4>`).text(post.title)
      contentTitle.on("click", function(){
        getPostModal(post.id)
      })
      // post content 
      let textContent = $("<p></p>").text(post.body)
      //appen the post in the li
      li.append(contentTitle,textContent)
      // apendd in the html doc
      $(".posts").find("ul").append(li)
    });
  }
  else{
    let li = $("<li></li>")
      // post title
    let contentTitle = $("<p></p>").text("User has no post")
    li.append(contentTitle)
    $(".posts").find("ul").append(li)  
  }
}

// get the todos
function todos(id){
  $.ajax({
    url: `https://dummyjson.com/users/${id}/todos`,
    type: 'GET',
    success: function(response){
      res = response.todos
      htmlTodos(res)
    },
    error: function(err){
      console.error(err)
    }
  }) 
}

// generate todos in html
function htmlTodos(todos){
  $(".todos").find("ul").html("")
  if(todos.length != 0){
    // ul
    let ul = $(".todos").find("ul")
    // create todos
    todos.forEach(todo => {
      let todoHtml = $("<li></li>").text(todo.todo)
      ul.append(todoHtml)
    });
  }
  else{
    let ul = $(".todos").find("ul")
    let todoHtml = $("<li></li>").text("User has no todos")
      ul.append(todoHtml)
  }
}
// hide an show content
$(".posts").find("h3").on("click", function(){
  $(this).next().slideToggle()
})

$(".todos").find("h3").on("click", function(){
  $(this).next().slideToggle()
})

// modal get the post
function getPostModal(id){
  $.ajax({
    url: `https://dummyjson.com/posts/${id}`,
    type: 'GET',
    success: function(response){
      res = response
      generateModalHtml(res)
    },
    error: function(err){
      console.error(err)
    }
  }) 
}
// generate the modal
function generateModalHtml(post){
  // generate div to overlay
  let Modal = $('<div class="overlay"><div>')
  // div to contain the info
  let containerModal = $("<div class= 'modal'></div>")
  // title of the modal
  let titlemodal = $("<h3></h3>").text(post.title)
  // content of the modal
  let contentmodal = $("<p></p>").text(post.body)
  // views of the post
  let views = $("<p></p>").text(`Views: ${post.views}`)
  // button to close modal
  let closeModal = $("<button></button>").text("Close Modal")
  closeModal.on("click", function(){
    $(".overlay").remove()
  })
  // apend the content in the conatiner
  containerModal.append(titlemodal,contentmodal,views, closeModal)
  // apend the container in the overlay
  Modal.append(containerModal)
  // apend the modal in the html
  $("body").append(Modal)
}
})

