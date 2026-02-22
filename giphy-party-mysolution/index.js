// look back at the <readme.md> file for some hints //
// working API key //
const giphyApiKey = "jDUCutc2psevkJ9t6XBOE8TTUn6EPoxY";

const displayImg = document.getElementById("displayImages");
const searchButton = document.getElementById("searchBtn");
const clearButton = document.getElementById("clearBtn");
const searchBox = document.getElementById("searchBox");

let currentSearch = "";
let returnedGifArray = [];
let currentIndex = 0;

searchButton.addEventListener("click", function (e) {
  e.preventDefault();
  giphyRequest();
});
clearButton.addEventListener("click", function () {
  displayImg.innerHTML = "";
  searchBox.value = "";
  currentSearch = "";
  returnedGifArray = [];
  currentIndex = 0;
});
async function giphyRequest() {
  const oldError = document.getElementById("errorMessage");
  if (oldError) {
    oldError.remove();
  }
  const emptyError = document.getElementById("emptyArray");
  if (emptyError) {
    emptyError.remove();
  }
  const searchTerm = searchBox.value.trim();

  if (searchTerm === "") {
    await getRandomGif();
    return;
  }

  if (searchTerm !== currentSearch) {
    currentSearch = searchTerm;
    currentIndex = 0;
    try {
      const response = await axios.get(
        `https://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&q=${searchTerm}&limit=25`,
      );
      returnedGifArray = response.data.data;
      if (returnedGifArray.length === 0) {
        displayImg.innerHTML = "";
        let message = document.createElement("div");
        message.id = "emptyArray";
        message.textContent = "No GIFs found, please try another search! ";
        displayImg.appendChild(message);
        searchBox.value = "";
        return;
      }
    } catch (error) {
      let errorMessageDiv = document.createElement("div");
      errorMessageDiv.id = "errorMessage";
      errorMessageDiv.textContent = "Error fetching Gif";
      displayImg.appendChild(errorMessageDiv);
      searchBox.value = "";
      return;
    }
  }
  if (returnedGifArray.length > 0) {
    let newImg = document.createElement("img");
    newImg.src = returnedGifArray[currentIndex].images.downsized_large.url;
    newImg.alt = "No Image to show!";
    displayImg.appendChild(newImg);
    currentIndex++;
    if (currentIndex >= returnedGifArray.length) {
      currentIndex = 0;
    }
  }
}

async function getRandomGif() {
  try {
    const response = await axios.get(
      `https://api.giphy.com/v1/gifs/random?api_key=${giphyApiKey}`,
    );
    const returnedRandomGif = response.data.data;
    let newImg = document.createElement("img");
    newImg.src = returnedRandomGif.images.downsized_medium.url;
    displayImg.appendChild(newImg);
  } catch (error) {
    let errorMessageDiv = document.createElement("div");
    errorMessageDiv.id = "errorMessage";
    errorMessageDiv.textContent = "Error fetching Gif";
    displayImg.appendChild(errorMessageDiv);
    searchBox.value = "";
    return;
  }
}
