<script lang="ts">
  import type { SvelteComponent } from 'svelte';
  import { getModalStore } from '@skeletonlabs/skeleton';
  import {mainStore,ratenames} from '../../stores/general'
  import { Toast, getToastStore } from '@skeletonlabs/skeleton';
  import {  derived } from 'svelte/store';
  import { onMount } from 'svelte';
  import dayjs from "dayjs"
  import utc from 'dayjs/plugin/utc'
  import type { ToastSettings, ToastStore } from '@skeletonlabs/skeleton';
  export let parent: SvelteComponent;
     
  dayjs.extend(utc)
  const modalStore = getModalStore();
  const toastStore=getToastStore()
  const general=mainStore()
  let fresher=null
  
  let selectedRating  = ([]) 
  $: selectedRate = (id,fresh) => {
      if(selectedRating.includes(id)){
        return true
      }
      else{ 
      return false
      }
  
  } 
  
  const formData = {
    id:$modalStore[0].props.id,
    rid:$modalStore[0].props.rid,
    rating: {
      "rate":selectedRating,
      "total":null,
      "comment":null,
      "date":dayjs(new Date()).format("YYYY-MM-DD hh:mm A"),
      "author":{
          "id":$modalStore[0].userdata.uid,
        "name":$modalStore[0].userdata.username,
        "roles":$modalStore[0].userdata.roles
  
      },
    },
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
  
  let rate = []
  let rate2 = []
  let fresherArr =[]
  let experenceArr = []
  onMount(async () => {
      await general.getratenames()
  $ratenames.map(ele=>{
      if(ele.details !== null && ele.details.fresher === false){
            experenceArr.push(ele)
      
       }
     else if(ele.details !== null && ele.details.fresher === true){
          fresherArr.push(ele)
          
    }
    else{
            rate.push(ele)
            rate2.push(ele)
            rate=rate
      }
      })
      })
 

      $: numerator=0
const pushRating = (id) => {
      if(selectedRating.includes(id)){
          selectedRating = selectedRating.filter(rate => rate != id);
          selectedRating=selectedRating
          formData.rating.rate=selectedRating
      }
      else{
          selectedRating.push(id)
          selectedRating=selectedRating
          formData.rating.rate=selectedRating

          numerator=0
          for(let i=0;i<=selectedRating.length;i++){
            if(selectedRating[i]){
              if(selectedRating[i].details==null){
                numerator +=  selectedRating[i].marks 
               numerator =numerator
              }
            if(selectedRating[i].details!=null && selectedRating[i].details.fresher ==true){
            numerator+=  selectedRating[i].marks 
              numerator= numerator
            }
            if(selectedRating[i].details!=null &&selectedRating[i].details.fresher ==false){
              numerator+=  selectedRating[i].marks 
              numerator =  numerator
  
            }    
                   
          }
          }
      }
  }
console.log("$mod",$modalStore[0].props)
async function onFormSubmit(): void {
          let valid = true
          let formValues = JSON.parse(JSON.stringify(formData))
  for (const key in formValues) {
    if (key === "rating" && (formValues[key].rate.length === 0)) {
      valid = false
      toastStore.trigger({message:"you have not rated the call!"});
    }
    if (key === "rating" && (formValues[key].total === null )) {
   if(fresher=='true'){
    $modalStore[0].props.exptotal=0
    let total=$modalStore[0].props.total+$modalStore[0].props.fretotal
    formValues[key].total = parseFloat(((numerator)/total)*100).toFixed(3) 
   }
   if(fresher=='false'){
    $modalStore[0].props.fretotal=0
   let total=$modalStore[0].props.total+$modalStore[0].props.exptotal  
    formValues[key].total = parseFloat(((numerator)/total)*100).toFixed(3) 
   }    
    }
    if (key === "rating" && (formValues[key].total === 0)) {
        valid=  false
      toastStore.trigger({message:"you have not rated the call!"});
    }
  }
  if(fresher==null){
    valid=  false
    toastStore.trigger({message:"select fresher or experience"});
  }
     if(valid){
      var response = await general.add_other_rating(formValues)
      Object.assign(formData, {
        comment:{
          comment:""
        },
      })
      if ($modalStore[0].response) $modalStore[0].response(formData);
      toastStore.trigger({message:'Update Ratings'})
       modalStore.close();
    }
    else {
      // formLoading.value = false
      // mainStore.pushMessage("Form Error, please fill out mandatory fields");
    }
      }
  
      // Base Classes
      const cBase = 'card p-4 w-modal shadow-xl space-y-4';
      const cHeader = 'text-2xl font-bold';
      const cButton = 'absolute z-1 btn-icon variant-filled';
      const cForm = 'border border-surface-500 p-4 space-y-4 rounded-container-token';
  
      const toggleFun = (data)=>{
    if(data === 'true'){
      selectedRating=[]
      rate.splice(0,rate.length)
      rate.push(...rate2)
      rate.push(...fresherArr)
      rate=rate
    }
    else if(data === 'false'){
      selectedRating=[]
      rate.splice(0,rate.length)
      rate.push(...rate2)
      rate.push(...experenceArr)
      rate=rate
  
    }
  }
  
 
 
  
  </script>
  
  
  <Toast />
  {#if $modalStore[0]}
      <div class="modal-example-form {cBase}">
          <!-- {$modalStore[0].props.name} -->
          <header class={cHeader}>{$modalStore[0].title}<span class="text-lg">{$modalStore[0].props.name }</span></header>
          <!-- <article>{$modalStore[0].body ?? '(body missing)'}</article> -->
          <!-- Enable for debugging: -->
          <!-- <button class={cButton} on:click={parent.onClose}>✕</button> -->
          
          <form class="modal-form {cForm}">
              
              <div class="flex">
              <label class="flex items-center space-x-2">
                  <input type="radio" value="true" class="w-5 h-5 align-middle pl-1 radio radio-info radio-sm" 
                  bind:group={fresher}  on:change={toggleFun(fresher)} />
                  <p>fresher</p>
              </label>
              <label class="flex items-center space-x-2">
                  <input type="radio" value="false" class="w-5 h-5 align-middle pl-1 radio radio-info radio-sm" 
                  bind:group={fresher}  on:change={toggleFun(fresher)}/>				
                  <p>Experience</p>
              </label>
          </div>
          
          <div class="mb-6 flex flex-wrap" >
  
              <div class="mb-3 mr-3 selectSection" >
                  {#each rate as rt}		
             
              <button type="submit" 
              class=" {selectedRate(rt)? 'mt-2 btn btn-sm variant-filled-primary' : 'mt-2 btn btn-sm bg-red-600'} "
            on:click={() => pushRating(rt)}>
                  {rt.name}
                </button>
                  {/each}
               </div>
              </div>
  
          
              <label class="label">
                  <span>Comments</span>
              <textarea class="input" bind:value={formData.rating.comment} />
          </label>
          </form>
          <!-- prettier-ignore -->
          <footer class="modal-footer {parent.regionFooter}">
              <button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
              <button class="btn {parent.buttonPositive}" on:click={onFormSubmit}>Done</button>
          </footer>
      </div>
  {/if}