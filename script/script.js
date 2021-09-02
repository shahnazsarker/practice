const displaySpinner = loading => {
    document.getElementById("spinner").style.display = loading;
};
const displayTotalBook = () => {
    document.getElementById("book-found").innerText = "";
    document.getElementById("search-result").textContent = "";
};
const errorMSGText = () => {
    document.getElementById("error-msg").innerText = "";
};
const errorMSG = text => {
    document.getElementById("error-msg").innerText = text;
}

const searchKey = () => {
    const searchField = document.getElementById("search-field");
    const searchedText = searchField.value;

    if (searchedText === '') {
        displaySpinner("none");
        errorMSG('Please type something to search!');
        displayTotalBook();

    }
    else {
        displaySpinner("block");
        errorMSGText();
        displayTotalBook();
        bookSearch(searchedText);

    }
    searchField.value = '';

};
const bookSearch = async searchedText => {
    const url = `https://openlibrary.org/search.json?q=${searchedText}`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.numFound === 0) {
        displaySpinner("none");
        errorMSG("Sorry no book matched :(");
        displayTotalBook();

    }
    else {
        displayBooksMatched(data.numFound);
        displayBooks(data.docs);
    }
};
const displayBooksMatched = matched => {
    displaySpinner("none");
    const booksFound = document.getElementById("book-found");
    booksFound.innerText = `Books matched: ${matched}`;
}

const displayBooks = books => {
    displaySpinner("none");
    const bookResult = document.getElementById('search-result');
    bookResult.textContent = '';

    books.forEach(book => {
        console.log(book);
        const div = document.createElement("div");
        div.classList.add("col")

        div.innerHTML =
            ` 
            <div class="card h-100 rounded-2 shadow bg-body border">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg " class="card-img-top" height="300px" alt="...">
                <div class="card-body">
        
                    <p class="card-title"><strong> Book name:</strong> ${book.title}</h5>
                    <p ><strong> Author:</strong> ${book.author_name}</p>
                    <p><strong> Publishers:</strong> ${book.publisher}</p>
                    <p><strong> 1st Publishing year:</strong> ${book.first_publish_year}</p>
            
                </div>
            </div >
        `;
        bookResult.appendChild(div);


    });
};

