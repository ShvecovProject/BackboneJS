/**
 * Created by Shvecov on 06.02.2015.
 */
var app = app||{};
app.Book = Backbone.Model.extend({
   defaults:{
       coverImage:'',
       title:'NoTitle',
       releaseDate:'None',
       author:'Unknown',
       keywords:'None'
   }
});
