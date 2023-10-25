const favListDivRef = document.getElementById('list')
const favList = JSON.parse(localStorage.getItem('fav'))
const homeBtn = document.getElementById('home')

// Redirecting to Home Page
homeBtn.onclick = () => {
    window.location.href = './index.html'
}

// While Fetching data displaying Loading Message
favListDivRef.innerHTML = '<h1>Loading.....</h1>'

const init = async () => {
    let favListHtml = '';
    // Looping Every Favourites
    for (let id of favList) {
        const res = await fetch(`https://gateway.marvel.com:443/v1/public/characters/${id}?ts=0&apikey=2f4a049d7e302a9993962a89b95b28fe&hash=64ef51991e88c83111f824e3b6106a13`)
        const jsonData = await res.json() // Favourites List JSON data 
        const superHeroData = jsonData.data.results[0]
        const favImgUrl = superHeroData?.thumbnail?.path + '.' + superHeroData?.thumbnail?.extension // Image Url
        favListHtml += `<div class='card'><div class='left-div'><img src = ${favImgUrl}></div><div class='right-div'>${superHeroData?.name}<button class='fav' onclick='unfav(${id})'>Remove from Favourites</button></div></div>`
    }
    favListDivRef.innerHTML = favList.length ? favListHtml : '<h1>Favourites are not Added yet !</h1>'
}

// unfavourites event handler 
unfav = (id) => {
    favList.splice(favList.indexOf(id), 1) // Removing From Favourtie List
    localStorage.setItem('fav', JSON.stringify(favList)) // Updating Local Storage Favourtie List
    init();
}

init()
