/**
 * Created by Shvecov on 06.02.2015.
 */
var app = app||{};
app.Book = Backbone.Model.extend({
   defaults:{
       coverImage:'img/book.png',
       title:'NoTitle',
       author:'Unknown',
       keywords:'None'
   }
});
