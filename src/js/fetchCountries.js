const BASE_URL = 'https://restcountries.eu/rest/v2';

function fetchCountries(searchQuery) {
  const url = `${BASE_URL}/name/${searchQuery}`;

  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      return Promise.reject('fetch have not worked: error' + response.status);
    })
    .catch(err => {
      console.warn(err);
    });
}

export default { fetchCountries };
