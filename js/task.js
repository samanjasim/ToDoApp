/*jslint browser: true */
/*global $, jQuery, alert, console, google */
$(document).ready(function () {
    'use strict';
    var tasks = (function () {
        var tasks,
        
            // cache DOM
            $form = $('.form-horizontal'),
            $taskNameInput = $form.find('#task-name-input'),
            $taskDateInput = $form.find('#task-date-input'),
            $taskDescInput = $form.find('#task-desc-input'),
            $addTask = $form.find('#add-task'),
            
            $initPanel = $('#init-panel'),
            
            $taskList = $('.task-list'),
            $taskItem = $taskList.find('.task-item'),
            $taskName = $taskItem.find('.task-name'),
            $taskDate = $taskItem.find('.task-date'),
            $taskDesc = $taskItem.find('.task-body p'),
            
            $status = $('#status'),
            
            $removeModal = $('#removeModal'),
            $deleteBtn = $removeModal.find('#delete-btn'),
            
            $editModal = $('#edit-modal'),
            $modalTaskName = $editModal.find('#modal-task-name'),
            $modalTaskDate = $editModal.find('#modal-task-date'),
            $modalTaskDesc = $editModal.find('#modal-task-desc'),
            $editBtn = $editModal.find('#edit-btn'),
            
            taskNameVal,
            taskDateVal,
            taskDescVal,
            
            targetItem;
        
        
        // checking the local-Storage
        if (typeof (Storage) !== 'undefined') {
            if (localStorage.tasks) {
                var tasksData = localStorage.tasks;
                tasks = JSON.parse(tasksData);
                
            } else {
                tasks = [];
                localStorage.setItem('tasks', JSON.stringify(tasks));
            }
        } else {
            alert('not Supported');
        }
        
        ///////// binding Event /////////
        // addTask Event
        $addTask.on('click', addTask);
        
        // show-remove btn click Event:- to set the target Item and save it in the targetItem variable.
        $taskList.on('click', '.show-remove', setItem);
        // delete-btn event handler
        $deleteBtn.on('click', deleteItem);
        
        // show-edit btn click Event:- to set the target Item and save it in the targetItem Variable.
        $taskList.on('click', '.show-edit', setItem);
        // show-edit btn click Event:- to set the Text of the Item inside the Form input Text
        $taskList.on('click', '.show-edit', setEditForm);
        // edit-btn event handler
        $editBtn.on('click', editTask);
        
        // function to display and render the HTML part of the Code
        function _render() {
            // clear the list first
            $taskList.html('');
            
            if (tasks.length === 0) {
                $taskList.css({
                    display: 'none'
                });
                $initPanel.css({
                    display: 'block'
                });
            } else {
                $initPanel.css({
                    display: 'none'
                });
                $taskList.css({
                    display: 'block'
                });
                
                tasks.forEach(function (val) {
                    $taskList.html(
                        '<li class="task-item">'
                            + '<h4 class="task-header">'
                            +     '<span class="pull-left task-name">' + val.taskName + '</span>'
                            +     '<span class="pull-right task-date">' + val.taskDate + '</span>'
                            +     '<div class="clearfix"></div>'
                            + '</h4>'

                            + '<div class="task-body">'
                            +     '<p>' + val.taskDesc + '</p>'
                            + '</div>'

                            + '<div class="task-footer">'
                            +     '<button class="btn btn-default show-remove" type="button" data-target="#removeModal" data-toggle="modal">'
                            +         '<span class="fa fa-trash-o fa-lg"></span>'
                            +     '</button>'
                            +     '<button class="btn btn-default show-edit" type="button" data-target="#edit-modal" data-toggle="modal">'
                            +         '<span class="fa fa-pencil fa-lg"></span>'
                            +     '</button>'
                            + '</div>'

                            + '</li>' + $taskList.html()
                    );
                });
            }
        }
        
        
        function _resetForm() {
            $taskNameInput.val('');
            $taskDateInput.val('');
            $taskDescInput.val('');
        }
        
        // addTask Event Handler 
        function addTask() {
            taskNameVal = $taskNameInput.val();
            taskDateVal = $taskDateInput.val();
            taskDescVal = $taskDescInput.val();
            $status.text('');
            
            if (taskNameVal === '' || taskDateVal === '') {
                $status.text('you should Enter Task Name and the Task Date');
                return;
            }
                        
            var task = {
                taskName: taskNameVal,
                taskDate: taskDateVal,
                taskDesc: taskDescVal
            };
            
            tasks.push(task);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            _render();
            _resetForm();
        }
        
        //setItem Event handler
        function setItem(e) {
            var target = e.target;
            targetItem = $(target).parents('.task-item');
        }
        
        // deleteItem event Handler
        function deleteItem() {
            var delTaskName = $(targetItem).find('.task-name').text(),
                delTaskDate = $(targetItem).find('.task-date').text();
            
            
            // find the task-item from the tasks Array
            tasks = tasks.filter(function (val) {
                if (val.taskName === delTaskName && val.taskDate === delTaskDate) {
                    return false;
                } else {
                    return true;
                }
            });
            
            // update the LocalStorage with the New tasks Array
            localStorage.setItem('tasks', JSON.stringify(tasks));
            _render();
        }
        
        // setEditForm Event Handle
        function setEditForm(e) {
            console.log('setForm');
            var target = $(e.target).parents('.task-item'),
                editTaskName = target.find('.task-name').text(),
                editTaskDate = target.find('.task-date').text(),
                editTaskDesc = target.find('.task-body p').text(),
                
                date = new Date(editTaskDate),
                
                day = (date.getDate()) < 10 ? "0" + date.getDate() : date.getDate(),
                month = (date.getMonth()) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1),
                year = date.getFullYear(),
                
                dateSting = year + "-" + month + "-" + day;
            
            $modalTaskName.val(editTaskName);
            
            // the date input only Excipt a String date with the right Format YYYY-MM-DD
            $modalTaskDate.val(dateSting);
            
            $modalTaskDesc.text(editTaskDesc);
        }
        
        //editTask Event Handler
        function editTask() {
            var delTaskName = $(targetItem).find('.task-name').text(),
                delTaskDate = $(targetItem).find('.task-date').text();
            
            
            // find the task-item from the tasks Array
            tasks.forEach(function (val) {
                if (val.taskName === delTaskName && val.taskDate === delTaskDate) {
                    val.taskName = $modalTaskName.val();
                    val.taskDate = $modalTaskDate.val();
                    val.taskDesc = $modalTaskDesc.val();
                }
            });
            
            // update the LocalStorage with the New tasks Array
            localStorage.setItem('tasks', JSON.stringify(tasks));
            _render();
        }
        
        // call when Page Load
        _render();
        
    }());
    
});