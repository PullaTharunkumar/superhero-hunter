const superheroDetails = document.getElementById('superheroDetails')
const homeBtn = document.getElementById('home-btn')

// Redirecting to Home Page
homeBtn.onclick = () => {
    window.location.href = './index.html'
}

// Fetching Super Hero Data from Marvel API 
const init = async () => {
    // getting Character ID from Local Storage
    const superheroId = localStorage.getItem('id')
    const res = await fetch(`https://gateway.marvel.com:443/v1/public/characters/${superheroId}?ts=0&apikey=2f4a049d7e302a9993962a89b95b28fe&hash=64ef51991e88c83111f824e3b6106a13`)
    const jsonData = await res.json() // character json data from marvel api
    const superHeroData = jsonData.data.results[0]
    const image = superHeroData.thumbnail.path + '.' + superHeroData.thumbnail.extension // Character Img URL
    const superheroHtmlName = `<h1 class='inline' id='superhero-name'>Character Name : ${superHeroData.name}<h1><div id='profile'><img src=${image} id='v'></div><button class='btn' onclick='comics()'>comics</button><button class='btn' onclick='events()'>events</button><button class='btn' onclick='series()'>series</button><button class='btn' onclick='stories()'>stories</button><div id='details'></div>`
    superheroDetails.innerHTML = superheroHtmlName
}

// Common function for comics, events, series, stories
const render = async (data) => {
    const details = document.getElementById('details')
    const superheroId = localStorage.getItem('id') // Taking character id from local storage
    const characterRes = await fetch(`https://gateway.marvel.com:443/v1/public/characters/${superheroId}?ts=0&apikey=2f4a049d7e302a9993962a89b95b28fe&hash=64ef51991e88c83111f824e3b6106a13`)
    const characteJsonData = await characterRes.json() //  character json data from marvel api
    const superHeroData = characteJsonData.data.results[0]
    const dataList = superHeroData[data]?.items
    let detailsHtml = 'Loading....'; // while Fetching displaying Loading Message
    details.innerHTML = detailsHtml
    detailsHtml = ''
    // Looping Superheroe data (comics, events, series, stories)
    for (let i of dataList) {
        const url = i.resourceURI + `?ts=0&apikey=2f4a049d7e302a9993962a89b95b28fe&hash=64ef51991e88c83111f824e3b6106a13` // url for fetchig data
        const res = await fetch(url)
        const jsonRes = await res.json(); // (comics, events, series, stories) character json data from marvel api
        const item = jsonRes?.data?.results[0]
        const itemImg = item?.thumbnail ? item?.thumbnail?.path + '.' + item?.thumbnail?.extension : 'https://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
        detailsHtml += `<div class = 'cart'><div class='left-div'><img src=${itemImg}></div><div class = 'right-div'>${item?.title}</div></div>`
    }
    details.innerHTML = dataList.length ? detailsHtml : '<div class = "right-div">Results Not Found !</div>'
}

// comics Event hander
const comics = async () => {
    render('comics') // Displaying comics
}

// events Event hander
const events = () => {
    render('events') // Displaying comics events
}

//series Event hander
const series = () => {
    render('series') // Displaying comics series
}
// stories Event hander
const stories = () => {
    render('stories') // Displaying comics stories
}

init()
