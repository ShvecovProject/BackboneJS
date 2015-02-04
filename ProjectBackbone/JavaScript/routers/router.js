/**
 * Created by Shvecov on 22.01.2015.
 */
var Workspace = Backbone.Router.extend({
   routes:{
     '*filter' : 'setFilter'
   },
   setFilter:function(param){
       app.currentFilter = param;
       window.app.TasksList.trigger('filter');
   }
});
app.AppRouter = new Workspace();
if(!backboneHistory) {
    var backboneHistory = Backbone.history.start();
}