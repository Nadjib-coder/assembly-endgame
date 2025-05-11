import clsx from 'clsx';

export default function Header(props) {
  const gameStatusClassName = clsx('game-status', {
    won: props.isGameWon,
    lost: props.isGameLost,
  });
  return (
    <header>
      <section className="title">
        <h1>Assembly: Endgame</h1>
        <p>
          Guess the word in under 8 attempts to keep the programming world safe
          from Assembly!
        </p>
      </section>
      <section className={gameStatusClassName}>
        {props.isGameOver ? (
          props.isGameWon ? (
            <>
              <h2>You win!</h2>
              <p>Well done! 🎉</p>
            </>
          ) : (
            <>
              <h2>Game over!</h2>
              <p>You lose! Better start learning Assembly 😭</p>
            </>
          )
        ) : null}
      </section>
    </header>
  );
}
