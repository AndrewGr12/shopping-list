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
                li.textContent = item.value;
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
