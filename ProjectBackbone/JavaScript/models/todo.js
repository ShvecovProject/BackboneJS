/**
 * Created by Shvecov on 22.01.2015.
 */
var app = app || {};

app.TaskModel = Backbone.Model.extend({
   defaults:{
       title:"",
       completed:false
   },
    toggle:function(){
        this.save({
            completed:!this.get('completed')
        });
    }
});