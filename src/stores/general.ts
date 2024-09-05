// https://golang.qspiders.com/api/counselor/enquiries?page=${page}${search}
import { writable ,readable} from 'svelte/store';
import Cookies from 'js-cookie'
import axios from 'axios';
import  { jwtDecode } from 'jwt-decode';
import { getToastStore } from '@skeletonlabs/skeleton';

// import { set } from 'svelte/store';
export const store = writable(null);
export let user = writable(null);
export let author = writable(null);
export let token = writable(null);
export const srate_list = writable({items:[],total:0,size:0,page:0});
export const jrated_list = writable({items:[],total:0,size:0,page:0});
export const misscall=writable({items:[],total:0,size:0,page:0});
export const nostatus=writable({items:[],total:0,size:0,page:0});
export const history=writable({items:[],total:0,size:0,page:0});
export const got_job=writable({items:[],total:0,size:0,page:0});
export const miss_comm =writable([])
export const filter_branch=writable([])
export const joined_some=writable({items:[],total:0,size:0,page:0});
export const not_interested=writable({items:[],total:0,size:0,page:0});
export const close_notinterested=writable([])
export const close_enquiry=writable([])
export const change_pass=writable([])
export const add_internal=writable([])
export const main_status=writable({items:[],total:0,size:0,page:0});
export const reasons=writable({items:[],total:0,size:0,page:0});
export const counselor =writable({items:[],total:0,size:0,page:0});
export const update=writable([]);
export const ratenames =writable({items:[],total:0,size:0,page:0});
export const couns_list =writable({items:[],total:0,size:0,page:0});
export const userbranch =writable({items:[],total:0,size:0,page:0});
export const call_record=writable({items:[],total:0,size:0,page:0});



if(Cookies.get('user')){
    const usecookie = Cookies.get('user')
    token=usecookie
    const decoded = jwtDecode(usecookie)
}



export const mainStore = ()=>( {
    
async get_sratelist(page=0,search){
    const usertoken = token;
    if (usertoken) {
        const headers = {
            'Authorization': usertoken,
            "Content-Type": "application/json",
        }
        try {
            const response = await axios.get(`https://golang.qspiders.com/api/cv/get-enquiry-ratings?page=${page}&${search}`, {
                headers: headers
            });
        return srate_list.set(response.data);
        }
        catch (err) {
            console.log("errors", err)
        }
    }  
},
async get_jratedlist(page=0,filters) {
    const usertoken = token;
    if (usertoken) {
        const headers = {
            'Authorization': usertoken,
            "Content-Type": "application/json",
        }
        try {
            const response = await axios.get(`https://golang.qspiders.com/api/cv/my-enquiry-ratings?page=${page}&${filters}`, {
                headers: headers
            });
        return jrated_list.set(response.data);
        }
        catch (err) {
            console.log("errors", err)
        }
    }  
    // if(refresh){
    //     const user = useMainStore();
    //     if (user.token) {
    //         const headers = {
    //             'Authorization': user.token,
    //             "Content-Type": "application/json",
    //         }
    //         try {
    //             const ct = await axios.get(`https://golang.qspiders.com/api/rateopti/rateopti-rated-recs?page=${page}&${filters}`, {
    //                 headers: headers
    //             });
    //             if(filters){ 
    //          if(ct.data.items&&ct.data.items.length!=0){
    //                 this.jrated_list =  ct.data
    //             }
    //         else{
    //             user.pushMessage("Data doesn't exist!")
    //             this.jrated_list = this.jrated_list
    //          }
    //         }
    //         else{
    //             this.jrated_list =  ct.data
    //         }  
    //         }
    //         catch (err) {
    //             console.log("errors", err)
    //         }
    //     }
    // }
    
},
async getmiscalllist(page=0,search){
    const usertoken = token;
    if (usertoken) {
        const headers = {
            'Authorization': usertoken,
            "Content-Type": "application/json",
        }
        try {
            const response = await axios.get(`https://golang.qspiders.com/api/cvs/missed-call-escalations?page=${page}&${search}`, {
                headers: headers
            });
        return misscall.set(response.data);
        }
        catch (err) {
            console.log("errors", err)
        }
    }  
},
async getnostatus(page=0,search){
    const usertoken = token;
    if (usertoken) {
        const headers = {
            'Authorization': usertoken,
            "Content-Type": "application/json",
        }
        try {
            const response = await axios.get(`https://golang.qspiders.com/api/cvj/no-status-escalation?page=${page}&${search}`, {
                headers: headers
            });
        return nostatus.set(response.data);
        }
        catch (err) {
            console.log("errors", err)
        }
    }  
},
async getshowhistory(page=0,dataa){
    const usertoken = token;
    if (usertoken) {
        const headers = {
            'Authorization': usertoken,
            "Content-Type": "application/json",
        }
        try {
            const res = await axios.get(` https://golang.qspiders.com/api/record/branch-records?size=8&page=${page}&name=${dataa}`, {
                headers: headers
            });
        return history.set(res.data);
        }
        catch (err) {
            console.log("errors", err)
        }
    }  
},

async add_other_rating(form) {
    const usertoken = token;
    if (usertoken) {
        const headers = {
            'Authorization': usertoken,
            "Content-Type": "application/json",
        }
            const response = await axios.post(`https://golang.qspiders.com/api/cv/add-other-ratings`, form,{
                headers: headers
            }).then(
                function (response) {
                    console.log("sfgm",response)
                    // user.pushMessage(response.data.message)
                }
              ).catch(function (error) {
                if (error.response) {
                  // The request was made and the server responded with a status code
                  // that falls out of the range of 2xx

                  if(error.response.status === 400){
                    console.log("err",error)
                    // user.pushMessage("Already rated!")
                  }
                } else if (error.request) {
                  // The request was made but no response was received
                  // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                  // http.ClientRequest in node.js
                //   console.log(error.request);
                } else {
                  // Something happened in setting up the request that triggered an Error
                //   console.log('Error', error.message);
                }
              });
    }
},
async post_comment(form) {
    const usertoken = token;
    if (usertoken) {
        const headers = {
            'Authorization': usertoken,
            "Content-Type": "application/json",
        }

            const response = await axios.post(`https://golang.qspiders.com/api/cvs/misscall-comment`, form,{
                headers: headers
            });
            return miss_comm.set(response.data);
    }
},
async getgotjob(page=0,refresh=false,filters){
    const usertoken = token;
    if (usertoken) {
        const headers = {
            'Authorization': usertoken,
            "Content-Type": "application/json",
        }
        try {
            const res = await axios.get(`https://golang.qspiders.com/api/rateopti/get-gotjobs?page=${page}&filters=${filters}&params=opti`, {
                headers: headers
            });
        return got_job.set(res.data);
        }
        catch (err) {
            console.log("errors", err)
        }
    }
    // if(refresh) {
    //     if (usertoken) {
    //         const headers = {
    //             'Authorization': usertoken,
    //             "Content-Type": "application/json",
    //         }
    //         try {
    //             const res = await axios.get(`https://golang.qspiders.com/api/rateopti/get-gotjobs?page=${page}&filters=${filters}&params=opti`, {
    //                 headers: headers
    //             });
    //             console.log("zmmsgn",res.data)
    //         return got_job.set(res.data);
    //         }
    //         catch (err) {
    //             console.log("errors", err)
    //         } 
    //     }
    // }
},
async getjoinedsome(page=0,refresh=false,filters){
    const usertoken = token;
    if (usertoken) {
        const headers = {
            'Authorization': usertoken,
            "Content-Type": "application/json",
        }
        try {
            const res = await axios.get(`https://golang.qspiders.com/api/rateopti/get-joinedsomewhere?page=${page}&filters=${filters}&params=opti`, {
                headers: headers
            });
        return joined_some.set(res.data);
        }
        catch (err) {
            console.log("errors", err)
        }
    }
},
async getnotinterested(page=0,refresh=false,filters){
    const usertoken = token;
    if (usertoken) {
        const headers = {
            'Authorization': usertoken,
            "Content-Type": "application/json",
        }
        try {
            const res = await axios.get(`https://golang.qspiders.com/api/rateopti/not-intrested-enqs?page=${page}&filters=${filters}&params=opti`, {
                headers: headers
            });
        return not_interested.set(res.data);
        }
        catch (err) {
            console.log("errors", err)
        }
    }
},   
async getfilterbranches(page=0,dataa){
    const usertoken = token;
    if (usertoken) {
        const headers = {
            'Authorization': usertoken,
            "Content-Type": "application/json",
        }
        try {
            const res = await axios.get(`https://golang.qspiders.com/api/users/get-allbranches?size=500`, {
                headers: headers
            });
        return filter_branch.set(res.data);
        }
        catch (err) {
            console.log("errors", err)
        }
    }  
},

async closenotinterested(form) {
    const usertoken = token;
    if (usertoken) {
        const headers = {
            'Authorization': usertoken,
            "Content-Type": "application/json",
        }

            const response = await axios.post(`https://golang.qspiders.com/api/opti/remove-notintrested`, form,{
                headers: headers
            });
            return close_notinterested.set(response.data);
    }
},
async submitcloseenquiry(form) {
    const usertoken = token;
    if (usertoken) {
        const headers = {
            'Authorization': usertoken,
            "Content-Type": "application/json",
        }

            const response = await axios.post(`https://golang.qspiders.com/api/rateopti/remove-from-tables`, form,{
                headers: headers
            });
            return close_enquiry.set(response.data);
    }
},


async change_password(form) {
    const usertoken = token;
    if (usertoken) {
        const headers = {
            'Authorization': usertoken,
            "Content-Type": "application/json",
        }

            const response = await axios.post(`https://golang.qspiders.com/api/all/change-password`, form,{
                headers: headers
            });
            return change_pass.set(response.data);
    }
},

async addinternal(form) {
    const usertoken = token;
    if (usertoken) {
        const headers = {
            'Authorization': usertoken,
            "Content-Type": "application/json",
        }

            const response = await axios.post(`https://golang.qspiders.com/api/admin/add-internal-number`, form,{
                headers: headers
            });
            return add_internal.set(response.data);
    }
},
async getmainstatus(dataa){
    const usertoken = token;
    if (usertoken) {
        const headers = {
            'Authorization': usertoken,
            "Content-Type": "application/json",
        }
        try {
            const res = await axios.get(`https://golang.qspiders.com/api/counselor/get-main-status`, {
                headers: headers
            });
        return main_status.set(res.data);
        }
        catch (err) {
            console.log("errors", err)
        }
    }  
},
async getreasons(dataa){
    const usertoken = token;
    if (usertoken) {
        const headers = {
            'Authorization': usertoken,
            "Content-Type": "application/json",
        }
        try {
            const res = await axios.get(`https://golang.qspiders.com/api/admin/get-escalation-reason?size=500`, {
                headers: headers
            });
        return reasons.set(res.data);
        }
        catch (err) {
            console.log("errors", err)
        }
    }  
},
async getcounselor(dataa){
    const usertoken = token;
    if (usertoken) {
        const headers = {
            'Authorization': usertoken,
            "Content-Type": "application/json",
        }
        try {
            const res = await axios.get(`https://golang.qspiders.com/api/counselor/get-branch-counselors?size=500`, {
                headers: headers
            });
        return counselor.set(res.data);
        }
        catch (err) {
            console.log("errors", err)
        }
    }  
},
async updatestatus(form) {
    const usertoken = token;
    if (usertoken) {
        const headers = {
            'Authorization': usertoken,
            "Content-Type": "application/json",
        }

            const response = await axios.post(`https://golang.qspiders.com/api/counselor/update-status`, form,{
                headers: headers
            });
            return update.set(response.data);
    }
},
async getratenames(page=0){
    const usertoken = token;
    if (usertoken) {
        const headers = {
            'Authorization': usertoken,
            "Content-Type": "application/json",
        }
        try {
            const res = await axios.get(`https://golang.qspiders.com/api/cv/get-call-ratings?page=${page}`, {
                headers: headers
            });
        return ratenames.set(res.data);
        }
        catch (err) {
            console.log("errors", err)
        }
    }  
},
async getcounselorlist(page=0){
    const usertoken = token;
    if (usertoken) {
        const headers = {
            'Authorization': usertoken,
            "Content-Type": "application/json",
        }
        try {
            const res = await axios.get(`https://golang.qspiders.com/api/cvs/counselor-active-list?page=${page}`, {
                headers: headers
            });
            
        return couns_list.set(res.data);
        }
        catch (err) {
            console.log("errors", err)
        }
    }  
},
async getcoursebranches(query){
    const usertoken = token;
    if (usertoken) {
        const headers = {
            'Authorization': usertoken,
            "Content-Type": "application/json",
        }
        try {
            const res = await axios.get(`https://golang.qspiders.com/api/counselor/get-course-branches?name=${query}`, {
                headers: headers
            });
        return coursebranches.set(res.data);
        }
        catch (err) {
            console.log("errors", err)
        }
    }  

},
async getuserbranches(query){
    const usertoken = token;
    if (usertoken) {
        const headers = {
            'Authorization': usertoken,
            "Content-Type": "application/json",
        }
        try {
            const res = await axios.get(`https://golang.qspiders.com/api/users/branch`, {
                headers: headers
            });
        return userbranch.set(res.data);
        }
        catch (err) {
            console.log("errors", err)
        }
    } 
},
async getcallrecord(page=0,filters){
    const usertoken = token;
    if (usertoken) {
        const headers = {
            'Authorization': usertoken,
            "Content-Type": "application/json",
        }
        try {
            const res = await axios.get(`https://golang.qspiders.com/api/cvs/callrecords-of-number?page=${page}&${filters}`, {
                headers: headers
            });
        return call_record.set(res.data);
        }
        catch (err) {
            console.log("errors", err)
        }
    }
},   
})

// export const get_jratelist=async(page = 0) =>{
//     console.log("sfdmg",page)
//     const usertoken = token;
//     if (usertoken) {
//         const headers = {
//             'Authorization': usertoken,
//             "Content-Type": "application/json",
//         }
//         try {
//             const response = await axios.get(`https://golang.qspiders.com/api/rateopti/getcallrecords-opti?page=${page}`, {
//                 headers: headers
//             });
//             console.log("ksdgk",response.data)
//         return jrate_list.set(response.data);
//         }
//         catch (err) {
//             console.log("errors", err)
//         }
//     }
// }


// let sessions = []

export default{
    subscribe:srate_list.subscribe
}

