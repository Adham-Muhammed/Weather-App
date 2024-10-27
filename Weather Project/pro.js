const cityInput = document.querySelector('.city-input')
const weatherInfoSection = document.querySelector('.weather-info')
const searchBtn = document.querySelector('.search-btn')
const searchCitySection = document.querySelector('.search-city')
const notFoundSection = document.querySelector('.not-found')
const countryTxt= document.querySelector('.country-txt')
const tempTxt = document.querySelector('.temp-txt')
const conditionTxt = document.querySelector('.condition-txt')
const humidityValueTxt = document.querySelector('.humidity-value-txt')
const windValueTxt = document.querySelector('.wind-value-txt')
const weatherSummaryImg = document.querySelector('.weather-summary-img')
const currentDataTxt = document.querySelector('.current-data-txt')

const apiKey = '290f9cd1effbafa9cfcef871e1d534c5'

searchBtn.addEventListener('click' , () => {
  if (cityInput.value.trim()!= '') {
    updateWeatherInfo(cityInput.value)
    cityInput.value=''
    cityInput.blur()
  }
})
cityInput.addEventListener('keydown' , (event) => {
  if(event.key == 'Enter' && cityInput.value.trim()!= '') {
    updateWeatherInfo(cityInput.value)
    cityInput.value=''
    cityInput.blur()
  }
})
async function getFetchData(endPoint , city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${'290f9cd1effbafa9cfcef871e1d534c5'}&units=metric`

  const response = await fetch(apiUrl)
  return response.json()
}

function getWeatherIcon(id) {
  if(id <= 232) return 'thunderstorm.svg'
  if(id <= 321) return 'drizzle.svg'
  if(id <= 531) return 'rain.svg'
  if(id <= 622) return 'snow.svg'
  if(id <= 781) return 'atmosphere.svg'
  if(id <= 800) return 'clear.svg'
  else return 'clouds.svg'  
}

function getCurrenDate() {
  const currenDate = new Date()
  const options = {
    weekend: 'short',
    day: '2-digit',
    month: 'short',
  }
  return currenDate.toLocaleDateString('en-GB', options)
}

async function updateWeatherInfo(city) {
  const weatherData = await getFetchData('weather' , city)
  if (weatherData.cod !=200) {
    showDisplaySleiction(notFoundSection)
    return
  }

  const{
    name: country,
    main:{temp , humidity},
    weather:[{id , main}],
    wind: {speed}
  }= weatherData

  countryTxt.textContent = country;
  tempTxt.textContent = Math.round(temp )+ '°C';
  conditionTxt.textContent = main;
  humidityValueTxt.textContent = humidity +  '%';
  windValueTxt.textContent = speed +'M/s';
  weatherSummaryImg.src = `assets/assets/weather/${getWeatherIcon(id)}`;
  currentDataTxt.textContent = getCurrenDate(city);
  await updateForecstsInfo(city);
  showDisplaySleiction(weatherInfoSection);
};
async function updateForecstsInfo(city){
  const forecstsData = await getFetchData('forecast' , city )
  console.log(forecstsData)
}
function showDisplaySleiction(section) {
  [weatherInfoSection ,searchCitySection ,notFoundSection]
  .forEach(section => section.style.display='none')
  section.style.display='flex'
}