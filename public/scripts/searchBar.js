const searchBtn = document.querySelector("form button#search__button");
searchBtn.addEventListener("click", () => {
    const searchInput = document.querySelector("form input#search__input");
    [searchBtn, searchInput].forEach(element => {
        element.classList.toggle("searching");
    });
    if(window.innerWidth < 450){
        document.querySelector("nav").classList.toggle("visible");
        document.querySelector("#header .brand__container").classList.toggle("visible");
    }
})