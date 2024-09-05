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
          <span>Search Call Type</span>
          <Select
          items={call_type}
          bind:value={calltype}						
          label="type"
          itemId="type"	
          class="text-black bg-gray-600"
          --background= "gray transparent"
      --selected-item-color="white"  
        />
        </label>
        <span class="mt-4"><label class="label">
          <span>Duration</span>
          <input type="text" class="input" bind:value={duration} placeholder="Search By duration"/>
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
                    <small class="text-gray-500 dark:text-gray-300">Type</small>
                </th>
                     <th class="text-center">
                    <small class="text-gray-500 dark:text-gray-300">Duration</small>
                </th>
                <th class="text-center">
                    <small class="text-gray-500 dark:text-gray-300">Recording</small>
                </th>           
                <th class="text-center">
                    <small class="text-gray-500 dark:text-gray-300">Date</small>
                </th>
               
                <th class="text-center">
                    <small class="text-gray-500 dark:text-gray-300">Author</small>
                </th>
            </tr>
          </thead>
		 <tbody>
  
             {#each $nostatus.items as client ,i }
             <tr>
              
                     <td data-label="Number" class="text-center">
                       <small class="text-gray-500 dark:text-gray-300 font-semibold">
                        <a class="" href="'tel:' + client.name" >{client.name} </a> 
                 &nbsp;
                   </small> 
                    </td>
                    <td data-label="Type" class="text-center">
                        <small class="text-gray-500 dark:text-gray-300 font-semibold">
                       {client.type}
                        </small>  
                      </td>


                      <td data-label="Duration" class="text-center">
                        <small class="text-gray-500 dark:text-gray-300 font-semibold">
                     {client.duration}
                        </small>
                      </td>

                      <td data-label="Recording" class="text-center">
                        <small class="text-gray-500 dark:text-gray-300 font-semibold">
                        <audio src="`https://golang.qspiders.com/records/${client.record}`" controls controlsList="nodownload" class="w-60 h-8 mx-auto">
                          Your browser does not support the audio element.
                      </audio>
                      </small>
                         </td>

                 <td data-label="Date" class="text-center">
                            <small class="text-gray-500 dark:text-gray-300 font-semibold">
                                  { dayjs(client.time).utc().format("DD-MMM-YY hh:mm A") }
                                  </small>
                              
                                </td>
                   
                <td data-label="Author" class="text-center">
         <small class="text-gray-500 dark:text-gray-300 font-semibold">
                 {client.code.substring(client.code.indexOf("-")+1)}
                      </small>
                </td>
                      
        
            </tr>
             {/each}  
          
		</tbody>
	</table>

  <Paginator on:page={onPageChange} showNumerals maxNumerals={1} 	bind:settings={paginationSettings}></Paginator>
</div>

<script lang="ts">
    import { onMount } from 'svelte';
    import Icon from '@iconify/svelte';
 import {store,mainStore,nostatus,userbranch} from '../../../stores/general'
 import { Paginator,ProgressRadial } from '@skeletonlabs/skeleton';
 import dayjs from "dayjs"
 import utc from 'dayjs/plugin/utc'
 import {generalStore} from '../../../stores/auth'
 import { Drawer, getDrawerStore } from '@skeletonlabs/skeleton';
import type { DrawerSettings, DrawerStore } from '@skeletonlabs/skeleton';
import Select from 'svelte-select'; 
 dayjs.extend(utc)

const cButton='flex items-end py-3 grow font-bold  '

const onPageChange=async()=>{
pageLoading=true
await generalstore.getnostatus(paginationSettings.page)
pageLoading=false
}
const main=generalStore()
let pageLoading=false;

let myStoreContents = "";
 onMount(async () => {
  pageLoading=true
  await generalstore.getuserbranches()
  await generalstore.getnostatus()
  main.setPageTitle('Nostatus Escalation List')
  const unsubscribe1 = nostatus.subscribe((value) => 
      {
       paginationSettings.size =value.total,
     //  pagedats.items =value.items,
     paginationSettings.limit =value.size,
     paginationSettings.page =value.page

     });
    pageLoading=false

 });


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
let calltype=null

let reversedKeys=[]
let commentdata=[]
async function commented(details,i){
  commentdata=[]
    // reversedKeys=[]
      details.filter(data=>{
        if(data && data.role){
          if(data.role==='rateopti'){
              commentdata.push(data)       
      }
      }     
      else{
        commentdata.push(data)       
      }    
    })
    reversedKeys=[]
    Object.assign($nostatus.items[i], {reversedKeys: Object.values(commentdata).reverse()});
}


let paginationSettings = {
// pagedats,
page: 0,
 limit: 0,
 size:0,
 amounts:[1,2,5,10],
} ;



var searchdata = ""
let params=""

const searchSubmit=async()=>{
  searchdata=""
  if(searchQuery  || calltype||branch || dateselected1|| dateselected2||duration ){ 
    if (searchQuery ) {
        searchdata+="&filters=" +"[\"name\",\"like\", \""+searchQuery+"\"]"
       }
     if (calltype ) {
     searchdata+="&calltype=" +calltype.type
    }
    if (duration ) {
     searchdata+="&duration=" +duration
    }  
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
 await  generalstore.getnostatus(0,params);
  pageLoading=false
}

const clear=async()=>{
  pageLoading=true
  searchdata='',
  searchQuery=null,
  calltype=null,
  duration=null,
  mainstatus=null,
  sub_status=null,
  dateselected1=null,
  dateselected2=dayjs(new Date()).format("YYYY-MM-DD"),
  branch=null
 await  generalstore.getnostatus(0);
 pageLoading=false
}
const call_type = [
     {"type":"incoming"},
      {"type":"outgoing"}
    ]

</script>
