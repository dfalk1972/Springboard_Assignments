//Part Two: Deck of Cards API
//Part 2.1: New Deck
// const newDeck = async () => {
//   try {
//     let res = await axios.get("https://deckofcardsapi.com/api/deck/new/");
//     deckID = res.data.deck_id;
//     console.log(`Deck ID: ${deckID}`);
//     return deckID;
//   } catch (err) {
//     console.error(`Oops, that didn't work, error:  ${err}`);
//   }
// };

// newDeck();

//Part 2.2: Draw One Card
// let deckID;

// const newDeck = async () => {
//   let res = await axios.get("https://deckofcardsapi.com/api/deck/new/");
//   deckID = res.data.deck_id;

//   return deckID;
// };

// const drawOneCard = async () => {
//   try {
//     let res = await axios.get(
//       `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`
//     );

//     const card = res.data.cards[0];
//     console.log(
//       `Card Drawn Suit: ${card.suit}.  Card Drawn Value: ${card.value}`
//     );
//   } catch (err) {
//     console.error(`Oops, that didn't work, error:  ${err}`);
//   }
// };

// const start = async () => {
//   await newDeck();
//   await drawOneCard();
// };
// start();

//Part 2.3: Draw Multiple Cards
// let deckID;

// const newDeck = async () => {
//   let res = await axios.get("https://deckofcardsapi.com/api/deck/new/");
//   deckID = res.data.deck_id;
//   return deckID;
// };

// const drawFiveCards = async () => {
//   try {
//     let res = await axios.get(
//       `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=5`
//     );

//     for (let i = 0; i < 5; i++) {
//       let cardNumCardDrawn = i + 1;
//       let cardSuit = res.data.cards[i].suit;
//       let cardValue = res.data.cards[i].value;
//       console.log(
//         `Card Drawn: ${cardNumCardDrawn}. Suit:  ${cardSuit}. Value: ${cardValue}`
//       );
//     }
//   } catch (err) {
//     console.error(`Oops, that didn't work, error:  ${err}`);
//   }
// };

// const start = async () => {
//   await newDeck();
//   await drawFiveCards();
// };
// start();

//Part 2.4: Stretch Goal 1 - Shuffle and Re-Draw

// let deckID;

// const newDeck = async () => {
//   let res = await axios.get("https://deckofcardsapi.com/api/deck/new/");
//   deckID = res.data.deck_id;
//   return deckID;
// };

// const shuffleCards = async () => {
//   let res = await axios.get(
//     `https://deckofcardsapi.com/api/deck/${deckID}//shuffle/`
//   );
//   console.log(`Was shuffle successful? ${res.data.success}`);
// };

// const drawTwoCards = async () => {
//   try {
//     let res = await axios.get(
//       `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=2`
//     );

//     for (let i = 0; i < 2; i++) {
//       let cardNumCardDrawn = i + 1;
//       let cardSuit = res.data.cards[i].suit;
//       let cardValue = res.data.cards[i].value;
//       console.log(
//         `Card drawn after shuffle: ${cardNumCardDrawn}. Suit:  ${cardSuit}. Value: ${cardValue}`
//       );
//     }
//   } catch (err) {
//     console.error(`Oops, that didn't work, error:  ${err}`);
//   }
// };

// const start = async () => {
//   await newDeck();
//   await shuffleCards();
//   await drawTwoCards();
// };
// start();

//Part 2.5: Stretch Goal 2 - Array of Cards

let deckID;

const newDeck = async () => {
  let res = await axios.get("https://deckofcardsapi.com/api/deck/new/");
  deckID = res.data.deck_id;
  return deckID;
};

const drawCards = async (deckId, count) => {
  try {
    const res = await axios.get(
      `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${count}`
    );

    return res.data.cards;
  } catch (err) {
    console.error("Error drawing cards:", err);
    //return [];
  }
};

const dealHands = async () => {
  await newDeck();

  const players = [];

  for (let i = 0; i < 4; i++) {
    const hand = await drawCards(deckID, 5);
    players.push(hand);
  }

  return players;
};

const start = async () => {
  const hands = await dealHands();
  let playerNumber = 1;

  for (const hand of hands) {
    console.log(`\nPlayer ${playerNumber} Hand:`);

    for (const card of hand) {
      console.log(`  ${card.value} of ${card.suit}`);
    }

    playerNumber++;
  }
};

start();
