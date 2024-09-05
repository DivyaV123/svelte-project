
import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import Cookies from 'js-cookie'
import  { jwtDecode } from 'jwt-decode';
export const handle: Handle = async ({ event, resolve }) => {
    if(event.cookies.get('user')){
        const usecookie = event.cookies.get('user')
        const decoded = jwtDecode(usecookie)
        event.locals.user =decoded
    }

    if(event.url.pathname==="/auth"&&event.cookies.get('user')){
        throw redirect(301,"/raterecordlist")
    }
    if(event.url.pathname!="/auth"&&!event.cookies.get('user')){
        throw redirect(301,"/auth")
    }

	return  resolve(event) ;
};