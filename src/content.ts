export const APP_NAME = 'Scripture Spies'

export const RULES_HTML = `
  <h2>How to play</h2>
  <ol class="rules">
    <li><b>Split into two teams</b>, Red and Blue. Each team picks one <b>spymaster</b>.</li>
    <li>Spymasters scan the <b>Spymaster QR</b> code. Their phones show which words belong to which team.
      The team that goes first has 9 agents. The other team has 8.</li>
    <li>On your turn, your spymaster gives a <b>one-word clue and a number</b>, like <i>"Shepherd, 3"</i>.
      The clue may not be a word on the board.</li>
    <li>Your team taps cards on the board to guess. You may make up to <b>number + 1</b> guesses.
      Guessing a bystander or the other team's card ends your turn.</li>
    <li>Watch out for the <b>serpent</b> 🐍. Reveal it and your team loses on the spot.</li>
    <li>The first team to reveal all of its agents wins.</li>
  </ol>
  <p class="muted small">The board remembers its progress on this device. Use <b>Undo</b> if someone taps the wrong card.</p>
`
