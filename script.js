function calculate() {
  const mode = document.querySelector('input[name="mode"]:checked').value;
  const salaryInput = parseFloat(document.getElementById('salaryInput').value);
  const hours = parseFloat(document.getElementById('hoursPerWeek').value);
  const weeks = parseFloat(document.getElementById('weeksPerYear').value);

  if (isNaN(salaryInput) || isNaN(hours) || isNaN(weeks) || hours === 0 || weeks === 0) {
    alert("Please enter valid numbers");
    return;
  }

  let hourlyWage, yearlySalary;

  if (mode === "yearToHour") {
    yearlySalary = salaryInput;
    hourlyWage = yearlySalary / (hours * weeks);
  } else {
    hourlyWage = salaryInput;
    yearlySalary = hourlyWage * hours * weeks;
  }

  const resultText = mode === "yearToHour"
    ? `Estimated Hourly Wage: $${hourlyWage.toFixed(2)}`
    : `Estimated Yearly Salary: $${yearlySalary.toFixed(2)}`;

  document.getElementById('result').textContent = resultText;

  // Tax Overview (only for Yearly → Hourly)
  if (mode === "yearToHour") {
    const taxRate = 0.25;
    const estimatedTax = yearlySalary * taxRate;
    const netSalary = yearlySalary - estimatedTax;
    const netHourly = netSalary / (hours * weeks);

    document.getElementById('grossSalary').textContent = yearlySalary.toFixed(2);
    document.getElementById('estimatedTax').textContent = estimatedTax.toFixed(2);
    document.getElementById('netSalary').textContent = netSalary.toFixed(2);
    document.getElementById('netHourly').textContent = netHourly.toFixed(2);

    document.getElementById('summaryPaper').style.display = 'block';
  } else {
    document.getElementById('summaryPaper').style.display = 'none';
  }

  // Save to localStorage
  const history = JSON.parse(localStorage.getItem("wageHistory")) || [];
  history.push({
    salary: yearlySalary,
    hours,
    weeks,
    hourlyWage,
    date: new Date().toLocaleString()
  });
  localStorage.setItem("wageHistory", JSON.stringify(history));

  displayHistory();
}

function displayHistory() {
  const historyList = document.getElementById('historyList');
  historyList.innerHTML = '';
  const history = JSON.parse(localStorage.getItem("wageHistory")) || [];

  history.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `[${item.date}] $${item.salary} → $${item.hourlyWage.toFixed(2)} (Hrs/Wk: ${item.hours}, Wks/Yr: ${item.weeks})`;
    historyList.appendChild(li);
  });
}

function clearHistory() {
  localStorage.removeItem("wageHistory");
  displayHistory();
}

window.onload = function () {
  displayHistory();

  // Dynamic label switching for input field
  document.querySelectorAll('input[name="mode"]').forEach((elem) => {
    elem.addEventListener("change", () => {
      const mode = document.querySelector('input[name="mode"]:checked').value;
      const label = document.getElementById("salaryLabel");
      label.innerHTML = mode === "yearToHour"
        ? 'Yearly Salary (in CAD): <input type="number" id="salaryInput">'
        : 'Hourly Wage (in CAD): <input type="number" id="salaryInput">';
    });
  });
};
