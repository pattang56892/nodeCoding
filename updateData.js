const fs = require('fs');
const path = require('path');

// Path to the data.json file
const dataPath = path.join(__dirname, 'dev-data', 'data.json');

// Function to update the data.json file
function updateData() {
  // Read the current data
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

  // Modify the first product's name
  data[0].productName = `Updated Product Name at ${new Date().toLocaleTimeString()}`;

  // Write the updated data back to the file
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`Updated data.json at ${new Date().toLocaleTimeString()}`);
}

// Set an interval to update the data every 5 seconds
setInterval(updateData, 5000);
