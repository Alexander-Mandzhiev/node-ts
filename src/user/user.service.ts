import { PostgresDataSource } from '../data-source.js';
import { UserDto } from './user.dto.js';
import { User } from './user.entity.js';

const userRepository = PostgresDataSource.getRepository(User)

const create = async (dto: UserDto) => {
    try {
        return await userRepository.save(dto)
    } catch (error) {
        throw new Error(`${error}`)
    }
}

const getAll = async () => {
    try {
        return await userRepository.find()
    } catch (error) {
        throw new Error(`${error}`)
    }
}

const getOne = async (id: number) => {
    try {
        return await userRepository.findOneBy({ id })
    } catch (error) {
        throw new Error(`${error}`)
    }
}

const update = async (id: number, dto: UserDto) => {
    try {
        const user = await userRepository.findOneBy({ id })
        if (!user) { throw new Error(`Пользователь с id = ${id} не существует!`) }
        return await userRepository.save({ ...user, ...dto })
    } catch (error) {
        throw new Error(`${error}`)
    }
}

const deleteU = async (id: number) => {
    try {
        const deletedUser = await userRepository.delete(id)
        return `Пользователь удалён!`
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export { create, getAll, getOne, update, deleteU }