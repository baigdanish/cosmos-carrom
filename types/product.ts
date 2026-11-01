export type Category='Carrom Boards'|'Strikers & Coins'|'Stands'|'Care & Accessories';
export type Variant={id:string;label:string;size?:string;thickness?:string;price:number;originalPrice?:number};
export type Product={id:string;slug:string;name:string;category:Category;description:string;images:string[];price:number;originalPrice?:number;featured?:boolean;size?:string;thickness?:string;specifications:Record<string,string>;variants?:Variant[];care:string;delivery:string};
export type CartItem={productId:string;variantId?:string;quantity:number};
