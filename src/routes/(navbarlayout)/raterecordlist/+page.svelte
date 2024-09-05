
<!-- <Modal components={modalComponent}  /> -->
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
      bind:value={myselect}						
      label="type"
      itemId="type"	
      class="text-black bg-gray-600"
      --background= "gray transparent"
  --selected-item-color="white"  
    />
    </label>

    <label class="label mt-4">
      <span>Search Main Status</span>
      {#if $main_status.items}
    <Select
    items={$main_status.items}
    bind:value={mainstatus}						
    label="name"
    itemId="id"	
    class="text-black bg-gray-600"
    --background= "gray transparent"
--selected-item-color="white"  
  />	
  {/if}
</label>	

{#if mainstatus && mainstatus.substatus&& mainstatus.substatus.length > 0}
<label class="label mt-4">
  <span>Search Sub Status</span>
<Select
items={mainstatus.substatus}
bind:justValue={sub_status}						
label="name"
itemId="id"	
multiple
class="text-black bg-gray-600"
--background= "gray transparent"
--selected-item-color="white"  
/>	
</label>	
  {/if}


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

<div class="table-container">
    <table class="table table-hover">
        <thead class="sticky top-[0px] z-[9] bg-gray-900">
            <tr class="bg-gray-900">
              
              <th class="text-center">
                  <small class="text-gray-500 dark:text-gray-300">History</small>
              </th>
              <th class="text-center">
                  <small class="text-gray-500 dark:text-gray-300">Number</small>
              </th>
              <!-- <th class="text-center">
                  <small class="text-gray-500 dark:text-gray-300">Time</small>
              </th> -->
               <th class="text-center">
                  <small class="text-gray-500 dark:text-gray-300">Duration</small>
              </th>
              <th class="text-center">
                  <small class="text-gray-500 dark:text-gray-300">Recording</small>
              </th>
               <th class="text-center">
                  <small class="text-gray-500 dark:text-gray-300">Status</small>
              </th>
              <th class="text-center">
                  <small class="text-gray-500 dark:text-gray-300">Rate</small>
              </th>
              <th class="text-center">
                <small class="text-gray-500 dark:text-gray-300">Call Type</small>
            </th>
            <th class="text-center">
                <small class="text-gray-500 dark:text-gray-300">Branch</small>
            </th>
             <th class="text-center">
                <small class="text-gray-500 dark:text-gray-300">Internal</small>
            </th>
            <th class="text-center">
              <small class="text-gray-500 dark:text-gray-300">Update Status</small>
          </th>
          <th class="text-center">
              <small class="text-gray-500 dark:text-gray-300">Converted</small>
          </th>
            </tr>
          </thead>
		 <tbody>
      {#if $srate_list.items!=[]}
             {#each $srate_list.items as client}
             <tr>
                <td data-label="History" class="text-center">
                    <small class="text-gray-500 dark:text-gray-300 font-semibold ">
                        <button type="button" class="btn btn-sm variant-filled-primary"  
                        on:click={() => {show_history(client.id,client.name,client.branch),showrecords()}}>
                          <Icon icon="mdi:microphone-outline" /></button>
                      </small>
                    </td>
                    <!-- @click="show_history(client.id,client.name,client.branch)" -->
                  
                     <td data-label="Number" class="text-center">
                       <small class="text-gray-500 dark:text-gray-300 font-semibold">
                   <a class="" href="'tel:' + client.name" >{client.name} </a> 
                 &nbsp;
                   </small> 
                   <br/>
                   {#if client.Enquiry.id!=0}
                   <button type="button" class="btn btn-sm bg-blue-700" on:click={() => {view_enq(client.Enquiry,client.name),ViewEnqform()}}>
                    <Icon icon="mdi:file-eye" /></button>
                    &nbsp;
                    <button type="button"  on:click={() => {updatecourse(client.Enquiry.id,client.Enquiry.name,client.id),
                      Updatecourse()}}>
                      <Icon icon="mdi:file-document-plus" class="text-lg"/></button>
                    {/if}
                    {#if client.Enquiry.enquiry!=null}
                    <button type="button" class="btn btn-sm variant-filled-tertiary">
                      <Icon icon="mdi:square-edit-outline" /></button>
                    {:else}
                    <button type="button" class="btn btn-sm variant-filled-error" >
                      <Icon icon="mdi:pencil-off-outline" /></button>
                    {/if}
                    </td>
        
                    <!-- <td data-label="Time" class="text-center">
                      <small class="text-gray-500 dark:text-gray-300 font-semibold">
                      { dayjs(client.time).utc().format("DD-MMM-YY hh:mm A") }
                      </small>
                    </td> -->
        
                    <td data-label="Duration" class="text-center">
                      <small class="text-gray-500 dark:text-gray-300 font-semibold">
                   {client.duration}
                      </small>
                    </td>
        
                     <td data-label="Recording" class="text-center">
                        {#if client.record}
                      <small class="text-gray-500 dark:text-gray-300 font-semibold" >
                        <audio src="`https://golang.qspiders.com/records/${client.record}`" controls controlsList="nodownload" class="w-60 h-8 mx-auto">
                          Your browser does not support the audio element.
                        </audio>
                      </small>
                      {/if}
                    </td>
        <!-- class="md-[150px] lg:w-[250px] xl:w-[300px]" -->
        
                   <td data-label="Status" class="text-center">
                    {#if client.status}
                    <small class="text-gray-500 dark:text-gray-300 font-semibold mr-5">
                        {#if client.status.substatus.name!=''}
                        <button type="button" class="rounded-md p-1 variant-soft-primary"  on-click="isRoleModalActive = true">
                            {client.status.name  +  ' -- '+ client.status.substatus.name}
                        </button>
                      {:else}
                      <button type="button" class="rounded-md p-1 variant-soft-primary"  on-click="isRoleModalActive = true">
                        {client.status.name}
                    </button>
                      <!-- @click="isRoleModalActive = true" -->
                      {/if}
                    </small>
                    {/if}
                   </td>
                   <td class="text-center" data-label="Rate">
                        <small class="text-gray-500 dark:text-gray-300 font-semibold ">
                <button type="button" class="btn btn-sm variant-filled-error"  on:click={() => {other_rate(client.id,client.name,client.CallRecordID),rateform()}}>
                    <Icon icon="mdi:star" />
                            </button>
                        </small>   
                    </td>
                    
                    <td data-label="Call Type" class="text-center">
                        {#if client.type==='outgoing'}
                      <small class="text-gray-500 dark:text-gray-300 font-semibold">
                         Out
                      </small>
                      {:else}
                       <small class="text-gray-500 dark:text-gray-300 font-semibold">
                         In
                      </small>
                      {/if}
                    </td>
        
                    <td data-label="Branch" class="text-center">
                    
                      {#each client.branch as client }
                      <small class="text-gray-500 dark:text-gray-300 font-semibold capitalize">
                     {client.name}
                     <br/>
                      </small>
                      {/each}
                    </td>


                  <td data-label="Internal" class="text-center">
                      <small class="text-gray-500 dark:text-gray-300 font-semibold">
                        <button type="button" class="btn btn-sm variant-soft-tertiary"  small on:click={() => {add_internal(client.name,client.branch),internalform()}}>
                          <Icon icon="mdi:account-edit" />I
                                  </button>
                      </small>
                    </td>

                    <td data-label="Update Status" class="text-center">
                      <small class="text-gray-500 dark:text-gray-300 font-semibold">
                        <button type="button" class="btn btn-sm variant-soft-warning"  on:click={() => {update_status(client.id,client.name,client.branch),updatestatus()}}>
                          <Icon icon="mdi:text-box-edit" class="text-sm"/>U
                                  </button>
                      </small>
                    </td>
                    <td data-label="Converted" class="text-center">
                      {#if client.Enquiry.status && client.Enquiry.status.name==='converted'}
                      <small class="text-green-800 dark:text-green-300 font-semibold" >
                        Converted
                      </small>
                      {:else}
                       <small class="text-red-500  dark:text-red-300 font-semibold" >
                       Not Converted
                      </small>
                      {/if}
                    </td>
                    
            </tr>
             {/each}  
          {/if}
		</tbody>
	</table>

  <Paginator on:page={onPageChange} showNumerals maxNumerals={1} 	bind:settings={paginationSettings} ></Paginator>
</div>

<script lang="ts">
import type { SvelteComponent } from 'svelte';
import { onMount } from 'svelte';
import Icon from '@iconify/svelte';
import {generalStore} from '../../../stores/auth'
import {store,mainStore,srate_list,ratenames,main_status,userbranch} from '../../../stores/general'
import { Paginator,Modal,getModalStore,ProgressRadial ,AppBar,AppShell} from '@skeletonlabs/skeleton';
import dayjs from "dayjs"
import utc from 'dayjs/plugin/utc'
import Modalrate from '$lib/Components/Modalrate.svelte';
import Showrecordslist from "$lib/Components/Showrecordslist.svelte"
import { Drawer, getDrawerStore } from '@skeletonlabs/skeleton';
import type { DrawerSettings, DrawerStore } from '@skeletonlabs/skeleton';
import ModalInternal from '$lib/Components/ModalInternal.svelte';
import Updatestatus from '$lib/Components/Updatestatus.svelte';
import ViewEnq from '$lib/Components/ViewEnq.svelte';
import UpdateCourse from '$lib/Components/UpdateCourse.svelte';
import Select from 'svelte-select'; 
	import { branches_min } from '../../../stores/counselor';

 dayjs.extend(utc)
 const modalStore = getModalStore();
 const main=generalStore()
export let data;
export let parent: SvelteComponent;
// const cButton = 'absolute z-1 btn-icon variant-filled mr-[20px]';
const cButton='flex items-end py-3 grow font-bold  '
const onPageChange=async()=>{
pageLoading=true
await generalstore.get_sratelist(paginationSettings.page)
pageLoading=false
}

let mainstatus=[]
let duration=''
let sub_status=[]
let searchQuery=null
let branch=null
let dateselected1=null
let dateselected2=dayjs(new Date()).format("YYYY-MM-DD")
const drawerStore = getDrawerStore();
const generalstore=mainStore()
let pageLoading=false

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
let myselect=null
let select;
 onMount(async () => {
  pageLoading=true
  await generalstore.getmainstatus()
   await generalstore.get_sratelist()
   await generalstore.getuserbranches()
	await generalstore.getratenames()
   main.setPageTitle('Rate Record List')
   const unsubscribe1 = srate_list.subscribe((value) => {
       paginationSettings.size =value.total,
     //  pagedats.items =value.items,
     paginationSettings.limit =value.size,
     paginationSettings.page =value.page

     });
     pageLoading=false

    //  select=new SlimSelect({
    //   select:'#multiple',
    //   placeholder:'select',
    //   allowDeselect:true,
    //   showSearch:true,
    //   multiple:true
    //  })
    
 });

 const checkprop = Object({
  id: null,
      name:"",
      rid: null,
      total:null,
      fretotal:null,
      exptotal:null
    });
    
    let totalmarks = (0)
    let freshertotal=(0)
    let expertotal=(0)

const other_rate = (id,name, rid,total,fretotal,exptotal) =>{
      totalmarks=0,
      freshertotal=0,
      expertotal=0
      checkprop.id = id,
      checkprop.name = name,
      checkprop.rid = rid
      // isRateEnquiryModalActive.value = true
    
      let something = $ratenames;
      console.log("some",$ratenames)
      if(something.length > 0){
        for(var p = 0; p < something.length; p++){
          if( something[p].details==null){
            totalmarks +=  something[p].marks 
          }    
          if(something[p].details && something[p].details.fresher ==true){
            freshertotal += something[p].marks 
          }  
          if(something[p].details && something[p].details.fresher ==false){
            expertotal += something[p].marks 
          }
        }
    } 
    checkprop.total= totalmarks
    checkprop.fretotal= freshertotal
    checkprop.exptotal= expertotal
    }

 const historyprop = Object({
      id: null,
      name:"" ,
      branch:""

    });
const show_history = (id,name,branch) =>{
      historyprop.id = id,
      historyprop.name = name,
      historyprop.branch = branch
    }

    const internalprop = Object({
      name:"",
      branch:""
 
    });

const add_internal = (name,branch) =>{
      internalprop.name = name,
       internalprop.branch = branch
 }

 const updateprop = Object({
      // eid:null,
      id: null,
      name:"",
      branch:""
 });

const update_status = (id,name,branch) =>{
      // updateprop.eid = eid,
      updateprop.id = id,
      updateprop.name = name,
      updateprop.branch = branch
}
    
function updatestatus():void{
  const c:Modalstatus = { ref: Updatestatus} ;
  const modal: ModalSettings = {
	type: 'component',
  title:`Update Status `,
	component: c,
  props :updateprop,
  userdata:data,
  response: async(r: boolean) =>{
    console.log("rrr",r)
  if(r){
  pageLoading=true
    await generalstore.get_sratelist()
  pageLoading=false
  }
	}
};
modalStore.trigger(modal)
 }




 function internalform():void{
  const c:MOdalInternal = { ref: ModalInternal} ;
  const modal: ModalSettings = {
	type: 'component',
  title:`Add as Internal `,
	component: c,
  props :internalprop,
  userdata:data,
  response: async(r: boolean) =>{
    console.log("rrr",r)
  if(r){
  pageLoading=true
    await generalstore.get_sratelist()
  pageLoading=false
  }
	}
};
modalStore.trigger(modal)
 }


 function rateform():void{
  const c:ModalComponent = { ref: Modalrate} ;
  const modal: ModalSettings = {
	type: 'component',
  title:`Rate `,
	component: c,
  props :checkprop,
  userdata:data,
  response: async(r: boolean) =>{
  if(r){
  pageLoading=true
    await generalstore.get_sratelist()
  pageLoading=false
  }
	}
};
modalStore.trigger(modal)
 }


 function showrecords():void{
  const c:modalrecords = { ref: Showrecordslist} ;
  const modal: ModalSettings = {
	type: 'component',
  title:`Call History`, 
	component: c,
  props :historyprop,
  userdata:data,
  response: async(r: boolean) =>{
    console.log("rrr",r)
  if(r){
  pageLoading=true
    await generalstore.get_sratelist()
  pageLoading=false
  }
	}
};
modalStore.trigger(modal)
 }


 const enqform = Object({
     id:"",
      name:""
});

 const view_enq = (id,name) =>{
     enqform.id=id,
     enqform.name=name
      }

function ViewEnqform():void{
  const c:modalview = { ref: ViewEnq} ;
  const modal: ModalSettings = {
	type: 'component',
  title:`View Enq`, 
	component: c,
  props :enqform,
  userdata:data,
  response: async(r: boolean) =>{
    console.log("rrr",r)
  if(r){
  pageLoading=true
    await generalstore.get_sratelist()
  pageLoading=false
  }
	}
};
modalStore.trigger(modal)
 }

 const update= ({
  id: 0,
  name: "",
  callid:""
 })
const updatecourse = (id, name,rid) => {
        update.id = id;
        update.name = name;
        update.callid=rid
};

function Updatecourse():void{
  const c:modalcourse = { ref: UpdateCourse} ;
  const modal: ModalSettings = {
	type: 'component',
  title:`Update Course`, 
	component: c,
  props :update,
  userdata:data,
  response: async(r: boolean) =>{
  if(r){
  pageLoading=true
    await generalstore.get_sratelist()
  pageLoading=false
  }
	}
};
modalStore.trigger(modal)
 }


let paginationSettings = {
// pagedats,
page: 0,
 limit: 0,
 size:0,
 amounts:[],
} ;
// satisfies PaginationSettings
var searchdata = ""
let params=""

const searchSubmit=async()=>{
  searchdata=""
  if(searchQuery|| mainstatus ||  sub_status  || myselect||branch || dateselected1|| dateselected2 ){ 
    if (searchQuery ) {
        searchdata+="&filters=" +"[\"name\",\"like\", \""+searchQuery+"\"]"
       }
     if (myselect ) {
     searchdata+="&calltype=" +myselect.type
    }  
    if (mainstatus ) {
  searchdata+="&status=" +mainstatus.id
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
 await  generalstore.get_sratelist(0,params);
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
 await  generalstore.get_sratelist(0);
 pageLoading=false
}
const call_type = [
     {"type":"incoming"},
      {"type":"outgoing"}
    ]
</script>


<!-- <style>
  .paginator{
    justify-content: flex-end;
  }
</style> -->
