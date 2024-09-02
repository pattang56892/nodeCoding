module.exports = (temp, topic) => {
  let output = temp.replace(/{%TOPICNAME%}/g, topic.productName);
  output = output.replace(/{%DETAILED_EXPLANATION%}/g, topic.detailedExplanation);
  output = output.replace(/{%SUMMARY%}/g, topic.description);
  output = output.replace(/{%ID%}/g, topic.id);

  // Replace codesnippet placeholder
  output = output.replace(/{%CODESNIPPET%}/g, topic.codesnippet);

  // Optionally, you can remove the {%TAGS%} placeholder if it's still in the template
  output = output.replace(/{%TAGS%}/g, '');

  return output;
};



// const fs = require('fs');

// // Load the data from JSON
// const data = JSON.parse(fs.readFileSync('./dev-data/data.json', 'utf-8'));

// // Function to replace placeholders with actual data
// function replaceTemplate(temp, topic) {
//     let output = temp.replace(/{%TOPICNAME%}/g, topic.productName);
//     output = output.replace(/{%DETAILED_EXPLANATION%}/g, topic.detailedExplanation);
//     output = output.replace(/{%CODE_SNIPPET%}/g, topic.codesnippet);
//     return output;
// }

// // Load the template (this should point to your existing template file)
// const templatePath = './templates/template-topic-detail.html';
// const template = fs.readFileSync(templatePath, 'utf-8');

// // Replace the placeholders
// const filledTemplate = replaceTemplate(template, data[0]);

// // Overwrite the same template with the filled content
// fs.writeFileSync(templatePath, filledTemplate);

// console.log("Template processing completed and template updated.");
