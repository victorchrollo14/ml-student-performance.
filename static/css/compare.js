document.addEventListener("DOMContentLoaded", function () {
  // loadCSV("seniors.csv", "seniors-table", "seniors-average");
  // loadCSV("juniors.csv", "juniors-table", "juniors-average");

  const selectButton = document.getElementById("select-button");
  selectButton.addEventListener("click", function () {
    const selectedBatch = document.getElementById("batch-select").value;
    const selectedDepartment =
      document.getElementById("department-select").value;
    console.log("Selected Batch:", selectedBatch);
    console.log("Selected Department:", selectedDepartment);
  });

  // Add Average Calculator Event Listener
  const calculateAverageBtn = document.getElementById("calculate-average-btn");
  calculateAverageBtn.addEventListener("click", calculateAverage);
});

// async function loadCSV(csvFile, tableId, averageContainerId) {
//     // Existing CSV loading function remains the same
//     try {
//         const response = await fetch(csvFile);
//         const csvData = await response.text();
//
//         const rows = csvData.trim().split('\n');
//         const headers = rows[0].split(',');
//
//         const tableBody = document.getElementById(tableId).querySelector('tbody');
//         tableBody.innerHTML = '';
//
//         let internal1Total = 0;
//         let internal2Total = 0;
//         let internal3Total = 0;
//         let studentCount = 0;
//
//         for (let i = 1; i < rows.length; i++) {
//             const row = rows[i].split(',');
//             const tr = document.createElement('tr');
//             for (let j = 0; j < 5; j++) {
//                 const td = document.createElement('td');
//                 td.textContent = row[j] ? row[j].trim() : '';
//                 tr.appendChild(td);
//
//                 if (j === 2 && row[j]) {
//                     internal1Total += parseFloat(row[j]);
//                 } else if (j === 3 && row[j]) {
//                     internal2Total += parseFloat(row[j]);
//                 } else if (j === 4 && row[j]) {
//                     internal3Total += parseFloat(row[j]);
//                 }
//             }
//             studentCount++;
//             tableBody.appendChild(tr);
//         }
//
//         const internal1Average = studentCount > 0 ? internal1Total / studentCount : 0;
//         const internal2Average = studentCount > 0 ? internal2Total / studentCount : 0;
//         const internal3Average = studentCount > 0 ? internal3Total / studentCount : 0;
//
//         const averageContainer = document.getElementById(averageContainerId);
//
//         averageContainer.innerHTML = `
//            <div class="chart-container" >
//                 <canvas id="${averageContainerId}-chart-1" width="100" height="100"></canvas>
//                   <div class="chart-label">Internal 1</div>
//             </div>
//                <div class="chart-container">
//                  <canvas id="${averageContainerId}-chart-2" width="100" height="100"></canvas>
//                   <div class="chart-label">Internal 2</div>
//                </div>
//                <div class="chart-container">
//                  <canvas id="${averageContainerId}-chart-3" width="100" height="100"></canvas>
//                   <div class="chart-label">Internal 3</div>
//                </div>
//         `;
//         drawChart(internal1Average, `${averageContainerId}-chart-1`);
//         drawChart(internal2Average, `${averageContainerId}-chart-2`);
//         drawChart(internal3Average, `${averageContainerId}-chart-3`);
//     } catch (error) {
//         console.error('Error loading CSV:', error);
//     }
// }

function drawChart(average, chartId) {
  // Existing drawChart function remains the same
  const canvas = document.getElementById(chartId);
  const ctx = canvas.getContext("2d");
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = Math.min(centerX, centerY) - 10;
  const angle = Math.min((average / 100) * 2 * Math.PI, 2 * Math.PI);
  const startAngle = -Math.PI / 2;

  function animate(progress) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(
      centerX,
      centerY,
      radius,
      startAngle,
      startAngle + progress * angle,
    );
    ctx.lineWidth = 10;
    ctx.strokeStyle = "#3498db";
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(
      centerX,
      centerY,
      radius,
      startAngle + progress * angle,
      startAngle + 2 * Math.PI,
    );
    ctx.lineWidth = 10;
    ctx.strokeStyle = "#ddd";
    ctx.stroke();

    ctx.font = "16px sans-serif";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(average.toFixed(1), centerX, centerY);

    if (progress < 1) {
      requestAnimationFrame(() => animate(progress + 0.05));
    }
  }

  animate(0);
}

// New function for Average Calculator
function calculateAverage() {
  const internal1Input = document.getElementById("internal1-input");
  const internal2Input = document.getElementById("internal2-input");
  const internal3Input = document.getElementById("internal3-input");
  const averageResult = document.getElementById("average-result");

  const internal1 = parseFloat(internal1Input.value) || 0;
  const internal2 = parseFloat(internal2Input.value) || 0;
  const internal3 = parseFloat(internal3Input.value) || 0;

  // Validate inputs
  if (
    internal1 < 0 ||
    internal1 > 100 ||
    internal2 < 0 ||
    internal2 > 100 ||
    internal3 < 0 ||
    internal3 > 100
  ) {
    averageResult.innerHTML = `
            <p class="error">Please enter valid marks between 0 and 100.</p>
        `;
    return;
  }

  // Calculate average
  const average = (internal1 + internal2 + internal3) / 3;

  // Display result
  averageResult.innerHTML = `
        <div class="result-container">
            <p>Average Marks: <span class="average-value">${average.toFixed(2)}</span></p>
        </div>
    `;
}

