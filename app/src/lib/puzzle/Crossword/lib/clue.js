function take(allowed, char) {
  const index = allowed.findIndex((el) => el.used == false && el.char == char)
  if (index > -1) allowed[index].used = true
  return allowed
}

export class Clue {
  constructor() {
    this.direction = direction
    this.number = number
    this.text = text
    this.coords = coords
    this.ref = []
    this.coords.map((x, y) => {
      this.ref.push(cells[y][x])
    })
    this.allowed = allowed
  }

  filled() {
    return this.ref.filter(({ value }) => value === '').length == 0
  }
  solved() {
    return this.ref.filter(({ value, expected }) => value !== expected).length == 0
  }
  check() {
    const other = this.direction === 'across' ? 'down' : 'across'
    const solved = this.solved()

    this.ref.map((cell) => {
      cell.error = !solved
      cell.solved = cell.solved || solved

      // if solved mark the allowed of opp direction
      if (solved && other in cell.directions) {
        cell.directions[other][this.number].clue.allowed = take(
          cell.directions[other][this.number].clue.allowed,
          cell.value
        )
      }
    })
    return solved
  }
  take(char) {
    const index = this.allowed.findIndex((el) => el.used == false && el.char == char)
    if (index > -1) this.allowed[index].used = true
    return index > -1
  }
  give(char) {
    const index = this.allowed.findIndex((el) => el.used == true && el.char == char)
    if (index > -1) this.allowed[index].used = false
    return index > -1
  }
}
