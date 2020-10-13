//import uniqid from 'uniqid';
export default class List {
    constructor(){
        this.items = [];
    }
    getUniqueId () {
        // Math.random should be unique because of its seeding algorithm.
        // Convert it to base 36 (numbers + letters), and grab the first 9 characters
        // after the decimal.
        return '_' + Math.random().toString(36).substr(2, 9);
    };
    addItem( count, unit, ingredient){

        const item = {
            id: this.getUniqueId(),
            count, 
            unit,
            ingredient
        }
        this.items.push(item);
        return item;
    }

    deleteItem (id) {
        const index = this.items.findIndex( el => el.id === id);
        this.items.splice(index, 1);

    }

    updateCount(id, newCount) {
        this.items.find(el => el.id === id).count = newCount;
    }
}