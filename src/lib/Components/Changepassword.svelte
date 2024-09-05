<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import {mainStore,change_pass} from '../../stores/general'
import { Toast, getToastStore } from '@skeletonlabs/skeleton';
import type { ToastSettings, ToastStore } from '@skeletonlabs/skeleton';
	// Props
	/** Exposes parent props to this component. */
	export let parent: SvelteComponent;
	const modalStore = getModalStore();
	const toastStore=getToastStore()
  const general=mainStore()
let pwd=""

  const form =({
    oldpassword: '',
  password: '', 

    // cid:$modalStore[0].props.id,
    comment:"",
    role:"rateopti"
})

const checkPassword = (text) => {
  var letters = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (text.match(letters)) {
    return true;
  } else {
    return false;
  }
};

async function onFormSubmit(): void {
		let valid = true
  let formValues = JSON.parse(JSON.stringify(form))

  for (const key in formValues) {
    if (
      key === "oldpassword" &&
      (formValues[key].length === 0)
    ) {
      valid = false;
      toastStore.trigger( {message: 'old password is required!'});
    }
    if (
      key === "password" &&
      (formValues[key].length === 0)
    ) {
      valid = false;
      toastStore.trigger( {message: 'password is required!'});
    }
    if (
    key === "password" &&
      !checkPassword(formValues[key])
    ) {
      valid = false;
      toastStore.trigger( {message: 'Password should contain more than  8 characters with 1 uppercase,lowercase,numbers and special characters!'});
    }
     if (
      key === "password" && formValues[key] !== pwd
    ) {
      valid = false;
      toastStore.trigger( {message: 'Both New Password and Confirm Password should be identical!'});
    }
  
  }
   if(valid){
	var response = await general.change_password(formValues)
    Object.assign(form, {
        oldpassword:"",
              password:"",
    })
    if ($modalStore[0].response) $modalStore[0].response(form);
     toastStore.trigger({message:$change_pass.message})
 modalStore.close();
	// toastStore.trigger({message: 'Comment added',});
  }
  else {
    // formLoading.value = false
    // Old Password is not  matching
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
</script>


<Toast />
{#if $modalStore[0]}
	<div class="modal-example-form {cBase}">
		<!-- {$modalStore[0].props.name} -->
		<header class={cHeader}>{$modalStore[0].title}</header>
		<!-- <article>{$modalStore[0].body ?? '(body missing)'}</article> -->
		<!-- Enable for debugging: -->
		<!-- <button class={cButton} on:click={parent.onClose}>✕</button> -->
		<form class="modal-form {cForm}">
			<label class="label">
				<span>Old Password</span>
				<input type="password" class="form-control input variant-form-material basis-[100%]" name="password"  id="password" 
                bind:value={form.oldpassword}   />
                </label>
         <label class="label">
                    <span>New Password</span>
                    <input type="password" class="form-control input variant-form-material basis-[100%]" name="password"  id="password" 
                    bind:value={form.password}   />
        </label>
        <label class="label">
            <span>Confirm Password</span>
            <input type="password" class="form-control input variant-form-material basis-[100%]" name="password"  id="password" 
            bind:value={pwd}   />
        </label>
			
		</form>
		<!-- prettier-ignore -->
		<footer class="modal-footer {parent.regionFooter}">
			<button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
			<button class="btn {parent.buttonPositive}" on:click={onFormSubmit}>Done</button>
		</footer>
	</div>
{/if}