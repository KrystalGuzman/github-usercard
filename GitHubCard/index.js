/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/krystalguzman
*/

function axiosGet(url){
  console.log("I am in axiosGet()."); 
  
  axios.get(url)
    .then(function (response) {
      // handle success
      console.log(response);
      // return response;
      document.querySelector(".cards").appendChild(createComponent(response)); 
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
      console.log("finally"); 
  });

}
/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/
var myUrl = 'https://api.github.com/users/krystalguzman';
axiosGet(myUrl);


/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = ["austinhuisinga", "JasonRHemann", "Steven-matos", "svyatokshin", "tdefriess"];

followersArray.forEach(function(element){
  axiosGet(formatURL(element)); 
});


function formatURL(user){
  return ("https://api.github.com/users/" + user); 
}
/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:


          
<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/
function createComponent(obj){
  console.log("I am in createComponent()."); 
  
  var outerDiv = document.createElement("div"); 
  outerDiv.classList.add("card"); 

  var image = document.createElement("img"); 
  image.setAttribute("src", obj.data.avatar_url);
  outerDiv.appendChild(image); 

  var innerDiv = document.createElement("div"); 
  innerDiv.classList.add("card-info"); 
  var h3 = document.createElement("h3"); 
  h3.classList.add("name"); 
  h3.textContent = obj.data.name; 
  innerDiv.appendChild(h3); 
  var userNameP = document.createElement("p"); 
  userNameP.classList.add("username"); 
  userNameP.textContent = obj.data.login;
  innerDiv.appendChild(userNameP); 
  var locationP = document.createElement("p"); 
  locationP.textContent = ("Location: " + obj.data.location);
  innerDiv.appendChild(locationP);  
  
  var a = document.createElement('a'); 
  var linkText = document.createTextNode(obj.data.html_url);
  a.appendChild(linkText); 
  a.href = obj.data.html_url; 
  innerDiv.appendChild(a); 
  var profileP = document.createElement('p'); 
  profileP.textContent = "Profile: ";
  profileP.appendChild(a); 
  innerDiv.appendChild(profileP); 

  var followersP = document.createElement('p'); 
  followersP.textContent = ("Followers: " + obj.data.followers);
  innerDiv.appendChild(followersP); 

  var followingP = document.createElement('p'); 
  followingP.textContent = ("Following: " + obj.data.following);
  innerDiv.appendChild(followingP); 

  var bioP = document.createElement('p'); 
  bioP.textContent = ("Bio: " + obj.data.bio); 
  innerDiv.appendChild(bioP); 
  

  outerDiv.appendChild(innerDiv); 

  console.log(outerDiv); 
  return outerDiv; 
}
/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/