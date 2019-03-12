// Storage Controller -----------------------------------------------------
const StorageCtrl = (function() {
  // Public methods
  return {
    storeFixedItem: function(item) {
      let fixedItems;
      // Check ls for items
      if (localStorage.getItem('fixedItems') === null) {
        fixedItems = [];
        // Push new item
        fixedItems.push(item);
        // Set ls
        localStorage.setItem('fixedItems', JSON.stringify(fixedItems));
      } else {
        // Get items from ls
        fixedItems = JSON.parse(localStorage.getItem('fixedItems'));

        // Push new item
        fixedItems.push(item);

        // Re-set ls
        localStorage.setItem('fixedItems', JSON.stringify(fixedItems));
      }
    },
    storeVariableItem: function(item) {
      let variableItems;
      // Check ls for items
      if (localStorage.getItem('variableItems') === null) {
        variableItems = [];
        // Push new item
        variableItems.push(item);
        // Set ls
        localStorage.setItem('variableItems', JSON.stringify(variableItems));
      } else {
        // Get items from ls
        variableItems = JSON.parse(localStorage.getItem('variableItems'));

        // Push new item
        variableItems.push(item);

        // Re-set ls
        localStorage.setItem('variableItems', JSON.stringify(variableItems));
      }
    },
    storeIncome: function(income) {
      let incomeStorage;
      // Check ls for items
      if (localStorage.getItem('incomeStorage') === null) {
        incomeStorage = income;
        // Set ls
        localStorage.setItem('incomeStorage', incomeStorage);
      }
    },
    getFixedStorage: function() {
      let fixedItems;
      if (localStorage.getItem('fixedItems') === null) {
        fixedItems = [];
      } else {
        fixedItems = JSON.parse(localStorage.getItem('fixedItems'));
      }
      return fixedItems;
    },
    getVariableStorage: function() {
      let variableItems;
      if (localStorage.getItem('variableItems') === null) {
        variableItems = [];
      } else {
        variableItems = JSON.parse(localStorage.getItem('variableItems'));
      }
      return variableItems;
    },
    getIncomeStorage: function() {
      let incomeStorage;
      if (localStorage.getItem('incomeStorage') === null) {
        incomeStorage = '0';
      } else {
        incomeStorage = localStorage.getItem('incomeStorage');
      }
      return incomeStorage;
    },
    updateFixedStorage: function(updatedItem) {
      let fixedItems = JSON.parse(localStorage.getItem('fixedItems'));

      fixedItems.forEach(function(item, index) {
        if (updatedItem.id === item.id) {
          fixedItems.splice(index, 1, updatedItem);
        }
      });
      // Re-set ls
      localStorage.setItem('fixedItems', JSON.stringify(fixedItems));
    },
    updateVariableStorage: function(updatedItem) {
      let variableItems = JSON.parse(localStorage.getItem('variableItems'));

      variableItems.forEach(function(item, index) {
        if (updatedItem.id === item.id) {
          variableItems.splice(index, 1, updatedItem);
        }
      });
      // Re-set ls
      localStorage.setItem('variableItems', JSON.stringify(variableItems));
    },
    deleteFixedItemFromStorage: function(id) {
      let fixedItems = JSON.parse(localStorage.getItem('fixedItems'));

      fixedItems.forEach(function(item, index) {
        if (id === item.id) {
          fixedItems.splice(index, 1);
        }
      });
      // Re-set ls
      localStorage.setItem('fixedItems', JSON.stringify(fixedItems));
    },
    deleteVariableItemFromStorage: function(id) {
      let variableItems = JSON.parse(localStorage.getItem('variableItems'));

      variableItems.forEach(function(item, index) {
        if (id === item.id) {
          variableItems.splice(index, 1);
        }
      });
      // Re-set ls
      localStorage.setItem('variableItems', JSON.stringify(variableItems));
    },
    clearAllStorage: function() {
      localStorage.removeItem('fixedItems');
      localStorage.removeItem('variableItems');
      localStorage.removeItem('incomeStorage');
    },
  };
})();

// Item Controller --------------------------------------------------------
const ItemCtrl = (function() {
  // Item Constructor
  const Item = function(id, title, amount) {
    this.id = id;
    this.title = title;
    this.amount = amount;
  };
  // Data Structure / State
  const fixedData = {
    items: StorageCtrl.getFixedStorage(),
    currentItem: null,
    fixedAmount: 0,
  };

  const variableData = {
    items: StorageCtrl.getVariableStorage(),
    currentItem: null,
    variableAmount: 0,
  };

  const incomeData = {
    income: StorageCtrl.getIncomeStorage(),
  };

  // Public methods
  return {
    getFixedItems: function() {
      return fixedData.items;
    },
    addFixedAmount: function(title, amount) {
      let id;
      // Create id
      if (fixedData.items.length > 0) {
        id = fixedData.items[fixedData.items.length - 1].id + 1;
      } else {
        id = 0;
      }

      // To number? - Not necessary
      amount = parseFloat(amount);

      // Create new item
      newItem = new Item(id, title, amount);

      // Add to fixed items array
      fixedData.items.push(newItem);

      return newItem;
    },
    getFixedTotal: function() {
      let total = 0;

      // Loop and add
      fixedData.items.forEach(function(item) {
        total += item.amount;
      });

      // Set total in data structure
      fixedData.fixedAmount = total;

      // return total
      return fixedData.fixedAmount;
    },
    getVariableItems: function() {
      return variableData.items;
    },
    addVariableAmount: function(title, amount) {
      let id;
      // Create id
      if (variableData.items.length > 0) {
        id = variableData.items[variableData.items.length - 1].id + 1;
      } else {
        id = 0;
      }

      // To number? - Not necessary
      amount = parseInt(amount);

      // Create new item
      newItem = new Item(id, title, amount);

      // Add to variable items array
      variableData.items.push(newItem);

      return newItem;
    },
    getVariableTotal: function() {
      let total = 0;

      // Loop and add
      variableData.items.forEach(function(item) {
        total += item.amount;
      });

      // Set total in data structure
      variableData.variableAmount = total;

      // return total
      return variableData.variableAmount;
    },
    getCombinedTotal: function() {
      let total = 0;
      let fixed = ItemCtrl.getFixedTotal();
      let variable = ItemCtrl.getVariableTotal();

      total = fixed + variable;

      return total;
    },
    getFixedItemById: function(id) {
      let found = null;
      // Loop through items
      fixedData.items.forEach(function(item) {
        if (item.id === id) {
          found = item;
        }
      });
      return found;
    },
    setCurrentFixedItem: function(item) {
      fixedData.currentItem = item;
    },
    getVariableItemById: function(id) {
      let found = null;
      // Loop through items
      variableData.items.forEach(function(item) {
        if (item.id === id) {
          found = item;
        }
      });
      return found;
    },
    setCurrentVariableItem: function(item) {
      variableData.currentItem = item;
    },
    getCurrentFixedItem: function() {
      return fixedData.currentItem;
    },
    getCurrentVariableItem: function() {
      return variableData.currentItem;
    },
    getIncome: function() {
      return incomeData.income;
    },
    updateFixedItem: function(title, amount) {
      amount = parseFloat(amount);

      let found = null;

      fixedData.items.forEach(function(item) {
        if (item.id === fixedData.currentItem.id) {
          item.title = title;
          item.amount = amount;
          found = item;
        }
      });
      return found;
    },
    updateVariableItem: function(title, amount) {
      amount = parseFloat(amount);

      let found = null;

      variableData.items.forEach(function(item) {
        if (item.id === variableData.currentItem.id) {
          item.title = title;
          item.amount = amount;
          found = item;
        }
      });
      return found;
    },
    deleteFixedItem: function(id) {
      // Get ids
      const ids = fixedData.items.map(function(item) {
        return item.id;
      });

      // Get index
      const index = ids.indexOf(id);

      // Remove item
      fixedData.items.splice(index, 1);
    },
    deleteVariableItem: function(id) {
      // Get ids
      const ids = variableData.items.map(function(item) {
        return item.id;
      });

      // Get index
      const index = ids.indexOf(id);

      // Remove item
      variableData.items.splice(index, 1);
    },
    clearAllItems: function() {
      fixedData.items = [];
      variableData.items = [];
    },
    logFixedData: function() {
      return fixedData;
    },
    logVariableData: function() {
      return variableData;
    },
  };
})();

// UI Controller ----------------------------------------------------------
const UICtrl = (function() {
  const UISelectors = {
    fixedList: '#fixed-spending',
    fixedItems: '#fixed-spending li',
    variableList: '#variable-spending',
    variableItems: '#variable-spending li',
    fixedBtn: '#fixed-btn',
    variableBtn: '#variable-btn',
    fixedEditBtn: '.fixed-edit-btn',
    fixedDeleteBtn: '.fixed-delete-btn',
    fixedBackBtn: '.fixed-back-btn',
    variableEditBtn: '.variable-edit-btn',
    variableDeleteBtn: '.variable-delete-btn',
    variableBackBtn: '.variable-back-btn',
    fixedTitleInput: '#fixed-title',
    fixedAmountInput: '#fixed-amount',
    variableTitleInput: '#variable-title',
    variableAmountInput: '#variable-amount',
    fixedTotal: '.total-fixed',
    variableTotal: '.total-variable',
    combinedTotal: '.combined-total',
    incomeBtn: '#income-btn',
    incomeInput: '#income',
    incomeTotal: '.monthly-income',
    resetBtn: '.reset-btn',
  };

  // Public Methods
  return {
    populateFixedList: function(items) {
      let html = '';

      items.forEach(function(item) {
        html += `
        <li class="list-group-item d-flex" id="fixed-item-${item.id}">
          <strong>${item.title} :</strong> &nbsp <em>${item.amount}</em>
          <a href="#" class="ml-auto">
            <i class="fixed-edit-item fas fa-edit"></i>
          </a>
        </li>`;
      });

      // Insert list items into DOM
      document.querySelector(UISelectors.fixedList).innerHTML = html;
    },
    populateVariableList: function(items) {
      let html = '';

      items.forEach(function(item) {
        html += `
        <li class="list-group-item d-flex" id="variable-item-${item.id}">
          <strong>${item.title} :</strong> &nbsp <em>${item.amount}</em>
          <a href="#" class="ml-auto">
            <i class="variable-edit-item fas fa-edit"></i>
          </a>
        </li>`;
      });

      // Insert list items into DOM
      document.querySelector(UISelectors.variableList).innerHTML = html;
    },
    populateIncome: function() {
      let html = StorageCtrl.getIncomeStorage();

      document.querySelector(UISelectors.incomeTotal).innerHTML = html;
    },
    getFixedInput: function() {
      return {
        title: document.querySelector(UISelectors.fixedTitleInput).value,
        amount: document.querySelector(UISelectors.fixedAmountInput).value,
      };
    },
    addFixedItem: function(item) {
      // Create li element
      const li = document.createElement('li');
      // Add class
      li.className = 'list-group-item d-flex';
      // Add id
      li.id = `fixed-item-${item.id}`;
      // Add HTML
      li.innerHTML = `<strong>${item.title} :</strong> &nbsp <em>${
        item.amount
      }</em>
      <a href="#" class="ml-auto">
        <i class="fixed-edit-item fas fa-edit"></i>
      </a>`;
      // Insert item
      document
        .querySelector(UISelectors.fixedList)
        .insertAdjacentElement('beforeend', li);
    },
    getVariableInput: function() {
      return {
        title: document.querySelector(UISelectors.variableTitleInput).value,
        amount: document.querySelector(UISelectors.variableAmountInput).value,
      };
    },
    addVariableItem: function(item) {
      // Create li element
      const li = document.createElement('li');
      // Add class
      li.className = 'list-group-item d-flex';
      // Add id
      li.id = `variable-item-${item.id}`;
      // Add HTML
      li.innerHTML = `<strong>${item.title} :</strong> &nbsp <em>${
        item.amount
      }</em>
      <a href="#" class="ml-auto">
        <i class="variable-edit-item fas fa-edit"></i>
      </a>`;
      // Insert item
      document
        .querySelector(UISelectors.variableList)
        .insertAdjacentElement('beforeend', li);
    },
    getIncomeInput: function() {
      return document.querySelector(UISelectors.incomeInput).value;
    },
    clearFixedInput: function() {
      document.querySelector(UISelectors.fixedTitleInput).value = '';
      document.querySelector(UISelectors.fixedAmountInput).value = '';
    },
    clearVariableInput: function() {
      document.querySelector(UISelectors.variableTitleInput).value = '';
      document.querySelector(UISelectors.variableAmountInput).value = '';
    },
    clearIncomeInput: function() {
      document.querySelector(UISelectors.incomeInput).value = '';
    },
    showFixedTotal: function(total) {
      document.querySelector(UISelectors.fixedTotal).textContent = total;
    },
    showVariableTotal: function(total) {
      document.querySelector(UISelectors.variableTotal).textContent = total;
    },
    showCombinedTotal: function(total) {
      document.querySelector(UISelectors.combinedTotal).textContent = total;
    },
    addFixedItemToForm: function() {
      document.querySelector(
        UISelectors.fixedTitleInput,
      ).value = ItemCtrl.getCurrentFixedItem().title;
      document.querySelector(
        UISelectors.fixedAmountInput,
      ).value = ItemCtrl.getCurrentFixedItem().amount;
      UICtrl.showFixedEditState();
    },
    addVariableItemToForm: function() {
      document.querySelector(
        UISelectors.variableTitleInput,
      ).value = ItemCtrl.getCurrentVariableItem().title;
      document.querySelector(
        UISelectors.variableAmountInput,
      ).value = ItemCtrl.getCurrentVariableItem().amount;
      UICtrl.showVariableEditState();
    },
    updateFixedUI: function(item) {
      let listItems = document.querySelectorAll(UISelectors.fixedItems);

      // Convert to array
      listItems = Array.from(listItems);

      listItems.forEach(function(listItem) {
        const itemId = listItem.getAttribute('id');

        if (itemId === `fixed-item-${item.id}`) {
          document.querySelector(`#${itemId}`).innerHTML = `<strong>${
            item.title
          } :</strong> &nbsp <em>${item.amount}</em>
          <a href="#" class="ml-auto">
            <i class="fixed-edit-item fas fa-edit"></i>
          </a>`;
        }
      });
    },
    updateVariableUI: function(item) {
      let listItems = document.querySelectorAll(UISelectors.variableItems);

      // Convert to array
      listItems = Array.from(listItems);

      listItems.forEach(function(listItem) {
        const itemId = listItem.getAttribute('id');

        if (itemId === `variable-item-${item.id}`) {
          document.querySelector(`#${itemId}`).innerHTML = `<strong>${
            item.title
          } :</strong> &nbsp <em>${item.amount}</em>
          <a href="#" class="ml-auto">
            <i class="variable-edit-item fas fa-edit"></i>
          </a>`;
        }
      });
    },
    deleteFixedUI: function(id) {
      const itemId = `#fixed-item-${id}`;
      const item = document.querySelector(itemId);
      item.remove();
    },
    deleteVariableUI: function(id) {
      const itemId = `#variable-item-${id}`;
      const item = document.querySelector(itemId);
      item.remove();
    },
    clearFixedEditState: function() {
      UICtrl.clearIncomeInput();
      UICtrl.clearFixedInput();

      document.querySelector(UISelectors.fixedEditBtn).style.display = 'none';
      document.querySelector(UISelectors.fixedDeleteBtn).style.display = 'none';
      document.querySelector(UISelectors.fixedBackBtn).style.display = 'none';
      document.querySelector(UISelectors.fixedBtn).style.display = 'block';
    },
    clearVariableEditState: function() {
      UICtrl.clearIncomeInput();
      UICtrl.clearVariableInput();

      document.querySelector(UISelectors.variableEditBtn).style.display =
        'none';
      document.querySelector(UISelectors.variableDeleteBtn).style.display =
        'none';
      document.querySelector(UISelectors.variableBackBtn).style.display =
        'none';
      document.querySelector(UISelectors.variableBtn).style.display = 'block';
    },
    showFixedEditState: function() {
      document.querySelector(UISelectors.fixedEditBtn).style.display = 'inline';
      document.querySelector(UISelectors.fixedDeleteBtn).style.display =
        'inline';
      document.querySelector(UISelectors.fixedBackBtn).style.display = 'inline';
      document.querySelector(UISelectors.fixedBtn).style.display = 'none';
    },
    showVariableEditState: function() {
      document.querySelector(UISelectors.variableEditBtn).style.display =
        'inline';
      document.querySelector(UISelectors.variableDeleteBtn).style.display =
        'inline';
      document.querySelector(UISelectors.variableBackBtn).style.display =
        'inline';
      document.querySelector(UISelectors.variableBtn).style.display = 'none';
    },
    resetUI: function() {
      let listItems = document.querySelectorAll('li.list-group-item');

      // Turn into an array
      listItems = [...listItems];

      listItems.forEach(function(item) {
        item.remove();
      });

      document.querySelector(UISelectors.incomeTotal).textContent = 0;
      UICtrl.clearIncomeInput();
    },
    getSelectors: function() {
      return UISelectors;
    },
  };
})();

// App Controller ---------------------------------------------------------
const App = (function(ItemCtrl, StorageCtrl, UICtrl) {
  // Load event listeners
  const loadEventListeners = function() {
    // Get UI selectors
    const UISelectors = UICtrl.getSelectors();

    // Add item events
    // Fixed
    document
      .querySelector(UISelectors.fixedBtn)
      .addEventListener('click', fixedSpendingSubmit);
    // Variable
    document
      .querySelector(UISelectors.variableBtn)
      .addEventListener('click', variableSpendingSubmit);
    // Income
    document
      .querySelector(UISelectors.incomeBtn)
      .addEventListener('click', incomeSubmit);

    // Disable submit on enter
    document.addEventListener('keypress', function(e) {
      if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        return false;
      }
    });

    // Edit icon click event - fixed
    document
      .querySelector(UISelectors.fixedList)
      .addEventListener('click', fixedItemEditClick);
    // for variable
    document
      .querySelector(UISelectors.variableList)
      .addEventListener('click', variableItemEditClick);

    // Update item event - fixed
    document
      .querySelector(UISelectors.fixedEditBtn)
      .addEventListener('click', fixedItemUpdateSubmit);
    // Variable
    document
      .querySelector(UISelectors.variableEditBtn)
      .addEventListener('click', variableItemUpdateSubmit);

    // Delete item event - fixed
    document
      .querySelector(UISelectors.fixedDeleteBtn)
      .addEventListener('click', fixedDeleteSubmit);
    // Delete item event - Variable
    document
      .querySelector(UISelectors.variableDeleteBtn)
      .addEventListener('click', variableDeleteSubmit);

    // Back button event - fixed
    document
      .querySelector(UISelectors.fixedBackBtn)
      .addEventListener('click', UICtrl.clearFixedEditState);
    // Back button event - variable
    document
      .querySelector(UISelectors.variableBackBtn)
      .addEventListener('click', UICtrl.clearVariableEditState);

    // Reset form event
    document
      .querySelector(UISelectors.resetBtn)
      .addEventListener('click', resetForm);
  };

  // Add fixed spending submit
  const fixedSpendingSubmit = function(e) {
    // Get form input from UI Controller
    const input = UICtrl.getFixedInput();

    // Check if input fields are empty
    if (input.title !== '' && input.amount !== '') {
      // Add fixed amount
      const newFixedAmount = ItemCtrl.addFixedAmount(input.title, input.amount);

      // Add item to UI list
      UICtrl.addFixedItem(newFixedAmount);

      // Get fixed total
      const fixedTotal = ItemCtrl.getFixedTotal();
      const combinedTotal = ItemCtrl.getCombinedTotal();
      // Add total to UI
      UICtrl.showFixedTotal(fixedTotal);
      // Add total to combined total
      UICtrl.showCombinedTotal(combinedTotal);

      // Store in ls
      StorageCtrl.storeFixedItem(newItem);

      // Clear fields
      UICtrl.clearFixedInput();
    }

    e.preventDefault();
  };

  // Add variable spending submit
  const variableSpendingSubmit = function(e) {
    // Get form input from UI Controller
    const input = UICtrl.getVariableInput();

    // Check if input fields are empty
    if (input.title !== '' && input.amount !== '') {
      // Add variable amount
      const newVariableAmount = ItemCtrl.addVariableAmount(
        input.title,
        input.amount,
      );

      // Add item to UI list
      UICtrl.addVariableItem(newVariableAmount);

      // Get variable total
      const variableTotal = ItemCtrl.getVariableTotal();
      const combinedTotal = ItemCtrl.getCombinedTotal();
      // Add total to UI
      UICtrl.showVariableTotal(variableTotal);
      // Add total to combined total
      UICtrl.showCombinedTotal(combinedTotal);

      // Store in ls
      StorageCtrl.storeVariableItem(newItem);

      // Clear fields
      UICtrl.clearVariableInput();
    }

    e.preventDefault();
  };

  // Income submit
  const incomeSubmit = function(e) {
    // Get UI selectors
    const UISelectors = UICtrl.getSelectors();
    // Get income input
    const input = UICtrl.getIncomeInput();

    // Check if input is empty
    if (input !== '') {
      const income = (document.querySelector(
        UISelectors.incomeTotal,
      ).textContent = input);

      // Store in ls
      StorageCtrl.storeIncome(income);
    }

    // Clear input field
    UICtrl.clearIncomeInput();

    e.preventDefault();
  };

  // Edit item click - fixed
  const fixedItemEditClick = function(e) {
    if (e.target.classList.contains('fixed-edit-item')) {
      // Get list item id
      const listId = e.target.parentNode.parentNode.id;

      // Break into an arr
      const listIdArr = listId.split('-');

      // Grab id
      const id = parseInt(listIdArr[2]);

      // Get item
      const fixedItemToEdit = ItemCtrl.getFixedItemById(id);

      // Set current item
      ItemCtrl.setCurrentFixedItem(fixedItemToEdit);

      // Add itme to form
      UICtrl.addFixedItemToForm();
    }

    e.preventDefault();
  };

  // Variable
  const variableItemEditClick = function(e) {
    if (e.target.classList.contains('variable-edit-item')) {
      // Get list item id
      const listId = e.target.parentNode.parentNode.id;

      // Break into an arr
      const listIdArr = listId.split('-');

      // Grab id
      const id = parseInt(listIdArr[2]);

      // Get item
      const variableItemToEdit = ItemCtrl.getVariableItemById(id);

      // Set current item
      ItemCtrl.setCurrentVariableItem(variableItemToEdit);

      // Add itme to form
      UICtrl.addVariableItemToForm();

      e.preventDefault();
    }
  };

  // Update item submit - fixed
  const fixedItemUpdateSubmit = function(e) {
    // Get item input
    const input = UICtrl.getFixedInput();

    // Update item
    const updatedItem = ItemCtrl.updateFixedItem(input.title, input.amount);

    // Update UI
    UICtrl.updateFixedUI(updatedItem);

    // Get fixed total
    const fixedTotal = ItemCtrl.getFixedTotal();
    const combinedTotal = ItemCtrl.getCombinedTotal();
    // Add total to UI
    UICtrl.showFixedTotal(fixedTotal);
    // Add total to combined total
    UICtrl.showCombinedTotal(combinedTotal);

    // Update in ls
    StorageCtrl.updateFixedStorage(updatedItem);

    UICtrl.clearFixedEditState();

    e.preventDefault();
  };

  // Variable
  const variableItemUpdateSubmit = function(e) {
    // Get item input
    const input = UICtrl.getVariableInput();

    // Update item
    const updatedItem = ItemCtrl.updateVariableItem(input.title, input.amount);

    // Update UI
    UICtrl.updateVariableUI(updatedItem);

    // Get variable total
    const variableTotal = ItemCtrl.getVariableTotal();
    const combinedTotal = ItemCtrl.getCombinedTotal();
    // Add total to UI
    UICtrl.showVariableTotal(variableTotal);
    // Add total to combined total
    UICtrl.showCombinedTotal(combinedTotal);

    // Update in ls
    StorageCtrl.updateVariableStorage(updatedItem);

    UICtrl.clearVariableEditState();

    e.preventDefault();
  };

  // Delete button event - fixed
  const fixedDeleteSubmit = function(e) {
    // Get current item
    const currentItem = ItemCtrl.getCurrentFixedItem();

    // Delete from data structure
    ItemCtrl.deleteFixedItem(currentItem.id);

    // Delete from UI
    UICtrl.deleteFixedUI(currentItem.id);

    // Get fixed total
    const fixedTotal = ItemCtrl.getFixedTotal();
    const combinedTotal = ItemCtrl.getCombinedTotal();
    // Add total to UI
    UICtrl.showFixedTotal(fixedTotal);
    // Add total to combined total
    UICtrl.showCombinedTotal(combinedTotal);

    // Delete from ls
    StorageCtrl.deleteFixedItemFromStorage(currentItem.id);

    UICtrl.clearFixedEditState();

    e.preventDefault();
  };

  // Delete button event - variable
  const variableDeleteSubmit = function(e) {
    // Get current item
    const currentItem = ItemCtrl.getCurrentVariableItem();

    // Delete from data structure
    ItemCtrl.deleteVariableItem(currentItem.id);

    // Delete from UI
    UICtrl.deleteVariableUI(currentItem.id);

    // Get variable total
    const variableTotal = ItemCtrl.getVariableTotal();
    const combinedTotal = ItemCtrl.getCombinedTotal();
    // Add total to UI
    UICtrl.showVariableTotal(variableTotal);
    // Add total to combined total
    UICtrl.showCombinedTotal(combinedTotal);

    // Delete from ls
    StorageCtrl.deleteVariableItemFromStorage(currentItem.id);

    UICtrl.clearVariableEditState();

    e.preventDefault();
  };

  // Reset entire form event
  const resetForm = function() {
    let check = confirm('Are you sure you want to reset the entire form?');
    if (check === true) {
      // Delete all items from the data structure
      ItemCtrl.clearAllItems();

      // Get fixed total
      const fixedTotal = ItemCtrl.getFixedTotal();
      // Add total to UI
      UICtrl.showFixedTotal(fixedTotal);

      // Get variable total
      const variableTotal = ItemCtrl.getVariableTotal();
      // Add total to UI
      UICtrl.showVariableTotal(variableTotal);

      // Add total to combined total
      const combinedTotal = ItemCtrl.getCombinedTotal();
      UICtrl.showCombinedTotal(combinedTotal);

      // Remove from UI
      UICtrl.resetUI();

      // Delete from ls
      StorageCtrl.clearAllStorage();
    }
  };

  // Public Methods
  return {
    init: function() {
      // Clear edit state / set initial state
      UICtrl.clearFixedEditState();
      UICtrl.clearVariableEditState();

      // Fetch items from data structure
      const fixedItems = ItemCtrl.getFixedItems();
      const variableItems = ItemCtrl.getVariableItems();

      // Populate list with items
      UICtrl.populateFixedList(fixedItems);
      UICtrl.populateVariableList(variableItems);
      UICtrl.populateIncome();

      // Get fixed total
      const fixedTotal = ItemCtrl.getFixedTotal();
      // Add total to UI
      UICtrl.showFixedTotal(fixedTotal);
      // Get variable total
      const variableTotal = ItemCtrl.getVariableTotal();
      // Add total to UI
      UICtrl.showVariableTotal(variableTotal);
      // Add total to combined total
      const combinedTotal = ItemCtrl.getCombinedTotal();
      UICtrl.showCombinedTotal(combinedTotal);

      // Load event listeners
      loadEventListeners();
    },
  };
})(ItemCtrl, StorageCtrl, UICtrl);

// Initialize App
App.init();
