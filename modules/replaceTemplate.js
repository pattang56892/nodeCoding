module.exports = (temp, topic) => {
  let output = temp.replace(/{%TOPICNAME%}/g, topic.productName);
  output = output.replace(/{%DETAILED_EXPLANATION%}/g, topic.detailedExplanation);
  output = output.replace(/{%SUMMARY%}/g, topic.description);
  output = output.replace(/{%ID%}/g, topic.id);

  return output;
};
