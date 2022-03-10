const searchBtn = document.querySelector("form button#search__button");
searchBtn.addEventListener("click", () => {
    const searchInput = document.querySelector("form input#search__input");
    [searchBtn, searchInput].forEach(element => {
        element.classList.toggle("searching");
    });
})