document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const userImage = document.getElementById('userImage').files[0];

    if (username && userImage) {
        localStorage.setItem('username', username);
        localStorage.setItem('userImage', URL.createObjectURL(userImage));
        
        document.getElementById('loginPage').style.display = 'none';
        document.getElementById('quotePage').style.display = 'block';
        loadQuotes();
    }
});

document.getElementById('quoteForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const quote = document.getElementById('quote').value;
    const username = localStorage.getItem('username');
    const userImage = localStorage.getItem('userImage');
    
    const quotes = JSON.parse(localStorage.getItem('quotes')) || [];
    quotes.push({ username, userImage, quote });
    localStorage.setItem('quotes', JSON.stringify(quotes));

    document.getElementById('quote').value = '';
    loadQuotes();
});

function loadQuotes() {
    const quotesList = document.getElementById('quotes');
    quotesList.innerHTML = '';
    const quotes = JSON.parse(localStorage.getItem('quotes')) || [];
    
    quotes.forEach(function(item) {
        const li = document.createElement('li');
        const img = document.createElement('img');
        img.src = item.userImage;
        img.alt = item.username;
        img.style.width = '50px';
        img.style.height = '50px';
        img.style.borderRadius = '50%';
        li.appendChild(img);
        li.appendChild(document.createTextNode(` ${item.username}: ${item.quote}`));
        quotesList.appendChild(li);
    });
}

if (localStorage.getItem('username')) {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('quotePage').style.display = 'block';
    loadQuotes();
}
