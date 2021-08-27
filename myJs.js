let myLibrary = [];
let modal = document.getElementById("myModal");
let form = document.querySelector(".bookInputForm");
let libraryContainer = document.querySelector(".bookBox");
let localLibrary = JSON.parse(localStorage.getItem('myLibrary1'));
loadLocalLibrary();


function Book(title, authorName, pages, readStatus) {
    this.title = title;
    this.authorName = authorName;
    this.pages = pages;
    this.readStatus = readStatus;
}


function addBookToLibrary(newBook) {
    myLibrary.push(newBook);
    ShowBook(newBook);
    updateLocalLibrary();

    modal.style.display = "none";
    form.reset();
}

window.addEventListener("click", function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
        form.reset();
    } else if (event.target.classList.contains("removeBookButton")) {
        removeBook(event.target.id);
    } else if (event.target.classList.contains("changeStatusButton")) {
        changeStatusOfBook(event.target.id)
    } else if (event.target.id == "addNewBookButton") {
        modal.style.display = "block";
    } else if (event.target.id === "cancel") {
        modal.style.display = "none";
        form.reset();
    } else if (event.target.id === "submitBook") {
        let newBook = getNewBookdata();
        addBookToLibrary(newBook);
    }
})

function removeBook(id) {
    let removeIndex = parseInt(id);
    myLibrary.splice(removeIndex, 1);

    let bookToRemove = document.getElementById(`book${removeIndex}`);
    libraryContainer.removeChild(bookToRemove);

    updateLocalLibrary();

}

function changeStatusOfBook(id) {
    let changeStatusIndex = parseInt(id);
    if (myLibrary[changeStatusIndex].readStatus) {
        myLibrary[changeStatusIndex].readStatus = false;
        document.getElementById(`${changeStatusIndex}status`).textContent = "Read: No";
    } else {
        myLibrary[changeStatusIndex].readStatus = true;
        document.getElementById(`${changeStatusIndex}status`).textContent = "Read: Yes";
    }

    updateLocalLibrary();
}
function getNewBookdata() {
    let bookTitle = document.getElementById("bookTitle").value;
    let authorName = document.getElementById("authorName").value;
    let pages = document.getElementById("pages").value;
    let readStatus = false;
    let toggleResponse = document.getElementById("readStatusToggle");
    if (toggleResponse.checked === true)
        readStatus = true;

    let newBook = new Book(bookTitle, authorName, pages, readStatus);
    return newBook;
}

function ShowBook(book) {


    let bookIndex = myLibrary.indexOf(book);
    let bookContainer = document.createElement("div");
    bookContainer.classList.add("bookCard");
    bookContainer.setAttribute("id", `book${bookIndex}`);

    let bookHeading = document.createElement("h2");
    bookHeading.textContent = "Book Details";


    let bookName = document.createElement("h3");
    bookName.setAttribute("id", `${bookIndex}Name`);
    bookName.textContent = `Book Title: ${book.title}`;

    let bookAuthorName = document.createElement("h3");
    bookAuthorName.setAttribute("id", `${bookIndex}AuthorName`);
    bookAuthorName.textContent = `Author Name: ${book.authorName}`;

    let bookPages = document.createElement("h3");
    bookPages.setAttribute("id", `${bookIndex}Pages`);
    bookPages.textContent = `Pages Count: ${book.pages}`;

    let bookReadStatus = document.createElement("h3");
    if (book.readStatus) {
        bookReadStatus.textContent = `Read: Yes`;
    } else {
        bookReadStatus.textContent = `Read: No`;
    }

    bookReadStatus.setAttribute("id", `${bookIndex}status`);



    let buttonContainer = document.createElement("div");
    buttonContainer.classList.add("bookCardButtonContainer");

    let changeStatusButton = document.createElement("button");
    changeStatusButton.innerText = "Change Read Status";
    changeStatusButton.setAttribute("id", `${bookIndex}Status`);
    changeStatusButton.classList.add("changeStatusButton", "bookCardButton");

    let removeBookButton = document.createElement("button");
    removeBookButton.innerText = "Remove Book";
    removeBookButton.setAttribute("id", `${bookIndex}Book`);
    removeBookButton.classList.add("removeBookButton", "bookCardButton");

    bookContainer.appendChild(bookHeading);
    bookContainer.appendChild(bookName);
    bookContainer.appendChild(bookAuthorName);
    bookContainer.appendChild(bookPages);
    bookContainer.appendChild(bookReadStatus);

    buttonContainer.appendChild(changeStatusButton);
    buttonContainer.appendChild(removeBookButton);
    bookContainer.appendChild(buttonContainer);
    bookContainer.style.cssText = "flex-basis:30.8%";

    libraryContainer.appendChild(bookContainer);

}

function loadLocalLibrary() {
    if (!localLibrary)
        return;
    localLibrary.forEach(element => {
        addBookToLibrary(element)
    });
}

function updateLocalLibrary() {
    localStorage.removeItem('myLibrary1');
    localStorage.setItem('myLibrary1', JSON.stringify(myLibrary));

}