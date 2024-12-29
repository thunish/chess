export const DEFAULT_POSITION = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'

export const INIT_GAME='init_game'

export const MOVE='move'

export const GAME_OVER='game_over'

export type moveType={
    to:string,
    from:string
}