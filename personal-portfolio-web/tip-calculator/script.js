document.getElementById("calculateButton").addEventListener("click", function () {
    // Get input values
    const billAmount = parseFloat(document.getElementById("billAmount").value);
    const tipPercentage = parseFloat(document.getElementById("tipPercentage").value) / 100;
    const peopleCount = parseInt(document.getElementById("peopleCount").value);
  
    // Validate input values
    if (isNaN(billAmount) || isNaN(peopleCount) || peopleCount <= 0) {
      alert("Please enter valid numbers for bill amount and number of people.");
      return;
    }
  
    // Calculate the tip and total amounts
    const tipAmount = billAmount * tipPercentage;
    const totalAmount = billAmount + tipAmount;
    const amountPerPerson = totalAmount / peopleCount;
    const tipPerPerson = tipAmount / peopleCount;
  
    // Display the results
    document.getElementById("amountSpent").textContent = `Amount Spent: $${billAmount.toFixed(2)}`;
    document.getElementById("tipAmount").textContent = `Tip Amount: $${tipAmount.toFixed(2)}`;
    document.getElementById("amountPerPerson").textContent = `Amount Per Person: $${amountPerPerson.toFixed(2)}`;
    document.getElementById("tipPerPerson").textContent = `Tip Per Person: $${tipPerPerson.toFixed(2)}`;
    document.getElementById("totalAmount").textContent = `Total Amount: $${totalAmount.toFixed(2)}`;
  });
  