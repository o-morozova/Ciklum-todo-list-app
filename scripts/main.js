const modal = document.getElementById("createNewItemModal");
const addItemBtn = document.getElementById("createButton");
const cancelModal = document.getElementById("cancelButton");

addItemBtn.onclick = function() {
    modal.style.display = "block";
};

cancelModal.onclick = function() {
    modal.style.display = "none";
};

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

const list = document.getElementById("list");//task list
const input = document.getElementById("searchInput");//create new task input
const dropdownFilter = document.getElementById("statusDropdown");//create new task input
const statusFilter = document.getElementById("priorityDropdown");//create new task input
