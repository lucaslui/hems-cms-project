import { IController } from '@/src/application/protocols'
import { EditHemsDeviceNicknameController } from '@/src/application/controllers/device/edit-device-controller'
import { makeEditHemsDeviceNicknameValidation } from '../../validations/device/edit-device-validation-factory'
import { makeEditHemsDeviceNickname } from '../../usecases/devices/edit-device-factory'

export const makeEditHemsDeviceNicknameController = (): IController => {
  return new EditHemsDeviceNicknameController(makeEditHemsDeviceNicknameValidation(), makeEditHemsDeviceNickname())
}
