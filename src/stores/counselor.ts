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
export const coursebranches=writable({branches:[]});
export const filter_course=writable({courses:[]})
export const mode_class=writable({items:[],total:0,size:0,page:0})
export const mode_of_enq=writable({items:[],total:0,size:0,page:0})
export const branchtrainer=writable({items:[],total:0,size:0,page:0})
export const special_course=writable({items:[],total:0,size:0,page:0})
export const branches_min=writable({items:[],total:0,size:0,page:0})
export const update_course=writable([])
export const classtimings=writable({items:[],total:0,size:0,page:0})
export const time_Slots=writable({items:[],total:0,size:0,page:0})
export const highest_degree=writable({items:[],total:0,size:0,page:0})
export const streams_data=writable({items:[],total:0,size:0,page:0})
// export const colleges=writable({items:[],total:0,size:0,page:0})
export const degreedata=writable({items:[],total:0,size:0,page:0})
export const submit_enq=writable([])

if(Cookies.get('user')){
    const usecookie = Cookies.get('user')
    token=usecookie
    const decoded = jwtDecode(usecookie)
}


export const counselorstore = ()=>( {
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
                console.log("smng",res.data)
            return coursebranches.set(res.data);
            }
            catch (err) {
                console.log("errors", err)
            }
        }  
    },
    async getfiltercourse(dataa){
        const usertoken = token;
        if (usertoken) {
            const headers = {
                'Authorization': usertoken,
                "Content-Type": "application/json",
            }
            try {
                const res = await axios.get(`https://golang.qspiders.com/api/counselor/get-counselor-courses?branch=${dataa}`, {
                    headers: headers
                });
            return filter_course.set(res.data);
            }
            catch (err) {
                console.log("errors", err)
            }
        }  
    },
    async getModeclass(dataa){
        const usertoken = token;
        if (usertoken) {
            const headers = {
                'Authorization': usertoken,
                "Content-Type": "application/json",
            }
            try {
                const res = await axios.get(`https://golang.qspiders.com/api/batch/modeofclasses?size=500`, {
                    headers: headers
                });
            return mode_class.set(res.data);
            }
            catch (err) {
                console.log("errors", err)
            }
        }  
    },
    async getModeEnquiry(dataa){
        const usertoken = token;
        if (usertoken) {
            const headers = {
                'Authorization': usertoken,
                "Content-Type": "application/json",
            }
            try {
                const res = await axios.get(` https://golang.qspiders.com/api/counselor/get-modeofenq`, {
                    headers: headers
                });
            return mode_of_enq.set(res.data);
            }
            catch (err) {
                console.log("errors", err)
            }
        }  
    },
    async getbranchtrainer(){
        const usertoken = token;
        if (usertoken) {
            const headers = {
                'Authorization': usertoken,
                "Content-Type": "application/json",
            }
            try {
                const res = await axios.get(`https://golang.qspiders.com/api/batch/trainer?size=500`, {
                    headers: headers
                });
            return branchtrainer.set(res.data);
            }
            catch (err) {
                console.log("errors", err)
            }
        }  
    },
    async getspecialcourse(){
        const usertoken = token;
        if (usertoken) {
            const headers = {
                'Authorization': usertoken,
                "Content-Type": "application/json",
            }
            try {
                const res = await axios.get(` https://golang.qspiders.com/api/course/get-special-courses?size=500`, {
                    headers: headers
                });
            return special_course.set(res.data);
            }
            catch (err) {
                console.log("errors", err)
            }
        }  
    },
    async getdisablebranch(){
        const usertoken = token;
        if (usertoken) {
            const headers = {
                'Authorization': usertoken,
                "Content-Type": "application/json",
            }
            try {
                const res = await axios.get(` https://golang.qspiders.com/api/users/get-branchesminimal?size=500`, {
                    headers: headers
                });
            return branches_min.set(res.data);
            }
            catch (err) {
                console.log("errors", err)
            }
        }  
    },
    async submitCourse(form) {
        console.log("fmgn",form)
        const usertoken = token;
        if (usertoken) {
            const headers = {
                'Authorization': usertoken,
                "Content-Type": "application/json",
            }
    
                const response = await axios.post(`https://golang.qspiders.com/api/counselor/add-course`, form,{
                    headers: headers
                });
                return update_course.set(response.data);
        }
    },
    async submitEnquiry(form) {
        console.log("fmgn",form)
        const usertoken = token;
        if (usertoken) {
            const headers = {
                'Authorization': usertoken,
                "Content-Type": "application/json",
            }    
                const response = await axios.post(`https://golang.qspiders.com/api/counselor/add-enquiry`, form,{
                    headers: headers
                });
                console.log("Sdfm",response.data)
                return submit_enq.set(response.data);
        }
    },
  
    async getclasstimings(){
        const usertoken = token;
        if (usertoken) {
            const headers = {
                'Authorization': usertoken,
                "Content-Type": "application/json",
            }
            try {
                const res = await axios.get(`  https://golang.qspiders.com/api/batch/classtiming?size=500`, {
                    headers: headers
                });
            return classtimings.set(res.data);
            }
            catch (err) {
                console.log("errors", err)
            }
        }  
    },
    async gettimeslots(){
        const usertoken = token;
        if (usertoken) {
            const headers = {
                'Authorization': usertoken,
                "Content-Type": "application/json",
            }
            try {
                const res = await axios.get(`  https://golang.qspiders.com/api/batch/timeslots?size=500`, {
                    headers: headers
                });
            return time_Slots.set(res.data);
            }
            catch (err) {
                console.log("errors", err)
            }
        }  
    },
    async gethighestdegree(){
        const usertoken = token;
        if (usertoken) {
            const headers = {
                'Authorization': usertoken,
                "Content-Type": "application/json",
            }
            try {
                const res = await axios.get(` https://golang.qspiders.com/api/users/qualifications?size=500`, {
                    headers: headers
                });
            return highest_degree.set(res.data);
            }
            catch (err) {
                console.log("errors", err)
            }
        }  
    },
    async getStreams(query){
        console.log("qqq",query)
        const usertoken = token;
        if (usertoken) {
            const headers = {
                'Authorization': usertoken,
                "Content-Type": "application/json",
            }
            try {
                const res = await axios.get(`   https://golang.qspiders.com/api/users/streams?${query}`, {
                    headers: headers
                });
                console.log("dsfn",res.data)
            //  streams_data.set(res.data);
            const data=await res.data
            return data
            }
            catch (err) {
                console.log("errors", err)
            }
        }  
    },
    async getColleges(query){
        const usertoken = token;
        if (usertoken) {
            const headers = {
                'Authorization': usertoken,
                "Content-Type": "application/json",
            }
            try {
                const res = await axios.get(` https://golang.qspiders.com/api/users/colleges?size=10&${query}`, {
                    headers: headers
                });
            // return colleges.set(res.data);
            const data=await res.data
            return data
            }
            catch (err) {
                console.log("errors", err)
            }
        }  
    },
    async getdegree(){
        const usertoken = token;
        if (usertoken) {
            const headers = {
                'Authorization': usertoken,
                "Content-Type": "application/json",
            }
            try {
                const res = await axios.get(`https://golang.qspiders.com/api/users/degrees?size=500`, {
                    headers: headers
                });
                console.log("sdf,n",res.data)
            return degreedata.set(res.data);
            // const data=await res.data
            // return data
            }
            catch (err) {
                console.log("errors", err)
            }
        }  
    },
    
   
})