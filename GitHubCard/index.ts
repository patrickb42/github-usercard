import axios from 'axios';

(() => {
  const mainUsername = 'patrickb42';
  const cards = document.querySelector('.cards');
  let followersArray = [];

  interface CreateCardArg {
    userData;
  }
  function createCard({ userData }: CreateCardArg): HTMLDivElement {
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
    img.src = userData.avatar_url;

    cardElement.classList.add('card');

    cardElement.appendChild(cardInfo);
    cardInfo.classList.add('card-info');

    cardInfo.appendChild(name);
    name.classList.add('name');
    name.textContent = userData.name;

    cardInfo.appendChild(username);
    username.classList.add('username');
    username.textContent = userData.login;

    cardInfo.appendChild(location);
    location.textContent = `Location: ${userData.location}`;

    cardInfo.appendChild(profile);
    profile.textContent = 'Profile:\n';

    profile.appendChild(address);
    address.href = userData.html_url;
    address.textContent = userData.html_url;

    cardInfo.appendChild(followers);
    followers.textContent = `Followers: ${userData.followers}`;

    cardInfo.appendChild(following);
    following.textContent = `Following: ${userData.following}`;

    cardInfo.appendChild(bio);
    bio.textContent = `Bio: ${userData.bio}`;

    return cardElement;
  }

  axios.get(`https://api.github.com/users/${mainUsername}`)
    .then((mainUser) => {
      cards.appendChild(createCard({ userData: mainUser.data }));
    })
    .then(() => {
      axios.get(`https://api.github.com/users/${mainUsername}/followers`)
        .then((followers) => {
          followersArray = followers.data;
          followersArray.forEach((follower) => {
            axios.get(`https://api.github.com/users/${follower.login}`)
              .then((followerFullResponse) => {
                cards.appendChild(createCard({ userData: followerFullResponse.data }));
              })
              .catch();
          });
        })
        .catch();
    })
    .catch();
})();
