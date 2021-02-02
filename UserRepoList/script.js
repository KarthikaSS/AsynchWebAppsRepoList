'use strict';

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  console.log(responseJson);
  $('#results-list').empty();
  for (let i = 0; i < responseJson.value.length & i<maxResults ; i++){
    $('#results-list').append(
      `<li><p><a href="${responseJson.value[i].url}">${responseJson.value[i].title}</a></p>
      </li>`
    )};
  $('#results').removeClass('hidden');
};

function getRepos(username){
    const params = {
    username: username,
  };

  await octokit.request('GET /users/{username}/repos', {
  username: 'username'
  });

  console.log(username)

  fetch(url, options)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });

}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const user = $('#specific-user').val();
    getRepos(user);
  });
}

$(watchForm);