<!-- <script>
	import { useForm, validators, HintGroup, Hint, email, required } from "svelte-use-form";
  import {store} from "../stores/main"
  import {getUserDetails} from "../stores/main"

	const form = useForm();
	const handlesubmit=async()=>{
		console.log(":ALDj")
		const user = await getUserDetails( "divya", "gshdg" )
       store.set(user)

	}
  </script>
  
  <form use:form>
	<h1>Login</h1>
  
	<input type="email" name="email" use:validators={[required, email]} />
	<HintGroup for="email">
	  <Hint on="required">This is a mandatory field</Hint>
	  <Hint on="email" hideWhenRequired>Email is not valid</Hint>
	</HintGroup>
  
	<input type="password" name="password" use:validators={[required]} />
	<Hint for="password" on="required">This is a mandatory field</Hint>

	<button  disabled={!$form.valid} class="bg-red-600" on:click={handlesubmit}>Login</button>
  </form>
  <pre>

  </pre>
  
  <style>
	  :global(.touched:invalid) {
		  border-color: red;
		  outline-color: red;
	  }
  </style> -->


  <script>
	import { generalStore,store }  from "../../../stores/auth"
	import {user} from '../../../stores/auth'
	import { goto } from '$app/navigation';
    import Icon from '@iconify/svelte';
    

	// import { store } from  '$app/stores
   
	let username = '';
	let password = '';
	let error = ''

	const general=generalStore()
	async function login() {
		await general.getUserDetails( username, password )
		let myStoreContent = "";

        const unsubscribe = await store.subscribe((value) => (myStoreContent = value));
        console.log("unsubscribe",unsubscribe)
		if ( user ) {
			console.log(user)
			$store = user
			goto("/raterecordlist")
			if ( error ) error = ''
		}
		else {
			error = 'Incorrect username and password.'
			console.log("Incorrect username and password.")
		}

	}
	function mouseoverPass() {
  let obj = document.getElementById('password');
  obj.type = 'text';
}
function mouseoutPass() {
  let obj = document.getElementById('password');
  obj.type = 'password';
}
</script>

<div   class="flex flex-col items-center md:flex-row md:justify-around min-h-screen transition-background-image duration-1000"> <div
	class="space-y-12 px-12"
  >

	<div class="text-center text-white py-12 md:py-0">
	  <h1 class="text-4xl lg:text-5xl mb-3 font-black">
	 CVS
	  </h1>
	  <h1 class="text-4xl lg:text-3xl font-black">
		QSpiders JSpiders PySpiders 
	  </h1>
	  <!-- <h2 class="text-2xl">
		Online
	  </h2> -->
	</div>
  </div>
  <div class="grid z-0 justify-center items-center h-screen  px-6">
    <div class="mt-4 p-6 w-[500px] shadow-md rounded-md border border-gray-300">
      <div class="grid justify-center items-center">
        <span class="text-gray-300 font-semibold text-2xl">Login</span>
      </div>

		<form on:submit|preventDefault={login} class="grid mx-auto col-6">
			<div class="mb-3">
				<label for="username" class="form-label">Username</label>
				<input type="email" class="form-control input variant-form-material" id="username" bind:value={username} />
			</div>

			<div class="mb-3">
				<label for="password" class="form-label">Password</label>
				<span class="flex">
<input type="password" class="form-control input variant-form-material basis-[100%]" name="password"  id="password" 
bind:value={password}   />

<button on:click={mouseoverPass} on:mouseleave={mouseoutPass} ><Icon icon="mdi:eye-outline" /></button>		
</span>
</div>


					<!-- {#if PassShowHideClick}
				
				{:else}
				<Icon icon="mdi:asterisk" />
			{/if} -->
			<!-- {PassShowHideClick} -->
		

          <div class="mt-6">
            <button
              type="submit"
              class="
                py-2
                px-4
                text-center
                bg-indigo-600
                rounded-md
                w-full
                text-white text-sm
                hover:bg-indigo-500
              "
            >
              Login
            </button>
          </div>
        </form>

	
    </div>
  </div> 

</div>
	

