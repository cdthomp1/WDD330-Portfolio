async function getNews() {
  const today = new Date(Date.now())
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getUTCDate();
    var url = 'https://newsapi.org/v2/everything?' +
      'q=Apple&' +
      `from=${year}-${month}-${day}&` +
      'sortBy=popularity&' +
      'apiKey=7a7d259cb0f845db93e567bf7411d507';
    var news;
    var req = new Request(url);
    await fetch(req)
      .then(function (response) {
        return response.json();
      }).then((json) => {
        news = json.articles
        return news
      }).catch((e)=> {
        console.error(e)
      })
      return news;
  }
  
  function makeNewsListins(listings) {
    listings.map(listing => {
      createListItem(listing)
    });
  }
  
  function createListItem(listing) {
    var listingHolder = document.getElementById("newsGroup");
    var listItem = document.createElement("li");
    listItem.classList.add("list-group-item")
    listItem.setAttribute("onclick", `location.href='${listing.url}', '_blank'`);
    listItem.setAttribute("target", "new")
    var lineBreak = document.createElement("br")
    var lineBreak2 = document.createElement("br")
  
    //Create the title
    var newsTitle = document.createElement("span");
    newsTitle.classList.add("news")
    newsTitle.classList.add("title")
    var title = document.createTextNode(listing.title);
    newsTitle.appendChild(title)
  
    //Create the Author
    var newsAuthor = document.createElement("span");
    newsAuthor.classList.add("news")
    newsAuthor.classList.add("author")
    var author = document.createTextNode(listing.author + " from ");
    newsAuthor.appendChild(author)
  
    // Add the source
    var newsSource = document.createElement("span");
    newsSource.classList.add("news")
    newsSource.classList.add("source")
    var source = document.createTextNode(listing.source.name);
    newsSource.appendChild(source)
  
    //Create the Description
    var newsDescription = document.createElement("span");
    newsDescription.classList.add("news")
    newsDescription.classList.add("description")
    var description = document.createTextNode(listing.description);
    newsDescription.appendChild(description)
  
    listItem.appendChild(newsTitle);
    listItem.appendChild(lineBreak);
    listItem.appendChild(newsAuthor);
    listItem.appendChild(newsSource);
    listItem.appendChild(lineBreak2);
    listItem.appendChild(newsDescription);
  
    listingHolder.appendChild(listItem);
  }
  
  getNews().then((theNews) => {
    makeNewsListins(theNews)
  }).catch((e)=> {
    console.error(e)
  });