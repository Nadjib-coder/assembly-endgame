import { languages } from '../Languages';
import { useState } from 'react';
import clsx from 'clsx';

export default function Main() {
  const [currentWord, setCurrentWord] = useState('react');
  const [guessedLetters, setGuessedLetters] = useState([]);

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const eliminations = languages.map((language) => {
    const styles = {
      backgroundColor: language.backgroundColor,
      color: language.color,
    };
    return (
      <span key={language.name} style={styles}>
        {language.name}
      </span>
    );
  });

  const letterWord = currentWord
    .split('')
    .map((letter, index) => (
      <span key={index}>
        {guessedLetters.includes(letter.toUpperCase())
          ? letter.toUpperCase()
          : ''}
      </span>
    ));

  const keyboardElements = alphabet.map((letter) => {
    const isGuessed = guessedLetters.includes(letter);
    const isCorrect = isGuessed && currentWord.toUpperCase().includes(letter);
    const isWrong = isGuessed && !currentWord.toUpperCase().includes(letter);
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
        {letter}
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
