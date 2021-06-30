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
    this.completed = completed;
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
        bookCard.style.cssText = `background: url('${book.cover}'); background-repeat: no-repeat; background-size: 340px 500px;`;

        const formBook = document.createElement('form');
        bookCard.appendChild(formBook);
        formBook.classList.add('formBook');
        
        formBook.innerHTML = `<ul>
                            <li><p>Title:</p><label>${book.title}</label></li>
                            <li><p>Author:</p><label>${book.author}</label></li>
                            <li><p>Pages:</p><label>${book.pages}</label></li>
                            <li><p>Read:</p></li>
                            </ul>`;
        
        bookCard.addEventListener('click', () => {
            formBook.style.display = 'block';
        });

        chkRead = document.createElement('input');
        chkRead.type = "checkbox";
        formBook.appendChild(chkRead);
        chkRead.classList.add('chkRead');
        if (book.completed) chkRead.checked = true;
        else chkRead.checked = false;
        chkRead.addEventListener('change', function() {
            if (this.checked) {
                book.completed = true;
                console.log(book.completed);
            } else {
                book.completed = false;
                console.log(book.completed);
            }
        });

        btnDelete = document.createElement('button');
        formBook.appendChild(btnDelete);
        btnDelete.classList.add('btnDelete');
        btnDelete.innerText = 'Delete';
        btnDelete.addEventListener('click', () => {
            container.removeChild(bookCard);
        });

        btnHide = document.createElement('button');
        formBook.appendChild(btnHide);
        btnHide.classList.add('btnHide');
        btnHide.innerText = 'Hide';
        btnHide.addEventListener('click', () => {
            formBook.style.display = 'none';
        });
    });
}

function submitBook() {
    inTitle = document.querySelector('#txtTitle').value;
    inAuthor = document.querySelector('#txtAuthor').value;
    inPages = document.querySelector('#txtPages').value;
    inCompleted = document.querySelector('#chkCompleted').checked;
    inCover = document.querySelector('#txtCover').value;
    console.log(inCompleted); //log
    addBookToLibrary(inTitle, inAuthor, inPages, inCompleted, inCover);
    showBooks();
    //clearForm();
    closeForm();
}

function openForm() {
    document.querySelector('#formAdd').style.display = 'block';
}

function closeForm() {
    document.querySelector('#formAdd').style.display = 'none';
}

function clearForm() {
    document.querySelector('#txtTitle').value = '';
    document.querySelector('#txtAuthor').value = '';
    document.querySelector('#txtPages').value = '';
    document.querySelector('#chkCompleted').value = '';
    document.querySelector('#txtCover').value = '';
}