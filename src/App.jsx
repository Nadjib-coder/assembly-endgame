import Header from './components/Header';
// import Footer from './components/Footer';
import { languages } from './languages';
import { useState } from 'react';
import clsx from 'clsx';
import Confetti from 'react-confetti';
import { getRandomWord } from './utils';
import './App.css';

function App() {
  // State Vlaues
  const [currentWord, setCurrentWord] = useState(() => getRandomWord());
  const [guessedLetters, setGuessedLetters] = useState([]);

  // Derived Values
  const wrongGuessCount = guessedLetters.filter(
    (letter) => !currentWord.includes(letter),
  ).length;

  const numGuessesLeft = languages.length - 1;

  const isGameWon = currentWord
    .split('')
    .every((letter) => guessedLetters.includes(letter));

  const isGameLost = wrongGuessCount >= numGuessesLeft;

  const isGameOver = isGameWon || isGameLost;

  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1];

  // Static Values
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

  const eliminations = languages.map((language, index) => {
    const lost = index < wrongGuessCount ? 'lost' : '';
    const styles = {
      backgroundColor: language.backgroundColor,
      color: language.color,
    };
    return (
      <span key={language.name} style={styles} className={lost}>
        {language.name}
      </span>
    );
  });

  const letterWord = currentWord.split('').map((letter, index) => {
    const shouldRevealLetter = isGameLost || guessedLetters.includes(letter);
    const revealClasssName = clsx(
      isGameLost && !guessedLetters.includes(letter) && 'reveal',
    );
    return (
      <span key={index} className={revealClasssName}>
        {shouldRevealLetter ? letter.toUpperCase() : ''}
      </span>
    );
  });

  const keyboardElements = alphabet.map((letter) => {
    const isGuessed = guessedLetters.includes(letter);
    const isCorrect = isGuessed && currentWord.includes(letter);
    const isWrong = isGuessed && !currentWord.includes(letter);
    const className = clsx({
      correct: isCorrect,
      wrong: isWrong,
    });

    return (
      <button
        className={className}
        key={letter}
        onClick={() => handleClick(letter)}
        disabled={isGameOver}
        aria-disabled={guessedLetters.includes(letter)}
        aria-label={`Letter ${letter}`}
      >
        {letter.toUpperCase()}
      </button>
    );
  });

  function handleClick(letter) {
    setGuessedLetters((prev) => {
      const letterSet = new Set(prev);
      letterSet.add(letter);
      return Array.from(letterSet);
    });
  }

  function startNewGame() {
    setGuessedLetters([]);
    setCurrentWord(getRandomWord());
  }

  return (
    <>
      {isGameWon && <Confetti recycle={false} numberOfPeices={1000} />}
      <Header
        isGameWon={isGameWon}
        isGameLost={isGameLost}
        isGameOver={isGameOver}
        wrongGuessCount={wrongGuessCount}
        guessedLetters={guessedLetters}
        currentWord={currentWord}
        lastGuessedLetter={lastGuessedLetter}
      />
      <main>
        <section className="eliminations">{eliminations}</section>
        <section className="letters">{letterWord}</section>
        {/* Combined visually-hidden aria-live region for status */}
        <section className="sr-only" aria-live="polite" role="status">
          <p>
            {currentWord.includes(lastGuessedLetter)
              ? `Correct the letter ${lastGuessedLetter} is in the word`
              : `Sorry, the letter ${lastGuessedLetter} is not in the word`}
            You have ${numGuessesLeft} attempts Left
          </p>
          <p>
            Current Word:{' '}
            {currentWord
              .split('')
              .map((letter) =>
                guessedLetters.includes(letter) ? `${letter}, ` : 'blank, ',
              )
              .join('')}
          </p>
        </section>
        <section className="board">{keyboardElements}</section>
        {isGameOver && (
          <button className="new-game" onClick={() => startNewGame()}>
            New Game
          </button>
        )}
      </main>
      {/* <Footer /> */}
    </>
  );
}

export default App;
