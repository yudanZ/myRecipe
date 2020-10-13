import { elements } from './base';

export const shortenString = (str, length = 17) => {
    //Trim and re-trim only when necessary (prevent re-trim when string is shorted than maxLength, it causes last word cut) 
    if(str.length > length){
        const newArr = [];
        str.split(' ').reduce( (acc, curr) => {
            if( acc + curr.length <= length){
                newArr.push( curr )
            }
            return acc + curr.length;
        },0)

        return newArr.join(' ') + '...';
    }
    return str
    
}
const renderRecipe = recipe => {
    const Html = `<li>
                    <a class="results__link" href="#${recipe.recipe_id}">
                        <figure class="results__fig">
                            <img src="${recipe.image_url}" alt="Test">
                        </figure>
                        <div class="results__data">
                            <h4 class="results__name">${shortenString(recipe.title)}</h4>
                            <p class="results__author">${recipe.publisher}</p>
                        </div>
                    </a>
                </li>`;
    elements.resultsList.insertAdjacentHTML('beforeend', Html);
}

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = '';
}

export const clearListResult = () => {
    elements.resultsList.innerHTML = '';
};

export const highlightSelected = id => {
    const resultsArr = Array.from(document.querySelectorAll('.results__link'));
    resultsArr.forEach( el => el.classList.remove('results__link--active'));
    document.querySelector(`.results__link[href="#${id}"]`).classList.add('results__link--active');
}
export const renderResults = (recipes, page=1, resPerLoad = 10) => {
    const pages = Math.ceil( recipes.length / resPerLoad)
    const start = (page - 1) * resPerLoad;
    const end = page * resPerLoad;
    recipes.slice(start, end).forEach(recipe => renderRecipe(recipe));
}