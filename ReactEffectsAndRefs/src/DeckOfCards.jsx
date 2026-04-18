import { useState, useEffect, useRef } from "react";
import "./DeckOfCards.css";
export default function DeckOfCards() {
  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [autoDealing, setAutoDealing] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    async function startingDeck() {
      try {
        const r = await fetch(
          "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1",
        );
        const json = await r.json();
        setDeck(json);
      } catch (e) {
        alert("Error getting a deck of cards ", e);
      } finally {
        setInitialLoading(false);
      }
    }
    startingDeck();
  }, []);

  async function getACard() {
    setLoading(true);
    try {
      const r = await fetch(
        `https://deckofcardsapi.com/api/deck/${deck?.deck_id}/draw/?count=1`,
      );
      const json = await r.json();
      if (!json.success) {
        return;
      }
      setCards((prev) => [...prev, ...json.cards]);
      setDeck(json);
      if (json.remaining === 0) {
        setMessage("Deck is empty, restart the game! ");
        stopAutoDeal();
      }
    } catch (e) {
      alert("Error", e);
    } finally {
      setLoading(false);
    }
  }
  async function shuffleDeck() {
    setMessage("");
    setLoading(true);
    try {
      const r = await fetch(
        `https://deckofcardsapi.com/api/deck/${deck?.deck_id}/shuffle/?remaining=true`,
      );
      const json = await r.json();
      setDeck(json);
    } catch (e) {
      alert("Error shuffling, please try again!", e);
    } finally {
      setLoading(false);
    }
  }
  async function resetDeck() {
    setMessage("");
    setLoading(true);
    try {
      const r = await fetch(
        `https://deckofcardsapi.com/api/deck/${deck?.deck_id}/shuffle/`,
      );
      const json = await r.json();
      setDeck(json);
      setCards([]);
    } catch (e) {
      alert("Error resetting cards, please try again!", e);
    } finally {
      setLoading(false);
    }
  }

  function startAutoDeal() {
    setAutoDealing(true);
    intervalRef.current = setInterval(() => {
      getACard();
    }, 1000);
  }

  function stopAutoDeal() {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setAutoDealing(false);
  }

  return (
    <div className="container">
      {initialLoading && (
        <div className="overlay">
          <p>Loading...</p>
        </div>
      )}

      <div className="buttons">
        {!autoDealing && cards.length > 0 && deck?.remaining !== 0 && (
          <button
            className="btn-shuffle"
            onClick={shuffleDeck}
            disabled={loading}
          >
            Shuffle
          </button>
        )}

        {!autoDealing && deck?.remaining !== 0 && (
          <button
            className="btn-deal"
            onClick={getACard}
            disabled={loading || deck?.remaining === 0}
          >
            Deal
          </button>
        )}
        {!autoDealing && cards.length > 0 && (
          <button className="btn-reset" onClick={resetDeck} disabled={loading}>
            Restart
          </button>
        )}
      </div>

      {message && <p style={{ color: "white" }}>{message}</p>}

      <div className="cards-container">
        {cards.map((card, index) => (
          <img
            key={card.code}
            src={card.image}
            alt={`${card.value} of ${card.suit}`}
            style={{
              zIndex: index,
              left: "50%",
              transform: `translateX(-50%) rotate(${(index % 2 === 0 ? 1 : -1) * (index * 1.5)}deg)`,
            }}
          />
        ))}
      </div>
      {deck?.remaining !== 0 && (
        <button
          className={autoDealing ? "btn-stop" : "btn-auto"}
          onClick={autoDealing ? stopAutoDeal : startAutoDeal}
        >
          {autoDealing ? "Stop Auto Deal" : "Auto Deal"}
        </button>
      )}
    </div>
  );
}
