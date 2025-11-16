// Function to add quantity selector dynamically
function handleCheckboxChange(event) {
    const checkbox = event.target;
    const li = checkbox.closest("li");

    // Remove existing select if any
    const existingSelect = li.querySelector("select");
    if (existingSelect) {
        existingSelect.remove();
    }

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

// Attach event listener to all checkboxes, including future ones
document.querySelectorAll("input[type='checkbox']").forEach(cb => {
    cb.addEventListener("change", handleCheckboxChange);
});

// Event delegation for dynamically added items (optional if you plan to add <li> later via JS)
document.body.addEventListener("change", function(e) {
    if (e.target.matches("input[type='checkbox']")) {
        handleCheckboxChange(e);
    }
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
                const quantity = item.closest("li").querySelector("select")?.value || 1;
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
