<div class="table-container">
  {#if pageLoading}
  <div   class="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
    <ProgressRadial width='w-[4%]'/>
     <h2 class="text-center text-white text-xl font-semibold">Loading...</h2>
     <p class="w-1/3 text-center text-white">This may take a few seconds, please wait.</p>
  </div>
  {/if}
  <Drawer  class="transition-transform {positionClasses}">
    <div>
      <div class="
          md:rounded
          dark:bg-gray-900/70
          block
          bg-white
          border border-gray-100
          dark:border-gray-900
          mb-4
        "
      >
        <header
          class="
            flex
            items-stretch
            border-b border-gray-100
            dark:border-gray-700
          "
        >
          <p class="flex items-center py-3 grow font-bold px-6">
            Search List
          </p>
          <button class={cButton} on:click={parent.onClose}>✕</button> 
        </header>
      
        <div class="mt-4">
        <span><label class="label">
          <input type="number" class="input" bind:value={searchQuery} placeholder="Search By Number"/>
      </label></span> 
  
    <label class="label mt-4">
      <span>Search Branch</span>
    <Select
    items={$userbranch}
    bind:justValue={branch}						
    label="name"
    itemId="id"	
    multiple
    class="text-black bg-gray-600"
    --background= "gray transparent"
    --width="w-full" 
    --selected-item-color="white"  
    />	
    </label>	
  
   <label class="label mt-4">
    <span>From Date</span>
      <input type="date" class="input" bind:value={dateselected1} placeholder="Search By Number"/>
  </label> 
  <label class="label mt-4">
    <span>To Date</span>
    <input type="date" class="input" bind:value={dateselected2} placeholder="Search By Number"/>
  </label>
  </div>
       <div class="flex justify-start mt-4">
            <button class="bg-green-600 p-1 rounded-md w-[80px]" on:click={searchSubmit}>Search</button>&nbsp;&nbsp;
    <span><button class="bg-red-600 p-1 rounded-md w-[80px]" on:click={clear}>Clear</button>&nbsp;&nbsp;</span>
          </div>
  
        </div>
      </div>
   
  </Drawer>
  <button type="button" class="btn  bg-blue-800 w-[80px] p-1" on:click={() => drawerStore.open(drawerSettings)}><Icon icon="mdi:filter" />Search</button>
  
    <table class="table table-hover">
        <thead class="sticky top-[0px] z-[9] bg-gray-900">
            <tr class="bg-gray-900">
              <th class="text-center">
                  <small class="text-gray-500 dark:text-gray-300">Number</small>
              </th>
              <th class="text-center">
                  <small class="text-gray-500 dark:text-gray-300">Date</small>
              </th>
              <th class="text-center">
                <small class="text-gray-500 dark:text-gray-300">Call Type</small>
            </th>
            <th class="text-center">
              <small class="text-gray-500 dark:text-gray-300">Branch</small>
          </th>
               <th class="text-center">
                  <small class="text-gray-500 dark:text-gray-300">View Comments</small>
              </th>
              <th class="text-center">
                  <small class="text-gray-500 dark:text-gray-300">Author</small>
              </th>
               <th class="text-center">
                  <small class="text-gray-500 dark:text-gray-300">Actions</small>
              </th>
            </tr>
          </thead>
		 <tbody>
  
             {#each $misscall.items as client ,i }
             <tr>
              
                     <td data-label="Number" class="text-center">
                       <small class="text-gray-500 dark:text-gray-300 font-semibold">
                        <a class="" href="'tel:' + client.name" >{client.name} </a> 
                 &nbsp;
                   </small> 
                    </td>
        
                    <td data-label="Time" class="text-center">
                      <small class="text-gray-500 dark:text-gray-300 font-semibold">
                     <!-- {{dayjs(client.time).format("YYYY-MM-DDT hh:mm")}} -->
                      { dayjs(client.time).utc().format("DD-MMM-YY hh:mm A") }
                      </small>
                    </td>
        
                    <td data-label="Call Type"  class="text-center">
                        <small class="text-gray-500 dark:text-gray-300 font-semibold">
                           {client.type}
                        </small>
                      </td>

                      <td data-label="Branch"  class="text-center">
                        {#each client.branch as branch}
                        <small class="text-gray-500 dark:text-gray-300 font-semibold">
                           {branch.name}
                        </small>
                        {/each}
                      </td>
                  
                      <td data-label="View Comments"  class="text-center" > 
                        {#if client.details!=null &&commented(client.details,i) }             
                        {#if client.reversedKeys && client.reversedKeys.length>0}
                        <span>  {#each client.reversedKeys as com, i}
                          { com.message}
                          <br/>
                               {/each}
                              </span>
                        {/if}
                       {/if} </td>

                      <td data-label="Author"  class="text-center">
                        <small class="text-gray-500 dark:text-gray-300 font-semibold">
                          {client.code.substring(client.code.indexOf("-")+1)}
                        </small>
                      </td>

                      <td data-label="Actions"  class="text-center"> 
                        <small class="text-gray-500 dark:text-gray-300 font-semibold"  >
                    <button class="btn btn-sm hover:variant-soft-success bg-tertiary-600 " on:click={() => {modalcomment(client.id),misscallcomment()}}>
                                <Icon icon="mdi:comment" /><span>Add Comment</span>					
                            </button>
                            <!-- use:popup={{ event: 'click', target: 'list' }} -->
                           
                          <!-- <BaseButton
                          color="info"
                          label="Add Comment"
                          small 
                          :icon="mdiCheckCircle"
                          @click="addcomment(client.id)"
                        />   -->
                         <br/>
                        </small>
                      </td>

                    
        
            </tr>
             {/each}  
          
		</tbody>
	</table>
  <Toast />

  <Paginator on:page={onPageChange} showNumerals maxNumerals={1} 	bind:settings={paginationSettings}></Paginator>
</div>

<script lang="ts">
import { onMount } from 'svelte';
import Icon from '@iconify/svelte';
 import {store,mainStore,misscall,miss_comm} from '../../../stores/general'
 import { Paginator } from '@skeletonlabs/skeleton';
 import dayjs from "dayjs"
 import utc from 'dayjs/plugin/utc'
 import {srate_list,ratenames,main_status,userbranch} from '../../../stores/general'
 import { ProgressRadial,Modal,getModalStore ,popup} from '@skeletonlabs/skeleton';
 import ModalComment from '$lib/Components/ModalComment.svelte';
 import { Toast, getToastStore } from '@skeletonlabs/skeleton';
 import {generalStore} from '../../../stores/auth'
 import { Drawer, getDrawerStore } from '@skeletonlabs/skeleton';
import type { DrawerSettings, DrawerStore } from '@skeletonlabs/skeleton';
import Select from 'svelte-select'; 

 dayjs.extend(utc)
 const cButton='flex items-end py-3 grow font-bold  '
const onPageChange=async()=>{
 pageLoading=true;
await generalStore.getmiscalllist(paginationSettings.page)
pageLoading=false;
}
const main=generalStore()
const toastStore=getToastStore()
const modalStore = getModalStore();
let pageLoading=false;
let myStoreContents = "";

$: positionClasses = $drawerStore.open ? 'translate-x-[0%]' : '';
const drawerSettings: DrawerSettings = {
	bgDrawer: 'bg-gray-900 text-white',
	bgBackdrop: 'bg-transparent',
	// width: 'w-[280px] md:w-[480px]',
	// padding: 'p-4',
	// rounded: 'rounded-xl',
  id: 'example-2',
  position:"right",
  width: 'w-[100px] md:w-[250px]',
  zIndex:20,

};


let duration=''
let searchQuery=null
let branch=null
let dateselected1=null
let dateselected2=dayjs(new Date()).format("YYYY-MM-DD")
const drawerStore = getDrawerStore();
const generalstore=mainStore()
let myselect=null

onMount(async () => {
 pageLoading=true;
 await generalstore.getmainstatus()
   await generalstore.get_sratelist()
   await generalstore.getuserbranches()
      await generalstore.getmiscalllist()
    main.setPageTitle('Missed Call List')
      const unsubscribe1 = misscall.subscribe((value) => 
      {
       paginationSettings.size =value.total,
     //  pagedats.items =value.items,
     paginationSettings.limit =value.size,
     paginationSettings.page =value.page

     });
 pageLoading=false;
 });

 let reversedKeys=[]
let commentdata=[]
async function commented(details,i){
  commentdata=[]
    // reversedKeys=[]
      details.filter(data=>{
        if(data && data.role){
          if(data.role!='rateopti'&&data.role!='counselor' ){
              commentdata.push(data)       
      }
      } 
      
      else{
        commentdata.push(data)       
      }
      
    })
    reversedKeys=[]
    Object.assign($misscall.items[i], {reversedKeys: Object.values(commentdata).reverse()});
}


let paginationSettings = {
// pagedats,
page: 0,
 limit: 0,
 size:0,
 amounts:[1,2,5,10],
} ;
// satisfies PaginationSettings

const comment =Object({
      id:null
    })

const modalcomment = (id) =>{
      //  updateprop.oid = oid,
      comment.id = id
}
    

function misscallcomment():void{
  const c:comment = { ref: ModalComment} ;
  const modal: ModalSettings = {
	type: 'component',
  title:`Add Comment`, 
	component: c,
  props :comment,
  // userdata:data,
  response: async(r: boolean) =>{
  if(r){
  pageLoading=true
    await generalstore.getmiscalllist()
    toastStore.trigger({message:$miss_comm.message})
  pageLoading=false
  }
	}
};
modalStore.trigger(modal)
 }

var searchdata = ""
let params=""

const searchSubmit=async()=>{
  searchdata=""
  if(searchQuery|| mainstatus ||  sub_status  || myselect||branch || dateselected1|| dateselected2 ){ 
    if (searchQuery ) {
        searchdata+="&filters=" +"[\"name\",\"like\", \""+searchQuery+"\"]"
       }
     if (myselect ) {
      console.log("sdf",myselect)
     searchdata+="&calltype=" +myselect.type
    }  
    if (main_status &&main_status.id  ) {
  searchdata+="&status=" +main_status.id
    ;}
    if (sub_status ) {
  searchdata+="&substatus=" +sub_status.join()
    ;}
  if (branch ) {
     searchdata+="&branch=" +encodeURIComponent(branch).replace(/%2C/, ',')
      }     

      if (dateselected1) {
      searchdata += "&from="+dayjs(dateselected1).format("YYYY-MM-DD");
    }
    if(dateselected2){
     searchdata += "&to="+dayjs(dateselected2).format("YYYY-MM-DD");
     }
 }
 params = new URLSearchParams(searchdata).toString();
 pageLoading=true
 await  generalstore.getmiscalllist(0,params);
  pageLoading=false
}

const clear=async()=>{
  pageLoading=true
  searchdata='',
  searchQuery=null,
  myselect=null,
  mainstatus=null,
  sub_status=null,
  dateselected1=null,
  dateselected2=dayjs(new Date()).format("YYYY-MM-DD"),
  branch=null
 await  generalstore.getmiscalllist(0);
 pageLoading=false
}
const call_type = [
     {"type":"incoming"},
      {"type":"outgoing"}
    ]

</script>
