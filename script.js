let myLibrary = [];

class Book {
    
    constructor(title, author, genre, numberOfPages, haveRead) {
        // constructor for book object
        // parameters are bookCategory Objects
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.numberOfPages = numberOfPages;
        this.haveRead = haveRead;
    }
    toggleRead() {

        // toggle if book has been read or not
        this.haveRead.value = !this.haveRead.value;
    }
    renderDiv() {

        // ask category how it would like to be rendered, then return that rendering
        const bookDiv = document.createElement("div");
        for (const key of Object.keys(this)) {
            bookDiv.appendChild(this[key].renderHTML());
        }
        return bookDiv;
    }
}

class bookCategory {

    constructor(categoryType, categoryText, value) {
        // constructor for book category object for how each category will be displayed on page
        this.categoryType = categoryType;
        this.categoryText = categoryText;
        this.value = value;
    }
    defaultTextContent() {

        // choose how default category text will be rendered on page
        return this.categoryText + this.value;
    }
    renderHTML() {

        // choose how category will be rendered via HTML
        switch(this.categoryType) {
            // create button for haveRead category type
            case "haveRead" :
                const btn = document.createElement("button");
                if (this.value === true) {
                    btn.textContent = "have read";
                } else {
                    btn.textContent = "haven't read";
                }
                return btn;
                break;
            
            // otherwise use this default text
            default:
                const p = document.createElement("p");
                p.textContent = this.defaultTextContent();
                return p;
        }
    }
}

function addBookToLibrary(myBook) {

    // add book object to library array
    myLibrary.push(myBook);
}

function firstRender(libArray) {

    // renders initial books on page from array
    libArray.forEach((book, index) => {
        let bookDiv = document.createElement("div");
        bookDiv = book.renderDiv();
        bookDiv.appendChild(document.createElement("br"));
        bookDiv.appendChild(document.createElement("br"));
        bookDiv.setAttribute("id", "div" + index);

        // set read button functionality
        let readBtn = bookDiv.querySelector("button");
        readBtn.setAttribute("onclick", `divToggleRead("div" + ${index})`);

        // set remove button functionality
        let removeBtn = document.createElement("button");
        removeBtn.textContent = "remove";
        removeBtn.setAttribute("onclick", `removeBookFromLibrary(${index})`);
        bookDiv.appendChild(removeBtn);
        container.appendChild(bookDiv);
    });
}

function removeBookFromLibrary(bookId) {

    // remove book from library array
    myLibrary.splice(bookId, 1)
    
    // clear all divs
    while (container.lastElementChild) {
        container.removeChild(container.lastElementChild);
    }

    //rebuild divs
    firstRender(myLibrary);
}

function render(libArray) {

    // render only one book on page (for adding books)
    let bookDiv = document.createElement("div");
    book = libArray[libArray.length - 1];
    bookDiv = book.renderDiv();
    bookDiv.appendChild(document.createElement("br"));
    bookDiv.appendChild(document.createElement("br"));
    bookDiv.setAttribute("id", "div" + (libArray.length - 1));

    // set read button functionality
    let readBtn = bookDiv.querySelector("button");
    readBtn.setAttribute("onclick", `divToggleRead("div" + ${libArray.length - 1})`);
    
    // set remove button functionality
    let removeBtn = document.createElement("button");
    removeBtn.textContent = "remove";
    removeBtn.setAttribute("onclick", `removeBookFromLibrary(${libArray.length - 1})`);
    bookDiv.appendChild(removeBtn);
    container.appendChild(bookDiv); 
}

const book1 = new Book (

    new bookCategory("Title", "Title: ", "The Book of Nick"),
    new bookCategory("Author", "Author: ", "Nick Haury"),
    new bookCategory("Genre", "Genre: ", "Action"), 
    new bookCategory("numberOfPages", "Number of Pages: ", 100), 
    new bookCategory("haveRead", "Have read?: ", true)
    );

function toggleForm() {

    // toggle visibility of book adding form on screen
    if (addBookForm.className === "hidden") {
        addBookForm.classList.remove("hidden");
        btnAddBook.textContent = "Cancel";
    } else {
        addBookForm.classList.add("hidden");
        btnAddBook.textContent = "Add Book";
    }
}

function addBookFromForm() {

    let form = document.getElementById("add-book-form");
    let formElements = form.elements;
    let title = formElements[0].value;
    let author = formElements[1].value;
    let genre = formElements[2].value;
    let pages = formElements[3].value;
    let read = formElements[4].checked;

    // check to see if author is filled out properly
    if (!(author.includes(" ") && author.indexOf(" ") < author.length - 1 && author[0] !== " " && (author.split(" ").length - 1) === 1)) {
        alert('Author field must be "Firstname Lastname"');
        return;
    }

    // create book object based on user inputs
    const bookToAdd = new Book (
        new bookCategory("Title", "Title: ", title),
        new bookCategory("Author", "Author: ", author),
        new bookCategory("Genre", "Genre: ", genre), 
        new bookCategory("numberOfPages", "Number of Pages: ", pages), 
        new bookCategory("haveRead", "Have read?: ", read)
        );    

    // clear form fields
    form.reset();

    myLibrary.push(bookToAdd);
    render(myLibrary);
    toggleForm();

}

function divToggleRead(divID) {

    // toggle read text on button, as well as read property of book in library
    let div = document.querySelector(`#${divID}`);
    let testRead = div.childNodes[4].textContent;
    if (testRead === "have read") {
        div.childNodes[4].textContent = "haven't read";
    } else {
        div.childNodes[4].textContent = "have read";
    }
    let index = divID.slice(3);
    myLibrary[index].toggleRead();
}

const container = document.querySelector("#container");
const addBookForm = document.querySelector("#add-book-form");
const btnAddBook = document.querySelector("#btn-add-book");
myLibrary.push(book1);

firstRender(myLibrary);