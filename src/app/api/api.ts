import { Client, Account, Databases, Functions, Storage, Models, ID, Query } from 'appwrite'
// import type {
//   HeroBlock,
//   TwoSidesBlock,
//   MagazinesScrollBlock,
//   SponsorsBlock,
//   VideoPlayerBlock,
//   ContactBlock,
//   FooterBlock,
// } from './types'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
let instance: null | Api = null

class Api {
  sdk
  generalDB

  currentAccount: Models.Session | any | null
  constructor() {
    if (instance) {
      throw new Error('New API instance cannot be created!!')
    }
    // instance = this
    const appwrite = new Client()
    appwrite.setEndpoint('https://cloud.appwrite.io/v1').setProject('670136d30023b500dadc')


    // const client = new Client();

    // client
    //     .setEndpoint('https://cloud.appwrite.io/v1')
    //     .setProject('670136b90001d2f8c8cc');


    const functions = new Functions(appwrite)
    const account = new Account(appwrite)
    const database = new Databases(appwrite)
    const storage = new Storage(appwrite)
    this.sdk = { database, account, functions, storage }
    this.generalDB = '651c37077ab95bb6d02f'



    this.currentAccount = null

  }

  provider() {
    if (this.sdk) {
      return this.sdk
    }
  }
  async createSession(email: string, password: string) {
    try {
      console.log(email)
      console.log(password)
      const session = await this.sdk.account.createEmailSession(email, password);
      // Генерация JWT токена с использованием секрета из переменной окружения
      // const token = jwt.sign(
      //   { userId: session.$id, email: email },
      //   process.env.JWT_SECRET || 'defaultSecret', // Используем переменную окружения для секрета
      //   { expiresIn: '1h' }
      // );

      console.log("Сессия успешно создана:", session);
      // console.log("JWT токен:", token);
      return session;
    } catch (e: any) {
      // Убираем любые проверки с использованием `instanceof`
      console.error("Ошибка при создании сессии:", e.message || e);
      console.error("Стек вызовов:", e.stack || e);
      throw e; // Просто выбрасываем ошибку дальше
    }
  }
  async getUserInfo() {

    // if (id) {
    const response = await this.sdk.account.get();
    // const response = await this.sdk.database.getDocument(this.generalDB, '646d0d2149f236a62413', id)
    console.log(response)
    return response
    // }
  }
  async handler(req) {
    const { email, password, name } = req;
    try {
      // Хешируем пароль
      const hashedPassword = await bcrypt.hash(password, 10);
      // Создаем пользователя через Appwrite
      const response = await this.sdk.account.create(
        'unique()', // ID пользователя, оставляем unique() для уникальности
        email,
        password,
        name
      );
      return response
      // return res.status(201).json({ userId: response.$id, message: 'User created successfully!' });
    } catch (error) {
      console.error(error.message);
      // return res.status(500).json({ error: error.message });
    }
  }

  async getAllDocs() {
    const allDocs = await this.sdk.database.listDocuments(this.generalDB, this.blocksCollection) // '[DATABASE_ID]', '[COLLECTION_ID]'

    return allDocs
  }


}

const api = new Api()

export { api }
