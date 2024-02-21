$(document).ready(function () {
    $('#search-input').keyup(function () {
        var query = $(this).val().trim();
        console.log(query)
        if (query != '') {
            $.ajax({
                url: "/search",
                method: "POST",
                data: { query: query },
                success: function (data) {
                    console.log(data)

                    var books = JSON.parse(data);
                    $('#books').html("");

                    books.forEach(function (book) {
                        // Shorten the title if it's longer than 15 characters
                        var displayTitle = book.title.length <= 15 ? book.title : book.title.substring(0, 15) + '...';

                        // Create the book card HTML
                        var bookCardHTML = `
                                <div class="col text-center">
                                    <div class="book-card rounded-2 border border-2 border-secondary">
                                        <a class="text-decoration-none d-flex" href="/book/${encodeURIComponent(book.title)}">
                                            <img src="${book.image}" class="img-fluid me-3">
                                            <div class="content text-start">
                                                <p class='text-white p-0 fs-3'>${displayTitle}</p>
                                                <p class='text-white p-0'>Author: <span class="text-muted">${book.author}</span></p>
                                                <p class='text-white p-0'>Year: <span class="text-muted">${book.year}</span></p>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            `;

                        // Append the new book card to the container
                        $('#books').append(bookCardHTML);
                    });
                    
                }
            });
        } else {
            window.location.href = '/';
        }
    });
});
