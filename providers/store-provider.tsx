'use client';
import {createContext,useContext,useEffect,useMemo,useState} from 'react';
import type {CartItem} from '@/types/product';
import {products} from '@/data/products';
type Store={cart:CartItem[];wishlist:string[];ready:boolean;add:(id:string,variantId?:string,qty?:number)=>void;remove:(id:string,variantId?:string)=>void;setQty:(id:string,variantId:string|undefined,q:number)=>void;toggleWish:(id:string)=>void;clearCart:()=>void;cartCount:number;wishCount:number;subtotal:number};
const C=createContext<Store|null>(null);
export function StoreProvider({children}:{children:React.ReactNode}){const[cart,setCart]=useState<CartItem[]>([]),[wishlist,setWishlist]=useState<string[]>([]),[ready,setReady]=useState(false);
 useEffect(()=>{try{setCart(JSON.parse(localStorage.getItem('ch-cart')||'[]'));setWishlist(JSON.parse(localStorage.getItem('ch-wishlist')||'[]'))}catch{}setReady(true)},[]);
 useEffect(()=>{if(ready)localStorage.setItem('ch-cart',JSON.stringify(cart))},[cart,ready]);useEffect(()=>{if(ready)localStorage.setItem('ch-wishlist',JSON.stringify(wishlist))},[wishlist,ready]);
 const add=(productId:string,variantId?:string,quantity=1)=>setCart(c=>{const i=c.findIndex(x=>x.productId===productId&&x.variantId===variantId);return i<0?[...c,{productId,variantId,quantity}]:c.map((x,n)=>n===i?{...x,quantity:x.quantity+quantity}:x)});
 const remove=(productId:string,variantId?:string)=>setCart(c=>c.filter(x=>!(x.productId===productId&&x.variantId===variantId)));
 const setQty=(productId:string,variantId:string|undefined,quantity:number)=>quantity<1?remove(productId,variantId):setCart(c=>c.map(x=>x.productId===productId&&x.variantId===variantId?{...x,quantity}:x));
 const toggleWish=(id:string)=>setWishlist(w=>w.includes(id)?w.filter(x=>x!==id):[...w,id]);
 const subtotal=cart.reduce((s,i)=>{const p=products.find(x=>x.id===i.productId);const v=p?.variants?.find(x=>x.id===i.variantId);return s+(v?.price??p?.price??0)*i.quantity},0);
 const value=useMemo(()=>({cart,wishlist,ready,add,remove,setQty,toggleWish,clearCart:()=>setCart([]),cartCount:cart.reduce((s,x)=>s+x.quantity,0),wishCount:wishlist.length,subtotal}),[cart,wishlist,ready,subtotal]);return <C.Provider value={value}>{children}</C.Provider>}
export const useStore=()=>{const c=useContext(C);if(!c)throw new Error('StoreProvider missing');return c};
