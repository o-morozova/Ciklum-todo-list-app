'use strict';

const list = document.getElementById('taskList');//task list container

const searchInput = document.getElementById('searchInput');//search field input
const searchButton = document.getElementById('searchButton');//search field submit button
const statusFilter = document.getElementById('status');//priority filter
const priorityFilter = document.getElementById('priority');//status filter
const createNewItem = document.getElementById('createButton');//create item button

const modal = document.getElementById('createNewItemModal');//Modal window for adding items
const newItemTitle = document.getElementById('newItemTitle');//title element of the new item
const newItemDescription = document.getElementById('newItemDescription');
const newItemPriority = document.getElementById('newItemPriority');
const submitNewItem = document.getElementById('submitButton');//save button element
const cancelModal = document.getElementById('cancelButton');//cancel item submit button

const editModal = document.getElementById('editItemModal');//Modal window for editing items
const editItemTitle = document.getElementById('editItemTitle');//title element of the new item
const editItemDescription = document.getElementById('editItemDescription');
const editItemPriority = document.getElementById('editItemPriority');
const editItemSubmit = document.getElementById('editSubmitButton');//save button element
const editItemCancel = document.getElementById('editCancelButton');

let items  = [];//array to store all objects of the created tasks


function resetId(){
    for(let i = 0; i < items.length; i++){
        items[i].id = i;
    }
}

function hideModal() {
    modal.style.display = 'none';
}

function hideEditModal() {
    editModal.style.display = 'none';
}

function displayModal() {
    modal.style.display = 'block';
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

function editItem(title, description, priority, id) {
    items[id].title = title;
    items[id].description = description;
    items[id].priority = priority;
}

createNewItem.onclick = displayModal;
cancelModal.onclick = hideModal;
editItemCancel.onclick = hideEditModal;

function displayAndFillEditForm(id) {
    editModal.style.display = 'block';
    let item = items[id];

    const TITLE = item.title;
    const DESC = item.description;
    const PRIORITY = item.priority;

    editItemTitle.value = TITLE;
    editItemDescription.value = DESC;
    editItemPriority.value = PRIORITY;

    editItemSubmit.addEventListener('click',function () {
        const editedTitle = editItemTitle.value;
        const editedDescription = editItemDescription.value;
        const editedPriority = editItemPriority.value;
        if ((editedTitle === TITLE) &&
            (editedDescription === DESC) &&
            (editedPriority === PRIORITY)){
            //nothing changed
            return;
        }
        editItem(editedTitle,editedDescription,editedPriority,id);
        removeAllItemsInList();
        addAllItemsToTheList(items);
        editModal.style.display = 'none';
    });
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
    completeButton.addEventListener('click',function(){
        items[index].status = 'done';
        document.querySelector(`#taskItem_${id}`).setAttribute('class','taskItemDone');
    });
    moreMenu.appendChild(completeButton);

    const editButton = document.createElement('a');
    editButton.setAttribute('href','#');
    editButton.setAttribute('class','editButton');
    editButton.innerText = 'edit';
    editButton.addEventListener('click',function(){
        displayAndFillEditForm(index);
    });
    moreMenu.appendChild(editButton);

    const deleteButton = document.createElement('a');
    deleteButton.setAttribute('href','#');
    deleteButton.setAttribute('class','deleteButton');
    deleteButton.innerText = 'delete';
    deleteButton.addEventListener('click',function(){
        items.splice(index,1);
        resetId();
        removeAllItemsInList();
        addAllItemsToTheList(items);
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
    // searchInput.value = '';
    filteredItems = [];
}

submitNewItem.addEventListener('click',newItemSubmitted);
searchButton.addEventListener('click',executeSearch);
searchInput.addEventListener('keydown', function (e) {
    e.preventDefault();
    if (e.key === 'Enter') {
    executeSearch();
    }
});
statusFilter.addEventListener('change',executeSearch);
priorityFilter.addEventListener('change',executeSearch);