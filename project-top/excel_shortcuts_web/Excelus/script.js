function toggleDropdown() {
    const dropdownMenu = document.getElementById('dropdown-menu');
    const dropdownButton = document.querySelector('.dropdown-button');
  
    dropdownMenu.classList.toggle('open');
    dropdownButton.classList.toggle('open');
  }
  
  function selectCategory(element, category) {
    // Remove selected class from all items
    document.querySelectorAll('.dropdown-item').forEach(item => {
      item.classList.remove('selected');
    });
  
    // Add selected class to clicked item
    element.classList.add('selected');
  
    // Update dropdown button text
    document.getElementById('selected-category').textContent = element.textContent;
  
    // Close dropdown
    toggleDropdown();
  
    // Apply filtering
    filterShortcuts(category);
  }
  
  // Close dropdown when clicking outside
  document.addEventListener('click', function(event) {
    const dropdownMenu = document.getElementById('dropdown-menu');
    const dropdownButton = document.querySelector('.dropdown-button');
  
    if (!dropdownButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
      dropdownMenu.classList.remove('open');
      dropdownButton.classList.remove('open');
    }
  });
  
  // English version of all Excel shortcuts
  let allShortcuts = [
    { type: "title", label: "Basic Operations" },
    { "key": "Enter", "action": "Confirm cell/edit and move down", "category": "basic" },
    { "key": "Space", "action": "Select cell/toggle checkbox", "category": "basic" },
    { "key": "Alt", "action": "Show key tips for ribbon", "category": "basic" },
    { "key": "Delete", "action": "Delete cell contents", "category": "basic" },
    { "key": "Tab", "action": "Confirm cell/edit and move right", "category": "basic" },
    { "key": "Esc", "action": "Cancel editing", "category": "basic" },
    { "key": "Backspace", "action": "Delete one character", "category": "basic" },
    { "key": "Home", "action": "Move to beginning of row", "category": "basic" },
    { "key": "End", "action": "Move to end of data region", "category": "basic" },
    { "key": "Page Up", "action": "Scroll up one screen", "category": "basic" },
    { "key": "Page Down", "action": "Scroll down one screen", "category": "basic" },
    { "key": "Insert", "action": "Toggle overwrite mode", "category": "basic" },
    { "key": "Caps Lock", "action": "Toggle caps lock", "category": "basic" },
    { "key": "Num Lock", "action": "Toggle numpad numbers/functions", "category": "basic" },
    { "key": "↑", "action": "Move up one cell", "category": "basic" },
    { "key": "↓", "action": "Move down one cell", "category": "basic" },
    { "key": "←", "action": "Move left one cell", "category": "basic" },
    { "key": "→", "action": "Move right one cell", "category": "basic" },
  
    { type: "title", label: "Function Keys" },
    { "key": "F1", "action": "Display help", "category": "help" },
    { "key": "F2", "action": "Edit active cell", "category": "cell_editing" },
    { "key": "F3", "action": "Open Paste Name dialog", "category": "formula_function" },
    { "key": "F4", "action": "Toggle absolute references/Repeat last action", "category": "formula_function" },
    { "key": "F5", "action": "Open Go To dialog", "category": "navigation_selection" },
    { "key": "F6", "action": "Switch between panes", "category": "navigation_selection" },
    { "key": "F7", "action": "Open Spelling dialog", "category": "proofing" },
    { "key": "F8", "action": "Toggle extend selection mode", "category": "navigation_selection" },
    { "key": "F9", "action": "Recalculate worksheets", "category": "formula_function" },
    { "key": "F10", "action": "Show key tips", "category": "ui_display" },
    { "key": "F11", "action": "Create new chart sheet", "category": "chart_table" },
    { "key": "F12", "action": "Open Save As dialog", "category": "file_management" },
  
    { type: "title", label: "Ctrl + " },
    { "key": "Ctrl + A", "action": "Select all", "category": "Ctrl" },
    { "key": "Ctrl + B", "action": "Bold", "category": "Ctrl" },
    { "key": "Ctrl + C", "action": "Copy", "category": "Ctrl" },
    { "key": "Ctrl + D", "action": "Fill down (copy from cell above)", "category": "Ctrl" },
    { "key": "Ctrl + E", "action": "Flash fill", "category": "Ctrl" },
    { "key": "Ctrl + F", "action": "Find", "category": "Ctrl" },
    { "key": "Ctrl + G", "action": "Go to", "category": "Ctrl" },
    { "key": "Ctrl + H", "action": "Replace", "category": "Ctrl" },
    { "key": "Ctrl + I", "action": "Italic", "category": "Ctrl" },
    { "key": "Ctrl + K", "action": "Insert hyperlink", "category": "Ctrl" },
    { "key": "Ctrl + L", "action": "Create table", "category": "Ctrl" },
    { "key": "Ctrl + N", "action": "New workbook", "category": "Ctrl" },
    { "key": "Ctrl + O", "action": "Open file", "category": "Ctrl" },
    { "key": "Ctrl + P", "action": "Print", "category": "Ctrl" },
    { "key": "Ctrl + R", "action": "Fill right (copy from left cell)", "category": "Ctrl" },
    { "key": "Ctrl + S", "action": "Save", "category": "Ctrl" },
    { "key": "Ctrl + T", "action": "Create table", "category": "Ctrl" },
    { "key": "Ctrl + U", "action": "Underline", "category": "Ctrl" },
    { "key": "Ctrl + V", "action": "Paste", "category": "Ctrl" },
    { "key": "Ctrl + W", "action": "Close window", "category": "Ctrl" },
    { "key": "Ctrl + X", "action": "Cut", "category": "Ctrl" },
    { "key": "Ctrl + Y", "action": "Redo", "category": "Ctrl" },
    { "key": "Ctrl + Z", "action": "Undo", "category": "Ctrl" },
    { "key": "Ctrl + 0", "action": "Hide columns", "category": "Ctrl" },
    { "key": "Ctrl + 1", "action": "Format cells dialog", "category": "Ctrl" },
    { "key": "Ctrl + 2", "action": "Bold", "category": "Ctrl" },
    { "key": "Ctrl + 3", "action": "Italic", "category": "Ctrl" },
    { "key": "Ctrl + 4", "action": "Underline", "category": "Ctrl" },
    { "key": "Ctrl + 5", "action": "Strikethrough", "category": "Ctrl" },
    { "key": "Ctrl + 6", "action": "Toggle object display", "category": "Ctrl" },
    { "key": "Ctrl + 8", "action": "Toggle outline symbols", "category": "Ctrl" },
    { "key": "Ctrl + 9", "action": "Hide rows", "category": "Ctrl" },
    { "key": "Ctrl + F1", "action": "Toggle ribbon", "category": "Ctrl" },
    { "key": "Ctrl + F2", "action": "Print preview", "category": "Ctrl" },
    { "key": "Ctrl + F3", "action": "Name manager", "category": "Ctrl" },
    { "key": "Ctrl + F4", "action": "Close workbook", "category": "Ctrl" },
    { "key": "Ctrl + F5", "action": "Restore window size", "category": "Ctrl" },
    { "key": "Ctrl + F6", "action": "Next workbook window", "category": "Ctrl" },
    { "key": "Ctrl + F9", "action": "Minimize workbook", "category": "Ctrl" },
    { "key": "Ctrl + F10", "action": "Maximize workbook", "category": "Ctrl" },
    { "key": "Ctrl + F11", "action": "Insert macro sheet", "category": "Ctrl" },
    { "key": "Ctrl + F12", "action": "Open file", "category": "Ctrl" },
    { "key": "Ctrl + ↑", "action": "Move to top of data region", "category": "Ctrl" },
    { "key": "Ctrl + ↓", "action": "Move to bottom of data region", "category": "Ctrl" },
    { "key": "Ctrl + ←", "action": "Move to left edge of data region", "category": "Ctrl" },
    { "key": "Ctrl + →", "action": "Move to right edge of data region", "category": "Ctrl" },
    { "key": "Ctrl + ;", "action": "Insert current date", "category": "Ctrl" },
    { "key": "Ctrl + :", "action": "Insert current time", "category": "Ctrl" },
    { "key": "Ctrl + `", "action": "Toggle formula view", "category": "Ctrl" },
    { "key": "Ctrl + -", "action": "Delete rows/columns", "category": "Ctrl" },
    { "key": "Ctrl + +", "action": "Insert rows/columns", "category": "Ctrl" },
    { "key": "Ctrl + Home", "action": "Move to cell A1", "category": "Ctrl" },
    { "key": "Ctrl + End", "action": "Move to last cell with data", "category": "Ctrl" },
    { "key": "Ctrl + PageUp", "action": "Previous sheet", "category": "Ctrl" },
    { "key": "Ctrl + PageDown", "action": "Next sheet", "category": "Ctrl" },
    { "key": "Ctrl + Space", "action": "Select entire column", "category": "Ctrl" },
    { "key": "Ctrl + Enter", "action": "Fill selected cells with current entry", "category": "Ctrl" },
    { "key": "Ctrl + Tab", "action": "Switch between workbooks", "category": "Ctrl" },
    { "key": "Ctrl + Backspace", "action": "Scroll to show active cell", "category": "Ctrl" },
    { "key": "Ctrl + Shift + F", "action": "Open font format dialog", "category": "Ctrl" },
    { "key": "Ctrl + Shift + L", "action": "Toggle filters", "category": "Ctrl" },
    { "key": "Ctrl + Shift + 1", "action": "Number format (0.00)", "category": "Ctrl" },
    { "key": "Ctrl + Shift + 2", "action": "Time format (h:mm AM/PM)", "category": "Ctrl" },
    { "key": "Ctrl + Shift + 3", "action": "Date format (dd-mmm-yy)", "category": "Ctrl" },
    { "key": "Ctrl + Shift + 4", "action": "Currency format ($0.00)", "category": "Ctrl" },
    { "key": "Ctrl + Shift + 5", "action": "Percentage format (0.00%)", "category": "Ctrl" },
    { "key": "Ctrl + Shift + 6", "action": "Scientific format (0.00E+00)", "category": "Ctrl" },
    { "key": "Ctrl + Shift + $", "action": "Currency format", "category": "Ctrl" },
    { "key": "Ctrl + Shift + %", "action": "Percentage format", "category": "Ctrl" },
    { "key": "Ctrl + Shift + #", "action": "Date format", "category": "Ctrl" },
    { "key": "Ctrl + Shift + @", "action": "Time format", "category": "Ctrl" },
    { "key": "Ctrl + Shift + !", "action": "Number format with commas", "category": "Ctrl" },
    { "key": "Ctrl + Shift + &", "action": "Apply outline border", "category": "Ctrl" },
    { "key": "Ctrl + Shift + _", "action": "Remove borders", "category": "Ctrl" },
    { "key": "Ctrl + Alt + V", "action": "Paste special", "category": "Ctrl" },
  
    { type: "title", label: "Shift + " },
    { "key": "Shift + F2", "action": "Insert/edit comment", "category": "Shift" },
    { "key": "Shift + F3", "action": "Insert function dialog", "category": "Shift" },
    { "key": "Shift + F5", "action": "Find dialog", "category": "Shift" },
    { "key": "Shift + F8", "action": "Add to selection mode", "category": "Shift" },
    { "key": "Shift + F10", "action": "Display context menu", "category": "Shift" },
    { "key": "Shift + F11", "action": "Insert new worksheet", "category": "Shift" },
    { "key": "Shift + Space", "action": "Select entire row", "category": "Shift" },
    { "key": "Shift + Tab", "action": "Move left one cell", "category": "Shift" },
    { "key": "Shift + ↑", "action": "Extend selection up", "category": "Shift" },
    { "key": "Shift + ↓", "action": "Extend selection down", "category": "Shift" },
    { "key": "Shift + ←", "action": "Extend selection left", "category": "Shift" },
    { "key": "Shift + →", "action": "Extend selection right", "category": "Shift" },
    { "key": "Shift + Page Up", "action": "Extend selection up one screen", "category": "Shift" },
    { "key": "Shift + Page Down", "action": "Extend selection down one screen", "category": "Shift" },
  
    { type: "title", label: "Alt + " },
    { "key": "Alt + =", "action": "AutoSum", "category": "alt" },
    { "key": "Alt + Enter", "action": "Start new line in same cell", "category": "alt" },
    { "key": "Alt + F1", "action": "Create chart from selected data", "category": "alt" },
    { "key": "Alt + F8", "action": "Macro dialog", "category": "alt" },
    { "key": "Alt + F11", "action": "Open VBA editor", "category": "alt" },
    { "key": "Alt + H, O, I", "action": "AutoFit column width", "category": "alt" },
    { "key": "Alt + N, V", "action": "Create pivot table", "category": "alt" },
  ];
  
  function filterShortcuts(category) {
    const filtered = allShortcuts.filter(item => {
      if (category === 'all') {
        return true; // Show all including titles
      }
  
      if (Array.isArray(category)) {
        return item.type !== "title" && category.some(cat => item.category.includes(cat));
      }
  
      return item.type !== "title" && item.category === category;
    });
    renderShortcuts(filtered);
  }
  
  function renderShortcuts(items) {
    const listContainer = document.getElementById("shortcutList");
    listContainer.innerHTML = "";
  
    items.forEach(item => {
      if (item.type === "title") {
        const h3 = document.createElement("h3");
        h3.textContent = item.label;
        listContainer.appendChild(h3);
      } else {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${item.key}</strong>: ${item.action}`;
        listContainer.appendChild(li);
      }
    });
  }
  
  // Initial render
  renderShortcuts(allShortcuts);
  
  // Search functionality
  document.getElementById("searchBox").addEventListener("input", function() {
    const query = this.value.toLowerCase();
    const result = [];
    let currentGroup = [];
    let inGroup = false;
  
    allShortcuts.forEach(item => {
      if (item.type === "title") {
        if (currentGroup.length > 1) result.push(...currentGroup);
        currentGroup = [item];
        inGroup = true;
      } else {
        const match =
          item.key.toLowerCase().includes(query) ||
          item.action.toLowerCase().includes(query);
  
        if (match) {
          if (!inGroup) currentGroup = [];
          currentGroup.push(item);
        }
      }
    });
  
    if (currentGroup.length > 1 || (currentGroup.length === 1 && currentGroup[0].type !== "title")) {
      result.push(...currentGroup);
    }
  
    renderShortcuts(result);
  });