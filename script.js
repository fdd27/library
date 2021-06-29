const library = [];

addBookToLibrary('Sapiens: A Brief History of Humankind', 'Yuval Noah Harari', 443, true, 'https://images-na.ssl-images-amazon.com/images/I/41yu2qXhXXL._SX324_BO1,204,203,200_.jpg');
addBookToLibrary('Meditations', 'Marcus Aurelius', 112, true, 'https://images-na.ssl-images-amazon.com/images/I/51cQEdN9KuL._SX331_BO1,204,203,200_.jpg');

container = document.querySelector('#book-container');
showBooks();

btnSearch = document.querySelector('#btnSearch');
btnOrder = document.querySelector('#btnOrder');
btnAdd = document.querySelector('#btnAdd');
btnCancel = document.querySelector('#btnCancel');
btnSubmitAdd = document.querySelector('#btnSubmitAdd');

btnAdd.addEventListener('click', openForm);
btnCancel.addEventListener('click', closeForm);
btnSubmitAdd.addEventListener('click', submitBook);

function Book(title, author, pages, completed, cover) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.comleted = completed;
    this.cover = cover;
}

function addBookToLibrary(title, author, pages, completed, cover) {
    const book = new Book(title, author, pages, completed, cover);
    library.push(book);
}

function showBooks() {
    while (container.firstChild) {
        container.removeChild(container.lastChild);
    }

    library.forEach(book => {
        const bookCard = document.createElement('div');
        container.appendChild(bookCard);
        bookCard.classList.add('book');
        bookCard.style.cssText = `background: url('${book.cover}'); background-repeat: no-repeat; background-size: 280px 400px;`;
    });
}

function submitBook() {
    inTitle = document.querySelector('#txtTitle').value;
    inAuthor = document.querySelector('#txtAuthor').value;
    inPages = document.querySelector('#txtPages').value;
    inCompleted = document.querySelector('#chkCompleted').value;
    inCover = document.querySelector('#txtCover').value;

    console.log(inTitle, inAuthor, inPages, inCompleted, inCover); //log

    addBookToLibrary(inTitle, inAuthor, inPages, true, inCover);
    showBooks();
}

function openForm() {
    document.querySelector('#formAdd').style.display = 'block';
}

function closeForm() {
    document.querySelector('#formAdd').style.display = 'none';
}