let selectedTags = [];

document.addEventListener('DOMContentLoaded', function () {
  const ingredients = getUniqueValuesFromRecipes(recipes, 'ingredients');
  const appliances = getUniqueValuesFromRecipes(recipes, 'appliance');
  const ustensils = getUniqueValuesFromRecipes(recipes, 'ustensils');

  populateDropdown('ingredients-list', ingredients);
  populateDropdown('appliances-list', appliances);
  populateDropdown('ustensils-list', ustensils);

  function getUniqueValuesFromRecipes(recipes, key) {
    const allValues = recipes.flatMap(recipe => {
      if (key === 'ingredients') {
        return recipe[key].map(ingredient => ingredient.ingredient);
      }
      if (Array.isArray(recipe[key])) {
        return recipe[key];
      }
      return recipe[key];
    });
    return [...new Set(allValues)];
  }

  function closeDropdown(menuId) {
    const menu = document.getElementById(menuId);
    if (menu) menu.classList.remove('show');
  }

  function populateDropdown(menuId, items) {
    const menu = document.getElementById(menuId);
    menu.innerHTML = '';
  
    // Création du champ de recherche
    const searchContainer = document.createElement('div');
    searchContainer.classList.add('dropdown-search');
  
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Rechercher...';
    input.classList.add('dropdown-input');
  
    const searchIcon = document.createElement('span');
    searchIcon.classList.add('search-icon');
    searchIcon.textContent = '🔍';
  
    searchContainer.appendChild(input);
    searchContainer.appendChild(searchIcon);
    menu.appendChild(searchContainer);
  
    // Ajout de la liste des items
    items.forEach(item => {
      const itemButton = document.createElement('button');
      itemButton.classList.add('dropdown-item');
      itemButton.textContent = item;
      itemButton.setAttribute('data-tag', item);
      itemButton.addEventListener('click', function () {
        addTag(item);
        closeDropdown(menuId);
        updateRecipes();
      });
      menu.appendChild(itemButton);
    });
  
    // Filtrage dynamique quand on tape dans le champ de recherche
    input.addEventListener('input', () => {
      const query = input.value.toLowerCase();
      const buttons = menu.querySelectorAll('.dropdown-item');
      buttons.forEach(btn => {
        btn.style.display = btn.textContent.toLowerCase().includes(query) ? 'block' : 'none';
      });
    });
  }
  

  function addTag(tag) {
    if (!selectedTags.includes(tag)) {
      selectedTags.push(tag);
    }
    renderSelectedTags();
  }

  function removeTag(tag) {
    selectedTags = selectedTags.filter(t => t !== tag);
    renderSelectedTags();
    updateRecipes();
  }

  function renderSelectedTags() {
    const tagContainer = document.getElementById('selected-tags');
    tagContainer.innerHTML = '';
    selectedTags.forEach(tag => {
      const tagElement = document.createElement('span');
      tagElement.classList.add('tag');
      tagElement.textContent = tag;
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'x';
      deleteButton.classList.add('delete-tag');
      deleteButton.onclick = () => removeTag(tag);
      tagElement.appendChild(deleteButton);
      tagContainer.appendChild(tagElement);
    });
  }

  function toggleDropdown(menuId) {
    const menu = document.getElementById(menuId);
    menu.classList.toggle('show');
  }

  function updateRecipes() {
    const recipeContainer = document.getElementById('recipes-container');
    recipeContainer.innerHTML = '';
  
    const filteredRecipes = recipes.filter(recipe =>
      selectedTags.every(tag =>
        recipe.ingredients.some(i => i.ingredient === tag) ||
        recipe.appliance === tag ||
        recipe.ustensils.includes(tag)
      )
    );
  
    displayRecipes(filteredRecipes);
    const recipeCountElement = document.getElementById('recipe-count');
    if (recipeCountElement) {
    recipeCountElement.textContent = `${filteredRecipes.length} recettes`;
  }
    if (filteredRecipes.length === 0) {
      recipeContainer.innerHTML = '<p>Aucune recette ne correspond à votre recherche.</p>';
    }
  
    const updatedIngredients = getUniqueValuesFromRecipes(filteredRecipes, 'ingredients')
      .filter(val => !selectedTags.includes(val));
    const updatedAppliances = getUniqueValuesFromRecipes(filteredRecipes, 'appliance')
      .filter(val => !selectedTags.includes(val));
    const updatedUstensils = getUniqueValuesFromRecipes(filteredRecipes, 'ustensils')
      .filter(val => !selectedTags.includes(val));
  
      populateDropdown('ingredients-list', updatedIngredients);
      populateDropdown('appliances-list', updatedAppliances);
      populateDropdown('ustensils-list', updatedUstensils);
    }

  // Initialisation des dropdowns
  document.getElementById('ingredients-dropdown').querySelector('button').addEventListener('click', () => toggleDropdown('ingredients-list'));
  document.getElementById('appliances-dropdown').querySelector('button').addEventListener('click', () => toggleDropdown('appliances-list'));
  document.getElementById('ustensils-dropdown').querySelector('button').addEventListener('click', () => toggleDropdown('ustensils-list'));
});
