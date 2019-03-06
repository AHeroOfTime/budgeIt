// Storage Controller -----------------------------------------------------

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
    items: [
      { id: 0, title: 'Car Payment', amount: 300 },
      { id: 1, title: 'Insurance', amount: 75 },
      { id: 2, title: 'Rent', amount: 800 },
    ],
    currentItem: null,
    fixedAmount: 0,
  };

  const variableData = {
    items: [
      { id: 0, title: 'Netflix', amount: 12 },
      { id: 1, title: 'Twitch', amount: 5 },
      { id: 2, title: 'Food', amount: 150 },
    ],
    currentItem: null,
    variableAmount: 0,
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
      // amount = parseInt(amount);

      // Create new item
      newItem = new Item(id, title, amount);

      // Add to fixed items array
      fixedData.items.push(newItem);

      return newItem;
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
      // amount = parseInt(amount);

      // Create new item
      newItem = new Item(id, title, amount);

      // Add to variable items array
      variableData.items.push(newItem);

      return newItem;
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
    variableList: '#variable-spending',
    fixedBtn: '#fixed-btn',
    variableBtn: '#variable-btn',
    fixedTitleInput: '#fixed-title',
    fixedAmountInput: '#fixed-amount',
    variableTitleInput: '#variable-title',
    variableAmountInput: '#variable-amount',
  };

  // Public Methods
  return {
    populateFixedList: function(items) {
      let html = '';

      items.forEach(function(item) {
        html += `
        <li class="list-group-item d-flex" id="item-${item.id}">
          <strong>${item.title} :</strong> <em>${item.amount}</em>
          <a href="#" class="ml-auto">
            <i class="edit-item fas fa-edit"></i>
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
        <li class="list-group-item d-flex" id="item-${item.id}">
          <strong>${item.title} :</strong> <em>${item.amount}</em>
          <a href="#" class="ml-auto">
            <i class="edit-item fas fa-edit"></i>
          </a>
        </li>`;
      });

      // Insert list items into DOM
      document.querySelector(UISelectors.variableList).innerHTML = html;
    },
    getFixedInput: function() {
      return {
        title: document.querySelector(UISelectors.fixedTitleInput).value,
        amount: document.querySelector(UISelectors.fixedAmountInput).value,
      };
    },
    getVariableInput: function() {
      return {
        title: document.querySelector(UISelectors.variableTitleInput).value,
        amount: document.querySelector(UISelectors.variableAmountInput).value,
      };
    },
    getSelectors: function() {
      return UISelectors;
    },
  };
})();

// App Controller ---------------------------------------------------------
const App = (function(ItemCtrl, UICtrl) {
  // Load event listeners
  const loadEventListeners = function() {
    // Get UI selectors
    const UISelectors = UICtrl.getSelectors();

    // Add item events
    // fixed
    document
      .querySelector(UISelectors.fixedBtn)
      .addEventListener('click', fixedSpendingSubmit);
    // variable
    document
      .querySelector(UISelectors.variableBtn)
      .addEventListener('click', variableSpendingSubmit);
  };

  // Add fixed spending submit
  const fixedSpendingSubmit = function(e) {
    // Get form input from UI Controller
    const input = UICtrl.getFixedInput();

    // Check if input fields are empty
    if (input.title !== '' && input.amount !== '') {
      // Add fixed amount
      const newFixedAmount = ItemCtrl.addFixedAmount(input.title, input.amount);
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
    }

    e.preventDefault();
  };

  // Public Methods
  return {
    init: function() {
      // Fetch items from data structure
      const fixedItems = ItemCtrl.getFixedItems();
      const variableItems = ItemCtrl.getVariableItems();

      // Populate list with items
      UICtrl.populateFixedList(fixedItems);
      UICtrl.populateVariableList(variableItems);

      // Load event listeners
      loadEventListeners();
    },
  };
})(ItemCtrl, UICtrl);

// Initialize App
App.init();
