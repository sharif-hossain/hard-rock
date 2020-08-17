// catch up dom event item

const searchBtn = document.getElementById('btn-search');
const searchBox = document.getElementById('search-box');
const result = document.getElementById('result');
const apiURl = 'https://api.lyrics.ovh';

//search by song or artist

function searchSong(songName) {
    fetch(`${apiURl}/suggest/${songName}`)
        .then(res => res.json())
        .then(data => showData(data));

}

//show song,artist and dom

function showData(data) {
    // let output = '';

    result.innerHTML = `
    
    ${data.data.map(song => `<div class="single-result row align-items-center my-3 p-3">
    <div class="col-md-9">
        <h3 class="lyrics-name">${song.title}</h3>
        <p class="author lead">Artist: <span>${song.artist.name}</p>
        <p class="author lead"> Album: <span>${song.album.title}</span></p>
    </div>
    
    <div class="col-md-3 text-md-right text-center">
        <button class="btn btn-success" data-artist="${song.artist.name}" data-songTitle="${song.title}">Get Lyrics</button>
    </div>
    </div>`)
    .join('')
    }
        `;
    }

//get lyrics for song

async function getLyrics(artist,songTitle){
    const res = await fetch(`${apiURl}/v1/${artist}/${songTitle}`);
    const data = await res.json();
    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
    result.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2> <span>${lyrics}</span>`;
}

//Event Listener

searchBtn.addEventListener('click', e => {
    e.preventDefault();
    const searchValue = searchBox.value.trim();

    if (!searchValue) {
        alert('please type in search box')
    } else {
        searchSong(searchValue);
    }

});

result.addEventListener('click', e =>{
    e.preventDefault();
    const clickItem = e.target;

    if(clickItem.tagName === 'BUTTON'){
        const artist = clickItem.getAttribute('data-artist');
        const songTitle = clickItem.getAttribute('data-songTitle');

        getLyrics(artist, songTitle);
    }
});