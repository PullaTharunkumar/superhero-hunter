const searchBar = document.getElementById('search-bar')
const submitBtn = document.getElementById('submit')
const favouritesBtn = document.getElementById('favourites-btn')

// Taking Favourite List from Loal storage
const favList = JSON.parse(localStorage.getItem('fav'))

// Opening Favourites Page 
favouritesBtn.onclick = () => {
    window.location.href = './favourites.html'
}

// Searching  superHeroes  
submitBtn?.addEventListener('click', async (e) => {
    const val = searchBar.value
    // with empty input given alert message showing
    if (!val.length) {
        alert('Invaid Data Entered !')
        return;
    }
    const uri = `https://gateway.marvel.com/v1/public/characters?ts=0&apikey=2f4a049d7e302a9993962a89b95b28fe&hash=64ef51991e88c83111f824e3b6106a13&nameStartsWith=${val}`
    const res = await fetch(uri) // Fetching data from marvel api
    const jsonData = await res.json()
    const container = document.getElementById('container')
    let superHeroes = ''
    //Looping response getting from marvel
    for (list of jsonData?.data?.results) {
        const imageUrl = list.thumbnail.path.substring(list.thumbnail.path.indexOf(":") + 1, list.thumbnail.path.length) + '.' + list.thumbnail.extension;
        const name = list.name
        const favBtnText = favList.length && favList?.includes(list.id) ? 'Remove from Favourites' : 'Add to Favourite'
        superHeroes += `<div class='card'><div class='left-div'><img src='https:${imageUrl}' onclick="details(${list.id})"></div><div class='right-div'><span class="name">${name}</span><button class="fav" id='fav${list.id}' onclick = 'favourites(${list.id})'>${favBtnText}</button></div></div>`
    }
    // For Superhero Page setting id in local Storage
    details = (id) => {
        localStorage.removeItem('id') // removing old Id
        localStorage.setItem('id', id) // updating new Id
        window.location.href = 'superhero.html' // redirecting to Superhero Page
    }

    // Adding and Removing in Favourites
    favourites = (id) => {
        const favBtnTxt = document.getElementById(`fav${id}`)
        if (favList.includes(id)) { //Removing From Favourites
            favList.splice(favList.indexOf(id), 1)
            favBtnTxt.innerHTML = 'Add to Favourites'
            localStorage.setItem('fav', JSON.stringify(favList))
        }
        else { //From Favourites
            favList.push(id)
            favBtnTxt.innerHTML = 'Remove from Favourites'
            localStorage.setItem('fav', JSON.stringify(favList))
        }
    }
    // Updating HTML
    container.innerHTML = jsonData?.data?.results?.length ? superHeroes : '<h1>Invalid Input</h1>'
})


