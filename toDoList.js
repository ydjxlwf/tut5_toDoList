document.addEventListener('DOMContentLoaded', function() { //保证打开页面是已经保存的任务
    displayTasks();
});
//localStorage.clear();
var i=0;

// 尝试从localStorage获取计数器值
var counter = localStorage.getItem('counter');

// 检查counter是否存在并且是否是一个有效的数字字符串
if (counter !== null && !isNaN(counter)) {
    i = parseInt(counter, 10);
}

function  addTask ()  { 
    //任务计数加一
    var p= document.getElementById("newTask" ).value;  
    document.getElementById("newTask") .value="";//清空输入框
    if(p){
        var taskExists = false;
        var taskNumber;
        for (var n = 1; n <= i; n++) {
            var taskKey = 'task_' + n;
            var taskValue = localStorage.getItem(taskKey);
            if (taskValue == p) {
                taskExists = true;
                taskNumber = n;
                break;
            }
        }
        if (taskExists) {
            showDeletePrompt(taskNumber, p); // 显示删除提示
        } else {
                i=i+1;               
                localStorage.setItem('counter',i.toString());   //存储任务计数
                //  Store  a  new task
                var key='task_'+i;
                localStorage.setItem(key,  p); 
                displayTasks();
            }
    }                    
}

function showDeletePrompt(taskNumber, taskContent) {
    if (confirm('Task "' + taskContent + '" already exists. Do you want to delete it?')) {
        deleteTask(taskNumber);
    }
}

function deleteTask(taskNumber) {
    var taskKey='task_'+taskNumber;
    localStorage.removeItem(taskKey);
    console.log(taskKey);
    displayTasks();
}

function displayTasks(){
     //更新页面内容
     var r = document.getElementById("tasks"); 
     r.innerHTML = '';
     for(var m = 1; m <= i; m++) { // 从1开始，因为0不是一个有效的任务
         var taskKey = 'task_' + m;
         var taskValue = localStorage.getItem(taskKey);
         if(taskValue) {
            var listItem = document.createElement("li");
            listItem.textContent = taskValue;
            r.appendChild(listItem);
         }
     }    
}

