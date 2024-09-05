
<Modal components={modalComponent}  />
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
        <input type="number" class="input" bind:value={number} placeholder="Search By Number"/>
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

  <label class="label mt-4">
    <span>Search Branch</span>
  <Select
  items={$userbranch}
  bind:value={branch}						
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
{#if $call_record.items &&$call_record.items.length>0}
<div>
  <table class="table table-hover">
    <thead class="sticky top-[0px] z-[9] bg-gray-900">
        <tr>
          <!-- <th v-if="checkable" /> -->
          <th>
              <small class="text-gray-500 dark:text-gray-300">Number</small>
          </th>
          <th>
              <small class="text-gray-500 dark:text-gray-300">Branch</small>
          </th>
          <th>
              <small class="text-gray-500 dark:text-gray-300">Record</small>
          </th>
        
          <th>
              <small class="text-gray-500 dark:text-gray-300">Duration</small>
          </th>
          <th>
              <small class="text-gray-500 dark:text-gray-300">Time </small>
          </th>
          <th>
              <small class="text-gray-500 dark:text-gray-300">Type </small>
          </th>
          <th>
              <small class="text-gray-500 dark:text-gray-300">Status </small>
          </th>
          <th>
              <small class="text-gray-500 dark:text-gray-300">Author </small>
          </th>
          <th>
              <small class="text-gray-500 dark:text-gray-300">Missed call</small>
          </th>
        </tr>
      </thead>
 <tbody>

         {#each $call_record.items as client ,i }
         <tr>
        <td data-label="Number">
        {#if client.missedcall==true}
         <small class="text-red-500 dark:text-red-500 font-semibold"  >
        {client.name}
           </small>
           {:else}
           <small class="text-gray-500 dark:text-gray-300 font-semibold"  >
        {client.name}
           </small>
           {/if}
         </td>
        
         <td data-label="Branch" >
          {#if client.branch}
          {#each client.branch as client}
          <small class="text-gray-500 dark:text-gray-300 font-semibold capitalize">
           {client.name}
           <br/>
                &nbsp;
           </small>
           {/each}
           {:else}
           <span>-</span>
           {/if}
         </td>

         <td data-label="Record">
             <small class="text-gray-500 dark:text-gray-300 font-semibold">
           <audio :src="`https://gorecords.qspiders.com/records/${client.record}`" preload="none" controls controlsList="nodownload" class="w-60 h-8  mx-auto">
             Your browser does not support the audio element.
           </audio>
           </small>
         </td>


         <td data-label="Duration">
           <small class="text-gray-500 dark:text-gray-300 font-semibold">
          {client.duration}
           </small>          
         </td>

         <td data-label="Time">
             <small class="text-gray-500 dark:text-gray-300 font-semibold">  
                 { dayjs(client.time).utc().format("DD-MMM-YY hh:mm A") }
             </small>
         </td>
         
         <td data-label="Type">
           <small class="text-gray-500 dark:text-gray-300 font-semibold capitalize">
          {client.type}
           </small>          
         </td>

         <td data-label="Status">
          {#if client.status && client.status.name}
           <small class="text-gray-500 dark:text-gray-300 font-semibold capitalize" > {client.status.name}
            {#if client.status.substatus &&client.status.substatus.name}
         -{ client.status.substatus.name  }
         {/if}
           </small>   
           {/if}    
         </td>

         <td data-label="Author">
           <small class="text-gray-500 dark:text-gray-300 font-semibold capitalize">
          {client.authorname}
           </small>          
         </td>
        
         <td data-label="Missedcall">
          {#if client.missedcall==true}
           <small class="text-gray-500 dark:text-gray-300 font-semibold" >
              <Icon icon="mdi:check-circle-outline" class="text-3xl text-green-500"/>
           </small>  
           {:else}
           <small class="text-gray-500 dark:text-gray-300 font-semibold mr-2" >           
            <Icon icon="mdi:close-circle" class="text-3xl text-red-500"/>
           </small>   
           {/if}       
         </td> 

          
       </tr>
         {/each}  
      
</tbody>
</table>
</div>
{:else}
<div> <span class="p-1 flex justify-center text-red-500 font-semibold text-md">
  Call Record list Not Found !</span></div>
{/if}


<script lang="ts">
import type { SvelteComponent } from 'svelte';
import MultiSelect from 'svelte-multiselect'
import { onMount } from 'svelte';
import Icon from '@iconify/svelte';
import {store,mainStore,userbranch,call_record} from '../../../stores/general'
import { Paginator,Modal,getModalStore,ProgressRadial ,AppBar,AppShell} from '@skeletonlabs/skeleton';
import dayjs from "dayjs"
import utc from 'dayjs/plugin/utc'
import Modalrate from '$lib/Components/Modalrate.svelte';
import { Drawer, getDrawerStore } from '@skeletonlabs/skeleton';
import type { DrawerSettings, DrawerStore } from '@skeletonlabs/skeleton';
import {generalStore} from '../../../stores/auth'
import Select from 'svelte-select'; 

let valuesSelected: string[]
 dayjs.extend(utc)
 const modalStore = getModalStore();
export let data;
export let parent: SvelteComponent;
// const cButton = 'absolute z-1 btn-icon variant-filled mr-[20px]';
const cButton='flex items-end py-3 grow font-bold  '
const onPageChange=async()=>{
pageLoading=true
await generalstore.get_jratelist(paginationSettings.page)
pageLoading=false
}

const call_type = [
     {"label":"incoming"},
      {"label":"outgoing"},
    ]

const drawerStore = getDrawerStore();
const generalstore=mainStore()
const main=generalStore()
let pageLoading=false

$: positionClasses = $drawerStore.open ? 'translate-x-[0%]' : '';
const drawerSettings: DrawerSettings = {
	// id: 'example-3',
	// // Provide your property overrides:
	bgDrawer: 'bg-gray-900 text-white',
	bgBackdrop: 'bg-transparent',
	// bgBackdrop: 'bg-gradient-to-tr from-indigo-500/50 via-purple-500/50 to-pink-500/50',
	// width: 'w-[280px] md:w-[480px]',
	// padding: 'p-4',
	// rounded: 'rounded-xl',
  id: 'example-2',
  position:"right",
  width: 'w-[100px] md:w-[266px]',
  zIndex:20,

};

 onMount(async () => {
  pageLoading=true
  await generalstore.getuserbranches()
    main.setPageTitle('Call Record List')
  pageLoading=false
      const unsubscribe1 = call_record.subscribe((value) => {
       paginationSettings.size =value.total,
     //  pagedats.items =value.items,
     paginationSettings.limit =value.size,
     paginationSettings.page =value.page

     });
 });

 let duration=''
let number=null
let branch=null
let dateselected1=null
let dateselected2=null
let calltype=null

 const modalComponent: ModalComponent = { ref: Modalrate };
 const checkprop = Object({
      id: null,
      name:"",
      // rid: null,
    });
    
const other_rate = (id,name) =>{
  console.log("id",name)
      checkprop.id = id,
      checkprop.name = name
    }
 const modal: ModalSettings = {
	type: 'component',
  title:`Rate `,
	component: modalComponent,
  props :checkprop,
  userdata:data
  
};


let paginationSettings = {
// pagedats,
page: 0,
 limit: 0,
 size:0,
 amounts:[1,2,5,10],
} ;
// satisfies PaginationSettings
console.log("$enquiries",paginationSettings)


var searchdata = ""
let params=""

const searchSubmit=async()=>{
  searchdata=""
  if(number   ){ 
    if (number ) {
        searchdata+="&number="+number
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
 await  generalstore.getcallrecord(0,params);
  pageLoading=false

}

const clear=async()=>{
  pageLoading=true
  searchdata='',
  number=null,
  calltype=null,
  duration=null,
  dateselected1=null,
  dateselected2=null,
  branch=null
 await  generalstore.getcallrecord(0);
 pageLoading=false
}


</script>
