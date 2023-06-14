// ------------------ Class SearchResults ------------------
class SearchResult {
    constructor() {
        this.results = document.getElementById("results");
        this.results.classList.add("results");
        this.spinner = document.getElementById("spinner");
        this.search_icon = document.getElementById("search_icon");
    }

    renderResults(value) {
        this.url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${value}&limit=10&exchange=NASDAQ`;
        this.results.innerHTML = "";
        async function getData(url) {
            const response = await fetch(url);
            const data = await response.json();
            return data;
        }
        getData(this.url).then((data) => {
            for (let i = 0; i < data.length; i++) {
                this.data_box = document.createElement("div");
                this.data_box.classList.add("data_box");
                this.results.appendChild(this.data_box);
                this.a = document.createElement("a");
                this.a.classList.add("data_name");

                this.a.href = `./company.html?symbol=${data[i].symbol}`;
                this.a.innerHTML = data[i].name, data[i].symbol;
                this.a.target = "_blank";
                this.a.innerText = data[i].name + " (" + data[i].symbol + ")";
                this.data_box.appendChild(this.a);
            }
            this.spinner.style.display = "none";
            this.search_icon.style.display = "block";
        });
        getData(this.url).then((data) => {
            for (let i = 0; i < data.length; i++) {
                const symbol = data[i].symbol;
                async function displayExtrasInfos() {
                    const url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`;
                    const response = await fetch(url);
                    const data = await response.json();
                    return data;
                }
                displayExtrasInfos().then((data) => {
                    const data_box = document.querySelectorAll(".data_box");
                    const img = document.createElement("img");
                    const p = document.createElement("p");
                    img.classList.add("data_img");
                    p.classList.add("data_percentage");
                    img.src = data.profile.image;
                    p.innerText = Math.round(data.profile.changesPercentage * 100) / 100 + " %";
                    data_box[i].appendChild(img);
                    data_box[i].appendChild(p);
                    if (data.profile.changesPercentage > 0) {
                        p.style.color = "#3CB371";
                    } else {
                        p.style.color = "#FA8072";
                    }
                    img.onerror = function () {
                        this.src = "../img/image_not_found.png";
                    };
                });
            }
            spinner.style.display = "none";
            search_icon.style.display = "block";

        });
    }
}
