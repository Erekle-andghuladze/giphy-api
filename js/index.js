const apiKey = 'Rx02GemP9C4kA4m2LAiqMIOsAMdigsKp';

const recentsLimit = 6;
let recentSearches = ["lotr", "sponge bob", "for honor", "total war", "assassin's creed"];

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

const searchListener = () => {
    let searchSubmit = document.getElementById("submit");
    searchSubmit.addEventListener("click", () => {
        let searchBarValue = document.getElementById("user-search").value;
        let parsedString = searchBarValue.replace(/\s/g, '');
        if(parsedString.length > 0){
        getSearchResults(searchBarValue);
        recentSearches.push(searchBarValue);
        updateRecentButtons(searchBarValue);
        createRecentButtons();
        console.log(recentSearches)
        }
    });
}

const trendingListener = () => {
    let trendingButton = document.getElementById("trending");
    trendingButton.addEventListener("click", () => {
        getTrendingResults();
    });
}

const createRecentButtons = () => {
    document.getElementById("buttons").innerHTML = ""
    for(let i=0; i < recentSearches.length; i++) {
        createRecentButton(recentSearches[i], i);
    }
    recentButtonSearchListener();
}

const createRecentButton = (recentSearch, idIndex) => {
    let button = document.createElement("button");
    button.id = `recents${idIndex}`;
    button.innerHTML = recentSearch;
    document.getElementById("buttons").appendChild(button);
}

const updateRecentButtons = lastSearch => {
    while(recentSearches.length > recentsLimit) {
        recentSearches.shift();
    }
    createRecentButton(lastSearch, recentSearches[recentSearches.length]);
}

const recentButtonSearchListener = () => {
    let length = recentsLimit > recentSearches.length ? recentSearches.length : recentsLimit;
    console.log(length);

    for(let i=0; i<length; i++) {
        let button = document.getElementById(`recents${i}`);
        console.log(`recents${i}`)
        console.log(button.innerHTML);
        button.addEventListener("click", () => {
            getSearchResults(button.innerHTML);
        });
    }
}


createRecentButtons();
searchListener();
trendingListener();
