/**
 * Created by Shvecov on 06.02.2015.
 */
var app = app||{};
app.LibraryView = Backbone.View.extend({
   el:'#books',
    events: {
        'click #add': 'addBook'
           },
   initialize:function(initialBooks){
       this.collection = new app.Library(initialBooks);
       this.render();
       this.listenTo(this.collection, 'add' ,this.renderBook);
       this.listenTo(this.collection, 'deleteBook', this.renderBook)
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
    },
    addBook:function(e){
        e.preventDefault();
        var formData = {};
        $('#addBook div').children('input').each(function(i,el){
            if($(el).val()!=''){
                formData[el.id]=$(el).val();
            }
        });
        this.collection.add(new app.Book(formData));
    }

});