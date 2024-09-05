<script lang="ts">
	import type { SvelteComponent } from 'svelte';
import { onMount } from 'svelte';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import {mainStore,history} from '../../stores/general'
import { Toast, getToastStore } from '@skeletonlabs/skeleton';
import { Paginator,Modal,ProgressRadial ,AppBar,AppShell} from '@skeletonlabs/skeleton';
import type { ToastSettings, ToastStore } from '@skeletonlabs/skeleton';
import dayjs from "dayjs"
import utc from 'dayjs/plugin/utc'

export let parent: SvelteComponent;
dayjs.extend(utc)
const modalStore = getModalStore();
const toastStore=getToastStore()
const general=mainStore()
let pageLoading=false

const checkString = (text) => {
  // var letters = /^[a-zA-Z\s]*$/;
   var letters = /^\S/;
  if (text.match(letters)) {
    return true;
  } else {
    return false;
  }
};

const onPageChange=async()=>{
pageLoading=true
await general.getshowhistory(paginationSettings.page,$modalStore[0].props.name)
pageLoading=false
}

onMount(async () => {
  if($modalStore[0].props && $modalStore[0].props.name){
  pageLoading=true
    await general.getshowhistory(0,$modalStore[0].props.name)
  pageLoading=false
  }
   const unsubscribe1 = history.subscribe((value) => {

       paginationSettings.size =value.total,
     //  pagedats.items =value.items,
     paginationSettings.limit =value.size,
     paginationSettings.page =value.page

     });
 });
 let paginationSettings = {
// pagedats,
page: 0,
 limit: 0,
 size:0,
 amounts:[1,2,5,10],
} ;

console.log('Fl',paginationSettings)
	// Base Classes
	const cBase = 'card p-4 shadow-xl space-y-4 ';
	const cHeader = 'text-2xl font-bold flex';
	const cButton = 'absolute z-1 btn-icon variant-filled';
	const cForm = 'border border-surface-500 p-4 space-y-4 rounded-container-token';
</script>



<Toast />

{#if $modalStore[0]}
{#if pageLoading}
<div   class="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
  <ProgressRadial width='w-[4%]'/>
   <h2 class="text-center text-white text-xl font-semibold">Loading...</h2>
   <p class="w-1/3 text-center text-white">This may take a few seconds, please wait.</p>
</div>
{/if}
	<div class="modal-example-form {cBase}">
		<!-- {$modalStore[0].props.name} -->
		<header class={cHeader}><span class="basis-[20%]">{$modalStore[0].title}</span><span class="text-lg basis-[70%]">{$modalStore[0].props.name }</span>
      <button class="basis-[10%]" on:click={parent.onClose}>✕</button>
    </header>
    
		<div class="table-container">
    <table class="table table-hover">
        <thead class="sticky top-[0px] z-[9] bg-gray-900">
            <tr class="bg-gray-900">
                <th class="text-center">
                    <small class="text-gray-500 dark:text-gray-300">Status</small>
                   </th>
                   <th class="text-center">
                    <small class="text-gray-500 dark:text-gray-300">Branch</small>
                   </th>
                   <th class="text-center">
                    <small class="text-gray-500 dark:text-gray-300">Record</small>
                    </th>
                    <th class="text-center">
                    <small class="text-gray-500 dark:text-gray-300">Type</small>
                    </th>
                   <th class="text-center">
                    <small class="text-gray-500 dark:text-gray-300">Date and Time</small>
                   </th>
            </tr>
        </thead>
        <tbody>
            {#each $history.items as client, i}

            <tr>
                <td data-label="Status" class="text-center">
                    {#if client.status}
                    <small class="text-gray-500 dark:text-gray-300 font-semibold">
                     {client.status.name}
                    </small>  
                    {:else}
                    <small class="text-gray-500 dark:text-gray-300 font-semibold" v-else> 
                    </small>  
                    {/if}
                  </td>
                  
                  {#if client.branch}
                  <td data-label="Branch" class="text-center"> 
                    {#each client.branch as branch}
                      <small class="text-gray-500 dark:text-gray-300">
                        {branch.name}
                    <br/>
                    </small>
                    {/each}
                  </td>
                 {:else}
                   <td data-label="Branch" v-else class="text-center">
                    <small class="text-gray-500 dark:text-gray-300 font-semibold" >
                   -----
                    </small>  
                  </td>
                 {/if}
      
                 <td data-label="Record" class="text-center">
                    {#if client.record}
                        <small class="text-gray-500 dark:text-gray-300 font-semibold">
                      <audio src="`https://golang.qspiders.com/records/${client.record}`" controls controlsList="nodownload" >
                        Your browser does not support the audio element.
                      </audio>
                    </small> 
                    {:else}
                    <small class="text-gray-500 dark:text-gray-300 font-semibold">
                        -----
                       </small> 
                       {/if}
                  </td>
                     
                  <td data-label="Type" class="text-center">
                    <small class="text-gray-500 dark:text-gray-300 font-semibold" >
                    {client.type}
                    </small>  
                  </td>
      
       
                  <td data-label="Date and Time" class="text-center">
                  {#if client.time}
                   <small class="text-gray-500 dark:text-gray-300 font-semibold" >
              { dayjs(client.time).utc().format("YYYY-MM-DD hh:mm A") }
                    </small>
                    {:else}
                     <small class="text-gray-500 dark:text-gray-300 font-semibold" >
                    ------
                    </small>
                    {/if}
                  </td>
                 
            </tr>
            {/each}
        </tbody>
        </table>
        <Paginator on:page={onPageChange} showNumerals maxNumerals={1} 	bind:settings={paginationSettings}></Paginator>
      </div>
        <!-- prettier-ignore -->
		<!-- <footer class="modal-footer {parent.regionFooter}">
			<button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
			<button class="btn {parent.buttonPositive}" on:click={onFormSubmit}>Done</button>
		</footer> -->
	</div>
{/if}