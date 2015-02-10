/**
 * Created by Shvecov on 06.02.2015.
 */
var app = app||{};
$(function(){
   var books = [
       {title:'Javascript: The Good Parts', author:'Douglas Crockford',releaeDate:'2008', keywords:'Javascript Programming'},
       {title:'The little book on CoffeScripts',author:'Alex',releaseDate:'2012', keywords:'CoffeScript Programming'},
       {title:'Scala for the Impatient',author:'Cay S. Horstmann',releaseDate:'2012', keywords:'Scala Programming'},
       {title:'Eloquent JS',author:'Martin Haverbeke',releaseDate:'2011', keywords:'Javascript Programming'}
   ];
    new app.LibraryView(books);
});