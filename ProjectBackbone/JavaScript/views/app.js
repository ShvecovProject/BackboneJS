/**
 * Created by Shvecov on 22.01.2015.
 */
var app = app || {};

app.AppView = Backbone.View.extend({
    el:'#todoapp',
    statsTemplate: _.template($('#stats-template').html()),
    events:{
        'keypress #new-todo' : 'createOnEnter',
        'click #clear-completed' : 'clearCompleted',
        'click #toggle-all' : 'toggleAllComplete'
    },
    initialize: function(){
        this.allCheckbox = this.$('#toggle-all')[0];
        this.$input = this.$('#new-todo');
        this.$footer = this.$('#footer');
        this.$main = this.$('#main');
        this.listenTo(app.TasksList, 'add',this.addOne);
        this.listenTo(app.TasksList, 'reset',this.addAll);
        this.listenTo(app.TasksList, 'change:completed', this.filterOne);
        this.listenTo(app.TasksList, 'filter', this.filterAll);
        this.listenTo(app.TasksList, 'all', this.render);
        app.TasksList.fetch();
    },
    render:function(){
        var completed = app.TasksList.completed().length;
        var remaining = app.TasksList.remaining().length;
        if(app.TasksList.length){
            this.$main.show();
            this.$footer.show();
            this.$footer.html(this.statsTemplate({
                completed:completed,
                remaining: remaining
            }));
            this.$('#filters li a').removeClass('selected')
                .filter('[href="#/'+(app.TodoFilter || '')+'"]')
                .addClass('selected');
        }
        else{
            this.$main.hide();
            this.$footer.hide();
        }
        this.allCheckbox.checked = !remaining;
    },


    addOne:function(todo){
        var view = new app.TaskView({model:todo});
        $('#todo-list').append(view.render().el);
    },

    addAll:function(){
        this.$('todo-list').html('');
        app.TasksList.each(this.addOne,this);
    },

    filterOne:function(todo){
        todo.trigger('visible');
    },

    filterAll:function(){
        app.TasksList.each(this.filterOne, this);
    },

    newAttributes:function(){
        return {
            title:this.$input.val().trim(),
            oreder: app.TasksList.nextOrder(),
            completed:false
        };
    },

    createOnEnter:function(event){
        if(event.which !==ENTER_KEY || !this.$input.val().trim()){
            return;
        }
        app.TasksList.create(this.newAttributes());
        this.$input.val('');
    },

    clearCompleted:function(){
        _.invoke(app.TasksList.completed(),'destroy');
        return false;
    },

    toggleAllComplete:function(){
        var completed = this.allCheckbox.checked;
        app.TasksList.each(function(todo){
            todo.save({
                'completed':completed
            })
        });
    }
});