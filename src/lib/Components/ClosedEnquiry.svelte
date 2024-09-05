<script lang="ts">
    import { onMount } from 'svelte';
      import type { SvelteComponent } from 'svelte';
      import { getModalStore } from '@skeletonlabs/skeleton';
      import {mainStore,close_enquiry} from '../../stores/general'
  import { Toast, getToastStore } from '@skeletonlabs/skeleton';
  import type { ToastSettings, ToastStore } from '@skeletonlabs/skeleton';
      // Props
      /** Exposes parent props to this component. */
      export let parent: SvelteComponent;
      const modalStore = getModalStore();
      const toastStore=getToastStore()
    const general=mainStore()
    const formData =({
        eid:null,
    id:null,
    verified:null,
    comment:"",
    list:""
  })
  
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
  
    if(formData.comment==''){
      valid=false
      toastStore.trigger( {message: 'Comment is required!'});
    }
     if(valid){
      var response = await general.submitcloseenquiry(formValues)
      Object.assign(formData, {
          comment:""
      })
      if ($modalStore[0].response) $modalStore[0].response(formData);
       toastStore.trigger({message:$close_enquiry.message})
   modalStore.close();
      // toastStore.trigger({message: 'Comment added',});
    }
    else {
      // formLoading.value = false
      // mainStore.pushMessage("Form Error, please fill out mandatory fields");
    }
     
          // if ($modalStore[0].response) $modalStore[0].response(formData);
          // modalStore.close();
      }
  
      // Base Classes
      const cBase = 'card p-4 w-modal shadow-xl space-y-4';
      const cHeader = 'text-2xl font-bold';
      const cButton = 'absolute z-1 btn-icon variant-filled';
      const cForm = 'border border-surface-500 p-4 space-y-4 rounded-container-token';
     
      onMount(async () => {
          if($modalStore[0].props && $modalStore[0].props.id){
        Object.assign(formData, {
            eid:$modalStore[0].props.eid,
      id:$modalStore[0].props.id,
      verified:true,
      list:$modalStore[0].props.title
          })
      }
     
      })
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
          <header class={cHeader}>{$modalStore[0].title}-<span class="text-md">{$modalStore[0].props.name}</span></header>
          <!-- <article>{$modalStore[0].body ?? '(body missing)'}</article> -->
          <!-- Enable for debugging: -->
          <!-- <button class={cButton} on:click={parent.onClose}>✕</button> -->
          <form class="modal-form {cForm}">
              <!--<label class="label">
                  <span>Phone Number</span>
                  <input class="input" type="tel" bind:value={formData.tel} placeholder="Enter phone..." />
              </label> -->
              <label class="label">
                  <span>Comments</span>
              <textarea class="input" bind:value={formData.comment} />
          </label>
          </form>
          <!-- prettier-ignore -->
          <footer class="modal-footer {parent.regionFooter}">
              <button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
              <button class="btn {parent.buttonPositive}" on:click={onFormSubmit}>Done</button>
          </footer>
      </div>
  {/if}