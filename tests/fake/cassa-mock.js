'use strict';
var drinks = {
    'juice': {price: 2},
    'vodka': {price: 10},
    'whisky': {price: 15},
    'beer': {price: 4}
};
class CassaMock {
    constructor(){
        this._drinkName = '';
        this._drinks = drinks;
        this._amount = 0;
    }
    get drinkName(){
        return this._drinkName;
    }

    set drinkName(drinkName){
        this._drinkName = drinkName;
    }

    set volume(volume){
        this._volume = volume;
    }

    get volume(){
       return  Math.floor(this._volume/100 * this._drinks[this.drinkName].price);
    }

    get invoice(){
        return this.drinkName + ' ' + this.volume;
    }

}
module.exports = CassaMock;
/**
 * Created by HP on 2/1/2017.
 */
