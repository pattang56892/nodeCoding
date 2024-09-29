const fs = require('fs');
const fsPromises = fs.promises;
const http = require('http');
const url = require('url');
const slugify = require('slugify');
const replaceTemplate = require('./modules/replaceTemplate');

// Asynchronously load the templates and data
let tempOverview, tempCard, tempTopic, dataObj;

async function loadFiles() {
  try {
    tempOverview = await fsPromises.readFile(`${__dirname}/templates/template-topic-overview.html`, 'utf-8');
    tempCard = await fsPromises.readFile(`${__dirname}/templates/template-topic-card.html`, 'utf-8');
    tempTopic = await fsPromises.readFile(`${__dirname}/templates/template-topic-detail.html`, 'utf-8');
    const data = await fsPromises.readFile(`${__dirname}/dev-data/data.json`, 'utf-8');
    dataObj = JSON.parse(data);
  } catch (err) {
    console.error("Error loading files:", err);
  }
}

// Initialize server
async function init() {
  await loadFiles();

  const slugs = dataObj.map(el => slugify(el.topicName || '', { lower: true }));
  console.log(slugs);

  const server = http.createServer((req, res) => {
    const { query, pathname } = url.parse(req.url, true);

    if (pathname === '/' || pathname === '/overview') {
      res.writeHead(200, { 'Content-type': 'text/html' });

      const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
      const output = tempOverview.replace('{%TOPIC_CARDS%}', cardsHtml);
      res.end(output);

    } else if (pathname === '/topic') {
      res.writeHead(200, { 'Content-type': 'text/html' });
      const topic = dataObj[query.id];
      const output = replaceTemplate(tempTopic, topic);
      res.end(output);

    } else if (pathname === '/api') {
      res.writeHead(200, { 'Content-type': 'application/json' });
      res.end(JSON.stringify(dataObj));

    } else {
      res.writeHead(404, { 'Content-type': 'text/html' });
      res.end('<h1>Page not found!</h1>');
    }
  });

  server.listen(3002, '127.0.0.1', () => {
    console.log('Listening to requests on port 3002');
  });

  // Watch for changes in data.json and reload data
  fs.watchFile(`${__dirname}/dev-data/data.json`, async (curr, prev) => {
    try {
      const data = await fsPromises.readFile(`${__dirname}/dev-data/data.json`, 'utf-8');
      dataObj = JSON.parse(data);
      console.log('data.json file updated, reloaded data.');
    } catch (err) {
      console.error("Error reloading data:", err);
    }
  });
}

init();
