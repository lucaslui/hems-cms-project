type FlagTypeKey = 'green' | 'yellow' | 'red-1' | 'red-2' | 'scarcity'

type FlagType = {
  key: FlagTypeKey
  display: string
  color: string
}

const flagTypesList: FlagType[] = [
  {
    key: 'green',
    display: 'Verde',
    color: 'green'
  },
  {
    key: 'yellow',
    display: 'Amarela',
    color: 'gold'
  },
  {
    key: 'red-1',
    display: 'Vermelha - Patamar 1',
    color: 'red'
  },
  {
    key: 'red-2',
    display: 'Vermelha - Patamar 2',
    color: 'red'
  },
  {
    key: 'scarcity',
    display: 'Escassez Hídrica',
    color: 'black'
  }
]

export default flagTypesList
