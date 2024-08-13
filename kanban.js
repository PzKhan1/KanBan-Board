const addRef = document.querySelector('.actionWrapper .add .fa-plus');
const mainWrapRef = document.querySelector('.mainwrapper');
const textareaRef = document.querySelector(' .mainwrapper .leftsec textarea');
const taskwrapRef = document.querySelector('.taskWrapper');
const RightstateRef = document.querySelectorAll('.mainwrapper .rightsec .state');
const headerWrapRef = document.querySelector('header .categoryWrapper');
const deleteIconRef = document.querySelector('.actionWrapper .del');
const searchBoxRef = document.querySelector('.headerwrap .searchbox');

addRef.addEventListener('click' , (e) => {
   togglemodel();
})

function togglemodel(){
    const notHidden = mainWrapRef.classList.contains('hide');
    if(notHidden) {
        mainWrapRef.classList.remove('hide');
    }
    else{
        removeselected();
        defaultselected();
        
        mainWrapRef.classList.add('hide');
    }

}
const tasklist = JSON.parse(localStorage.getItem('Stask')  || '[]');

function render() {
    tasklist.forEach((item) => {
        createTask(item);
    })
}
render();

function addToStorage(task) {
    tasklist.push(task);
    localStorage.setItem('Stask' , JSON.stringify(tasklist));
}


textareaRef.addEventListener('keydown' , (e) => {
    const clrRef = document.querySelector('.mainwrapper .rightsec .state.selected');
    const selectedRef = clrRef.getAttribute('data-category'); 
    if(e.key == "Enter") {
        const newtask = {
            id: Math.random(),
            category: selectedRef,
            text: e.target.value,
        }

        addToStorage(newtask);
        
        console.log(tasklist);
        e.target.value = "";
        togglemodel();
        createTask(newtask);

    }

})

function createTask(task) {

    const temptask = document.createElement('div');

    temptask.className = 'tasks';
    temptask.setAttribute('data-id' , task.id);
    temptask.innerHTML = `<div class="taskCategory"  data-priority="${task.category}"></div>
    <div class="taskId"><p>TaskId -</p>${task.id}</div>
    <div class="taskTitle"><textarea class="text">${task.text}</textarea></div>   
    <div class="dustbin"><i class="fa-regular fa-trash-can"></i></div>
    `

    taskwrapRef.appendChild(temptask);

    // const delRef = temptask.querySelector('.dustbin .fa-trash-can');
    // delRef.addEventListener('click' , function(e){
        
    //    const tRef = e.target.closest('.tasks');
    // //    tRef.classList.add('hide');
    //  tRef.remove();
    //     deleteArray(tRef.taskId);
    // }) This is putting eventlisteners or every child which is bad approach

   


}



RightstateRef.forEach((item) => {
    item.addEventListener('click' , (e) => {
        
        removeselected();
        e.target.classList.add('selected');
    })

})


function removeselected() {
    RightstateRef.forEach((item) => {
        item.classList.remove('selected');
    })
}

function defaultselected() {
    const defRef = document.querySelector('.rightsec .state.p1 ');
    defRef.classList.add('selected');
}

function deleteArray(val) {
    const taskIndex = tasklist.findIndex((item) =>
        Number(item.id) === Number(val));

    console.log(taskIndex);
    tasklist.splice(taskIndex,1);
    localStorage.setItem('Stask' , JSON.stringify(tasklist));
    
    console.log(tasklist);
   
}XMLDocument

taskwrapRef.addEventListener('click' , (e) => {
    console.log(e.target.classList.contains('fa-trash-can'));
     if(e.target.classList.contains('fa-trash-can')){
        const tempDel =  e.target.closest('.tasks');
        tempDel.remove();
        const taskval = tempDel.getAttribute('data-id');
        console.log(taskval);
        deleteArray(taskval);
      }

       if(e.target.classList.contains('taskCategory')) {
         const curr = e.target.getAttribute('data-priority');
         const newPrity =  changePriority(curr);
         e.target.setAttribute('data-priority',newPrity);
         const taskId = Number(e.target.closest('.tasks').getAttribute('data-id'));
         console.log(taskId);
         updatePriority(taskId,newPrity);
         

       }
})

function changePriority(curr) {
    const priorityArray = ['p1' , 'p2' , 'p3' , 'p4'];
    const currPrityIdx = priorityArray.findIndex((p) => p === curr);
    const newPriorityIdx = (currPrityIdx+1)%4;
    return priorityArray[newPriorityIdx]; 


}

function updatePriority(taskId,newPrity) {

    const cInd = tasklist.findIndex((p) => Number(p.id) === Number(taskId));
    console.log(cInd);
    tasklist[cInd].category = newPrity;
    localStorage.setItem('Stask' , JSON.stringify(tasklist));

}

headerWrapRef.addEventListener('click',(e) => {
        
        // if(e.target.classList.contains('.categoryWrapper')){
        //     // const currClick = e.target.getAttribute('data-priority');
        //     console.log(e.target);
        //     // const tasksReff = document.querySelectorAll('.taskWrapper .tasks');
        //     // console.log(tasksReff);
        //     // tasksReff.forEach((item) =>{
        //     //     item.classList.remove('hide');
        //     //     const taskpriority = item.querySelector('.tasks .taskCategory').getAttribute('data-priority');
        //     //     if(currClick !== taskpriority){
        //     //         item.classList.add('hide');
        //     //     }
        //     // })
        // }
        
       if(e.target.classList.contains('state')){
        const currClick = e.target.getAttribute('data-priority');

        const tasksReff = document.querySelectorAll('.taskWrapper .tasks');


        

        tasksReff.forEach((item) => {
            item.classList.remove('hide');
            
            const  temp = item.querySelector('.taskWrapper .tasks .taskCategory');
            const indivClrRef = temp.getAttribute('data-priority');
        

            if(currClick !== indivClrRef){
                item.classList.add('hide');
            }
        })
        
       }
        
        

})

deleteIconRef.addEventListener('click' , (e) => {
    const isEnabled = e.target.classList.contains('enabled');
    if(isEnabled){
        e.target.classList.remove('enabled');
        document.querySelector('.taskWrapper').setAttribute('data-deleteEnabled',false);
    }
    else{
        e.target.classList.add('enabled');
        document.querySelector('.taskWrapper').setAttribute('data-deleteEnabled',true);
    }
    const firstTask = document.querySelector('.taskWrapper .tasks .fa-trash-can');
    firstTask.style.display = 'none';
    const firstTaskCat = document.querySelector('.taskWrapper .tasks .taskCategory');
    firstTaskCat.style.pointerEvents = 'none';
   
   

})
function readOnlytextArea() {
const firsttext = document.querySelector('.taskWrapper .tasks .text');
firsttext.style.pointerEvents = 'all';
firsttext.readOnly = 'true';
}
readOnlytextArea();

taskwrapRef.addEventListener('change', (e) => {
    if(e.target.classList.contains('text')){
    const newValue = e.target.value;
    console.log(newValue);
    const taskid = e.target.closest('.tasks').getAttribute('data-id');
    console.log(taskid);
    updateTexttoStorage(newValue , taskid);
    }
})


function updateTexttoStorage(updatedval , id) {
   const updtindx =  tasklist.findIndex((item) => Number(item.id) === Number(id));
   console.log(updtindx);
   tasklist[updtindx].text = updatedval;
   localStorage.setItem('Stask', JSON.stringify(tasklist));
}

searchBoxRef.addEventListener('keyup' , (e) => {
    console.log(e.target.value);
    taskwrapRef.innerHTML = "";
    tasklist.forEach((item) => {
        const text = item.text.toLowerCase();
        const inputval = e.target.value.toLowerCase();
        const id = String(item.id);

        if(inputval.trim() === "" || text.includes(inputval) || id.includes(inputval)){
            createTask(item);
        }
    })
})







