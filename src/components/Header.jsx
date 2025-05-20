import clsx from 'clsx';
import { languages } from '../languages';
import getFarewellText from '../utils';

/**
 * Chalenge: Bid farewell to each programming language
 * as it gets erased from existance
 *
 * Use the 'getFarewellText' function from the new utils.js
 * filr to generate the text
 *
 */

export default function Header(props) {
  const gameStatusClassName = clsx('game-status', {
    won: props.isGameWon,
    lost: props.isGameLost,
  });

  function renderGameStatus() {
    if (!props.isGameOver) {
      const lastGuessedLetter =
        props.guessedLetters[props.guessedLetters.length - 1];
      console.log('lastGuessedLetter', lastGuessedLetter);
      console.log(props.wrongGuessCount);
      if (!props.currentWord.includes(lastGuessedLetter)) {
        const wrongLetterStatus = languages.map((language, index) => {
          if (index === props.wrongGuessCount - 1) {
            return getFarewellText(language.name);
          }
        });
        return <>{wrongLetterStatus}</>;
      }
    } else {
      return null;
    }

    if (props.isGameOver) {
      if (props.isGameWon) {
        return (
          <>
            <h2>You win!</h2>
            <p>Well done! 🎉</p>
          </>
        );
      } else {
        return (
          <>
            <h2>Game over!</h2>
            <p>You lose! Better start learning Assembly 😭</p>
          </>
        );
      }
    }
  }

  return (
    <header>
      <section className="title">
        <h1>Assembly: Endgame</h1>
        <p>
          Guess the word in under 8 attempts to keep the programming world safe
          from Assembly!
        </p>
      </section>
      <section className={gameStatusClassName}>{renderGameStatus()}</section>
    </header>
  );
}
