const api = {
    endpoint: "https://api.openweathermap.org/data/2.5/",
    key: "fdb7ebe945722163e6f4d23e9a448882"
}

const input = document.querySelector("#input");
input.addEventListener("keydown", enter);

function enter(e) {
    if (e.keyCode === 13) {
      getInfo(input.value);
    }
  }

async function getInfo (data) {
  const res = await fetch(`${api.endpoint}weather?q=${data}&units=metric&appID=${api.key}`);
  
  const result = await res.json();
  
  showResult(result);
}

function showResult(result) {
    let city = document.querySelector('#city');
    city.textContent = `${result.name}, ${result.sys.country}`;

    getMyDate();

    let temp = document.querySelector('#temp');
    temp.innerHTML = `${Math.round(result.main.temp) }<span>°</span>`;

    let feelsLike = document.querySelector('#feels-like');
    feelsLike.innerHTML = 'Feels like: '+ `${Math.round(result.main.feels_like)}<span>°</span>`;

    let conditions = document.querySelector('#conditions');
    conditions.textContent = `${result.weather[0].description}`;

    let variation = document.querySelector('#variation');
    variation.innerHTML = "Min: " + `${Math.round(result.main.temp_min)}<span>°</span>`+ ' Max: ' +
    `${Math.round(result.main.temp_max)}<span>°</span>`
}

function getMyDate() {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    const now = new Date();
    const date = document.querySelector('#date');
    date.innerHTML = `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`
}