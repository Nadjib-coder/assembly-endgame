import { languages } from '../Languages';
import { useState } from 'react';
import clsx from 'clsx';

export default function Main() {
  // State Vlaues
  const [currentWord, setCurrentWord] = useState('react');
  const [guessedLetters, setGuessedLetters] = useState([]);

  // Derived Values
  const wrongGuessCount = guessedLetters.filter(
    (letter) => !currentWord.includes(letter),
  ).length;

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

  const letterWord = currentWord
    .split('')
    .map((letter, index) => (
      <span key={index}>
        {guessedLetters.includes(letter) ? letter.toUpperCase() : ''}
      </span>
    ));

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

  return (
    <main>
      <section className="eliminations">{eliminations}</section>
      <section className="letters">{letterWord}</section>
      <section className="board">{keyboardElements}</section>
      <button className="new-game">New Game</button>
    </main>
  );
}
