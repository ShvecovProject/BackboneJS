/**
 * Created by Shvecov on 06.02.2015.
 */
var app = app||{};
app.BookView = Backbone.View.extend({
    tagName:'div',
    className:'bookContainer',
    template: _.template($('#bookTemplate').html()),
    render:function(){
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});