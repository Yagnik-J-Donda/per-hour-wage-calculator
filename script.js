function calculateWage() {
  const salary = parseFloat(document.getElementById('yearlySalary').value);
  const hours = parseFloat(document.getElementById('hoursPerWeek').value);
  const weeks = parseFloat(document.getElementById('weeksPerYear').value);

  if (isNaN(salary) || isNaN(hours) || isNaN(weeks) || hours === 0 || weeks === 0) {
    alert("Please enter valid numbers");
    return;
  }

    const hourlyWage = salary / (hours * weeks);
    const taxRate = 0.25; // 25% tax estimate
    const estimatedTax = salary * taxRate;
    const netSalary = salary - estimatedTax;
    const netHourly = netSalary / (hours * weeks);

    // Update result section
    document.getElementById('grossSalary').textContent = salary.toFixed(2);
    document.getElementById('estimatedTax').textContent = estimatedTax.toFixed(2);
    document.getElementById('netSalary').textContent = netSalary.toFixed(2);
    document.getElementById('netHourly').textContent = netHourly.toFixed(2);

    document.getElementById('summaryPaper').style.display = 'block';

  const result = `Estimated Hourly Wage: $${hourlyWage.toFixed(2)}`;
  document.getElementById('result').textContent = result;

  // Save to localStorage
  const history = JSON.parse(localStorage.getItem("wageHistory")) || [];
  history.push({ salary, hours, weeks, hourlyWage, date: new Date().toLocaleString() });
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

window.onload = displayHistory;
