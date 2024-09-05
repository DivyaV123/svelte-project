import { readable, writable } from 'svelte/store';
import Cookies from 'js-cookie'
import axios from 'axios';
import  { jwtDecode } from 'jwt-decode';
import { getToastStore } from '@skeletonlabs/skeleton';

export const store = writable(null);
export let user = readable(null);
export let author = writable(null);
export let token = writable(null);
export let loggedIn = writable(null);
export let pageTitle=writable("")
// export const author=writable({id:0,name:"",roles:[],branches:[]})
let sessions = []

// export const getUserDetails = async ( username, password ) => {
//     console.log("SMGf",username,password)
// 	if ( username!='' && password!='' ){
//         const response= await axios.post("https://golang.qspiders.com/api/user/login", { email: username, password: password }, {
//             headers: {
//                 "content-type": "application/json",
//             }
//         })
//         console.log("rss",response)
//         if (response.status === 200) {
//             if(response && response.data && response.data.token){
//                 var decoded = jwtDecode(response.data.token)
//                 const roles = decoded.roles
//                 console.log("zks",roles)
//                let rateopti=false
//                 const result = roles.some(element => {
//                     if (element.name === "rateopti") {
//                         Cookies.set('user', response.data.token,{ expires: 365 },{ domain: '.qspiders.com' })
//                         console.log("sdk",response.data.token)
//                         // this.$patch({
//                             user=decoded,
//                             author= { id:decoded.uid, name:decoded.username, roles:decoded.roles, branches:decoded.branches },
//                             token= response.data.token,
//                             loggedIn= true
//                         // })
//                         console.log("DAlf",user)
//                         rateopti=true

//                         return user
//                         // theme.pushMessage("Login Successful")
//                     }
                  
//                     else {
//                         // theme.pushMessage("Unauthorized")
//                     }
//                 })
//                 // if(counselor==false){
    
                
//                 //   }
//                     // localStorage.setItem("user", JSON.stringify(response.data));
//                   }
//                 //   else{
//                 //     theme.pushMessage(response.data.error)
//                 //   }
//             }
//             // else {
//             //     theme.pushMessage("Login failed, please check your username and password")
//             //   }
        
//     }
//     // catch (error) {
//     //     theme.pushMessage(error.response.data.error)
//     // }
//         // console.log("sflm",data)
    

//         else return 2
// },




export const generalStore = ()=>( {
// const toastStore : getToastStore()
async setPageTitle(title) {
    pageTitle.set(title)
    return pageTitle
  },

      async getUserDetails( username, password ){
        // const toastStore = getToastStore();
            if ( username!='' && password!='' ){
                const response= await axios.post("https://golang.qspiders.com/api/user/login", { email: username, password: password }, {
                    headers: {
                        "content-type": "application/json",
                    }
                })
                if (response.status === 200) {
                    if(response && response.data && response.data.token){
                        var decoded = jwtDecode(response.data.token)
                        const roles = decoded.roles
                       let rateopti=false
                        const result = roles.some(element => {
                            if (element.name === "cvs") {
                                Cookies.set('user', response.data.token,{ expires: 365 },{ domain: '.qspiders.com' })
                                // this.$patch({
                                    user=decoded,
                                    author={ id:decoded.uid, name:decoded.username, roles:decoded.roles, branches:decoded.branches },
                                    token= response.data.token,
                                    loggedIn= true
                                // })
                                rateopti=true
                                
                                // toastStore.trigger("hii");
                                return user
                                
                                // theme.pushMessage("Login Successful")
                            }
                          
                            else {
                                // theme.pushMessage("Unauthorized")
                            }
                        })
                        // if(counselor==false){
            
                        
                        //   }
                            // localStorage.setItem("user", JSON.stringify(response.data));
                          }
                        //   else{
                        //     theme.pushMessage(response.data.error)
                        //   }
                    }
                    // else {
                    //     theme.pushMessage("Login failed, please check your username and password")
                    //   }
                
            }
            // catch (error) {
            //     theme.pushMessage(error.response.data.error)
            // }
                // console.log("sflm",data)
            
        
                else return 2
        },

        async logout(){
            try {
                // Cookies.remove('user', { domain: '.qspiders.com' })
                Cookies.remove('user')               
                    user=null,
                    token= null,
                    author= null,
                    loggedIn= false
 
                return true
            }
            catch (err) {
                return false
            }
        }

    // }
    
})