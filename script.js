const apiUrl = "https://newsapi.org/v2/everything?q=";
const apiKey = "8ba8f4f148744b2fb98936161759e2ba";
const searchValue = document.querySelector(".input-btn");
const searchButton = document.querySelector(".btn");
const ImageChange = document.getElementById("image-change");
const Trending = document.getElementById("Trending");

// Initially load latest news
searchNews('latest');

async function searchNews(news) {
    const response = await fetch(apiUrl + news + `&apiKey=${apiKey}`);
    const data = await response.json();
    console.log(data);

    const newsInfoElements = document.querySelectorAll('.news-info');
    newsInfoElements[0].querySelector('h1').innerHTML = data.articles[0].author;
    newsInfoElements[1].querySelector('h1').innerHTML = data.articles[0].title;
    const content = data.articles[0].content;
    const truncatedContent = truncateText(content, 200);
    newsInfoElements[2].querySelector('p').innerHTML = truncatedContent;
    newsInfoElements[3].innerHTML = data.articles[1].title;
    // Changing Image
    ImageChange.src = data.articles[0].urlToImage;
}

function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
        return text;
    }
    return text.slice(0, maxLength) + '...read more';
}

searchButton.addEventListener('click', () => {
    searchNews(searchValue.value);
});

Trending.addEventListener('click', () => {
    searchNews('trending');
});

Home.addEventListener('click', () => {
    searchNews('latest'); // Load latest news
});


