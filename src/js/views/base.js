export const elements = {
    searchInput : document.querySelector('.search__field'),
    searchButton : document.querySelector('.search'),
    resultsList : document.querySelector('.results__list'),
    result: document.querySelector('.results'),
    resultsLink: document.querySelector('.results__link'),
    recipe: document.querySelector('.recipe'),
    shoppingList: document.querySelector('.shopping__list'),
    recipeBtn: document.querySelector('.recipe__btn'),
    likesList: document.querySelector('.likes__list'),
    
    likesMenu: document.querySelector('.likes__field')
}

export const elementStrings = {
    loader: 'loader2'
}

export const renderLoader = parent => {
    const loader = `
                    <div class='${elementStrings.loader}'>
                       
                    </div>
                    `;
    parent.insertAdjacentHTML('afterbegin', loader);
}

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if(loader) loader.parentElement.removeChild(loader)
}