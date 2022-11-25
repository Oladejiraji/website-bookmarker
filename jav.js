document.querySelector('form').addEventListener('submit', saveBookmark);


function saveBookmark(e){
    e.preventDefault();

    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;

    if(!validateForm(siteName, siteUrl)){
        return false;
    }

    var bookmark = {
        name: siteName,
        url: siteUrl
    }
    if(localStorage.getItem('bookmarks') === null){
        var bookmarks = [];

        bookmarks.push(bookmark);

        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }else{
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

        bookmarks.push(bookmark);

        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    fetchBookmarks()

    document.querySelector('form').reset();
}


function deleteBookmark(url){
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    for(var i = 0; i < bookmarks.length; i++){
        if(bookmarks[i].url === url){
            bookmarks.splice(i, 1);
        }
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    fetchBookmarks();    
}


function fetchBookmarks(){
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    
    var bookmarkResults = document.getElementById('bookmarkResults');

    bookmarkResults.innerHTML = '';

    for(var i = 0; i < bookmarks.length; i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarkResults.innerHTML += `<div class="well">
                                    <h3>${name}<a class="btn" target="_blank" href="${url}">Visit</a>
                                    <a onClick="deleteBookmark(\'${url}'\)" class="dlt" href="#">Delete</a>
                                    </h3></div>`;
    }
}

function validateForm(siteName, siteUrl){
    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteName || !siteUrl){
        alert('Please fill in the form');
        return false;
    }
    
    if(!siteUrl.match(regex)){
        alert('Please use a valid URL');
        return false;
    }else{return true;}

}