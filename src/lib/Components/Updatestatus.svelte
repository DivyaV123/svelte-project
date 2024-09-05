<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import {mainStore,main_status,reasons,update} from '../../stores/general'
import { Toast, getToastStore } from '@skeletonlabs/skeleton';
import { onMount } from 'svelte';
import type { ToastSettings, ToastStore } from '@skeletonlabs/skeleton';
	// Props
	/** Exposes parent props to this component. */
	export let parent: SvelteComponent;
	
    const modalStore = getModalStore();
	const toastStore=getToastStore()
  const general=mainStore()
	const formData = {
		id:$modalStore[0].props.id,
  mainStatus: null,
  subStatus: null,

  followup: null,

  // Joined Other Institiute
  course: "",
  institute_name: "",

  // already joined
  email: "",
  mobile: "",

  mobileDup: "",
  emailDup: "",

  // got job
  company_name: "",

  // Next batch
  agreed_date: "",
  
  // Escalation
  reason: null,
  comments: "",
  to: null,
	};

let status_comment = null;

let selectedRating  =[]
let substatuscall  =[]

const pushRating = async (ms) => {
    formData.mainStatus = ms;
    formData.subStatus = null;
    formData.followup = null;
    formData.reason = null;
    formData.comments = '';
    formData.to = null;
}

const substatus = async (ss) => {
    formData.subStatus = ss;
}
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
    let valid = true;
  let formValues = JSON.parse(JSON.stringify(formData));
   for (const key in formValues) {
    if (key === "mainStatus" && formValues[key] === null) {
      valid = false;
    toastStore.trigger({message:"Main Status is required"})
    }
    // if (key === "followup" && formValues["mainStatus"].name === 'follow up' && formValues[key] === null) {
    //   valid = false;
    //   mainStore.pushMessage("Batch Code is required!");
    // }
    if (key === "subStatus" && formValues["mainStatus"].name === 'enquiry' && formValues[key] === null) {
      valid = false;
    toastStore.trigger({message:"Sub Status is required"})
    }
    if (key === "subStatus" && formValues["mainStatus"].name === 'follow up' && formValues[key] === null) {
      valid = false;
    toastStore.trigger({message:"Sub Status is required"})
    }

    // joined other institute
    if(formValues["subStatus"] && formValues["subStatus"].name === 'joined outside'){
    if (key === 'course' && (formValues[key].length === 0)) {
      valid = false;
    toastStore.trigger({message:"Course is required"})
    }
    if (key === 'institute_name' && (formValues[key].length === 0)) {
      valid = false;
    toastStore.trigger({message:"Institute is required"})
    }}
    
    // already joined 
    if(formValues["subStatus"] && formValues["subStatus"].name === 'joined within'){
    if (key === 'mobile') {
      let num = formValues[key].replace(/\s+/g, '')
      if (num.length < 10 || isNaN(num)) {
        valid = false;
    toastStore.trigger({message:"Mobile number with valid number is required!"})
      }
    }
    if (key === 'mobileDup') {
      let num = formValues[key].replace(/\s+/g, '')
      if (num.length < 10 || isNaN(num)) {
        valid = false;
    toastStore.trigger({message:"Repeat mobile number with valid number is required!"})
      }
    }
    if (key === 'email' && !validEmail(formValues[key])) {
      valid = false;
    toastStore.trigger({message:"Email with valid ID is required!"})
    }
    if (key === 'emailDup' && !validEmail(formValues[key])) {
      valid = false;
    toastStore.trigger({message:"Repeat Email with valid ID is required!"})

    }}

    // got job
    if (key === 'company_name' && (formValues[key].length === 0) && formValues["subStatus"] && formValues["subStatus"].name === 'got job') {
      valid = false;
    toastStore.trigger({message:"Company is required"})
    }

    // next batch
    // if (key === "agreed_date" && formValues[key].length === 0 && formValues["subStatus"] && formValues["subStatus"].name === 'next batch') {      
    //     valid = false
    //     mainStore.pushMessage("Please add agreed date")   
    // }

    // Escalation
    if(key === 'reason' && formValues[key] === null && formValues["subStatus"] && formValues["subStatus"].name === 'escalation'){
      valid= false
    toastStore.trigger({message:"Reason is required!"})
    } 

  }
  if(formValues["subStatus"] && formValues["subStatus"].name === 'joined within' ){
  if (formValues['mobile'] !== formValues['mobileDup']) {
    valid = false;
    toastStore.trigger({message:"Mobile numbers are not matching"})

  }
  if (formValues['email'] !== formValues['emailDup']) {
    valid = false;
    toastStore.trigger({message:"Emails are not matching"})
  }}


  if (valid) {
    if(formData.subStatus && formData.subStatus.name === 'escalation'){
      let to_copy = null;
      if(formData.to && formData.to.id){
        to_copy = {id:formData.to.id, name:formData.to.name}
      }
      status_comment = {
        escalations: {
        reason: {id:formData.reason.id, name:formData.reason.name},
        comments: formData.comments
        },
        to: to_copy,
        author: {"id":mainStore.user.uid,"name":mainStore.user.username,"roles":mainStore.user.roles,"branches":mainStore.user.branches},
      }
    }
    if(formData.subStatus && formData.subStatus.name === 'joined within'){
      status_comment = {
        email: formData.email,
        mobile: formData.mobile,
        comments: formData.comments
      }
    }
    if(formData.subStatus && formData.subStatus.name === 'joined outside'){
      status_comment = {
        course: formData.course,
        institute_name: formData.institute_name,
        comments: formData.comments
      }
    }
    if(formData.subStatus && formData.subStatus.name === 'got job'){
      status_comment = {
        company_name: formData.company_name,
        comments: formData.comments
      }
    }
    // if(formState.subStatus && formState.subStatus.name === 'next batch'){
    //   status_comment = {
    //     agreed_date: formState.agreed_date,
    //     comments: formState.comments
    //   }
    // }

    let subStatus_copy = null;

    if(formData.subStatus && formData.subStatus.id){
      subStatus_copy = {id:formData.subStatus.id, name:formData.subStatus.name}
      if(formData.comments!=''){
        status_comment = {
        comments: formData.comments
      }
      }
    }

    let formSubmit = {
      id:formData.id,
      status: {
        id: formData.mainStatus.id,
        name: formData.mainStatus.name,
      substatus: subStatus_copy,
      comment: status_comment
      },
      // followup: formState.followup,
    }
    let response = await general.updatestatus(formSubmit);
    toastStore.trigger({message:$update.message})
    modalStore.close();

    // confirmCancel("confirm");
  } else {
    toastStore.trigger({message:"Form Error, please fill out mandatory FormFields"})
  }
    status_comment = null;

 
	}

	// Base Classes
	const cBase = 'card p-4 w-modal shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold';
	const cButton = 'absolute z-1 btn-icon variant-filled';
	const cForm = 'border border-surface-500  p-4 space-y-4 rounded-container-token';

let data =("")
    onMount(async () => {
        for(let i=0;i<$modalStore[0].props.branch.length;i++){
  data=$modalStore[0].props.branch[i].id
  }
//   await general.getregcodelist();
  await general.getmainstatus();
  await general.getreasons();
 
  await general.getcounselor(data)
    })

    console.log("ksdf",formData)
</script>


<!-- {#if $modalStore}
<div class="w-[50%] h-[60%]">
	<button class={cButton} on:click={parent.onClose}>✕</button>
	<form class="modal-form ">
		<label class="label">
			<span>Name</span>
			<input class="input" type="text"  placeholder="Enter name..." />
		</label>
		<label class="label">
			<span>Phone Number</span>
			<input class="input" type="tel" placeholder="Enter phone..." />
		</label>
		<label class="label">
			<span>Email</span>
			<input class="input" type="email" placeholder="Enter email address..." />
		</label>
	</form>
</div>
{/if} -->

<Toast />
{#if $modalStore[0]}
	<div class="modal-example-form {cBase}">
		<!-- {$modalStore[0].props.name} -->
		<header class={cHeader}>{$modalStore[0].title}<span class="text-lg">{$modalStore[0].props.name }</span></header>
		<!-- <article>{$modalStore[0].body ?? '(body missing)'}</article> -->
		
            {#each $main_status.items as rt}
            <span class="mb-3 mr-3 selectSection">
                 
                <!-- (formData.mainStatus && formData.mainStatus.id === rt.id) ?'variant-filled-success':'variant-filled-tertiary' -->
                   <button type="submit" on:click={pushRating(rt)} class={(formData.mainStatus && formData.mainStatus.id === rt.id) ? 'btn btn-sm variant-filled-primary'  : 'btn btn-sm variant-filled-secondary'}>
                   {rt.name}
                </button>   
              </span>
              {/each}  

              {#if formData.mainStatus && formData.mainStatus.substatus.length >0}
              {#if formData.mainStatus&& formData.mainStatus.substatus}
               <div class="mt-4">
                    {#each formData.mainStatus.substatus as st}
                    <span class="selectSection mt-2 mb-3 mr-2">
                    <button type="submit" on:click={substatus(st)}  class={(formData.subStatus && formData.subStatus.id === st.id) ? 'mt-2 btn btn-sm variant-filled-secondary'  : 'mt-2 btn btn-sm bg-red-600'} >
                    {st.name}
                 </button>  
                </span>
                {/each}
            </div>
                {/if}
                {/if}

               
                {#if formData.subStatus&&formData.subStatus.name=='joined within' }
                  <h1 class="text-lg font-bold">Enter Details of {formData.subStatus.name}</h1>
                 <div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <label class="label">
                      <span>Number</span>
                      <input class="input" type="tel" bind:value={formData.mobile} placeholder="Enter number..." />
                    </label>
                   <label class="label">
                    <span>Repeat number</span>
                    <input class="input" type="password" bind:value={formData.mobileDup} placeholder="Enter repeat number..." />
                  </label>

                  <label class="label">
                    <span>Email</span>
                    <input class="input" type="email" bind:value={formData.email} placeholder="Enter email..." />
                  </label>

                  <label class="label">
                    <span>Repeat email</span>
                    <input class="input" type="text" bind:value={formData.emailDup} placeholder="Enter repeat email..." />
                  </label>
                
           
                 </div>
                 {/if}
               
                 {#if formData.subStatus && formData.subStatus.name === 'joined outside'}
                 <h1 class="text-lg font-bold">Enter Details of {formData.subStatus.name}</h1>
                  <div class="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-2">

                  <label class="label">
                    <span>Course</span>
                    <input class="input" type="text" bind:value={formData.course} placeholder="Course" />
                  </label>

                  <label class="label">
                    <span>Institute</span>
                    <input class="input" type="text" bind:value={formData.institute_name} placeholder="Institute" />
                  </label>
                  </div>
               {/if}
                  
               {#if formData.subStatus && formData.subStatus.name === 'got job'}
               <h1 class="text-lg font-bold">Enter Details of {formData.subStatus.name}</h1>
                    <div class="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-2">
                      <label class="label">
                        <span>Company</span>
                        <input class="input" type="text" bind:value={formData.company_name} placeholder="Company" />
                      </label>
                    </div>
                    {/if}
                <label class="label">
                    <span>Comments</span>
                <textarea class="input" bind:value={formData.comments} />
            </label>
		<!-- prettier-ignore -->
		<footer class="modal-footer {parent.regionFooter}">
			<button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
			<button class="btn {parent.buttonPositive}" on:click={onFormSubmit}>Done</button>
		</footer>
	</div>
{/if}