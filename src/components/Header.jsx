import clsx from 'clsx';
import { languages } from '../languages';
import { getFarewellText } from '../utils';

export default function Header(props) {
  const wrongGuessLetter =
    !props.currentWord.includes(props.lastGuessedLetter) &&
    props.guessedLetters.length > 0;

  const gameStatusClassName = clsx('game-status', {
    won: props.isGameWon,
    lost: props.isGameLost,
    wrong: wrongGuessLetter,
  });

  function renderGameStatus() {
    if (!props.isGameOver) {
      if (wrongGuessLetter) {
        const wrongLetterStatus = languages.map((language, index) => {
          if (index === props.wrongGuessCount - 1) {
            return getFarewellText(language.name);
          }
        });
        return <>{wrongLetterStatus}</>;
      }
    } else {
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
      <section aria-live="polite" role="status" className={gameStatusClassName}>
        {renderGameStatus()}
      </section>
    </header>
  );
}
