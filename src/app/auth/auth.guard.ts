import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard = () => {

  const router = inject(Router);
  const userId = getFromSession("Name")
  if (userId !== null) {
    return true;
  }
  else 
  // Redirect to the login page
  router.navigate(['login'])
  return false;
};

export const saveToSession = (key:string,value:string,ttl:number=900000)=>{
    const item = {
		"value": value,
		"expiry": new Date().getTime() + ttl,
	}
    localStorage.setItem(key,JSON.stringify(item))
}

export const getFromSession = (key:string)=>{
    const itemStr = localStorage.getItem(key)
    if (!itemStr) {
        return null
    }
    // const item = JSON.parse(itemStr)
    // const now = new Date()
    // compare the expiry time of the item with the current time
    // if (now.getTime() > item.expiry) {
    //     // If the item is expired, delete the item from storage
    //     // and return null
    //     localStorage.removeItem(key)
    //     return null
    // }
    return itemStr
}