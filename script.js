// Handle checkbox change to add/remove quantity selector
function handleCheckboxChange(checkbox) {
    const li = checkbox.closest("li");

    // Remove existing select if any
    let existingSelect = li.querySelector(".quantity");
    if (existingSelect) existingSelect.remove();

    // If checked, add quantity selector
    if (checkbox.checked) {
        const quantitySelect = document.createElement("select");
        quantitySelect.classList.add("quantity");
        for (let i = 1; i <= 5; i++) {
            const option = document.createElement("option");
            option.value = i;
            option.textContent = i;
            quantitySelect.appendChild(option);
        }
        li.appendChild(quantitySelect);
    }
}

// Attach change listeners to all checkboxes
function attachCheckboxListeners() {
    document.querySelectorAll("input[type='checkbox']").forEach(cb => {
        cb.addEventListener("change", () => handleCheckboxChange(cb));
    });
}

// Call initially
attachCheckboxListeners();

// Use MutationObserver to detect new <li> items dynamically
const observer = new MutationObserver((mutationsList) => {
    for (let mutation of mutationsList) {
        if (mutation.type === "childList") {
            attachCheckboxListeners();
        }
    }
});

// Observe all <ul> elements
document.querySelectorAll(".store ul").forEach(ul => {
    observer.observe(ul, { childList: true });
});

// Generate shopping list
document.getElementById("generateBtn").addEventListener("click", () => {
    const stores = document.querySelectorAll(".store");
    const outputDiv = document.getElementById("output");
    outputDiv.innerHTML = ""; // Clear previous output

    let hasItems = false;

    stores.forEach(store => {
        const storeName = store.querySelector("h2").innerText;
        const checkedItems = store.querySelectorAll("input[type='checkbox']:checked");

        if (checkedItems.length > 0) {
            hasItems = true;
            const storeSection = document.createElement("div");
            const title = document.createElement("h3");
            title.innerText = storeName;
            const list = document.createElement("ul");

            checkedItems.forEach(item => {
                const li = document.createElement("li");
                const quantity = item.closest("li").querySelector(".quantity")?.value || 1;
                li.textContent = `${item.value} - Quantity: ${quantity}`;
                list.appendChild(li);
            });

            storeSection.appendChild(title);
            storeSection.appendChild(list);
            outputDiv.appendChild(storeSection);
        }
    });

    if (!hasItems) {
        outputDiv.innerHTML = "<p>Please select at least one item before generating your list!</p>";
    }
});
