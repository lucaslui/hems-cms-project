import Icons from '@/presentation/components/icons/Icons'
import { IconType } from 'react-icons'

export type DeviceTypeKey = 'miscellaneous' | 'shower' | 'dvd-player' | 'air-conditioner' | 'television'
| 'desktop-computer' | 'notebook' | 'smartphone' | 'microwave' | 'induction-cooktop' | 'electric-stove' | 'electric-car' |
'electric-motorcycle' | 'lamp' | 'radio' | 'television' | 'water-purifier' | 'kitchen-hood' |
'dishwasher' | 'fridge' | 'speaker' | 'washing-machine' | 'electric-oven' | 'coffe-maker' |
'electric-fan' | 'humidifier' | 'space-heater' | 'other' | ''

// |'evaporative-cooler' | 'blender' | 'instant-pot' | 'rice-cooker' | 'stand-mixer' | 'sewing-machine' | 'iron' | 'ceiling-fan' |

export type DeviceType = {
  value: DeviceTypeKey
  display: string
  icon?: IconType
}

const unspecifiedType: DeviceType = {
  value: '',
  display: ''
}

const miscellaneous: DeviceType = {
  value: 'miscellaneous',
  display: 'Diversos',
  icon: Icons.Miscellaneous
}

const deviceTypeCollection: DeviceType[] = (
  [
    {
      value: 'air-conditioner',
      display: 'Ar condicionado',
      icon: Icons.AirConditioner
    },
    {
      value: 'coffe-maker',
      display: 'Cafeteira',
      icon: Icons.Coffee
    },
    {
      value: 'desktop-computer',
      display: 'Computador de mesa',
      icon: Icons.Desktop
    },
    {
      value: 'dishwasher',
      display: 'Lava louças',
      icon: Icons.Utensils
    },
    {
      value: 'electric-car',
      display: 'Carro elétrico',
      icon: Icons.Car
    },
    {
      value: 'electric-fan',
      display: 'Ventilador',
      icon: Icons.Fan
    },
    {
      value: 'electric-motorcycle',
      display: 'Moto elétrica',
      icon: Icons.Motocycle
    },
    {
      value: 'humidifier',
      display: 'Umidificador de ar',
      icon: Icons.Wind
    },
    {
      value: 'router',
      display: 'Roteador',
      icon: Icons.Router
    },
    {
      value: 'lamp',
      display: 'Lâmpada',
      icon: Icons.Lightbulb
    },
    {
      value: 'microwave',
      display: 'Micro-ondas',
      icon: Icons.Microwave
    },
    {
      value: 'notebook',
      display: 'Notebook',
      icon: Icons.Laptop
    },
    {
      value: 'electric-oven',
      display: 'Forno elétrico',
      icon: Icons.Cake
    },
    {
      value: 'radio',
      display: 'Rádio',
      icon: Icons.Radio
    },
    {
      value: 'fridge',
      display: 'Geladeira',
      icon: Icons.Fridge
    },
    {
      value: 'shower',
      display: 'Chuveiro',
      icon: Icons.Shower
    },
    {
      value: 'smartphone',
      display: 'Celular',
      icon: Icons.Smartphone
    },
    {
      value: 'space-heater',
      display: 'Aquecedor',
      icon: Icons.SpaceHeater
    },
    {
      value: 'speaker',
      display: 'Caixa de som',
      icon: Icons.Speaker
    },
    {
      value: 'dvd-player',
      display: 'DVD player',
      icon: Icons.DvdPlayer
    },
    {
      value: 'video-game',
      display: 'Vídeo game',
      icon: Icons.VideoGame
    },
    {
      value: 'cooktop',
      display: 'Cooktop',
      icon: Icons.Cooktop
    },
    {
      value: 'television',
      display: 'Televisão',
      icon: Icons.Television
    },
    {
      value: 'printer',
      display: 'Impressora',
      icon: Icons.Printer
    },
    {
      value: 'washing-machine',
      display: 'Máquina de lavar',
      icon: Icons.TShirt
    },
    {
      value: 'water-purifier',
      display: 'Purificador de água',
      icon: Icons.Water
    }
  ].sort((type1, type2) =>
    type1.display.localeCompare(type2.display)
  )).concat(
  [
    {
      value: 'other',
      display: 'Outros',
      icon: Icons.Other
    }
  ]
) as DeviceType []

const getDeviceType = (key: DeviceTypeKey): DeviceType => {
  if (key === 'miscellaneous') {
    return miscellaneous
  }

  const deviceTypeFound = deviceTypeCollection.find(
    type => type.value === key
  )

  if (deviceTypeFound) {
    return deviceTypeFound
  }

  return unspecifiedType
}

const existsDisplayDeviceType = (display: string): boolean => {
  return deviceTypeCollection.some(
    type => type.display === display
  )
}

export { existsDisplayDeviceType, deviceTypeCollection, getDeviceType }
