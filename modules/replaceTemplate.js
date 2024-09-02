module.exports = (temp, topic) => {
  let output = temp.replace(/{%TOPICNAME%}/g, topic.productName);
  output = output.replace(/{%DETAILED_EXPLANATION%}/g, topic.detailedExplanation);
  output = output.replace(/{%SUMMARY%}/g, topic.description);
  output = output.replace(/{%ID%}/g, topic.id);

  // Function to determine if it's an image file based on its extension
  const isImage = (path) => /\.(png|jpe?g|gif)$/.test(path.trim());

  // Log the codesnippet value before processing
  console.log("Processing codesnippet:", topic.codesnippet);

  // Handle multiple code snippets
  if (topic.codesnippet.includes(';')) {
      const snippets = topic.codesnippet.split(';').map(snippet => snippet.trim());
      const formattedSnippets = snippets.map(snippet => {
          if (isImage(snippet)) {
              console.log("Identified as image:", snippet);
              return `<img src="${snippet}" alt="Code Snippet" />`;
          } else {
              console.log("Identified as code:", snippet);
              return `<pre><code>${snippet.replace(/\n/g, '<br>')}</code></pre>`;
          }
      }).join(' ');

      console.log("Replacing {%CODE_SNIPPET%} with:", formattedSnippets);
      output = output.replace(/{%CODE_SNIPPET%}/g, formattedSnippets);
  } else {
      const snippet = topic.codesnippet.trim();
      let replacement;
      if (isImage(snippet)) {
          console.log("Single snippet identified as image:", snippet);
          replacement = `<img src="${snippet}" alt="Code Snippet" />`;
      } else {
          console.log("Single snippet identified as code:", snippet);
          replacement = `<pre><code>${snippet.replace(/\n/g, '<br>')}</code></pre>`;
      }

      console.log("Replacing {%CODE_SNIPPET%} with:", replacement);
      output = output.replace(/{%CODE_SNIPPET%}/g, replacement);
  }

  output = output.replace(/{%TAGS%}/g, '');

  return output;
};
