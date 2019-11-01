'use strict';

const list = document.getElementById('taskList');//task list element
const input = document.getElementById('searchInput');//search field filter
const dropdownFilter = document.getElementById('statusDropdown');//status filter
const statusFilter = document.getElementById('priorityDropdown');//priority filter
const createNewItem = document.getElementById('createButton');
const modal = document.getElementById('createNewItemModal');
const submitNewItemForm = document.getElementById('createNewItemModal');//priority filter
const newItemTitle = document.getElementById('newItemTitle');//title element of the new item
const newItemDescription = document.getElementById('newItemDescription');//description element of the new item
const newItemPriority = document.getElementById('newItemPriority');//priority element of the new item
const submitNewItem = document.getElementById('submitButton');//save button element
const cancelModal = document.getElementById('cancelButton');
let items  = [];

function displayModal() {
    modal.style.display = 'block';
}

function hideModal() {
    modal.style.display = 'none';
}

createNewItem.onclick = displayModal;
cancelModal.onclick = hideModal;

function createTaskItemHtml(title, description, priority, id) {
    const index = `${id}`;
    const item = document.createElement('div');
    item.innerHTML = `<div class="task-item-title">
                        <p>${title}</p>
                      </div>
                      <div class="task-item-description">
                        <p>${description}</p>
                      </div>
                      <div class="task-item-priority">
                        <p>${priority}</p>
                      </div>
                      <div class="task-item-more">
                        <button class="dropbtn">...</button>
                        <div class="task-item-more-content">
                        </div>
                      </div>
                `;
    item.setAttribute('class','taskItem');
    item.setAttribute('id',`taskItem_${id}`);
    list.appendChild(item);
    const moreMenu = document.querySelector(`#taskItem_${id} .task-item-more-content`);

    const completeButton = document.createElement('a');
    completeButton.setAttribute('href','#');
    completeButton.setAttribute('class','completeButton');
    completeButton.innerText = 'done';
    completeButton.addEventListener('click',function(event){
        items[index].isCompleted = true;
        document.querySelector(`#taskItem_${id}`).setAttribute('class','taskItemDone');
    });
    moreMenu.appendChild(completeButton);

    const editButton = document.createElement('a');
    editButton.setAttribute('href','#');
    editButton.setAttribute('class','editButton');
    editButton.innerText = 'edit';
    editButton.addEventListener('click',function(event){
        console.log('edit is pressed');
    });
    moreMenu.appendChild(editButton);

    const deleteButton = document.createElement('a');
    deleteButton.setAttribute('href','#');
    deleteButton.setAttribute('class','deleteButton');
    deleteButton.innerText = 'delete';
    deleteButton.addEventListener('click',function(event){
        items.splice(index,1);
        list.removeChild(item);
    });
    moreMenu.appendChild(deleteButton);
}

//rework
function addAllItemsToTheList(){
    for (let item in items){
        createTaskItemHtml(item.title, item.description, item.priority, item.id);
    }
}
//rework
function removeAllItemsInList(){
    let removeItemsArray = list.getElementsByClassName('taskItem');
    for (let item in removeItemsArray){
        list.removeChild(item);
    }
}

function newItemSubmitted (event){
    event.preventDefault();
    const TITLE = newItemTitle.value;
    const PRIORITY = newItemPriority.value;
    const DESCRIPTION = newItemDescription.value;
    const ID = items.length;
    // if the input isn't empty
    if(TITLE && PRIORITY){
        items.push({
            title : TITLE,
            description : DESCRIPTION,
            priority : PRIORITY,
            id : ID,
            isCompleted : false
        });
        createTaskItemHtml(TITLE, DESCRIPTION, PRIORITY, ID);
    } else {
        alert('Impossible to save, Title and Priority fields are required!');
    }
    hideModal();
    newItemTitle.value = '';
    newItemDescription.value = '';
    newItemPriority.value = 'high';
}
submitNewItem.addEventListener('click',newItemSubmitted);
submitNewItemForm.addEventListener('keyup',function(event){
    if(event.keyCode === 13){
        newItemSubmitted(event);
    }
});