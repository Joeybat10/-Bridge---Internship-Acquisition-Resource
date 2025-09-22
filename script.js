document.addEventListener('DOMContentLoaded', () => {
    const headers = document.querySelectorAll('.accordion-header');
    headers.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const isOpen = content.style.maxHeight;

            document.querySelectorAll('.accordion-content').forEach(el => el.style.maxHeight = null);
            if (!isOpen) {
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const lowesModal = document.getElementById("lowesModal");
    const closeLowesModal = document.getElementById("closeLowesModal");

    if(lowesModal && closeLowesModal) {
        const openModalLowes = document.getElementById("openModalLowes");
        if(openModalLowes) {
            openModalLowes.addEventListener("click", () => {
                lowesModal.style.display = "block";
                document.querySelector("#lowesModal .modal-content h2").textContent = "Lowe's Opportunities"
                document.querySelector("#lowesModal .modal-content p").textContent = "Lowe's offers great internships in computer science and they are a very popular option. Apply as soon as possible and check their career page for new opportunities."
            });
        }

        closeLowesModal.addEventListener("click", () => {
            lowesModal.style.display = "none";
        });

        window.addEventListener("click", (event) => {
            if(event.target === lowesModal) {
                lowesModal.style.display = "none";
            }
        });
    }

    const wellsFargoModal = document.getElementById("wellsFargoModal");
    const closeWellsFargoModal = document.getElementById("closeWellsFargoModal");
    if(wellsFargoModal && closeWellsFargoModal) {
        const openModalWF = document.getElementById("openModalWF");
        if(openModalWF) {
            openModalWF.addEventListener("click", () => {
                wellsFargoModal.style.display = "block";
                document.querySelector("#WFQI .modal-content h2").textContent = "Wells Fargo Opportunities"
                document.querySelector("#WFQI .modal-content p").textContent = "Wells Fargo offers great internships in computer science and they are a very popular option. Apply as soon as possible and check their career page for new opportunities."
        });
    }

    closeWellsFargoModal.addEventListener("click", () => {
        wellsFargoModal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if(event.target === wellsFargoModal) {
            wellsFargoModal.style.display = "none";
        }
    });
}
});



document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector(".carousel");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    if(carousel && prevBtn && nextBtn) {
    let currentIndex = 0;
    const slides = document.querySelectorAll(".carousel-slide");
    const totalSlides = slides.length;

    const showSlide = (index) => {
        if (index >= totalSlides) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = totalSlides - 1;
        }
        carousel.style.transform = `translateX(${-100 * currentIndex}%)`;
    };

    prevBtn.addEventListener("click", () => {
        currentIndex--;
        showSlide(currentIndex);
    });

    nextBtn.addEventListener("click", () => {
        currentIndex++;
        showSlide(currentIndex);
    });

    showSlide(currentIndex);
}
});



const internships = [
    {title: "Frontend Intern", city : "Raleigh", company: "Epic Games", link: "https://www.epicgames.com/site/en-US/earlycareers"},
    {title: "Backend Intern", city : "Charlotte", company: "Lowe's", link: "https://talent.lowes.com/us/en/students-and-grads"},
    {title: "UX Intern", city : "Apex", company: "Ally", link: "https://www.ally.com/about/careers/students/"},
    {title: "Frontend Intern", city : "Charlotte", company: "Uber", link: "https://www.uber.com/us/en/careers/teams/university/"},
    {title: "Backend Intern", city : "Charlotte", company: "Duke Energy", link: "https://www.duke-energy.com/our-company/careers"},
];

document.addEventListener("DOMContentLoaded", () => {
    const findBtn = document.getElementById("find-nearby-btn");
    const status = document.getElementById("location-status");
    const results = document.getElementById("internship-results");

    if(!findBtn) return;

    findBtn.addEventListener("click", () => {
        status.textContent = "Getting your location...";
        results.innerHTML = "";

        fetch("https://ipinfo.io/json?token=2ae5deb721abf8")
            .then(response => {
                if(!response.ok) throw new Error("Location fetch failed");
                return response.json();
            })
            .then(data => {
                const userCity = data.city;
                status.textContent = `Internships in ${userCity}:`;

                const nearby = internships.filter(job => {
                    return job.city.toLowerCase() === userCity.toLowerCase()
                });

                if(nearby.length === 0) {
                    results.innerHTML = `<p>No internships found in ${userCity}.<p>`;
                } else {
                    nearby.forEach(job => {
                        const jobElement = document.createElement("div");
                        jobElement.innerHTML = `<strong>${job.title}</strong> at <a href="${job.link}" target="_blank">${job.company}</a>`;
                        jobElement.style.marginTop = "10px";
                        results.appendChild(jobElement);
                    });
                }
            })
            .catch(error => {
                status.textContent = "Could not get your location. Try again later.";
                console.error("Error fetching location", error);
            });
    });
});