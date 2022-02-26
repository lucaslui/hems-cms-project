export const addRoomParamsSchema = {
  type: 'object',
  properties: {
    roomName: {
      type: 'string',
      description: 'Nome do cômodo'
    },
    roomType: {
      type: 'string',
      description: 'Tipo do cômodo',
      enum: ['bedroom', 'bathroom', 'livingroom', 'dinningroom', 'kitchen', 'laundry', 'basement', 'garage']
    }
  },
  example: {
    roomName: 'Quarto da Julia',
    roomType: 'bedroom'
  },
  required: ['roomName', 'roomType']
}
