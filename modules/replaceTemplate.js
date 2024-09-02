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
