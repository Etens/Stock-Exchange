// ------------------ Class Marquee For CSS And HTML ------------------
class Marquee {
    constructor(element) {
        this.element = element;
        this.url = "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/quotes/nasdaq";
        this.span = document.createElement("span");
        this.element.style.overflow = "hidden";
        this.element.style.display = "flex";
        this.element.style.display = "inline-flex";
        this.element.style.justifyContent = "center";
        this.element.style.alignItems = "center";
        this.element.style.marginTop = "15px";
        this.element.style.backgroundColor = "#353535";
        this.element.style.animation = "marquee linear infinite";
        this.element.style.animationDuration = "9500s";
        this.element.addEventListener("mouseover", () => {
            this.element.style.animationPlayState = "paused";
        });
        this.element.addEventListener("mouseout", () => {
            this.element.style.animationPlayState = "running";
        });
        const style = document.createElement("style");
        style.innerHTML = `
        @keyframes marquee {
            0% {
                transform: translateX(0);
            }
            100% {
                transform: translateX(-100%);
            }
        }
        `;
        document.head.appendChild(style);
    }
}

// ------------------ Class Marquee For Span ------------------
class MarqueeSpan {
    constructor(element) {
        this.element = element;
        this.element.style.whiteSpace = "nowrap";
        this.element.style.marginRight = "10px";
        this.element.style.color = "#fff";
    }
}

// ------------------ Class For Progress Bar ------------------
const progress_bar = document.querySelector(".progress_linear");

class ProgressBar {
    constructor(progress_bar) {
        this.progress_bar = progress_bar;
        this.progress_bar.style.marginTop = "20px";
        this.progress_bar.style.width = "100%";
        this.progress_bar.style.height = "20px";
        this.progress_bar.style.backgroundColor = "#353535";
    }
}

// ------------------ Function Span For Request And Display Data ------------------
function displayMarquee() {
    async function getMarquee() {
        const response = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/quotes/nasdaq`);
        const data = await response.json();
        document.querySelector('.progress_linear').style.display = 'none';
        return data;
        
    }
    getMarquee().then((data) => {
        for (let i = 0; i < data.length; i++) {
           this.span = document.createElement("span");
            this.span.classList.add("marquee_span");
            this.span.innerText = data[i].symbol + " " + data[i].price + "" + " $ ";
            if (data[i].changesPercentage > 0) {
                this.span.style.color = "#3CB371";
                this.span.innerHTML += `<img src="../img/arrow_up.png" alt="arrow_up" class="arrow_up">`;
            } else {
                this.span.style.color = "#FA8072";
                this.span.innerHTML += `<img src="../img/arrow_down.png" alt="arrow_down" class="arrow_down">`;
            }
            marquee.appendChild(span);

        }
    });
}

// ------------------ Instances Marquee And MarqueeSpan ------------------
const marquee1 = new Marquee(marquee);
const marqueeSpan1 = new MarqueeSpan(marquee1.element); 
const progressBar1 = new ProgressBar(progress_bar);
displayMarquee();
