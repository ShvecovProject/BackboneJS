/**
 * Created by Shvecov on 22.01.2015.
 */
var app = app || {};

app.TaskModel = Backbone.Model.extend({
   defaults:{     //дефолтные поля
       title:"",
       completed:false
   },
    toggle:function(){  //функция переключения состояния
        this.save({
            completed:!this.get('completed')
        });
    }
});