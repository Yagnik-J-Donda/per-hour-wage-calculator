function calculateWage() {
  const salary = parseFloat(document.getElementById('yearlySalary').value);
  const hours = parseFloat(document.getElementById('hoursPerWeek').value);
  const weeks = parseFloat(document.getElementById('weeksPerYear').value);

  if (isNaN(salary) || isNaN(hours) || isNaN(weeks) || hours === 0 || weeks === 0) {
    alert("Please enter valid numbers");
    return;
  }

  const hourlyWage = salary / (hours * weeks);
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
