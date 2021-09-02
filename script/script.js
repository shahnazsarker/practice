document.getElementById("error-msg").style.display = 'none';
document.getElementById("empty-input").style.display = 'none';
document.getElementById("total-result").style.display = 'none';



const searchKey = () => {
    const searchField = document.getElementById("search-field");
    const searchedText = searchField.value;
    document.getElementById("error-msg").style.display = 'none';
    document.getElementById("empty-input").style.display = 'none';


    searchField.value = '';
    if (searchedText === '') {
        const url = ` https://openlibrary.org/search.json?q=${searchedText} `;
        fetch(url)
            .then(res => res.json())
            .then(data => displayResult(data));



    }
    else {
        const url = ` https://openlibrary.org/search.json?q=${searchedText} `;
        fetch(url)
            .then(res => res.json())
            .then(data => displayBooks(data.docs))
            .then(data => displayTotalResult(data.numFound))
            .catch(error => displayError(error));

    }


}

const displayResult = empty => {
    document.getElementById("empty-input").style.display = 'block';

}
const displayTotalResult = data => {
    document.getElementById("total-result").style.display = 'block';
    const bookFound = document.getElementById("bookFound");

    data.forEach(data => {
        console.log(data.numFound);
        const div = document.createElement('div');
        div.innerHTML = `<h3 id="total-result" class="">Books with same keyword found: ${data.numFound} </h3>`
        bookFound.appendChild(div);
    });


}


const displayBooks = books => {

    const bookResult = document.getElementById('search-result');
    bookResult.textContent = '';

    books.forEach(book => {
        console.log(book);
        const div = document.createElement('div');
        div.classList.add('col')



        div.innerHTML = ` 
        <div class="card h-100 rounded-2 shadow bg-body border">
            <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg " class="card-img-top" height="300px" alt="...">
        <div class="card-body">
        
            <p class="card-title"><strong> Book name:</strong> ${book.title}</h5>
            <p ><strong> Author:</strong> ${book.author_name}</p>
            <p><strong> Publishers:</strong> ${book.publisher[0]}</p>
            <p><strong> 1st Publishing year:</strong> ${book.first_publish_year}</p>
            
        </div>
        </div >
    `;
        bookResult.appendChild(div);


    })
}
// const displayResult = results => {
//     const totalBookResult = document.getElementById('bookFound');

//     data.foreach(result => {

//         console.log(result, "invalid search");
//         const div = document.createElement('div');
//         div.innerHTML = `<h3 class=""> Please enter something to search </h3>`;
//         totalBookResult.appendChild(div);

//     });

// }