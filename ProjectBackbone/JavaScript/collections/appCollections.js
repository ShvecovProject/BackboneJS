/**
 * Created by Shvecov on 22.01.2015.
 */
var app = app || {};

var TasksList = Backbone.Collection.extend({
    // ссылка на модель коллекции
   model:app.TaskModel,

   localStorage: new Backbone.LocalStorage('todo-backbone'),

   completed:function(){ //!
       return this.filter(function(todo){
          return todo.get('completed');
       });
   },

    remaining:function(){
        return this.without.apply(this, this.completed());   // удалить с коллекции все завершенные задачи
    },

    nextOrder:function(){  // получаем новое значение поля order к вновь создаваемой модели.
        if(!this.length){
            return 1;
        }
        return this.last().get('order')+1;
    },

    comparator:function(todo){ //! функция компаратор, сортирует коллекцию
        return todo.get('order');
    }
});
app.TasksList = new TasksList();