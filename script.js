// ------------------ Variables For Get Elements ------------------
const search_btn = document.getElementById("search_btn");
const search_input = document.querySelector(".search_input");
const search_icon = document.getElementById("search_icon");
const data_result = document.getElementById("data_result");
const spinner = document.getElementById("spinner");
const input = document.querySelector(".search_input");
const marquee = document.getElementById("marquee");

// ------------------ Function When The Button Is Clicked ------------------
spinner.style.display = "none";
search_btn.addEventListener("click", () => {
    search_icon.style.display = "none";
    spinner.style.display = "block";
    displayData();
    setTimeout(extrasInfos, 1000);
});

input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        search_btn.click();
    }
});

// ------------------ Function For Get Data ------------------
async function requestData() {
    const response = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${input.value}&limit=10&exchange=NASDAQ`);
    const data = await response.json();
    return data;
}

// ------------------ Function For Display Data ------------------
function displayData() {
    requestData().then((data) => {
        data_result.innerHTML = "";
        for (let i = 0; i < data.length; i++) {
            const div = document.createElement("div");
            const a = document.createElement("a");
            a.classList.add("data_name");
            div.classList.add("data_box");
            a.href = "company.html?symbol=" + data[i].symbol;
            a.innerHTML = data[i].name, data[i].symbol;
            a.target = "_blank";
            a.innerText = data[i].name + " (" + data[i].symbol + ")";
            div.appendChild(a);
            data_result.appendChild(div);
        }
    });
}


// ------------------ Function For Get And Display Extras Infos ------------------
function extrasInfos() {
    requestData().then((data) => {
        for (let i = 0; i < data.length; i++) {
            const symbol = data[i].symbol;
            async function displayExtrasInfos() {
                const response = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`);
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
                    this.src = "./img/image_not_found.png";
                };
            });
        }
        spinner.style.display = "none";
        search_icon.style.display = "block";
    });
}

// ------------------ Function Marquee ------------------

function displayMarquee() {
    async function getMarquee() {
        const response = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/quotes/nasdaq`);
        const data = await response.json();
        return data;
    }
    getMarquee().then((data) => {
        for (let i = 0; i < data.length; i++) {
            const span = document.createElement("span");
            span.classList.add("marquee_span");
            span.innerText = data[i].symbol + " " + data[i].price + "" + " $ ";
            if (data[i].changesPercentage > 0) {
                span.style.color = "#3CB371";
                span.innerHTML += `<img src="./img/arrow_up.png" alt="arrow_up" class="arrow_up">`;
            } else {
                span.style.color = "#FA8072";
                span.innerHTML += `<img src="./img/arrow_down.png" alt="arrow_down" class="arrow_down">`;
            }
            marquee.appendChild(span);

        }
    });
}
displayMarquee();