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
  list.innerHTML = '';

  const searchTerms = query.toLowerCase().split(/\s+/);
  const suggestions = [];

  // --- Remplace recipes.filter ---
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];

    // Construire le texte comme dans ta version fonctionnelle
    let textContent = recipe.name + " " + recipe.description;
    for (let j = 0; j < recipe.ingredients.length; j++) {
      textContent += " " + recipe.ingredients[j].ingredient;
    }
    textContent = textContent.toLowerCase();

    // Vérifier que tous les termes de recherche sont présents
    let allTermsPresent = true;
    for (let k = 0; k < searchTerms.length; k++) {
      if (!textContent.includes(searchTerms[k])) {
        allTermsPresent = false;
        break;
      }
    }

    if (allTermsPresent) {
      suggestions.push(recipe);
    }
  }

  // --- Affichage ---
  if (suggestions.length === 0) {
    const item = document.createElement('div');
    item.classList.add('autocomplete-item');
    item.textContent = `Aucune suggestion pour "${query}"`;
    list.appendChild(item);
    return;
  }

  for (let i = 0; i < suggestions.length; i++) {
    const recipe = suggestions[i];
    const item = document.createElement('div');
    item.classList.add('autocomplete-item');
    item.textContent = recipe.name;

    item.addEventListener('click', () => {
      document.querySelector('.form-control').value = recipe.name;
      list.innerHTML = '';
      displayRecipes([recipe]);
      updateRecipesCount(1);
    });

    list.appendChild(item);
  }

  updateRecipesCount(suggestions.length);
  displayRecipes(suggestions);
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
