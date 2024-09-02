// method #1
module.exports = (temp, topic) => {
  let output = temp.replace(/{%TOPICNAME%}/g, topic.productName);
  output = output.replace(/{%DETAILED_EXPLANATION%}/g, topic.detailedExplanation);
  output = output.replace(/{%SUMMARY%}/g, topic.description);
  output = output.replace(/{%ID%}/g, topic.id);  
  output = output.replace(/{%CODE_SNIPPET%}/g, topic.codesnippet);  
  output = output.replace(/{%TAGS%}/g, '');

  return output;
};