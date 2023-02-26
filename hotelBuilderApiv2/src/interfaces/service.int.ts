export interface iModel {
    [key: string]: any;
  }

export interface iUser extends iModel {
    username: string,
    email: string,
    fullname: string,
    password: string,
    age: number,
    role: string
}

export interface iRoom extends iModel {
    codename: string,
    price: number,
    roomtype: string
}

export interface iRoomType extends iModel {
    name: string,
    description: string,
}