<script lang="ts">
	import '../../app.postcss';
	import { AppShell, AppBar,popup} from '@skeletonlabs/skeleton';
    import Icon from '@iconify/svelte';
	// Highlight JS
	import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	import xml from 'highlight.js/lib/languages/xml'; // for HTML
	import css from 'highlight.js/lib/languages/css';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';
	import { Modal, getModalStore,Toast ,getToastStore} from '@skeletonlabs/skeleton';
	import { generalStore,store }  from "../../stores/auth"
import type { ModalSettings, ModalComponent, ModalStore} from '@skeletonlabs/skeleton';
import type { ToastSettings, ToastStore } from '@skeletonlabs/skeleton';
import {pageTitle } from "../../stores/auth"
import { initializeStores } from '@skeletonlabs/skeleton';
initializeStores();

	hljs.registerLanguage('xml', xml); // for HTML
	hljs.registerLanguage('css', css);
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('typescript', typescript);
	storeHighlightJs.set(hljs);
	const general=generalStore()

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
	import {mainStore,nostatus} from '../../stores/general'
	import Changepassword from '$lib/Components/Changepassword.svelte';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	const toastStore = getToastStore();
	const modalStore = getModalStore();
   const generalstore=mainStore()

	 const modal: ModalSettings = {
	type: 'confirm',
	// Data
	title: 'Logout',
	body: `Are you sure you want to <b>logout?</b>`,
	response: async(r: boolean) =>{
		await general.logout(),
		goto("/auth")
	} 
};

export let data;
function Changepass():void{
  const c:modalchange = { ref: Changepassword} ;
  const modal: ModalSettings = {
	type: 'component',
  title:`Change Password`, 
	component: c,
  userdata:data,
  response: async(r: boolean) =>{
    console.log("rrr",r)
  if(r){
	await general.logout(),
		goto("/auth")
  }
  else{
	await generalstore.get_sratelist()
  }
	}
};
modalStore.trigger(modal)
 }
</script>

<!-- App Shell -->
<Modal />
<Toast/>
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase"><a
					href="/raterecordlist"
					rel="noreferrer"
				>
				CVS
				</a></strong>
				<Icon icon="mdi:text" class="text-xl"/>
				<span class="text-orange-500"> {$pageTitle}</span>
			</svelte:fragment>
			
			<svelte:fragment slot="trail">
				
				<div class="relative hidden lg:block">
					<button class="btn btn-sm hover:variant-soft-success variant-soft-primary " use:popup={{ event: 'click', target: 'features' }}>
						<Icon icon="mdi:microphone-outline" class="text-lg"/><span>Call Record</span>					
					</button>
					<div class="card p-2 w-55 shadow-xl" data-popup="features">
						<nav class="list-nav">
							<ul>
								<li>
									<a href="/raterecordlist">
										<span class="w-6 text-center"><Icon icon="mdi:star-outline" /></span>
										<span>Rate Record</span>
									</a>
								</li>
								<li>
									<a href="/rated">
										<span class="w-6 text-center"><Icon icon="mdi:star" /></span>
										<span>Rated Record</span>
									</a>
								</li>
								<!-- <hr class="!my-4" />
								<li>
									<a href="/elements/core">
										<span class="w-6 text-center">
											<DocsIcon name="tailwind" width="w-5" height="h-5" />
										</span>
										<span>Tailwind</span>
									</a>
								</li>	 -->
							</ul>
						</nav>
					</div>
				</div>
		
				<div class="relative hidden lg:block">
					<button class="btn btn-sm hover:variant-soft-success bg-orange-500 rounded-lg" >
						<Icon icon="mdi:plus-box-outline" class="text-lg"/><a href="/addenquiry"><span>Add Enquiry</span>	</a>			
					</button>
					</div>
				<div class="relative hidden lg:block">
					<button class="btn btn-sm hover:variant-soft-success bg-tertiary-600 " use:popup={{ event: 'click', target: 'list' }}>
						<Icon icon="mdi:format-list-bulleted" /><span>List</span>					
					</button>
					<div class="card p-2 w-50 shadow-xl" data-popup="list">
						<nav class="list-nav">
							<ul>
								<li>
									<a href="/misscalllist">
										<span class="w-6 text-center"><Icon icon="mdi:call-end" /></span>
										<span class="text-sm">Missed Call Escalations</span>
									</a>
								</li>
								<li>
									<a href="/nostatusescalations">
										<span class="w-6 text-center"><Icon icon="mdi:person-off" /></span>
										<span class="text-sm">No Status Escalations</span>
									</a>
								</li>
								<li>
									<a href="/counselorlist">
										<span class="w-6 text-center"><Icon icon="mdi:account-supervisor-outline" /></span>
										<span class="text-sm">Counselor List</span>
									</a>
								</li>
								<li>
									<a href="/callrecordlist">
										<span class="w-6 text-center"><Icon icon="mdi:microphone-outline" class="text-lg"/></span>
										<span class="text-sm">Call Record List</span>
									</a>
								</li>
							</ul>
						</nav>
					</div>
				</div>
		
		
				<div class="relative hidden lg:block">
					
					<button class="btn btn-sm hover:variant-soft-success " use:popup={{ event: 'click', target: 'rateopti' }}>
						<span>{data.username}</span>	
						<Icon icon="mdi:menu-down" class="text-2xl"/>				
					</button>
					<div class="card p-1 w-50 shadow-xl" data-popup="rateopti">
						<nav class="list-nav">
							<ul>
								<li>
									<a on:click={() => Changepass()}>
										<span class="w-6 text-center"><Icon icon="mdi:lock" /></span>
										<span>Change Password</span>
									</a>
								</li>
								<li>
									<a on:click={() => {modalStore.trigger(modal)}}>
										<span class="w-6 text-center"><Icon icon="mdi:output" /></span>
										<span>Logout</span>
									</a>
								</li>
							</ul>
						</nav>
					</div>
				</div>
				
			<!-- <a class="btn btn-sm variant-glass-primary" href="/rated">Rated Record List</a>
				<a
					class="btn btn-sm variant-ghost-surface" 
					href="https://twitter.com/SkeletonUI"
					target="_blank"
					rel="noreferrer"
				>
					Twitter
				</a>
				<a
					class="btn btn-sm variant-ghost-surface"
					href="https://github.com/skeletonlabs/skeleton"
					target="_blank"
					rel="noreferrer"
				>
					GitHub
				</a>  -->
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	
	<!-- Page Route Content -->
	<slot />
</AppShell>
