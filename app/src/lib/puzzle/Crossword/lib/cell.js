export class Cell {
  constructor({ x, y, expected, directions }, clues) {
    this.x = x
    this.y = y
    this.expected = expected
    this.value = ''
    this.blank = true
    this.solved = false
    this.error = false
    this.focus = false
    this.active = false
    this.current = 'across' in directions ? 'across' : 'down'

    this.clues = {}
    for (var key in directions) {
      this.clues[key] = clues[key][directions[key].number]
    }
  }

  setCurrent(direction) {
    const other = direction === 'across' ? 'down' : 'across'
    this.current = direction in this.clues ? direction : other
  }

  toggle() {
    const other = this.current === 'across' ? 'down' : 'across'
    this.setCurrent(direction)
  }
}
