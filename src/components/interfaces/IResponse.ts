export interface IType {
    id: number;
    name: string;
    img: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IToken{
    token:string
}

export interface IBrandsByType {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}


export interface IDevice {

    id: number;
    name: string;
    price: number;
    rating: number;
    img: string;
    createdAt: Date;
    updatedAt: Date;
    typeId: number;
    brandId: number;

}

export interface DeviceResponce {
    count: number;
    rows: IDevice[];
}


export interface IBasketDevice {
        id: number;
        name: string;
        price: number;
        rating: number;
        img: string;
        createdAt: Date;
        updatedAt: Date;
        typeId: number;
        brandId: number;
    }


