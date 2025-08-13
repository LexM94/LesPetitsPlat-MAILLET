function displayRecipes(recipes) {
    const container = document.getElementById('recipes-container');
    container.innerHTML = '';
    
    recipes.forEach(recipe => {
      const card = document.createElement('div');
      card.classList.add('recipe-card');
    
      card.innerHTML = `
        <div class="recipe-card-img">
          <img src="./recipes/${recipe.image}" alt="${recipe.name}">
          <div class="recipe-card-time">
          ${recipe.time}min
          </div>
        </div>
    
        <div class="recipe-card-body">
          <h2 class="recipe-card-title">${recipe.name}</h2>
          
        <div class="recipe-card-description">
              <p class="subtitle">Recette</p>
              <p class="desc">${recipe.description.length > 150 ? recipe.description.slice(0, 150) + '...' : recipe.description}</p>
            </div>

          <div class="recipe-card-info">
          <p class="subtitle">Ingrédients</p>
            <div class="recipe-card-ingredients">
              ${recipe.ingredients.map(ingredient => `
                <p><strong>${ingredient.ingredient}:</strong> <br> ${ingredient.quantity || ''} ${ingredient.unit || ''}</p>
              `).join('')}
            </div>
  
          </div>
        </div>
      `;
    
      container.appendChild(card);
    });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    displayRecipes(recipes);
  });
  