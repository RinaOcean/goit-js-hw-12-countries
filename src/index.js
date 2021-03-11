import debounce from 'lodash.debounce';

import './styles.css';

import API from './js/fetchCountries.js';
import getRefs from './js/get-refs.js';

import countryCardTmpl from './templates/country-card.hbs';
import countryListingTmpl from './templates/country-item.hbs';

import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { error, defaultModules } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';

defaultModules.set(PNotifyMobile, {});

const refs = getRefs();

refs.searchForm.addEventListener('input', debounce(onSearch, 500));
refs.closeButton.addEventListener('click', clearQuery);

function onSearch(e) {
  const searchQuery = e.target.value.trim();
  if (searchQuery === '') {
    refs.countriesWrapper.innerHTML = '';
    return;
  }

  API.fetchCountries(searchQuery).then(renderCountries).catch(onFetchError);
}

function renderCountries(countries) {
  if (countries.length === 1) {
    const markupCard = countryCardTmpl(countries);
    refs.countriesWrapper.innerHTML = markupCard;
  } else if (countries.length > 1 && countries.length < 11) {
    const markupList = countryListingTmpl(countries);
    refs.countriesWrapper.innerHTML = markupList;
  } else if (countries.length >= 11) {
    onRenderError();
  }
}

function onRenderError() {
  error({
    text: 'Please, type more specific query',
    hide: true,
    delay: 2000,
    sticker: false,
    mode: 'light',
    width: '100%',
    icons: 'brighttheme',
    closer: true,
    closerHover: false,
  });
}

function onFetchError() {
  error({
    text: 'ERROR! Check entered symbols!',
    hide: true,
    delay: 4000,
    sticker: false,
    mode: 'light',
    width: '100%',
    icons: 'brighttheme',
    closer: true,
    closerHover: false,
  });
}

function clearQuery() {
  refs.searchForm.value = '';
}
