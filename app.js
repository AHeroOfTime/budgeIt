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
      // Test data
      // { id: 0, title: 'Car Payment', amount: 300 },
      // { id: 1, title: 'Insurance', amount: 75 },
      // { id: 2, title: 'Rent', amount: 800 },
    ],
    currentItem: null,
    fixedAmount: 0,
  };

  const variableData = {
    items: [
      // Test data
      // { id: 0, title: 'Netflix', amount: 12 },
      // { id: 1, title: 'Twitch', amount: 5 },
      // { id: 2, title: 'Food', amount: 150 },
    ],
    currentItem: null,
    variableAmount: 0,
  };

  const incomeData = {
    income: 0,
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
    getIncome: function() {
      return incomeData.income;
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
    fixedTotal: '.total-fixed',
    variableTotal: '.total-variable',
    combinedTotal: '.combined-total',
    incomeBtn: '#income-btn',
    incomeInput: '#income',
    incomeTotal: '.monthly-income',
  };

  // Public Methods
  return {
    populateFixedList: function(items) {
      let html = '';

      items.forEach(function(item) {
        html += `
        <li class="list-group-item d-flex" id="item-${item.id}">
          <strong>${item.title} :</strong> &nbsp <em>${item.amount}</em>
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
          <strong>${item.title} :</strong> &nbsp <em>${item.amount}</em>
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
    addFixedItem: function(item) {
      // Create li element
      const li = document.createElement('li');
      // Add class
      li.className = 'list-group-item d-flex';
      // Add id
      li.id = `item-${item.id}`;
      // Add HTML
      li.innerHTML = `<strong>${item.title} :</strong> &nbsp <em>${
        item.amount
      }</em>
      <a href="#" class="ml-auto">
        <i class="edit-item fas fa-edit"></i>
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
      li.id = `item-${item.id}`;
      // Add HTML
      li.innerHTML = `<strong>${item.title} :</strong> &nbsp <em>${
        item.amount
      }</em>
      <a href="#" class="ml-auto">
        <i class="edit-item fas fa-edit"></i>
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

      // Clear fields
      UICtrl.clearFixedInput();
    }

    e.preventDefault();
  };

  // Add variable spending submit
  const variableSpendingSubmit = function(e) {
    // Get form input from UI Controller
    const input = UICtrl.getVariableInput();
    console.log(input);

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
      document.querySelector(UISelectors.incomeTotal).textContent = input;
    }

    // Clear input field
    UICtrl.clearIncomeInput();

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
})(ItemCtrl, UICtrl);

// Initialize App
App.init();
