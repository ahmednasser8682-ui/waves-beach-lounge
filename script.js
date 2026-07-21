// =======================================
// WAVES Beach Lounge
// =======================================

let currentLang = "ar";
let currentCategory = "all";

const menuContainer = document.getElementById("menu");
const categoryContainer = document.getElementById("categories");
const searchInput = document.getElementById("search");
const loader = document.getElementById("loader");

window.addEventListener("load", () => {
    setTimeout(() => {
        loader.style.opacity = "0";
        loader.style.visibility = "hidden";
    }, 700);

    renderMenu();
});

//===============================

function renderMenu() {

    renderCategories();

    const search = searchInput.value.toLowerCase();

    menuContainer.innerHTML = "";

    const categories = menuData[currentLang].categories;

    categories.forEach(category => {

        if (currentCategory !== "all" && currentCategory !== category.id)
            return;

        const items = category.items.filter(item =>
            item.name.toLowerCase().includes(search)
        );

        if (items.length === 0) return;

        items.forEach(item => {

            menuContainer.innerHTML += `

<div class="card">

<div class="card-top">

<div>

<h3>${category.icon} ${item.name}</h3>

<p>${item.desc}</p>

</div>

<span class="price">

${item.price}

</span>

</div>

</div>

`;

        });

    });

}

//===============================

function renderCategories() {

    categoryContainer.innerHTML = "";

    categoryContainer.innerHTML += `

<button
class="${currentCategory=="all"?"active":""}"
onclick="changeCategory('all')">

⭐ All

</button>

`;

    menuData[currentLang].categories.forEach(cat => {

        categoryContainer.innerHTML += `

<button

class="${currentCategory==cat.id?"active":""}"

onclick="changeCategory('${cat.id}')">

${cat.icon}

${cat.title}

</button>

`;

    });

}

//===============================

function changeCategory(id){

currentCategory=id;

renderMenu();

}

//===============================

document.querySelectorAll(".language button")

.forEach(btn=>{

btn.addEventListener("click",()=>{

document.querySelectorAll(".language button")

.forEach(x=>x.classList.remove("active"));

btn.classList.add("active");

currentLang=btn.dataset.lang;

renderMenu();

});

});

//===============================

searchInput.addEventListener("input",renderMenu);
