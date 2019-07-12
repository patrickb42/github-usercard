// import axios from 'axios';
(function () {
    var mainUsername = 'patrickb42';
    var cards = document.querySelector('.cards');
    var followersArray = [];
    function createCard(_a) {
        var userData = _a.userData;
        var cardElement = document.createElement('div');
        var img = document.createElement('img');
        var cardInfo = document.createElement('div');
        var name = document.createElement('h3');
        var username = document.createElement('p');
        var location = document.createElement('p');
        var profile = document.createElement('p');
        var address = document.createElement('a');
        var followers = document.createElement('p');
        var following = document.createElement('p');
        var bio = document.createElement('p');
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
        location.textContent = "Location: " + userData.location;
        cardInfo.appendChild(profile);
        profile.textContent = 'Profile:\n';
        profile.appendChild(address);
        address.href = userData.html_url;
        address.textContent = userData.html_url;
        cardInfo.appendChild(followers);
        followers.textContent = "Followers: " + userData.followers;
        cardInfo.appendChild(following);
        following.textContent = "Following: " + userData.following;
        cardInfo.appendChild(bio);
        bio.textContent = "Bio: " + userData.bio;
        return cardElement;
    }
    axios.get("https://api.github.com/users/" + mainUsername)
        .then(function (mainUser) {
        cards.appendChild(createCard({ userData: mainUser.data }));
    })
        .then(function () {
        return axios.get("https://api.github.com/users/" + mainUsername + "/followers");
    })
        .then(function (followers) {
        followersArray = followers.data;
        followersArray.forEach(function (follower) {
            axios.get("https://api.github.com/users/" + follower.login)
                .then(function (followerFullResponse) {
                cards.appendChild(createCard({ userData: followerFullResponse.data }));
            })["catch"]();
        });
    })["catch"]();
})();
