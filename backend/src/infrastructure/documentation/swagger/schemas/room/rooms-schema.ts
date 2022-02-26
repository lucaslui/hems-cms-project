import { roomSchema } from './room-schema'

export const roomsSchema = {
  type: 'array',
  description: 'Lista de cômodos criados pelo usuário ',
  items: roomSchema,
  example: [
    {
      id: '613105f170ad960072982321',
      name: 'Quarto da Julia',
      type: 'bedroom'
    },
    {
      id: '613105f170ad960072982654',
      name: 'Quarto do Pedro',
      type: 'bedroom'
    },
    {
      id: '613105f170ad960072982745',
      name: 'Cozinha da mãe',
      type: 'kitchen'
    }
  ]
}
