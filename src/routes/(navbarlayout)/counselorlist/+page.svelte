<div class="table-container">
    {#if pageLoading}
    <div   class="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
      <ProgressRadial width='w-[4%]'/>
       <h2 class="text-center text-white text-xl font-semibold">Loading...</h2>
       <p class="w-1/3 text-center text-white">This may take a few seconds, please wait.</p>
    </div>
    {/if}
    
      <table class="table table-hover">
          <thead class="sticky top-[0px] z-[9] bg-gray-900">
              <tr class="bg-gray-900">
                <th>
                    <small class="text-gray-500 dark:text-gray-300">Name</small>
                </th>
                <th>
                    <small class="text-gray-500 dark:text-gray-300">Email</small>
                </th>
                <th>
                    <small class="text-gray-500 dark:text-gray-300">Branch</small>
                </th>
                <th>
                    <small class="text-gray-500 dark:text-gray-300">Last Call</small>
                </th>
                <th>
                    <small class="text-gray-500 dark:text-gray-300">Active</small>
                </th>
              </tr>
            </thead>
           <tbody>
    
               {#each $couns_list.items as client ,i }
               <tr>
                <td data-label="Name">
                    <small class="text-gray-500 dark:text-gray-300 font-semibold capitalize">
                   {client.name}
                      </small>
                    </td>
                
        
                    <td data-label="Email">
                      <small class="text-gray-500 dark:text-gray-300 font-semibold">
                     {client.email}
                      </small>
                      
                    </td>
           
                    <td data-label="Branch" >
                        {#each client.branches as client}
                     <small class="text-gray-500 dark:text-gray-300 font-semibold capitalize">
                    {client.name}
                      <br/>
                           &nbsp;
                      </small>
                     {/each}
                    </td>
        
                    <td data-label="Last Call">
                        {#if client.contact=='0001-01-01T00:00:00Z' || client.contact==''}
                      <small class="text-gray-500 dark:text-gray-300 font-semibold" >
                        <button type="button" class="rounded-md p-1 variant-soft-primary">
                          Inactive
                        </button>
                      </small>
                      {:else}
                      <small>  { dayjs(client.contact).utc().format("DD-MMM-YY hh:mm A") }</small>
                  {/if}
                    </td>
        
                    <td data-label="Active">
                        {#if client.blocked===true}
                         <small class="text-gray-500 dark:text-gray-300 font-semibold mr-2">
                            <Icon icon="mdi:close-circle-outline" class="text-3xl text-red-500"/>
                     
                      </small>  
                      {:else}
                      <small class="text-gray-500 dark:text-gray-300 font-semibold mr-2" >
                        <Icon icon="mdi:checkbox-marked-circle" class="text-3xl text-green-400"/>
                      </small>
                      {/if}
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
   import {store,mainStore,couns_list,miss_comm} from '../../../stores/general'
   import { Paginator } from '@skeletonlabs/skeleton';
   import dayjs from "dayjs"
   import utc from 'dayjs/plugin/utc'
   import { ProgressRadial,Modal,getModalStore ,popup} from '@skeletonlabs/skeleton';
   import ModalComment from '$lib/Components/ModalComment.svelte';
   import { Toast, getToastStore } from '@skeletonlabs/skeleton';
   import {generalStore} from '../../../stores/auth'
  
   dayjs.extend(utc)
  
  const onPageChange=async()=>{
   pageLoading=true;
  await generalstore.getcounselorlist(paginationSettings.page)
  pageLoading=false;
  }
  const main=generalStore()
  const toastStore=getToastStore()
  const generalstore=mainStore()
  const modalStore = getModalStore();
  let pageLoading=false;
  let myStoreContents = "";
   onMount(async () => {
   pageLoading=true;
        await generalstore.getcounselorlist()
      main.setPageTitle('Counselor List')
        const unsubscribe1 = couns_list.subscribe((value) => 
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
            if(data.role==='rateopti'){
                commentdata.push(data)       
        }
        } 
        
        else{
          commentdata.push(data)       
        }
        
      })
      reversedKeys=[]
      Object.assign($couns_list.items[i], {reversedKeys: Object.values(commentdata).reverse()});
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
      await generalstore.getcounselorlist()
      toastStore.trigger({message:$miss_comm.message})
    pageLoading=false
    }
      }
  };
  modalStore.trigger(modal)
   }
  
  
  </script>
  