import {
  BASEURL,
  BASEIMGURL,
  APIKEY,
  TOKEN
} from "./js/api.js"
import ajax from "./js/request.js"

const card = elm => {
  const item = document.createElement('div')
  item.setAttribute('class', "item")
  item.innerHTML = `
  <p class="title">${elm.title}</p>
  <img src="${BASEIMGURL}${elm.backdrop_path}" alt="Poster: ${elm.title}" />
  <p class="release">${elm.release_date}</p>
  <p class="rating">${elm.vote_average}</p>
  `
  return document.getElementById('itemList').append(item)
}

const date = new Date()
const year = date.getFullYear()
document.getElementById('copy').innerHTML = `Copyright &copy; Bodrooo ${year}`
const movies = []

let page = 1

let apiUrl = `${BASEURL}/movie/popular?api_key=${APIKEY}&page=${page}`

ajax(apiUrl, (res) => {
  console.log(res);
  res.results.map(movie => {
    movies.push(movie)
  })
  movies.map(movie => {
    card(movie)
  })
})

const input = document.getElementById('search')
input.value

input.addEventListener("input", () => {
  movies.length = 0
  document.getElementById('itemList').innerHTML = ''
  if (input.value !== '') {
    ajax(`https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&language=en-US&query=${input.value}&page=${page}`, (res) => {
      console.log(res);
      res.results.map(movie => {
        movies.push(movie)
        card(movie)
      })
    })
  } else {
    let apiUrl = `${BASEURL}/movie/popular?api_key=${APIKEY}&page=${page}`
    ajax(apiUrl, (res) => {
      res.results.map(movie => {
        movies.push(movie)
        card(movie)
      })
    })
  }
})

document.getElementById('next').addEventListener('click', () => {
  page = page + 1
  movies.length = 0
  document.getElementById('itemList').innerHTML = ''
  let apiUrl = `${BASEURL}/movie/popular?api_key=${APIKEY}&page=${page}`
  ajax(apiUrl, (res) => {
    res.results.map(movie => {
      movies.push(movie)
      card(movie)
    })
  })
})

document.getElementById('previous').addEventListener('click', () => {
  if (page != 1) {
    page = page - 1
    movies.length = 0
    document.getElementById('itemList').innerHTML = ''
    let apiUrl = `${BASEURL}/movie/popular?api_key=${APIKEY}&page=${page}`
    ajax(apiUrl, (res) => {
      res.results.map(movie => {
        movies.push(movie)
        card(movie)
      })
    })
  }
})