const tasksTypes = ['t1', 't2', 't3']
const taskHeads = ['taskTitle', 'taskTypes','taskDescription']
const formButton = document.querySelector('#formButton')
const formSection = document.querySelector('#formSection')
const taskTypes = document.querySelector('#taskTypes')
const allTasks = document.querySelector('#allTasks')
const formData = document.querySelector('#formSection form')

const addElement = function(parent, element, attributes, classes, txt){
    const ele = document.createElement(element)
    parent.appendChild(ele)
    if(classes!="") ele.classList=classes
    if(txt!="") ele.innerText=txt
    attributesTypes = Object.keys(attributes)
    attributesTypes.forEach(attr=>{
        ele.setAttribute(attr, attributes[attr])
    })
    return ele
}
tasksTypes.forEach(t=>{
    op = addElement(taskTypes, 'option', {value:t},'',t)
})
const getTasks=function(){
    tasks = localStorage.getItem('tasks')||'[]'
    return JSON.parse(tasks)
}
const setTasks = function(tasks){
    localStorage.setItem('tasks', JSON.stringify(tasks))
}
const showSingleTask = function(task, i){
    tasks = getTasks()
    document.querySelector('#noTasks').classList.add('d-none')
    div = addElement(allTasks,'div',{},'col-4','')
    div1 = addElement(div, 'div',{}, 'x p-3','')
    task.status? div1.classList.add('bg-success'):div1.classList.add('bg-warning')
    addElement(div1, 'h4',{},'',task.taskTitle)
    addElement(div1, 'h5',{},'',task.taskTypes)
    addElement(div1, 'p',{},'',task.taskDescription)
    btnDelete =addElement(div1, 'button',{},'btn btn-danger mx-2','delete')
    btnDelete.addEventListener('click', function(e){
        console.log(i)
    })
    btnEdit = addElement(div1, 'button',{},'btn btn-primary mx-2','change status')
    btnEdit.addEventListener('click', function(e){
        tasks[i].status =!tasks[i].status
        tasks[i].status? 
        document.querySelectorAll('.x')[i].classList='bg-success p-3 x'
        :document.querySelectorAll('.x')[i].classList='bg-warning p-3 x'
        setTasks(tasks)
    })
}
const ShowTasks = function(){
    tasks = getTasks()
    if(tasks.length!=0){
        document.querySelector('#noTasks').classList.add('d-none')
        tasks.forEach((task, i)=>{
            showSingleTask(task,i)
        })
    }
}
formButton.addEventListener('click', function(e){
    this.innerText==="show add form"?this.innerText="hide add form":this.innerText="show add form";
    formSection.classList.toggle('d-none')
})
formData.addEventListener('submit', function(e){
    e.preventDefault()
    task={status:false}
    taskHeads.forEach(head => task[head]= this.elements[head].value )
    tasks = getTasks()
    tasks.push(task)
    setTasks(tasks)
    this.reset()
    formButton.innerText="show add form"
    formSection.classList.toggle('d-none')
    showSingleTask(task, tasks.length)
})
ShowTasks()



