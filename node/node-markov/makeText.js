/** Command-line tool to generate Markov text. */

const fs = require("fs").promises;
const axios = require("axios");
const MarkovMachine = require("./markov.js");

async function randomStory(path) {
  try {
    const data = await fs.readFile(path, "utf8");
    return data;
  } catch (err) {
    console.log(`Error reading ${path}:\n ${err}`);
    process.exit(1);
  }
}

async function webRandomStory(url) {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    console.log(`Error fetching ${url}:\n ${err}`);
  }
}

async function output(content) {
  console.log(content);
}

async function main() {
  const type = process.argv[2];
  const target = process.argv[3];
  let content;
  if (type === "file") {
    content = await randomStory(target);
  } else {
    content = await webRandomStory(target);
  }
  let mm = new MarkovMachine(content);
  let generatedText = mm.makeText();
  await output(generatedText);
}

main();
