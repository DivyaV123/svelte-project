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
$: paginatedSource =  $modalStore[0].props.data.slice(
	paginationSettings.page * paginationSettings.limit,
	paginationSettings.page * paginationSettings.limit + paginationSettings.limit
);


// await general.getshowhistory(paginationSettings.page,$modalStore[0].props.name)
pageLoading=false
}
$: paginatedSource = ''
onMount(async () => {
    $: paginatedSource =  $modalStore[0].props.data.slice(
	paginationSettings.page * paginationSettings.limit,
	paginationSettings.page * paginationSettings.limit + paginationSettings.limit
);

})

 let paginationSettings = {
    page: 0,
    limit: 8,
    size: $modalStore[0].props.data.length,
    amounts: [1, 2, 5, 10],
};

	// Base Classes
	const cBase = 'card p-4 shadow-xl space-y-4 ';
	const cHeader = 'text-2xl font-bold';
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
		<header class={cHeader}>{$modalStore[0].title}<span class="text-lg">{$modalStore[0].props.name }</span></header>
		<div class="table-container">
    <table class="table table-hover">
        <thead class="sticky top-[0px] z-[9] bg-gray-900">
            <tr class="bg-gray-900">
                <th>
                    <small class="text-gray-500 dark:text-gray-300">Status</small>
                   </th>
                   <th>
                    <small class="text-gray-500 dark:text-gray-300">Branch</small>
                   </th>
                   <th>
                    <small class="text-gray-500 dark:text-gray-300">Record</small>
                    </th>
                    <th>
                    <small class="text-gray-500 dark:text-gray-300">Type</small>
                    </th>
                   <th>
                    <small class="text-gray-500 dark:text-gray-300">Date and Time</small>
                   </th>
            </tr>
        </thead>
        <tbody>
            {#each paginatedSource as client, i}

            <tr>
                <td data-label="Status" >
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
                  <td data-label="Branch"> 
                    {#each client.branch as branch}
                      <small class="text-gray-500 dark:text-gray-300">
                        {branch.name}
                    <br/>
                    </small>
                    {/each}
                  </td>
                 {:else}
                   <td data-label="Branch" v-else >
                    <small class="text-gray-500 dark:text-gray-300 font-semibold" >
                   -----
                    </small>  
                  </td>
                 {/if}
      
                 <td data-label="Record" >
                        <small class="text-gray-500 dark:text-gray-300 font-semibold">
                      <audio src="`https://golang.qspiders.com/records/${client.record}`" controls controlsList="nodownload" >
                        Your browser does not support the audio element.
                      </audio>
                    </small> 
                  
                  </td>
                     
                  <td data-label="Type" >
                    <small class="text-gray-500 dark:text-gray-300 font-semibold" >
                    {client.type}
                    </small>  
                  </td>
      
       
                  <td data-label="Date and Time" >
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
