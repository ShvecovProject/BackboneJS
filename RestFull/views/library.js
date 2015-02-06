/**
 * Created by Shvecov on 06.02.2015.
 */
var app = app||{};
app.LibraryView = Backbone.View.extend({
   el:'#books',
   initialize:function(initialBooks){
        this.collection = new app.Library(initialBooks);
       this.render();
   },
    render:function() {
        this.collection.each(function(el){
            this.renderBook(el);
        },this);
    },
    renderBook:function(el){
        var bookView = new app.BookView({
            model:el
        });
        this.$el.append(bookView.render().el)
    }
});