//require('dotenv').config()

//const api_key = process.env.API_KEY;
const api_key = 'b406149c6199075e85b87fd43bc72122'
const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${api_key}&page=`
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query="`

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')
const buttons = document.querySelectorAll('.btn')

//Get initial movies
getMovies(API_URL)

async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()

    showMovies(data.results)
}

function showMovies(movies) {
    main.innerHTML = ''

    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie

        const movieElement = document.createElement('div')
        movieElement.classList.add('movie')

        movieElement.innerHTML = `     
                <img src="${IMG_PATH + poster_path}" alt="${title}"/>
                <div class="movie-info">
                    <h3>${title}</h3>
                    <span class="${getClassByRate(vote_average)}">${vote_average}</span>
                </div>
                <div class="overview">
                    <h3>Overview</h3>
                    ${overview}
                </div>
            `

        main.appendChild(movieElement)
    })
}

buttons.forEach((button, idx) => {
    button.addEventListener('click', () => highlightButtons(idx))
})

function getClassByRate(vote) {
    if (vote >= 8) {
        return 'green'
    } else if (vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}

function highlightButtons(idx) {
    const page = ((idx) + 1)

    if (page >= 2) {
        getMovies(API_URL + page)
    } else {
        window.location.reload()
    }

    buttons.forEach((button, idx2) => {
        if (idx2 == idx) {
            button.classList.add('full')
        } else {
            button.classList.remove('full')
        }
    })
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.value

    if (searchTerm && searchTerm !== "") {
        getMovies(SEARCH_API + searchTerm)

        search.value = ""
    } else {
        window.location.reload()
    }
})