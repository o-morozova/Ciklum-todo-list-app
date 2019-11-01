const list = document.getElementById("taskList");//task list element
const input = document.getElementById("searchInput");//search field filter
const dropdownFilter = document.getElementById("statusDropdown");//status filter
const statusFilter = document.getElementById("priorityDropdown");//priority filter
const createNewItem = document.getElementById("createButton");
const modal = document.getElementById("createNewItemModal");
const submitNewItemForm = document.getElementById("createNewItemModal");//priority filter
const newItemTitle = document.getElementById("newItemTitle");//title element of the new item
const newItemDescription = document.getElementById("newItemDescription");//description element of the new item
const newItemPriority = document.getElementById("newItemPriority");//priority element of the new item
const submitNewItem = document.getElementById("submitButton");//save button element
const cancelModal = document.getElementById("cancelButton");
let items  = [];

function displayModal() {
    modal.style.display = 'block';
};

function hideModal() {
    modal.style.display = 'none';
};


createNewItem.onclick = displayModal;
cancelModal.onclick = hideModal;

function createTaskItemHtml(title, description, priority, id) {
    const item = `<div class="taskItem" id="taskItem_${id}">
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
                        <form action="">
                            <select name="more-menu" id="more-menu">
                                <option value="done">all</option>
                                <option value="open">edit</option>
                                <option value="done">delete</option>
                            </select>
                        </form>
                    </div>
                </div>
                `;
    const position = 'beforeend';
    list.insertAdjacentHTML(position,item);
}

function newItemSubmitted (event){
    event.preventDefault();
    const TITLE = newItemTitle.value;
    const PRIORITY = newItemPriority.value;
    const DESCRIPTION = newItemDescription.value;
    const ID = items.length;
    // if the input isn't empty
    if(TITLE && PRIORITY){
        createTaskItemHtml(TITLE, DESCRIPTION, PRIORITY, ID);

        items.push({
            title : TITLE,
            description : DESCRIPTION,
            priority : PRIORITY,
            id : ID,
            isCompleted : false
        });
    }
    hideModal();
    newItemTitle.value = '';
    newItemDescription.value = '';
    newItemPriority.value = 'high';
}
submitNewItem.addEventListener("click",newItemSubmitted);
submitNewItemForm.addEventListener("keyup",function(event){
    if(event.keyCode === 13){
        newItemSubmitted(event);
    }
});