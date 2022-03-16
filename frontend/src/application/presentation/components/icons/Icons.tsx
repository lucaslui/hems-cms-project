import React, { ReactElement } from 'react'
import { IconType, IconBaseProps } from 'react-icons'
import { FaBath, FaBed, FaBell, FaCar, FaChair, FaChargingStation, FaChartArea, FaChartBar, FaCoffee, FaCog, FaCommentDots, FaCouch, FaDatabase, FaDesktop, FaDoorOpen, FaEgg, FaEllipsisH, FaEnvelope, FaFan, FaFaucet, FaFileInvoiceDollar, FaGamepad, FaGlobeAmericas, FaHouseUser, FaLaptop, FaLaptopHouse, FaLightbulb, FaMobile, FaMotorcycle, FaPaste, FaPlug, FaServer, FaShower, FaSitemap, FaSnowflake, FaSolarPanel, FaTemperatureHigh, FaTshirt, FaTv, FaUsers, FaUtensils, FaWater, FaWaveSquare, FaWind } from 'react-icons/fa'

import { MdCake, MdDevicesOther, MdKitchen, MdLocalMovies, MdMicrowave, MdPaid, MdPrint, MdRadio, MdSpeaker, MdWifi, MdWork } from 'react-icons/md'

const styleMd = { marginBottom: '2px', width: '20px', height: '20px' }
const styleFa = { marginBottom: '4px', width: '16px' }

const toIcon = (OriginalIcon: IconType, defaultStyle): React.FC => {
  const Icon = (defaultProps: IconBaseProps): ReactElement => {
    if (defaultProps.className) {
      return <OriginalIcon {...defaultProps} />
    } else {
      return <OriginalIcon {...defaultProps} style={defaultStyle}/>
    }
  }
  return Icon
}

export default {
  ChartBar: toIcon(FaChartBar, styleFa),
  ChartArea: toIcon(FaChartArea, styleFa),
  Controller: toIcon(FaLaptopHouse, styleFa),
  Tariff: toIcon(FaFileInvoiceDollar, styleFa),
  Outlet: toIcon(FaPlug, styleFa),
  Bed: toIcon(FaBed, styleFa),
  Bath: toIcon(FaBath, styleFa),
  LivingRoom: toIcon(FaCouch, styleFa),
  DinningRoom: toIcon(FaChair, styleFa),
  Kitchen: toIcon(FaUtensils, styleFa),
  Laundry: toIcon(FaFaucet, styleFa),
  Basement: toIcon(FaDoorOpen, styleFa),
  Garage: toIcon(FaCar, styleFa),
  SolarPanel: toIcon(FaSolarPanel, styleFa),
  Bell: toIcon(FaBell, styleFa),
  Report: toIcon(FaPaste, styleFa),
  Setting: toIcon(FaCog, styleFa),
  Regions: toIcon(FaSitemap, styleFa),
  Users: toIcon(FaUsers, styleFa),
  Notification: toIcon(FaEnvelope, styleFa),
  System: toIcon(FaServer, styleFa),
  Communication: toIcon(FaCommentDots, styleFa),
  Database: toIcon(FaDatabase, styleFa),
  EquipmentType: toIcon(FaChargingStation, styleFa),
  PowerFactor: toIcon(FaWaveSquare, styleFa),
  Geolocation: toIcon(FaGlobeAmericas, styleFa),
  AirConditioner: toIcon(FaSnowflake, styleFa),
  Coffee: toIcon(FaCoffee, styleFa),
  Desktop: toIcon(FaDesktop, styleFa),
  Utensils: toIcon(FaUtensils, styleFa),
  Car: toIcon(FaCar, styleFa),
  Fan: toIcon(FaFan, styleFa),
  Motocycle: toIcon(FaMotorcycle, styleFa),
  Wind: toIcon(FaWind, styleFa),
  Router: toIcon(MdWifi, styleMd),
  Lightbulb: toIcon(FaLightbulb, styleFa),
  Microwave: toIcon(MdMicrowave, styleMd),
  Laptop: toIcon(FaLaptop, styleFa),
  Cake: toIcon(MdCake, styleMd),
  Radio: toIcon(MdRadio, styleMd),
  Fridge: toIcon(MdKitchen, styleMd),
  Shower: toIcon(FaShower, styleFa),
  Smartphone: toIcon(FaMobile, styleFa),
  SpaceHeater: toIcon(FaTemperatureHigh, styleFa),
  Speaker: toIcon(MdSpeaker, styleMd),
  VideoGame: toIcon(FaGamepad, styleFa),
  Television: toIcon(FaTv, styleFa),
  Cooktop: toIcon(FaEgg, styleFa),
  DvdPlayer: toIcon(MdLocalMovies, styleFa),
  Printer: toIcon(MdPrint, styleMd),
  TShirt: toIcon(FaTshirt, styleFa),
  Water: toIcon(FaWater, styleFa),
  UserController: toIcon(FaHouseUser, styleFa),
  Miscellaneous: toIcon(MdDevicesOther, styleMd),
  Office: toIcon(MdWork, styleMd),
  Money: toIcon(MdPaid, styleMd),
  Other: toIcon(FaEllipsisH, styleFa)
}
