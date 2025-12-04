//Part One: Jokes API
//Part 1.1: Random Joke

const randomSingleJoke = async () => {
  try {
    let res1 = await axios.get(
      "https://official-joke-api.appspot.com/random_joke"
    );
    console.log(
      `Random joke: ${res1.data.setup}. Punchline: ${res1.data.punchline} `
    );
  } catch (err) {
    console.error(`Oops, that didn't work, error:  ${err}`);
  }
};

//randomSingleJoke();

//Part 1.2: Multiple Jokes
const randomJokes = async () => {
  try {
    let res = await axios.get(
      "https://official-joke-api.appspot.com//random_ten"
    );
    for (let joke of res.data) {
      console.log(`Random joke: ${joke.setup}. Punchline: ${joke.punchline} `);
    }
  } catch (err) {
    console.error(`Oops, that didn't work, error:  ${err}`);
  }
};

//randomJokes();

//Part 1.3: Jokes by Type
const randomProgrammingJokes = async () => {
  try {
    let res = await axios.get(
      "https://official-joke-api.appspot.com/jokes/programming/ten"
    );
    for (let joke of res.data) {
      console.log(
        `Random Programming joke: ${joke.setup}. Punchline: ${joke.punchline} `
      );
    }
  } catch (err) {
    console.error(`Oops, that didn't work, error:  ${err}`);
  }
};

//randomProgrammingJokes();

const randomKnockKnockJokes = async () => {
  try {
    let res = await axios.get(
      "https://official-joke-api.appspot.com/jokes/programming/ten"
    );
    for (let joke of res.data) {
      console.log(
        `Random Knock-Knock joke: ${joke.setup}. Punchline: ${joke.punchline} `
      );
    }
  } catch (err) {
    console.error(`Oops, that didn't work, error:  ${err}`);
  }
};

//randomKnockKnockJokes();

//Part 1.4: Stretch Goal - Multiple Requests for the Same Thing

const endpoints = [
  "https://official-joke-api.appspot.com/random_joke",
  "https://official-joke-api.appspot.com/jokes/programming/random",
  "https://official-joke-api.appspot.com/jokes/knock-knock/random",
  "https://official-joke-api.appspot.com/jokes/dad/random",
];

const randomAllJokes = async () => {
  try {
    let res = await Promise.all(
      endpoints.map((endpoint) => axios.get(endpoint))
    );

    for (let response of res) {
      let joke;
      if (Array.isArray(response.data)) {
        joke = response.data[0];
      } else {
        joke = response.data;
      }

      console.log(
        `Random For All Joke: ${joke.setup}. Punchline: ${joke.punchline} `
      );
    }
  } catch (err) {
    console.error(`Oops, that didn't work, error:  ${err}`);
  }
};

//randomAllJokes();

//Part 1.5: Stretch Goal - Helper Function

const randomJokesHelperFunction = async () => {
  try {
    let res = await axios.get(
      "https://official-joke-api.appspot.com/jokes/dad/random"
    );
    return res.data[0];
    for (let joke of res.data) {
      console.log(
        `Random Knock-Knock joke: ${joke.setup}. Punchline: ${joke.punchline} `
      );
    }
  } catch (err) {
    console.error(`Oops, that didn't work, error:  ${err}`);
    return null;
  }
};

const logFiveJokes = async () => {
  for (let i = 0; i < 5; i++) {
    const joke = await randomJokesHelperFunction();
    console.log(`Joke ${i + 1}: ${joke.setup} ---- ${joke.punchline}`);
  }
};
logFiveJokes();
