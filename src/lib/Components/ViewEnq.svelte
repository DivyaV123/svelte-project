<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import {mainStore,add_internal} from '../../stores/general'
import { Toast, getToastStore } from '@skeletonlabs/skeleton';
import type { ToastSettings, ToastStore } from '@skeletonlabs/skeleton';
	// Props
	/** Exposes parent props to this component. */
	export let parent: SvelteComponent;
	const modalStore = getModalStore();
	const toastStore=getToastStore()
  const general=mainStore()
	const formData = {
        name:$modalStore[0].props.name ,
    verified:false,
  username:"",
 details:{
  team_name:''
 }
	};
console.log("slgm",$modalStore[0].props)
const checkString = (text) => {
  // var letters = /^[a-zA-Z\s]*$/;
   var letters = /^\S/;
  if (text.match(letters)) {
    return true;
  } else {
    return false;
  }
};

	async function onFormSubmit(): void {
		let valid = true
  let formValues = JSON.parse(JSON.stringify(formData))

   if(valid){
	var response = await general.addinternal(formValues)
    Object.assign(formData, {
        name:$modalStore[0].props.name,
    verified:false,
    username:"",
    details:{
     team_name:''
     }
    })
	if ($modalStore[0].response) $modalStore[0].response(formData);
    toastStore.trigger({message:$add_internal.message})
     modalStore.close();
  }
  else {
    // formLoading.value = false
    // mainStore.pushMessage("Form Error, please fill out mandatory fields");
  }
   
		// if ($modalStore[0].response) $modalStore[0].response(formData);
		// modalStore.close();
	}

	// Base Classes
	const cBase = 'card shadow-lg w-full max-h-lvh sm:w-4/5 md:w-3/5 lg:w-3/5  overflow-y-scroll';
	const cHeader = 'text-2xl font-bold';
	const cButton = 'absolute z-1 btn-icon variant-filled';
	const cForm = 'border border-surface-500 p-4 space-y-4 rounded-container-token';
  let items=$modalStore[0].props.id
</script>



<Toast />
{#if $modalStore[0]}
	<div class="modal-example-form {cBase}">
		<!-- {$modalStore[0].props.name} -->
		<header class={cHeader}>{$modalStore[0].title}<span class="text-lg">{$modalStore[0].props.name }</span></header>

    <div>  
        {#if $modalStore[0].props.id==null || $modalStore[0].props.id.name=='' || $modalStore[0].props.id.enquiry==null||$modalStore[0].props.id.education==null}
        <h1>No enquiry form added</h1>
       
      <!-- </div> -->
  
      {:else}
       
        <!-- {{ items.enquiry.data_not_taken}} -->
       <div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-1 xl:grid-cols-3 bg-gray-700 m-2 p-1 rounded " >
        <h1>{#if items}<b>Name : </b><span class="text-teal-700">{#if items.enquiry && items.enquiry.experienced==true}EXP{/if}</span>
          {items.name}<span>{#if items.enquiry && items.enquiry.enquiree_name}({items.enquiry.enquiree_name}){/if}</span>{/if}</h1>
       <h1>{#if items.enquiry&&items.enquiry.class_timing }<b>Class Timing : </b>{items.enquiry.class_timing.name}{/if}</h1>
        <h1>{#if items.enquiry&&items.enquiry.time_slot&& items.enquiry.time_slot.length>0}<b>Rigid Timings: </b> <span>{#each items.enquiry.time_slot as client}{client.name}&nbsp;{/each}</span>{/if}</h1>
          <h1>{#if items.enquiry&&items.enquiry.yop}<b>Highest Yop : </b>{items.enquiry.yop}{/if}</h1>
        <h1>{#if items.email&& items.email.length>0} <b>Email : </b><span>{#each items.email as client}{client.email}&nbsp;{/each}</span>{/if}</h1>
        <h1 ><b> Contact : </b>{#each items.contact as client}<span class="flex flex-wrap">{client.code+client.number}&nbsp;</span>{/each}</h1>
     {#if items.enquiry && items.enquiry.mode_of_enquiry}<h1><b>MOE : </b> {items.enquiry.mode_of_enquiry.name}</h1>{/if}
     <h1>{#if items.enquiry}<b>Data Not Taken : </b> {items.enquiry.data_not_taken}{/if}</h1>
      <h1>{#if items.enquiry && items.enquiry.comment}<b>Comment : </b>{items.enquiry.comment}{/if}</h1>    
      <h1>{#if items.education.highest_degree}<b>Highest Degree : </b>{items.education.highest_degree.name}{/if}</h1>

      </div>
     
      {#if items.courses!=null}
      <h1 class="font-bold text-base ml-2 text-teal-500">{#if items.courses.length>0}Regular Courses{/if} </h1>
        {#each items.courses as client}
        {#if client.course && client.course.name!=''}
       <span  class="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-1 xl:grid-cols-2 mt-3 bg-gray-700
       m-2 p-1 rounded">
      <h1> {#if client.course.name}<b>Course : </b> {client.course.name}{/if}</h1>
        <h1 >{#if client.branch.name}<b>Branch : </b> {client.branch.name}{/if}</h1>
      <h1>{#if client.mode_class.name}<b>Mode of Class : </b> {client.mode_class.name}{/if}</h1>
      <h1>{#if client.author.name }<b> Author : </b> {client.author.name}{/if}</h1>
      <h1>{#if client.oauthor.name}<b> OAuthor : </b> {client.oauthor.name}{/if}</h1>
      </span>
      {/if}
 {/each}
 {:else}
 <div > Course not added</div>
{/if}

    {#if items.other_courses!=null}
     <h1 class="font-bold text-base ml-2 text-teal-500" >{#if items.other_courses.length>0} Other Courses{/if}</h1> 
     {#each items.other_courses as client}
   {#if client.course && client.course.name!=''}
       <span  class="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-1 xl:grid-cols-2 mt-3 bg-gray-700
       m-2 p-1 rounded">
       <h1> <b>Course : </b> {client.course.name}</h1>
      <h1><b>Branch : </b> {client.branch.name}</h1>
      <h1><b>Mode of Class : </b> {client.mode_class.name}</h1>
      <h1>{#if client.author.name}<b> Author : </b> {client.author.name}{/if}</h1>
      <h1>{#if client.oauthor.name}<b> OAuthor : </b> {client.oauthor.name}{/if}</h1>
      </span>
      {/if}
    {/each}
    {:else}
    <div class="bg-gray-700 m-2 p-1 rounded">Other course not added</div>
 {/if}
  
  {#if items.online_courses!=null}
       <h1 class="font-bold text-base ml-2 text-teal-500" v-if="items.online_courses.length>0">Online Courses</h1>
       {#each items.online_courses as client}
       {#if client.course && client.course.name!=''}
       <span  class="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-1 xl:grid-cols-2 mt-3 bg-gray-700
       m-2 p-1 rounded">
       <h1><b> Course : </b> {client.course.name}</h1>
      <h1> <b>Branch : </b> {client.branch.name}</h1>
      <h1> <b>Mode of Class : </b> {client.mode_class.name}</h1>
      <h1>{#if client.author.name} <b>Author : </b> {client.author.name}{/if}</h1>
      <h1>{#if client.oauthor.name}<b> OAuthor : </b> {client.oauthor.name}{/if}</h1>
    </span>
    {/if}
      {/each}
      {:else}
      <div>Online course not added</div>
{/if}

  <!-- {{ items.scourses }} -->

  {#if items.scourses!=null}
       <h1 class="font-bold text-base ml-2 text-teal-500" >Special Courses</h1>
      {#each  items.scourses as client}
     {#if client.name &&client.name.id!=0}
       <span 
        class="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-1 xl:grid-cols-2 mt-3 bg-gray-700
       m-2 p-1 rounded">
       <h1>{#if client.name && client.othercourse==false}<b> Course : </b> {client.name.name}{/if}</h1>
       <h1>{#if client.othercourse==true}<b> Other Course : </b> {client.other_course}{/if}</h1>
      <h1>{#each client.branch as branch} <b>Branch : </b> {branch.name}{/each}</h1>
      <h1> {#if client.mode_class}<b>Mode of Class : </b> {client.mode_class.name}{/if}</h1>
      <h1>{#if client.author.name} <b>Author : </b> {client.author.name}{/if}</h1>
      <h1 > {#if client.oauthor.name}<b>OAuthor : </b> {client.oauthor.name}{/if}</h1>
    </span>
    {:else if client.othercourse==true}
    <span  class="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-1 xl:grid-cols-2 mt-3 bg-gray-700
       m-2 p-1 rounded">
       <h1>{#if client.othercourse==true}<b> Other Course : </b> {client.other_course}{/if}</h1>
      <h1 > {#each client.branch as branch}<b>Branch : </b> {branch.name}{/each}</h1>
      <h1>{#if client.mode_class} <b>Mode of Class : </b> {client.mode_class.name}{/if}</h1>
      <h1 >{#if client.author.name} <b>Author : </b> {client.author.name}{/if}</h1>
      <h1> {#if client.oauthor.name}<b>OAuthor : </b> {client.oauthor.name}{/if}</h1>
    </span>
    {/if}
    {/each}
    {:else}
    <div >Special course not added</div> 
    {/if}
    
    {#if items.enquiry && items.enquiry.experienced==false}
     <div class="mt-3" > 
      <h1 class="font-bold text-base ml-2 text-teal-500">Education Details</h1> 
      {#if items.education!==null}
      <div class="grid lg:grid-cols-2 
       grid-cols-2 gap-2 xl:grid-cols-2 mt-2 bg-gray-700 m-2 p-1 rounded mb-5" >
     <h1 >{#if items.education.name}<b>Degree Name : </b> {items.education.name.name}{/if}</h1>
     <h1>{#if items.education.otherdegree}<b>Other Degree Name : </b> {items.education.otherdegree}{/if}</h1>
       <h1 >{#if items.education.college_object}<b>College : </b>  {items.education.college_object.name}{/if}</h1>
       <h1 >{#if items.education.other_college==true}<b>Other College : </b>  {items.education.othercollege}{/if}</h1>
       <h1>{#if items.education.other_stream==false && items.education.stream_object}<b>Stream : </b>{items.education.stream_object.name}{/if}</h1>
       <h1 >{#if items.education.other_stream==true}<b>Other Stream : </b>{items.education.otherstream}{/if}</h1>
      <h1>{#if items.education.percentage&&items.education.percentage==true}<b>Percentage : </b> 60% or Greater than 60% {:else}<b>Percentage : </b> Less than 60%{/if}</h1>
     
       <h1>{#if items.education.yop}<b>Highest Degree Passout Year: </b> {items.education.yop}{/if}</h1>
   </div>
   {/if}
   </div>
   {/if}
      <!-- <h1>Highest Degree:</h1>
      <h1>Highest Yop:</h1>
      <h1>Refrence:</h1>
      <h1>MOE:</h1>
      <h1>Comment:</h1> -->
      <!-- </div>  -->
      {#if items.refers &&items.refers.length>0}
      <div class="mt-3"> 
      <h1 class="font-bold text-base ml-2 text-teal-500">Referral Details</h1> 
      {#each items.refers as client}
      <div class="grid lg:grid-cols-2 
       grid-cols-2 gap-2 xl:grid-cols-2 mt-2 bg-gray-700 m-2 p-1 rounded mb-5">
  
       <h1>{#if client.referee_name}<b>Referee Name : </b>  {client.referee_name}{/if}</h1>
      <h1 >{#if client.referee_number}<b>Referee Number  : </b> {client.referee_code}{client.referee_number}{/if}</h1>
      <h1>{#if client.author && client.author.name!=''}<b>Author : </b> {client.author.name}{/if}
      </h1>
   </div>
   {/each}
   </div> 
   {/if}
   <!-- </div> -->
   {/if}
	</div>
</div>
{/if}

<style>
  .bg-gradient-to-tr{
    background-color: rgb(31, 29, 29);
  }
  </style>