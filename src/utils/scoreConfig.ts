export const TIME_BASED_GAMES = [
  "NumberSortGame",
  "ReactionTimeGame",
  "OddOneOutGame",
];

export const isTimeBasedGame = (game: string): boolean =>
  TIME_BASED_GAMES.includes(game);
