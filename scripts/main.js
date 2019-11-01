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
    item.innerHTML = `<div class="taskItem" id="taskItem_${id}">
                    <div class="task-item-title">
                        <h4>${title}</h4>
                    </div>
                    <div class="task-item-description">
                      <p>${description}</p>
                    </div>
                    <div class="task-item-priority">
                        <p>${priority}</p>
                    </div>
                    <div class="task-item-more">
                    </div>
                </div>
                `;
    list.appendChild(item);
    const moreMenu = document.querySelector(`#taskItem_${id}>.task-item-more`);

    const completeButton = document.createElement('button');
    completeButton.setAttribute('type','button');
    completeButton.setAttribute('class','completeButton');
    completeButton.innerText = 'Complete';
    completeButton.addEventListener('click',function(event){
        items[index].isCompleted = true;
        document.querySelector(`#taskItem_${id}`).setAttribute('style','background-color:gray');
    });
    moreMenu.appendChild(completeButton);

    const editButton = document.createElement('button');
    editButton.setAttribute('type','button');
    editButton.setAttribute('class','editButton');
    editButton.innerText = 'Edit';
    editButton.addEventListener('click',function(event){
        console.log('edit is pressed');
    });
    moreMenu.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.setAttribute('type','button');
    deleteButton.setAttribute('class','deleteButton');
    deleteButton.innerText = 'Delete';
    deleteButton.addEventListener('click',function(event){
        items[index].splice(index,1);
        list.removeChild(item);
    });
    moreMenu.appendChild(deleteButton);
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
