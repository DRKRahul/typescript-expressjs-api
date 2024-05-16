export interface BaseItem {
    name: string;
    price: number;
    image: string;
    description: string
}

export interface Item extends BaseItem {
    id: number
}