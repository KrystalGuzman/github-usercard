const entry = document.querySelector('.cards');

axios.get('https://api.github.com/users/krystalguzman')
.then(response => {
  console.log(response);
  entry.append(newCard(response));  
})
.catch( error => {
  console.log('The data was not returned', error);
})
/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 
   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

let followersArray = [];

axios.get('https://api.github.com/users/krystalguzman/followers')
.then(response => {
  console.log(response);
  let follows = [];
  response.data.forEach(el => {
    follows.push(el.login);    
    return follows;
  })
  followersArray = follows;
  console.log(followersArray);
  followersArray.forEach(el => {
    axios.get(`https://api.github.com/users/${el}`)
    .then(response => {
      console.log(response);
      entry.append(newCard(response));
    })
    .catch( error => {
      console.log('The data was not returned', error);
    })
  })
  return followersArray;
})
.catch( error => {
  console.log('The data was not returned', error);
})

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

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/

function newCard(gitObject){
  const card = document.createElement('div'),
    userIMG = document.createElement('img'),
    cardInfo = document.createElement('div'),
    realName =document.createElement('h3'),
    userName = document.createElement('p'),
    location = document.createElement('p'),
    profile = document.createElement('p'),
    link = document.createElement('a'),
    followers = document.createElement('p'),
    following = document.createElement('p'),
    bio = document.createElement('p'),
    calendar = document.createElement('div'),
    button = document.createElement('button');

  card.classList.add('card');
  cardInfo.classList.add('card-info');
  realName.classList.add('name');
  userName.classList.add('username');
  calendar.classList.add('calendar', 'dis-none');
  button.classList.add('closed');

  userIMG.src = gitObject.data.avatar_url;
  realName.textContent = gitObject.data.name;
  userName.textContent = gitObject.data.login;
  location.textContent = `Location: ${gitObject.data.location}`;
  profile.textContent = 'Profile: ';
  link.textContent = gitObject.data.html_url;
  link.href = gitObject.data.html_url;
  followers.textContent = `Followers: ${gitObject.data.followers}`;
  following.textContent = `Following: ${gitObject.data.following}`;
  bio.textContent = gitObject.data.bio;
  button.textContent = 'Expand';

  card.append(userIMG);
  card.append(cardInfo);
  cardInfo.append(realName);
  cardInfo.append(userName);
  cardInfo.append(location);
  profile.append(link);
  cardInfo.append(profile);
  cardInfo.append(followers);
  cardInfo.append(following);
  cardInfo.append(bio);
  cardInfo.append(calendar);
  cardInfo.append(button);
  
  button.style.margin = '10px 0 0 0';

  button.addEventListener('click', (e) => {
    calendar.classList.toggle('dis-none');
    GitHubCalendar(calendar, userName.textContent, {responsive: true});    
  })  

  return card;
}

// }
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

const cards = document.querySelector('.cards');

function createComponent(gitObject){
  console.log("I am in createComponent()."); 
  
  var outerDiv = document.createElement("div"); 
  outerDiv.classList.add("card"); 

  var image = document.createElement("img"); 
  image.setAttribute("src", gitObject.data.avatar_url);
  outerDiv.appendChild(image); 

  var innerDiv = document.createElement("div"); 
  innerDiv.classList.add("card-info"); 
  var h3 = document.createElement("h3"); 
  h3.classList.add("name"); 
  h3.textContent = gitObject.data.name; 
  innerDiv.appendChild(h3); 
  var userNameP = document.createElement("p"); 
  userNameP.classList.add("username"); 
  userNameP.textContent = gitObject.data.login;
  innerDiv.appendChild(userNameP); 
  var locationP = document.createElement("p"); 
  locationP.textContent = ("Location: " + gitObject.data.location);
  innerDiv.appendChild(locationP);  
  
  var a = document.createElement('a'); 
  var linkText = document.createTextNode(gitObject.data.html_url);
  a.appendChild(linkText); 
  a.href = gitObject.data.html_url; 
  innerDiv.appendChild(a); 
  var profileP = document.createElement('p'); 
  profileP.textContent = "Profile: ";
  profileP.appendChild(a); 
  innerDiv.appendChild(profileP); 

  var followersP = document.createElement('p'); 
  followersP.textContent = ("Followers: " + gitObject.data.followers);
  innerDiv.appendChild(followersP); 

  var followingP = document.createElement('p'); 
  followingP.textContent = ("Following: " + gitObject.data.following);
  innerDiv.appendChild(followingP); 

  var bioP = document.createElement('p'); 
  bioP.textContent = (gitObject.data.bio); 
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