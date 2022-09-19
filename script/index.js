//getting the required elements
const inputBox = document.querySelector('.input-field input');
const addBtn = document.querySelector('.input-field button');
const todolist = document.querySelector('.todolist');
const form = document.getElementById("form")
const searchInput = document.getElementById("search-text");
const deleteAllBtn = document.querySelector(".footer button");



let days = ["Sunday", "Monday", "Tuesday", "Wednesday" ,"Thursday", "Friday", "Saturday"]

let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

let todos = []

function formatDate() {
    const actualDate = new Date()
    // console.log(actualDate.getDay()) // Sunday
    // console.log(actualDate.getDate()) // 10th
    // console.log(actualDate.getMonth()) // July
    // console.log(actualDate.getFullYear()) // 2022
    // console.log(actualDate.getHours()) // 22
    // console.log(actualDate.getMinutes()) // 38


    return `${days[actualDate.getDay()]}, ${actualDate.getDate() } ${months[actualDate.getMonth()]} ${actualDate.getFullYear()}, ${actualDate.getHours()}:${actualDate.getMinutes()}`
}


inputBox.addEventListener("keypress", function(event){
    //if user presses "enter" key on the keyboard
 if(event.key === "Enter"){
    //cancel the default action
    event.preventDefault;
    //trigger the button element with a click
    addBtn.click();
 }
 
});

inputBox.onkeyup = ()=>{
    //getting user entered value
   let userData = inputBox.value; 
   //if user values aren't only spaces
    if(userData.trim() != 0){
    //activate the add button
     addBtn.classList.add('active');
   }else{
     addBtn.classList.remove('active');
   }
}


//when user clicks on the add button
addBtn.onclick= ()=>{

    let userData = inputBox.value;
    //getting localstorage
    let getLocalStorage = localStorage.getItem('New Todo');
    //if localstorage is null
    if(getLocalStorage === null){
        //creating empty array
        listArr = [];
    }else{
        listArr = JSON.parse(getLocalStorage);
    }
    //adding userdata
    let eachTodo = {}
    eachTodo.todoInput = userData
    eachTodo.date = formatDate();
    // listArr.push(eachTodo)
    todos.push(eachTodo)
    console.log(todos)
    //transforming js object to json string
    // localStorage.setItem("New Todo", JSON.stringify(listArr));
    //calling function "showtasks"
    showTasks();
    addBtn.classList.remove('active');
}


//function to add task list inside url
function showTasks(){
    let getLocalStorage = localStorage.getItem('New Todo');
    if(getLocalStorage === null){
        listArr = {};
    }else{
        listArr = JSON.parse(getLocalStorage);
    }
    //passing the length value in pendingNum
    const pendingNumber = document.querySelector(".pendingNum");
    pendingNumber.textContent = todos.length;
    if(todos.length > 0){
        deleteAllBtn.classList.add("active");
    }else{
        deleteAllBtn.classList.remove("active")
    }

    let newLiTag = "";
    todos.forEach((element, index) => {
        // console.log(element.todoInput)
    newLiTag += `<li> ${element.todoInput}<span onclick="editTask(${index})" id="edit">Edit</span><span onclick="deleteTask(${index})" id="delete"><i class='bx bxs-trash'></i></span></li>
    <p>${element.date}</p>`;

    });
    //adding newLiTag inside ul tag
    todolist.innerHTML = newLiTag;
    //once task added leave the input field blank
    inputBox.value = "";
}


//function to delete task
function deleteTask(index){
    let getLocalStorage = localStorage.getItem('New Todo')
    listArr = JSON.parse(getLocalStorage);
    //delete or remove the particular indexed li
    todos.splice(index, 1);
    //after remove the li again update the local storage
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    //calling function "showtasks"
    showTasks();
}

function editTask(index) {
    // const check = document.getElementById("editable")
    // // console.log(index)

    // let getLocalStorage = localStorage.getItem('New Todo')
    // listArr = JSON.parse(getLocalStorage);
    // console.log(listArr[index])
    // let current = listArr[index]
    // current.todoInput = check.value
    // let editted = document.getElementById("edit")
    // // let item = document.getElementById("editable")
    // // console.log(editted.innerText)
    // if (editted.innerText === "Edit") {
    // check.removeAttribute("readonly")
    // listArr[index].todoInput = check.value
    // editted.innerText = "Save"
    // } else {
    //     check.setAttribute("readonly", "readonly")
    // }
    
    // localStorage.setItem("New Todo", JSON.stringify(listArr));
    // showTasks();


}


searchInput.addEventListener("keyup", (e) => {
    let value = e.target.value.toLowerCase();

    // let getLocalStorage = localStorage.getItem('New Todo')
    // listArr = JSON.parse(getLocalStorage);
    const filtered = todos.filter((val) => {
        return val.todoInput.toLowerCase().includes(value)
    })

    const pendingNumber = document.querySelector(".pendingNum");
    pendingNumber.textContent = filtered.length;

    let newLiTag = "";
    filtered.forEach((element, index) => {
        // console.log(element.todoInput)
    newLiTag += `<li> ${element.todoInput}<span onclick="editTask(${index})" id="edit">Edit</span><span onclick="deleteTask(${index})" id="delete"><i class='bx bxs-trash'></i></span></li>
    <p>${element.date}</p>`;

    });
    //adding newLiTag inside ul tag
    todolist.innerHTML = newLiTag;
    //once task added leave the input field blank
    inputBox.value = "";

})


// {/* <i class='bx bx-edit'></i> */}