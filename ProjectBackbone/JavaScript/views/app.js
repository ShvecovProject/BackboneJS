/**
 * Created by Shvecov on 22.01.2015.
 */
var app = app || {};

app.AppView = Backbone.View.extend({
    el:'#todoapp',     //ссылка на элемент #todoapp
    statsTemplate: _.template($('#stats-template').html()),// скомпилированный шаблон #stats-template
    events: {// раздел событий относящихся к AppView
        'keypress #new-todo' : 'createOnEnter',// если произошло собитие нажатия на клавишу на элементе #new-todo
        'click #clear-completed' : 'clearCompleted',// если нажата кнопка удалить завершенные задачи
        'click #toggle-all' : 'toggleAllComplete'// усли нажали на кнопку изменеия статуса всех задач
    },
    initialize: function(){ // будет вызван в момент создания экземпляра
        this.allCheckbox = this.$('#toggle-all')[0];   // 1 элемент
        this.$input = this.$('#new-todo');// выбираем элемент #newtodo из el = #todoapp
        this.$footer = this.$('#footer'); //выбираем элемент #footer из el = #todoapp
        this.$main = this.$('#main');//выбираем элемент #main из el = #todoapp
        //listenTo указывает объекту object прослушивать конкретное событие другого объекта other.
        this.listenTo(app.TasksList, 'add',this.addOne); // слушаем событие add которое происходит у app.TasksList и подписываем соотв обюработчики
        this.listenTo(app.TasksList, 'reset',this.addAll);// слушаем событие reset которое происходит у app.TasksList
        this.listenTo(app.TasksList, 'change:completed', this._filterOne);// слушаем событие change:completed которое происходит у app.TasksList
        this.listenTo(app.TasksList, 'filter', this.filterAll);//слушаем событие filter которое происходит у app.TasksList
        this.listenTo(app.TasksList, 'all', this.render);//слушаем все собития all которое происходит у app.TasksList
        app.TasksList.fetch();
    },
    render:function(){
        var completed = app.TasksList.completed().length; // считаем количество завершенных задач
        var remaining = app.TasksList.remaining().length; //  считаем количество активных задач
        if(app.TasksList.length){ //если существует хоть 1 задача
            this.$main.show(); //элемент $main отобразить
            this.$footer.show();// элемент $footer отобразить
            this.$footer.html(this.statsTemplate({ // передача модели для statsTemplate
                completed:completed,
                remaining: remaining
            }));
            this.$('#filters li a').removeClass('selected')
                .filter('[href="#/'+(app.currentFilter || '')+'"]')
                .addClass('selected'); // исходя из установленного фильтра подсвечиваем текущий выбор
        }
        else{
            this.$main.hide();// элемент $main скрыть
            this.$footer.hide(); //элемент $footer скрыть
        }
        this.allCheckbox.checked = !remaining;
    },


    addOne:function(todo){//функция добавления нового элемента
        var view = new app.TaskView({model:todo});//создание View для отображения вновь созданной задачи
        $('#todo-list').append(view.render().el);// добавление в dom нового элемента
    },

    addAll:function(){ //
        this.$('todo-list').html('');
        app.TasksList.each(this.addOne,this);
    },

    filterAll:function(){ // срабатывает при изменении фильтра
        app.TasksList.each(this._filterOne, this);
    },

    createOnEnter:function(event){ // при создании новой задачи
        if(event.which !== ENTER_KEY || !this.$input.val().trim()){
            return;
        }
        app.TasksList.create(this._newAttributes()); // создать новый элемент коллекции
        this.$input.val('');// сбросить значение текстового поля при добалении новой задачи
    },

    clearCompleted:function(){//на каждом элементом коллецкии вызывается событие destroy которое слушает appView
        _.invoke(app.TasksList.completed(),'destroy');
        return false;
    },

    toggleAllComplete:function(){  // функция вызывается при клике на кнопку изменеия статуса всех задач
        var completed = this.allCheckbox.checked; // текущее состояние чек бокса
        app.TasksList.each(function(todo){  // меняем в каждом элементе коллекции свойство completed и сохраняем
            todo.save({
                'completed':completed
            })
        });
    },

    _filterOne:function(todo){// вызывается событие  visible для модели
        todo.trigger('visible');
    },

    _newAttributes:function(){ // шаблон новой задачи
        return {
            title:this.$input.val().trim(),
            oreder: app.TasksList.nextOrder(),// станавливаем позицию элементу
            completed:false
        };
    }
});