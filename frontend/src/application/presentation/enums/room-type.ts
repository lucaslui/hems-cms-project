import Icons from '@/application/presentation/components/icons/Icons'
import { IconType } from 'react-icons'

export type RoomTypeKey = 'bedroom' | 'bathroom' |
'livingroom' | 'dinningroom' | 'kitchen' | 'laundry' |
'basement' | 'garage' | 'office' | 'other' | ''

export type RoomType = {
  value: RoomTypeKey
  display: string
  icon?: IconType
}

const unspecifiedRoomType: RoomType = {
  value: '',
  display: ''
}

const roomTypeCollection: RoomType[] = [
  {
    value: 'bedroom',
    display: 'Quarto',
    icon: Icons.Bed
  }, {
    value: 'bathroom',
    display: 'Banheiro',
    icon: Icons.Bath
  }, {
    value: 'livingroom',
    display: 'Sala de estar',
    icon: Icons.LivingRoom
  }, {
    value: 'dinningroom',
    display: 'Sala de jantar',
    icon: Icons.DinningRoom
  }, {
    value: 'kitchen',
    display: 'Cozinha',
    icon: Icons.Kitchen
  }, {
    value: 'office',
    display: 'Escritório',
    icon: Icons.Office
  }, {
    value: 'laundry',
    display: 'Lavanderia',
    icon: Icons.Laundry
  }, {
    value: 'basement',
    display: 'Porão',
    icon: Icons.Basement
  }, {
    value: 'garage',
    display: 'Garagem',
    icon: Icons.Garage
  }, {
    value: 'other',
    display: 'Outros',
    icon: Icons.Other
  }
]

const getRoomType = (roomTypeKey: RoomTypeKey): RoomType =>
  roomTypeCollection.find(
    roomType => roomType.value === roomTypeKey
  ) || unspecifiedRoomType

const existsDisplayRoomType = (display: string): boolean =>
  roomTypeCollection.some(roomType => roomType.display === display)

export { existsDisplayRoomType, roomTypeCollection, getRoomType }
