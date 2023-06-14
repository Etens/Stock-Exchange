
// ------------------ Get The Symbol In URL ------------------
const queryString_url_id = window.location.search; // the search property returns the query string of the URL (everything after the ? in the URL)
const urlParams = new URLSearchParams(queryString_url_id); // the URLSearchParams() give the query string parameters for manipulation and access
const id = urlParams.get('symbol'); // the get() method returns the value of the first element with the specified name


// ------------------ Function For Get And Display The Data ------------------
function requestData() {
    let url = "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/" + id;
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const company_price = document.querySelector(".company_price");
            const company_name_h1 = document.querySelector(".company_name h1");
            const company_name_h2 = document.querySelector(".company_name h2");
            const company_description = document.querySelector(".company_description");
            const company_link = document.querySelector(".company_link");

            const percent_round = Math.round(data.profile.changesPercentage * 100) / 100 + " %";

            company_price.innerHTML = ` <img src="${data.profile.image}">
                                        <h2>${percent_round}</h2>
                                        <h1>${data.profile.price} $</h1>`;
            company_name_h1.innerHTML = id;
            company_name_h2.innerHTML = data.profile.companyName;
            company_description.innerHTML = data.profile.description;
            company_link.innerHTML = data.profile.website;
            company_link.href = data.profile.website;

            const company_percentage = document.querySelector(".company_price h2");
            if (data.profile.changesPercentage > 0) {
                company_percentage.style.color = "#3CB371";
            }
            else {
                company_percentage.style.color = "#FA8072";
            }
            const company_image = document.querySelector(".company_price img");
            company_image.onerror = function () {
                this.src = "../img/image_not_found.png";
            }
        })
        .catch((error) => {
            console.log(error);
        });
}
requestData();

// ------------------ Function For Get And Display The Graph ------------------
function requestChart() {
    let url = "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/" + id + "?serietype=line";
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            const company_chart = document.querySelector("#company_chart");
            const company_chart_canvas = document.createElement("canvas");
            company_chart.appendChild(company_chart_canvas);
            const ctx = company_chart_canvas.getContext("2d");
            const labels = [];
            const data_price = [];
            for (let i = 0; i < data.historical.length; i++) {
                labels.push(data.historical[i].date);
                data_price.push(data.historical[i].close);
            }
            const myChart = new Chart(ctx, {
                type: "line",
                data: {
                    labels: labels,
                    datasets: [{
                        label: "Stock Price",
                        data: data_price,
                        backgroundColor: [
                            "#fff",
                        ],
                        borderColor: [
                            "#fff",
                        ],
                        borderWidth: 1,
                    },],
                },
            });
        })
        .catch((error) => {
            console.log(error);
        });
}
requestChart();