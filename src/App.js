
import './App.css';
import Images from './Images';
import { useState } from "react";
import { shuffle } from 'lodash';

function App() {
  const [cards, setCards] = useState(shuffle([...Images, ...Images]));
  const [click, setClick] = useState(0);
  const [won, setWon] = useState(false);
  const [activeCards, setActiveCards] = useState([]);
  const [foundMatches, setFoundMatches] = useState([]);
  function flipCard(index) {
    if(won){
      setCards(shuffle([...Images, ...Images]))
    }
    if (activeCards.length === 0) {
      setActiveCards([index]);
      setFoundMatches([]);
      setWon(false);
      setClick(0);
    }
    if (activeCards.length === 1) {
      const firstIndex = activeCards[0];
      const secondIndex = index;
      if (cards[firstIndex] === cards[secondIndex]) {
        setFoundMatches([...foundMatches, firstIndex, secondIndex]);
        if(foundMatches.length + 2 === cards.length){
          setWon(true);
        }
      }
      setActiveCards([...activeCards, index]);
    }
    if (activeCards.length === 2) {

      setActiveCards([index]);
    }
    setClick(click + 1) 
  }
  return (
    <div>
      <div className="board">
        {cards.map((card, index) => {
          const flippedToFront = (activeCards.indexOf(index) !== -1) || foundMatches.indexOf(index) !== -1;
          return (
            <div className={"card-outer " + (flippedToFront ? 'flipped' : '')} onClick={() => flipCard(index)}>
              <div className="card">
                <div className="front"><img src={card}></img></div>
                <div className="back"></div>
              </div>
            </div>
          );
        })}
      </div>
      <div className='stats'>
        {won && (
          <>You won the game! Congratulations!<br />
          Click any card to play again.<br /><br />
        </>
        )}
        <></>
        Clicks: {click} &nbsp;&nbsp;&nbsp; Found pairs: {foundMatches.length/2} 
      </div>
    </div>
  );
}

export default App;
