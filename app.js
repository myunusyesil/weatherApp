let url = "https://api.openweathermap.org/data/2.5/weather?q=";
let apiKey = "e4e8d4f2c269e28d9ed03d94dd12cb9e";

let city = '';
let fetchUrl = '';

const container = document.querySelector('.content-container');
const input = document.querySelector('#search-area');
const searchBtn = document.querySelector('.search-btn');


searchBtn.addEventListener('click', function (e) {
    e.preventDefault();
    city = input.value;
    // console.log(city);
    let fetchUrl = `${url}+${city}&appid=${apiKey}&units=metric&lang=tr`;
    
    fetch(fetchUrl).then((response) => {
        return response.json();}).then(  
            (data => {
            let city = data.name;
            let temp = data.main.temp;
            let desc = data.weather[0].description;
            let max = data.main.temp_max;
            let min = data.main.temp_min;
            
            const el = document.createElement('div');
            el.classList.add('content');
    
            el.innerHTML = `
            <h3 class="city-name">${city}</h3>
            <p class="temp">${temp} °C</p>
            <p class="desc">${desc}</p>
            <p class="min-max">Min ${min} °C / Max ${max} °C</p>
            <button class="clear-btn"><i class="bi bi-x p-1"></i>Clear</button>
            `
            container.appendChild(el);
           

            const clearBtns = document.querySelectorAll('.clear-btn');
            // console.log(clearBtns)
            clearBtns.forEach(element => {
                element.addEventListener('click', function (e) {
                    let thisCard = e.currentTarget.parentElement;
                    thisCard.remove();
                })
            });
         
        })).catch((err) => {
            console.log("bla bla bla")
            showDanger();
        })
        input.value = "";
     
           
});

    const clearAll = document.querySelector('.clear-all');
    clearAll.addEventListener('click', (e)=> {
    e.preventDefault();
    container.innerHTML = '';
})


function showDanger () {
    const text = document.querySelector('.danger-text');
    text.classList.add('show-text');
    setTimeout(function(){
    text.classList.remove('show-text'); 
    },2000)
}

