// Storage Controller -----------------------------------------------------

// Item Controller --------------------------------------------------------
const ItemCtrl = (function () {
  // Item Constructor
  const Item = function (id, title, amount) {
    this.id = id;
    this.title = title;
    this.amount = amount;
  };
  // Data Structure / State
  const fixedData = {
    items: [
      { id: 0, title: 'Car Payment', amount: 300 },
      { id: 1, title: 'Insurance', amount: 75 },
      { id: 2, title: 'Rent', amount: 800 }
    ],
    currentItem: null,
    fixedAmount: 0
  };

  const variableData = {
    items: [
      { id: 0, title: 'Netflix', amount: 12 },
      { id: 1, title: 'Twitch', amount: 5 },
      { id: 2, title: 'Food', amount: 150 }
    ],
    currentItem: null,
    variableAmount: 0
  };

  // Public methods
  return {
    getFixedItems: function () {
      return fixedData.items
    },
    getVariableItems: function () {
      return variableData.items
    },
    logFixedData: function () {
      return fixedData;
    },
    logVariableData: function () {
      return variableData;
    }
  };
})();

// UI Controller ----------------------------------------------------------
const UICtrl = (function () {
  const UISelectors = {
    fixedList: '#fixed-spending',
    variableList: '#variable-spending'
  }

  // Public Methods
  return {
    populateFixedList: function (items) {
      let html = '';

      items.forEach(function (item) {
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
    populateVariableList: function (items) {
      let html = '';

      items.forEach(function (item) {
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
    }

  };
})();

// App Controller ---------------------------------------------------------
const App = (function (ItemCtrl, UICtrl) {
  // Public Methods
  return {
    init: function () {
      // Fetch items from data structure
      const fixedItems = ItemCtrl.getFixedItems();
      const variableItems = ItemCtrl.getVariableItems();

      // Populate list with items
      UICtrl.populateFixedList(fixedItems);
      UICtrl.populateVariableList(variableItems);
    }
  };
})(ItemCtrl, UICtrl);

// Initialize App
App.init();
