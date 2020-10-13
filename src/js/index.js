// Global app controller
import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Like from './models/Like';

import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likeView from './views/likeView';
import { elements, renderLoader, clearLoader } from './views/base';
/** Global state of the app
 * -search object
 * -current recipe object
 * -shopping list object
 * -liked recipes
 */
const state = {
    page: 1,
    isScrolled: false,
    
}
const controlSearch = async() => {
    // get query from view
    const query = searchView.getInput();
    
    if(query){
        // new search object and add to state
        state.search = new Search(query);

        //prepare UI for results
        searchView.clearInput();
        searchView.clearListResult();
        renderLoader(elements.result);

        try{
            //search for recipes
            await state.search.getResults();
            //console.log(state);
        

            //Render results on UI
            //console.log(state.search.result)
            clearLoader();
            searchView.renderResults(state.search.result);
        }catch(error){
            console.log(error);
            clearLoader();
        }
        
    }
}


const infiniteScroll = () => {
    if(window.scrollY > (document.body.offsetHeight - window.outerHeight) && !state.isScrolled) {
        state.isScrolled = true;
        state.page ++;
        if(state.search ){
            searchView.renderResults(state.search.result, state.page);
        }
        
        setTimeout(() => {
            state.isScrolled = false;
        }, 1000);
    }
}



//Recipe Controller
const controlRecipe = async () => {
    const id = window.location.hash.replace('#', '');
    //console.log(id)
    if(id){
        recipeView.clearRecipe()
        renderLoader(elements.recipe);

        //Highlight selected search item
        if(state.search)
            searchView.highlightSelected(id);
        //create new recipe object
        state.recipe = new Recipe(id);

        try{

            await state.recipe.getResults();

            state.recipe.calcTime();

            state.recipe.calcServings();
            state.recipe.parseIngredients();

            //console.log(state.recipe);
            clearLoader();
            recipeView.renderRecipe(
                state.recipe,
                state.likes.isLiked(id)
                );

        }catch(error){
            console.log(error)
        }

        

    }

    
}

//List Controller
const controlList = () => {
    //console.log('control')
    if(!state.list) state.list = new List();
    //console.log(state.recipe);

    state.recipe.ingredients.forEach( el => {
        //console.log(el);
        const {count, unit, ingredient} = el
        const item = state.list.addItem(count, unit, ingredient);
        listView.renderList(item)
    })

    
}

//Like Controller

const controlLike = () => {
    //console.log('like')
    if(!state.likes) state.likes = new Like();
    const id = state.recipe.id;
    //console.log(state.likes.isLiked(id))
    if(!state.likes.isLiked(id)){
        //user has not liked current recipe
        const {title,author,img} = state.recipe;
        const newLike = state.likes.addLike(
            id, author, title, img
        );

        likeView.toggleLikeBtn(true);
        likeView.renderLike(newLike);
        //console.log(state.likes)
    }else {
        state.likes.deleteItem(id);
        //console.log(state.likes)
        likeView.toggleLikeBtn(false);
        likeView.deleteLike(id);

    }

    likeView.toggleLikeMenu( state.likes.getNumLikes());
}
//window.addEventListener('hashchange', controlRecipe);
//window.addEventListener('load', controlRecipe);

['hashchange', 'load'].forEach( event => window.addEventListener(event, controlRecipe));

//handling delete and update shopping list clicks
elements.shoppingList.addEventListener('click', e=> {
    //console.log(e.target.closest('.shopping__item'));
    const id = e.target.closest('.shopping__item').dataset.itemid;
    //Handle the delete buttom

    if( e.target.matches('.shopping__delete, .shopping__delete *')){
        state.list.deleteItem(id);
        listView.deleteItem(id);
    }else if(e.target.matches('.shopping__count-value')){
        const val = parseFloat(e.target.value);
        state.list.updateCount(id,val);
    }

})

// handling recipe button clicks
elements.recipe.addEventListener('click', e => {
    //console.log(e);
    if( e.target.matches( '.btn-decrease, .btn-decrease *')){
        if(state.recipe.servings > 1){
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
        
    }else if( e.target.matches( '.btn-increase, .btn-increase *')){
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    }else if( e.target.matches('.recipe__btn--add, .recipe__btn--add *')){
        controlList();
    }else if( e.target.matches('.recipe__love, .recipe__love *')){
        controlLike();
    }
    
})

elements.searchButton.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
})

window.addEventListener('scroll', () => {
    //console.log('scroll') 
    infiniteScroll();
})

//Restore liked recipes on page load

window.addEventListener('load', () => {
    state.likes = new Like();

    //Restore likes
    state.likes.readStorage();
    //console.log(state.likes.likes)
    //toggle like menu button
    likeView.toggleLikeMenu( state.likes.getNumLikes());

    //render the existing likes
    state.likes.likes.forEach(like => likeView.renderLike(like))
})




