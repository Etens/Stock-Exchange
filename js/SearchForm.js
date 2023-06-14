// ------------------ Class Marquee ------------------
class SearchForm {
    constructor(element) {
        this.element = element;
        this.element.classList.add("form");
        this.search_box = document.createElement("div");
        this.search_box.classList.add("search_box");
        this.element.appendChild(this.search_box);
    }
    // ------------------ Event Listener
    onSearch(callback) { // callback is a function that will be called when the user click on the button
        // ------------------ Input
        this.search_input = document.createElement("input");
        this.search_input.classList.add("search_input");
        this.search_input.type = "text";
        this.search_input.placeholder = "Search Here...";
        this.search_box.appendChild(this.search_input);

        // ------------------ Button
        this.search_btn = document.createElement("button");
        this.search_btn.id = "search_btn";
        this.search_btn.classList.add("search_btn");
        this.search_box.appendChild(this.search_btn);

        // ------------------ Icon
        this.search_icon = document.createElement("img");
        this.search_icon.id = "search_icon";
        this.search_icon.src = "../img/search_icon.png";
        this.search_btn.appendChild(this.search_icon);

        // ------------------ Spinner
        this.spinner = document.createElement("div");
        this.spinner.id = "spinner";
        this.spinner.classList.add("spinner-border", "text-light");
        this.search_btn.appendChild(this.spinner);
        this.spinner.style.display = "none";
        this.search_btn.addEventListener("click", () => {
            this.spinner.style.display = "block";
            this.search_icon.style.display = "none";
            const value = this.search_input.value;
            callback(value); // call the function that was passed as an argument
        });
    }
}