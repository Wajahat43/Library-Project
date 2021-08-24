let myLibrary = [];
let modal = document.getElementById("myModal");
let btn = document.getElementById("addNewBookButton");
let closeModal = document.getElementById("cancel")
let form = document.querySelector(".bookInputForm");



function Book(title,authorName,pages,readstatus){
this.title=title;
this.authorName=authorName;
this.pages=pages;
this.readStatus=readStatus;

}

function addBookToLibrary(){
let bookTitle = document.getElementById("bookTitle").value;
let authorName = document.getElementById("authorName").value;
let pages = document.getElementById("pages").value;
let readStatus = false;
//let readStatus = document.getElementById("readStatusToggle").checked;

let newBook = new Book(bookTitle,authorName,pages,readStatus);
myLibrary.push(newBook);

modal.style.display = "none";
form.reset();
}

//Functionality of model.


btn.onclick = function(){
    modal.style.display = "block";
}
closeModal.onclick = ()=>modal.style.display = "block";
window.addEventListener("click",function(event){
    if(event.target == modal){
        modal.style.display = "none";
        form.reset();
    }
})

let addBook = document.getElementById("submitBook");
addBook.addEventListener("click",addBookToLibrary);
