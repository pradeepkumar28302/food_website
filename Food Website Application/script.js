const searchBar = document.getElementById('search-bar');
const mealDetails = document.getElementById('meal-details');
const searchedMealsSection = document.getElementById('searched-meals');
const mealList = document.getElementById('meal-list');

// Fetch random meals
function fetchRandomMeals() {
    axios.get('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(response => {
            const meals = response.data.meals;
            meals.forEach(meal => {
                const mealItem = document.createElement('div');
                mealItem.classList.add('meal-item');
                mealItem.innerHTML = `
                    <img class="meal-img" src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    <p class="meal-name">${meal.strMeal}</p>
                `;
                mealDetails.appendChild(mealItem);
            });
        })
        .catch(error => console.error('Error fetching random meals:', error));
}

// Fetch a random meal
function fetchRandomMeal() {
    axios.get('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(response => {
            const meal = response.data.meals[0];
            const mealItem = document.createElement('div');
            mealItem.classList.add('meal-item');
            mealItem.innerHTML = `
                <img class="meal-img" src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <p class="meal-name">${meal.strMeal}</p>
            `;
            mealDetails.appendChild(mealItem);
        })
        .catch(error => console.error('Error fetching random meal:', error));
}

// Search for meals
searchBar.addEventListener('input', () => {
    const searchValue = searchBar.value.trim().toLowerCase();
    if (searchValue === '') {
        searchedMealsSection.style.display = 'none';
        return;
    }

    searchedMealsSection.style.display = 'block';

    axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`)
        .then(response => {
            mealList.innerHTML = '';
            response.data.meals.forEach(meal => {
                const li = document.createElement('li');
                li.textContent = meal.strMeal;
                mealList.appendChild(li);
            });
        })
        .catch(error => console.error('Error searching meals:', error));
});

// Initial fetch for random meals
fetchRandomMeals();
