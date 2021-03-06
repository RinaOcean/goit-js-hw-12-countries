import countryCardTmpl from './templates/country-card.hbs';
import countryListingTmpl from './templates/country-item.hbs';

const debounce = require('lodash.debounce');
import './styles.css';

const refs = {
  searchForm: document.querySelector('.search-js'),
  countriesWrapper: document.querySelector('.countries-container-js'),
};

refs.searchForm.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
  const searchQuery = e.target.value;
  const url = `https://restcountries.eu/rest/v2/name/${searchQuery}`;

  fetch(url)
    .then(response => response.json())
    .then(countries => {
      if (countries.length === 1) {
        const markupCard = countryCardTmpl(countries);
        refs.countriesWrapper.innerHTML = markupCard;
      }
      if (countries.length > 1 && countries.length < 11) {
        const markupList = countryListingTmpl(countries);
        refs.countriesWrapper.innerHTML = markupList;
      }
    })
    .catch(error => {
      console.log(error);
    });
}

function fetchCountries(searchQuery) {}
