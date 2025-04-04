document.addEventListener("DOMContentLoaded", () => {
    const display = document.getElementById("display");
    const buttons = document.querySelectorAll("#keyboard div");

    let currentInput = "";

    // Initialize display with zero
    display.textContent = "0";

    function updateDisplay(value) {
        display.textContent = value || "0"; // Show "0" if empty
    }

    function handleInput(value) {
        if (value === "C") {
            currentInput = "";
            updateDisplay("");
        } else if (value === "=" || value === "Enter") {
            try {
                if (currentInput.trim() === "") return; // Prevent empty evaluation
                if (/[\+\-\*\/]$/.test(currentInput)) return; // Prevent trailing operators

                let result = eval(currentInput);
                if (!isFinite(result)) throw new Error("Math Error"); // Prevent division by zero
                currentInput = result.toString();
                updateDisplay(currentInput);
            } catch {
                updateDisplay("Error");
                currentInput = "";
            }
        } else if (value === "←" || value === "Backspace") {
            // Backspace: Remove last character
            currentInput = currentInput.slice(0, -1);
            updateDisplay(currentInput);
        } else if (/[\d\+\-\*\/]/.test(value)) {
            // Prevent consecutive operators
            if (/[\+\-\*\/]/.test(value) && /[\+\-\*\/]$/.test(currentInput)) {
                return;
            }
            currentInput += value;
            updateDisplay(currentInput);
        }
    }

    // Handle button clicks
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            handleInput(button.textContent);
        });
    });

    // Handle keyboard input
    document.addEventListener("keydown", (event) => {
        const key = event.key;
        if (/[\d\+\-\*\/=]|Enter|Backspace|Escape/.test(key)) {
            event.preventDefault();
            handleInput(key === "Escape" ? "C" : key);
        }
    });
});
