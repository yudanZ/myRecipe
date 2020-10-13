import { elements } from './base';
import { shortenString } from './searchView'
export const toggleLikeBtn = isLiked => {
    const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';
    document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${iconString}`)
}

export const toggleLikeMenu = numLikes => {
    //console.log(numLikes);
    elements.likesMenu.style.visibility = numLikes > 0 ? 'visible':'hidden';
    
}

export const renderLike = item => {
    const markup = `
        <li>
            <a class="likes__link" href="#${item.id}">
                <figure class="likes__fig">
                    <img src="${item.img}" alt="Test">
                </figure>
                <div class="likes__data">
                    <h4 class="likes__name">${shortenString(item.title)}</h4>
                    <p class="likes__author">${item.author}</p>
                </div>
            </a>
        </li>     
    `;
    elements.likesList.insertAdjacentHTML('beforeend', markup);
};

export const deleteLike = id => {
    const el = document.querySelector(`.likes__link[href*="${id}"]`).parentElement;
    if(el){
        el.parentElement.removeChild(el);
    }
}