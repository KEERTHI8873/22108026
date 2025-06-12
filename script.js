let numberWindow = [];
let windowSize = 5;

async function fetchAndCalculate() {
  const type = document.getElementById("numberType").value;
  const sizeInput = document.getElementById("windowSize").value;
  if (sizeInput) windowSize = parseInt(sizeInput);

  try {
    // Step 1: Call the API with selected number type
    const response = await fetch(`http://localhost:9876/numbers/${type}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Step 2: Parse JSON response
    const data = await response.json();
    const number = data.numbers[0];

    // Step 3: Manage sliding window of numbers
    if (!isNaN(number)) {
      numberWindow.push(number);
      if (numberWindow.length > windowSize) {
        numberWindow.shift();
      }

      // Step 4: Calculate rolling average
      const sum = numberWindow.reduce((acc, val) => acc + val, 0);
      const average = sum / numberWindow.length;

      // Step 5: Update the UI
      document.getElementById("numberWindow").textContent = JSON.stringify(numberWindow);
      document.getElementById("average").textContent = average.toFixed(2);
    } else {
      alert("Invalid number received from API.");
    }
  } catch (error) {
    console.error("Error fetching number:", error);
    alert("Failed to fetch number. Check if the server is running.");
  }
}
