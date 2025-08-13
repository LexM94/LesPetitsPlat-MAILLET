// Fonction pour afficher le nombre de recettes affichées
function updateRecipesCount(count) {
  const recipeCountElement = document.getElementById('recipe-count');
  if (recipeCountElement) {
    recipeCountElement.textContent = `${count} recettes`;
  }
}

// Fonction pour gérer la recherche et les suggestions
function createAutocompleteSuggestions(query) {
  const list = document.getElementById('autocomplete-list');
  list.innerHTML = ''; // Vide la liste des suggestions à chaque nouvelle entrée

  const searchTerms = query.toLowerCase().split(/\s+/); // ['mot clé', 'mot clé']

  // Filtrage des recettes selon la recherche
  const suggestions = recipes.filter(recipe => {
    const textContent = [
      recipe.name,
      recipe.description,
      ...recipe.ingredients.map(ing => ing.ingredient)
    ].join(' ').toLowerCase();

    // Vérifie que chaque mot-clé de recherche est présent dans le texte de la recette
    return searchTerms.every(term => textContent.includes(term));
  });

  // Si aucune suggestion n'est trouvée
  if (suggestions.length === 0) {
    const item = document.createElement('div');
    item.classList.add('autocomplete-item');
    item.textContent = `Aucune suggestion pour "${query}"`;
    list.appendChild(item);
    return;
  }

  // Afficher les suggestions dans le dropdown
  suggestions.forEach(recipe => {
    const item = document.createElement('div');
    item.classList.add('autocomplete-item');
    item.textContent = recipe.name;

    item.addEventListener('click', () => {
      // Lorsqu'on clique sur une recette, on la sélectionne et on met à jour l'affichage
      document.querySelector('.form-control').value = recipe.name; // Remplit le champ de recherche avec le nom de la recette
      list.innerHTML = ''; // Vide la liste des suggestions

      // Affiche la recette sélectionnée
      displayRecipes([recipe]); // Affiche uniquement la recette sélectionnée
      updateRecipesCount(1); // Affiche 1 recette sélectionnée
    });

    list.appendChild(item);
  });

  // Mise à jour du nombre de recettes affichées
  updateRecipesCount(suggestions.length);

  // Afficher toutes les recettes filtrées
  displayRecipes(suggestions);

  // Mise à jour des dropdowns (si nécessaire)
  updateDropdowns(suggestions);
}

document.querySelector('.form-control').addEventListener('input', (e) => {
  const value = e.target.value.trim(); // Récupère la valeur de la barre de recherche

  if (value.length >= 3) {
    createAutocompleteSuggestions(value); // Crée des suggestions si la recherche contient plus de 3 caractères
  } else {
    document.getElementById('autocomplete-list').innerHTML = ''; // Vide les suggestions si moins de 3 caractères

    // Si la barre de recherche est vide, affiche toutes les recettes
    if (value === "") {
      displayRecipes(recipes); // Affiche toutes les recettes
      updateRecipesCount(recipes.length); // Met à jour le nombre de recettes
    } else {
      // Affiche toutes les recettes filtrées en fonction de la recherche
      createAutocompleteSuggestions(value);
    }

    updateDropdowns(recipes); // Réinitialise les dropdowns avec toutes les recettes

    // Réinitialiser le compteur à toutes les recettes si la recherche est vide
    updateRecipesCount(recipes.length);
  }
});


// Initialisation des recettes lorsque la page est chargée
document.addEventListener('DOMContentLoaded', function () {
  displayRecipes(recipes); // Affiche toutes les recettes initialement
  updateRecipesCount(recipes.length); // Affiche le nombre total de recettes
});
