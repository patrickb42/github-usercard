(() => {
  const mainUsername = 'patrickb42';
  const cards = document.querySelector('.cards');
  let followersArray = [];

  axios.get(`https://api.github.com/users/${mainUsername}`)
    .then((mainUser) => {
      console.log('raw data', mainUser.data);
      cards.appendChild(createCard({ userData: mainUser.data }));
    })
    .then(() => {
      axios.get(`https://api.github.com/users/${mainUsername}/followers`)
        .then((followers) => {
          console.log('followers', followers.data);
          followersArray = followers.data;
          followersArray.forEach((follower) => {
            axios.get(`https://api.github.com/users/${follower.login}`)
              .then((followerFullResponse) => {
                cards.appendChild(createCard({ userData: followerFullResponse.data }));
              })
              .catch((err) => {
                console.log(err);
              });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });

  /* Step 4: Pass the data received from Github into your function,
            create a new component and add it to the DOM as a child of .cards
  */

  /* Step 5: Now that you have your own card getting added to the DOM, either
            follow this link in your browser https://api.github.com/users/<Your github name>/followers
            , manually find some other users' github handles, or use the list found
            at the bottom of the page. Get at least 5 different Github usernames and add them as
            Individual strings to the friendsArray below.

            Using that array, iterate over it, requesting data for each user,
            creating a new card for each user, and adding that card to the DOM.
  */

  /* Step 3: Create a function that accepts a single object as its only argument,
            Using DOM methods and properties,
            create a component that will return the following DOM element:

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
  function createCard({ userData }) {
    const cardElement = document.createElement('div');
    const img = document.createElement('img');
    const cardInfo = document.createElement('div');
    const name = document.createElement('h3');
    const username = document.createElement('p');
    const location = document.createElement('p');
    const profile = document.createElement('p');
    const address = document.createElement('a');
    const followers = document.createElement('p');
    const following = document.createElement('p');
    const bio = document.createElement('p');

    cardElement.appendChild(img);
    cardElement.appendChild(cardInfo);
    cardInfo.appendChild(name);
    cardInfo.appendChild(username);
    cardInfo.appendChild(location);
    cardInfo.appendChild(profile);
    profile.appendChild(address);
    cardInfo.appendChild(followers);
    cardInfo.appendChild(following);
    cardInfo.appendChild(bio);

    cardElement.classList.add('card');

    cardInfo.classList.add('card-info');

    name.classList.add('name');
    // name.textContent = ;

    username.classList.add('username');
    username.textContent = userData.login;

    // location.textContent = ;

    // profile.textContent = ;

    // address.href = ;
    // address.textContent = ;

    // followers.textContent = ;

    // following.textContent = ;

    // bio.textContent = ;

    return cardElement;
  }

/* List of LS Instructors Github username's:
  kennaalastair
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
  */
})();
