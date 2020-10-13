export default class Like {
    constructor(){
        this.likes = [];
    }

    addLike( id, author, title, img){

        const item = {
            id, 
            author, 
            title,
            img
        }
        this.likes.push(item);
        //Perist data in localStorage
        this.persistData();
        return item;
    }

    deleteItem (id) {
        const index = this.likes.findIndex( el => el.id === id);
        this.likes.splice(index, 1);

        //Perist data in localStorage
        this.persistData();
    }

    isLiked(id){
        return this.likes.findIndex( el => el.id === id) !== -1;
    }

    getNumLikes(){
        return this.likes.length;
    }

    persistData(){
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }

    readStorage(){
        const storage = JSON.parse(localStorage.getItem('likes'))
        
        //Restoring likes from the localstorage
        if(storage){
            this.likes = storage;
        }
    }

}