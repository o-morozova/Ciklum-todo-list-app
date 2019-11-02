'use strict';

const list = document.getElementById('taskList');//task list container

const searchInput = document.getElementById('searchInput');//search field input
const searchButton = document.getElementById('searchButton');//search field submit button
const statusFilter = document.getElementById('status');//priority filter
const priorityFilter = document.getElementById('priority');//status filter
const createNewItem = document.getElementById('createButton');//create item button

const modal = document.getElementById('createNewItemModal');//Modal window for adding items
const newItemTitle = document.getElementById('newItemTitle');//title element of the new item
const newItemDescription = document.getElementById('newItemDescription');//description element of the new item
const newItemPriority = document.getElementById('newItemPriority');//priority element of the new item
const submitNewItem = document.getElementById('submitButton');//save button element
const cancelModal = document.getElementById('cancelButton');//cancel item submit button

const editModal = document.getElementById('editItemModal');//Modal window for editing items
const editItemTitle = document.getElementById('editItemTitle');//title element of the new item
const editItemDescription = document.getElementById('editItemDescription');//description element of the new item
const editItemPriority = document.getElementById('editItemPriority');//priority element of the new item
const editItemStatus = document.getElementById('editItemStatus');//priority element of the new item
const editItemSubmit = document.getElementById('editSubmitButton');//save button element
const editItemCancel = document.getElementById('editCancelButton');

let items  = [];//array to store all objects of the created tasks




function displayModal() {
    modal.style.display = 'block';
}

function displayEditForm() {
    editModal.style.display = 'block';
}

function hideModal() {
    modal.style.display = 'none';
}

function hideEditModal() {
    editModal.style.display = 'none';
}

createNewItem.onclick = displayModal;
cancelModal.onclick = hideModal;
editItemCancel.onclick = hideEditModal;

//to finish
function fillEditForm(id) {
    const index = `${id}`;
    let item = items[index];

    const TITLE = item.title;
    const DESC = item.description;
    const PRIORITY = item.priority;
    const STATUS = item.status;

    editItemTitle.value = TITLE;
    editItemDescription.value = DESC;
    editItemPriority.value = PRIORITY;
    editItemStatus.value = STATUS;

    editItemSubmit.onclick = function (id) {
    }
}

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
    items[index].status === 'open' ?
        item.setAttribute('class','taskItem') :
        item.setAttribute('class','taskItemDone');

    item.setAttribute('id',`taskItem_${id}`);
    list.appendChild(item);
    const moreMenu = document.querySelector(`#taskItem_${id} .task-item-more-content`);

    const completeButton = document.createElement('a');
    completeButton.setAttribute('href','#');
    completeButton.setAttribute('class','completeButton');
    completeButton.innerText = 'done';
    completeButton.addEventListener('click',function(event){
        items[index].status = 'done';
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
        resetId();
        removeAllItemsInList();
        addAllItemsToTheList(items);
    });
    moreMenu.appendChild(deleteButton);
}

function resetId(){
    for(let i = 0; i < items.length; i++){
        items[i].id = i;
    }
}

function addAllItemsToTheList(itemsList){
    for (let i = 0; i < itemsList.length; ++i){
        const item = itemsList[i];
        createTaskItemHtml(item.title, item.description, item.priority, item.id);
    }
}

function removeAllItemsInList(){
    while(list.childElementCount > 0){
        list.removeChild(list.querySelector('.taskItem, .taskItemDone'));
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
            status : 'open'
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

function executeSearch(){
    event.preventDefault();

    const searchKey = searchInput.value;
    const priorityKey = priorityFilter.value;
    const statusKey = statusFilter.value;

    if(searchKey === '' && priorityKey === 'all' && statusKey === 'all'){
        removeAllItemsInList();
        addAllItemsToTheList(items);
        // alert('No filtering conditions provided, displaying all items')
        return;
    }

    if(items.length === 0){
        // alert('The list is empty, nothing to filter')
        return;
    }

    let filteredItems = [];

    for (let i = 0; i < items.length; ++i){
        const item = items[i];
        if (item.title.includes(searchKey)){
            if (priorityKey === 'all' || item.priority === priorityKey){
                if (statusKey === 'all' || item.status === statusKey){
                    filteredItems.push(item);
                }
            }
        }
    }

    removeAllItemsInList();
    addAllItemsToTheList(filteredItems);

    // if (filteredItems.length === 0){
    //     if (confirm('No items were found to match the entered search conditions. Reset the search?')){
    //         removeAllItemsInList();
    //         addAllItemsToTheList(items);
    //         priorityFilter.value = 'all';
    //         statusFilter.value = 'all';
    //     }
    // }

    searchInput.value = '';
    // priorityFilter.value = 'all';
    // statusFilter.value = 'all';
    filteredItems = [];
}

submitNewItem.addEventListener('click',newItemSubmitted);
searchButton.addEventListener('click',executeSearch);
statusFilter.addEventListener('change',executeSearch);
priorityFilter.addEventListener('change',executeSearch);