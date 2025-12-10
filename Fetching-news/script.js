let input = document.querySelector('#searchInput');
let button = document.querySelector('#searchBtn');
let container = document.querySelector('.news-container');

function createCard(article) {
    let card = document.createElement('div');
    card.classList.add('news-card');

    card.innerHTML = `
        <img src="${article.urlToImage || 'https://via.placeholder.com/300'}">

        <div class="news-content">
            <h2 class="news-title">${article.title || "No title available"}</h2>

            <p class="news-meta">
                short by ${article.author || "Unknown"} • 
                ${article.publishedAt ? new Date(article.publishedAt).toLocaleString() : ""}
            </p>

            <p class="news-desc">${article.description || ""}</p>

            <a class="read-more" href="${article.url}" target="_blank">
                read more at ${article.source.name}
            </a>
        </div>
    `;

    container.appendChild(card);
}

function loadNews() {
    let topic = input.value.trim();
    if (topic === "") return alert("Enter a topic!");

    container.innerHTML = ""; 

    fetch(`https://newsapi.org/v2/everything?domains=wsj.com&apiKey=3d760e20bdb143ccb507b702df828a64`)
        .then(res => res.json())
        .then(data => {
            if (!data.articles || data.articles.length === 0) {
                container.innerHTML = "<h2>No news found</h2>";
                return;
            }

            data.articles.slice(0, 35).forEach(article => createCard(article));
        });
}

button.addEventListener('click', loadNews);