const searchBtn = document.querySelector('#search-btn');
const mealList = document.querySelector('#meal-list');
const detail = document.querySelector('#detail');
const close = document.querySelector('#close');
const detailContent = document.querySelector("#detailContent");

function getMealList() {
    let searchInput = document.querySelector('#search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let html = "";
            if (data.meals) {
                mealList.classList = "d-flex flex-wrap justify-content-evenly";
                data.meals.forEach(meal => {
                    html += `
                    <div class="box mb-3" data-id = "${meal.idMeal}">
                        <img src="${meal.strMealThumb}" class="box-img" alt="..." />
                        <div class="card-body">
                            <h5 class="text-center">${meal.strMeal}</h5>
                            <div class="d-flex justify-content-center">
                                <a href="#" class="btn btn-warning rounded-pill detail-btn" id="detail" data-bs-toggle="modal" data-bs-target="#recipe">Get Recipe</a>
                            </div>
                        </div>
                    </div>
                    `
                });
            } else {
                html = `
                <h3 class="text-danger text-center fs-4">Sorry, we didn't find any meal!</h3>
                <img src="image/empty.jpg" class="empty-img" />
                `;
                mealList.classList = "";
            }
            mealList.innerHTML = html;
        })
}

function getMealDetail(e) {
    e.preventDefault();
    if (e.target.classList.contains("detail-btn")) {
        let mealItem = e.target.parentElement.parentElement.parentElement;
        console.log(mealItem);
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
            .then(response => response.json())
            .then(data => mealDetailModal(data.meals))
    }
}

function mealDetailModal(meal) {
    meal = meal[0];
    console.log(meal);
    let html = `
        <h3 class="text-center">${meal.strMeal}</h3>
        <div class="d-flex justify-content-center">
            <div class="btn btn-light text-warning mb-3">${meal.strCategory}</div>
        </div>
        <h6 class="text-center">Instructions:</h6>
        <p class="text-center">${meal.strInstructions}</p>
        <div class="d-flex justify-content-center">
            <img src="${meal.strMealThumb}" class="rounded-circle modal-img" alt="">
        </div>
        <div class="d-flex justify-content-center">
            <a href="${meal.strYoutube}" class="text-center text-white">Watch Video</a>
        </div>
        `
    detailContent.innerHTML = html;
}

searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealDetail);