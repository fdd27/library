let library = [];

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

console.log(localStorage.getItem("library"));

if (localStorage.getItem("library")) {
    getLibrary();
} else {
    setLibrary();
}

/*if (storageAvailable('localStorage')) {
    console.log('storage uasble');
} else {
    console.log('sucks m8');
}*/

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
    setLibrary();
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

        checkboxWrap = document.createElement('div');
        formBook.appendChild(checkboxWrap);
        checkboxWrap.classList.add('checkboxWrap');

        chkRead = document.createElement('input');
        chkRead.type = "checkbox";
        checkboxWrap.appendChild(chkRead);
        chkRead.classList.add('chkRead');
        if (book.completed) chkRead.checked = true;
        else chkRead.checked = false;
        chkRead.addEventListener('change', function() {
            if (this.checked) {
                book.completed = true;
                txtRead.innerText = 'Yes';
            } else {
                book.completed = false;
                txtRead.innerText = 'No';
            }
        });

        txtRead = document.createElement('span');
        checkboxWrap.appendChild(txtRead);
        txtRead.classList.add('txtRead');
        if (chkRead.checked) txtRead.innerText = 'Yes';
        else txtRead.innerText = 'No';

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
    addBookToLibrary(inTitle, inAuthor, inPages, inCompleted, inCover);
    showBooks();
    closeForm();
}

function openForm() {
    document.querySelector('#formAdd').style.display = 'block';
    clearForm();
}

function closeForm() {
    document.querySelector('#formAdd').style.display = 'none';
    clearForm();
}

function clearForm() {
    document.querySelector('#txtTitle').value = '';
    document.querySelector('#txtAuthor').value = '';
    document.querySelector('#txtPages').value = '';
    document.querySelector('#chkCompleted').value = '';
    document.querySelector('#txtCover').value = '';
}

function getLibrary() {
    const currentLibrary = JSON.parse(localStorage.getItem("library") || "[]");
    library = currentLibrary;

    console.log(currentLibrary);
}

function setLibrary() {
    localStorage.setItem("library", JSON.stringify(library));
    getLibrary();
}

function clearStorage() {
    localStorage.clear();
}

function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}