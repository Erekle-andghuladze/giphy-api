const apiKey = 'bpHGwR19nADNvbNZ3ZdtQrRRTFLcuTu0';
let recentSearches = [];

const getTrendingResults = () => {
    clearResults();
    fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}`)
    .then(response => response.json())
    .then(json => {
        json.data
        .map(gif => gif.images.fixed_height.url)
        .forEach(url => {
            let img = document.createElement('img')
            img.src = url
            document.getElementById("gifs").appendChild(img)
        })
    })
    .catch(error => document.body.appendChild = error)
}

const getSearchResults = searchKeyWord => {
    clearResults();
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchKeyWord}`)    
    .then(response => response.json())
    .then(json => {
        json.data
        .map(gif => gif.images.fixed_height.url)
        .forEach(url => {
            let img = document.createElement('img')
            img.src = url
            document.getElementById("gifs").appendChild(img)
        })
    })
    .catch(error => document.body.appendChild = error)
}

const clearResults = () => {
    let gifs = document.getElementById("gifs");
    gifs.innerHTML = ""
}

const search = () => {
    let searchSubmit = document.getElementById("submit");
    searchSubmit.addEventListener("click", () => {
        let searchBarValue = document.getElementById("user-search").value;
        getSearchResults(searchBarValue);
    });
}

const trending = () => {
    let trendingButton = document.getElementById("trending");
    trendingButton.addEventListener("click", () => {
        getTrendingResults();
    });
}


search();
trending();

