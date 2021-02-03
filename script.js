const showModal = (country) =>{
    console.log(country);
     document.getElementById("modal").classList.add('show-modal');
     document.getElementById("country-title").innerHTML ="Pais: "+ country.name;
     document.getElementById("region-content").innerHTML ="Continente: "+ country.region; 
}

const closeModal = () =>{
    document.getElementById("modal").classList.remove('show-modal');
}

const url = 'https://restcountries.eu/rest/v2/lang/es';

const createListCountries = (country) => {
    const names = country
      .map((country,index ) => 
      `<li class="li-country">
      <ul class="country-number">
      <span>
      ${index+1}
      </span>
      </ul>
      <ul class="country-description">
      <li>
      <h3>
      <a href="#" onClick="showModal({'name':'${country.name}','region':'${country.region}'})">
      Pais:${country.name}
      </h3>
      </a>
      </li>
      <li>
      <p>
      Capital:${country.capital}
      </p>
      </li>
      <li>
      <p>
      Poblacion:${country.population}
      </p>
      </li>
      </ul>
      </li>`)
      .join("\n");
  return `<ul class="ul-countries">${names}</ul>`;
  };

async function listCountries() {
  const countryData = await getCountryData(url).catch(catchError);
  const twelveCountries = countryData.slice(0, 12);
  const main = document.getElementById("list-countries");
  main.innerHTML = createListCountries(twelveCountries);
}

function catchError(err) {
  console.log('Error ', err);
}

async function getCountryData(_url) {
  const response = await fetch(_url);
  return await response.json();
}
listCountries();