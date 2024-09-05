
<script lang="ts">
import type { SvelteComponent } from 'svelte';
import { getModalStore } from '@skeletonlabs/skeleton';
import { writable ,readable} from 'svelte/store';
import {counselorstore,coursebranches,filter_course,branches_min,special_course,mode_class,mode_of_enq,branchtrainer} from '../../stores/counselor'
import { Toast, getToastStore } from '@skeletonlabs/skeleton';
import type { ToastSettings, ToastStore } from '@skeletonlabs/skeleton';
import { onMount } from 'svelte';
import Icon from '@iconify/svelte';
export let parent: SvelteComponent;
import Select from 'svelte-select'; 
import dayjs from "dayjs"
  import utc from 'dayjs/plugin/utc'

  dayjs.extend(utc)

	const modalStore = getModalStore();
	const toastStore=getToastStore()
//   const general=mainStore()
  const counselor=counselorstore()

//   const scourse = [
//   { name: "",  othercourse:false,
//   other_course:"", mode_class: null, branch: [] },
// ];

$:branchdata=[]
let scourse = writable([{ name: null, mode_class: null, branch: [], othercourse: false, other_course: '' }]);
let course = writable([
    {
      mode: [],
      mode_class: null,
      walkin_date: "",
      branch: [],
      actualbranch: [],
      trainer: [],
      trainerbool: false
    },
  ]);

console.log("data",$modalStore[0].userdata.branches)
const addCourse = () => {
    course.update(n => {
      return [
        ...n,
        {
          mode: [],
          mode_class: null,
          walkin_date: "",
          branch: [],
          actualbranch: [],
          trainer: [],
          trainerbool: false
        }
      ];
    });
  };

const removeCourse = () => {
	course.update(courses => {
    if (courses.length === 1) {
      return [
        {
          mode: [],
          mode_class: null,
          walkin_date: "",
          branch: [],
          actualbranch: [],
          trainer: [],
          trainerbool: false
        }
      ];
    } else {
      return courses.slice(0, -1);
    }
  });
};

const addSCourse = () => {
	scourse.update(n => {
      return [
        ...n,
        {
			name: "",
    othercourse:false,
    other_course:"",
    mode_class: null,
    branch: [],
        }
      ];
    });
 
};
const removeSCourse = () => {
	scourse.update(courses => {
    if (courses.length === 1) {
      return [
        {
			name: "",
    othercourse:false,
    other_course:"",
    mode_class: null,
    branch: [],
        }
      ];
    } else {
      return courses.slice(0, -1);
    }
  });
};



  const formState= ({
  id:$modalStore[0].props.id,
  course_enquiries: null,
  course: $course,
  scourse: $scourse,
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

console.log("sfgn",$filter_course)
async function onFormSubmit(): void {
	formState.course = $course
  formState.scourse = $scourse
		let valid = true
  let formValues = JSON.parse(JSON.stringify(formState))
  if (formValues["course_enquiries"] === null ){
    valid = false;
	toastStore.trigger({message:"Regular/Special/Both Course Enquiries is Required!!"});
  }
  if (formValues["course_enquiries"] === 'regular' && formValues["course"][0].course === null){
    valid = false;
	toastStore.trigger({message:"Atleast one Regular course is Required!"})
  }
  if (formValues["course_enquiries"] === 'special' && ((formValues["scourse"][0].name ==null &&formValues["scourse"][0].othercourse===false)|| formValues["scourse"][0].name ==null && formValues["scourse"][0].other_course.length==0 && formValues["scourse"][0].othercourse==true)){
    valid = false;
	toastStore.trigger({message:"Atleast one Special course is Required!"})
  }
  if (formValues["course_enquiries"] === 'both' && formValues["course"][0].course === null){
    valid = false;
	toastStore.trigger({message:"Regular course is Required!"})
  }
  if (formValues["course_enquiries"] === 'both' && ((formValues["scourse"][0].name ==null &&formValues["scourse"][0].othercourse===false)|| formValues["scourse"][0].name ==null && formValues["scourse"][0].other_course.length==0 && formValues["scourse"][0].othercourse==true)){
    valid = false;
	toastStore.trigger({message:"Special course is Required!"})
  }

  for (const key in formValues ) {
	if (key === "course" && formValues["course"][0].course !== null) {
      formValues[key].forEach((element) => {
        if (
          element.course === null || element.mode_class === null
          // || element.agreed_date.length === 0
        ) {
          valid = false;
		  toastStore.trigger({message:"Enter regular course details completely!"})
        }
        if (element.course !== null && element.branch.length === 0) {
          valid = false;
		  toastStore.trigger({message:"Select branch details for regular course enquiry!"})
        }
        if(element.course !== null  &&(element.mode==null||element.mode.length==0)){
          valid = false;
		  toastStore.trigger({message:"Enter mode of enquiry!!"})
        }
        if(element.mode && element.mode.name=='walkin'&&(element.walkin_date==null||element.walkin_date=='')){
          valid = false;
		  toastStore.trigger({message:"Walkin Date is mandatory!!"})
        }
	});
    }

	if (key === "scourse" &&((formValues["scourse"][0].name != null)||(formValues["scourse"][0].other_course&&formValues["scourse"][0].other_course.length != 0))) {
      formValues[key].forEach((element) => {
        // || element.agreed_date.length === 0

        if (
          ((element.name != null||element.other_course.length!=0)&&element.mode_class === null) 
          // || element.agreed_date.length === 0
        ) {
          valid = false;
		  toastStore.trigger({message:"Enter special course details completely!!"})
        }
	});
    }
  }

  if(valid){
	console.log("fbm",formValues)
    //   formLoading = true;
	  if(formValues.course_enquiries === 'regular'){
        formValues.scourse = [];
      }

      if(formValues.course_enquiries === 'special'){
        formValues.course = [];
      }
	  let course_copy = [], scourse_copy = ([]);
      let cr = [], mc = null, br = [],moe=null ,wd=null,tr=null;;
      // ocr = ref([])

      let smc = null, sbr = ([]), sco = (null);
      for (var c in formValues.course) {
        if(formValues.course[c].course && formValues.course[c].course.name){
			cr = [...cr, {name:formValues.course[c].course.name}];
        }
        if(formValues.course[c].mode_class && formValues.course[c].mode_class.id){
          mc = {id:formValues.course[c].mode_class.id, name:formValues.course[c].mode_class.name}
        }
        if(formValues.course[c].mode && formValues.course[c].mode.id){
        moe = {id:formValues.course[c].mode.id, name:formValues.course[c].mode.name}
      }
      if(formValues.course[c].mode && formValues.course[c].mode.name=='walkin' 
       && formValues.course[c].walkin_date!=''){
        wd =   dayjs(formValues.course[c].walkin_date).format("YYYY-MM-DD HH:mm:ss")
      }
 
      if(formValues.course[c].trainer && formValues.course[c].trainer.id){
        tr=({id:formValues.course[c].trainer.id, name:formValues.course[c].trainer.name})
      }

        if(formValues.course[c].branch && formValues.course[c].branch.length > 0){
          for(const inb in formValues.course[c].branch){
			br = [...br, {id:formValues.course[c].branch[inb].id, name:formValues.course[c].branch[inb].name}];

            // br.push({id:formValues.course[c].branch[inb].id, name:formValues.course[c].branch[inb].name})
          }
        }

        if (formValues.course[c].mode_class && formValues.course[c].mode_class.name.toLowerCase() == "both") {
			course_copy = [...course_copy, {course: cr,
          modeofenquiry: moe,
          mode_class: { id: 1, name: "offline" },
          Walkindate: wd,
          branch: br,
          trainer:tr}];

		  course_copy = [...course_copy, {  course: cr,
          modeofenquiry: moe,
          mode_class: { id: 2, name: "online" },
          Walkindate: wd,
          branch: br,
          trainer:tr}]
      
        } else {
			course_copy = [...course_copy, {  course: cr,
          modeofenquiry: moe,
          mode_class: mc,
          Walkindate: wd,
          branch: br,
          trainer:tr}]
        
        }
        cr = [], 
      moe=null,
      wd=null,
      tr=null,
      br = [];
      }

	  for (var sc in formValues.scourse) {
        if(formValues.scourse[sc].mode_class && formValues.scourse[sc].mode_class.id){
          smc = {id:formValues.scourse[sc].mode_class.id, name:formValues.scourse[sc].mode_class.name}
        }
        if(formValues.scourse[sc].name && formValues.scourse[sc].name.id){
        sco = {id:formValues.scourse[sc].name.id, name:formValues.scourse[sc].name.name}
      }
	  if(formValues.scourse[sc].branch && formValues.scourse[sc].branch.length > 0){
          for(const insb in formValues.scourse[sc].branch){
			sbr = [...sbr, {id:formValues.scourse[sc].branch[insb].id, name:formValues.scourse[sc].branch[insb].name}];
            
			// sbr.push({id:formValues.scourse[sc].branch[insb].id, name:formValues.scourse[sc].branch[insb].name})
          }
        }

        if (formValues.scourse[sc].mode_class && formValues.scourse[sc].mode_class.name.toLowerCase() == "both") {
			scourse_copy = [...scourse_copy, { name: sco,
            othercourse:formValues.scourse[sc].othercourse,
          other_course:formValues.scourse[sc].other_course,
            mode_class: { id: 1, name: "offline" },
            // agreed_date: formValues.scourse[sc].agreed_date,
            branch: sbr,}]
			scourse_copy = [...scourse_copy, { name: sco,
            othercourse:formValues.scourse[sc].othercourse,
          other_course:formValues.scourse[sc].other_course,
            mode_class: { id: 2, name: "online" },
            // agreed_date: formValues.scourse[sc].agreed_date,
            branch: sbr,}]
        
        } else {
			scourse_copy = [...scourse_copy, { name: sco,
            othercourse:formValues.scourse[sc].othercourse,
          other_course:formValues.scourse[sc].other_course,
            mode_class: smc,
            // agreed_date: formValues.scourse[sc].agreed_date,
            branch: sbr,}]
        
        }
        sbr = [];
        sco=null;
      }
	  console.log("zdm", $modalStore[0].props)
      let formSubmit = {
      id: $modalStore[0].props.id,
      course: course_copy,
      scourse: scourse_copy,
      // callid:props.update.callid
    }
  let response = await counselor.submitCourse(formSubmit)
  modalStore.close();
  }
  else{
    // formLoading = false;
  // theme.pushMessage("Form Error, please fill out mandatory fields")   
   }
	}

 onMount(async () => {
  await counselor.getfiltercourse();
  await counselor.getcoursebranches();
  await counselor.getModeclass()
  await counselor.getModeEnquiry()
  await counselor.getbranchtrainer()
  await counselor.getspecialcourse()
  await counselor.getdisablebranch()

  
  
 })

 const trainerbranch=(branch,key)=>{
//   return $modalStore[0].userdata.branches.filter(o1 => !branch.some(o2 =>{
// 	if(o1.id === o2.id){
//       c.trainerbool=true
//     }
//   }
//   )) 
const branches = $modalStore[0].userdata.branches;
    const updatedTrainerbool = branches.some(o1 => branch.some(o2 => o1.id === o2.id));
	$course[key].trainerbool=updatedTrainerbool
}

const dis = (data, c,key) => {
  c.trainerbool = false;
  
  const branchdata = $modalStore[0].userdata.branches.filter(o1 => {
	if(c.branch){
    if (o1.id === c.branch.id) {
		$course[key].trainerbool = true;
    }
}
    return $course[key].trainerbool;
  });

  if (!$course[key].trainerbool) {
    $course[key].trainer = null;
  }

  return branchdata;
};
 
const removebranch=(key)=>{
	// console.log("fbn",course[key])
  $course[key].trainer=null
$course[key].branch=[]
$course[key].trainerbool=false
//  course[key].mode_class=[]
}

const check_author_branch = async (name,key) => {
	$coursebranches=[]
		await counselor.getcoursebranches(name);

  if ($modalStore[0].userdata.branches && $modalStore[0].userdata.branches.length == 1) {
    if ($coursebranches.filter(e => e.id === $modalStore[0].userdata.branches[0].id).length > 0) {
      if($course[key]){
		$course[key].branch = $modalStore[0].userdata.branches
      $course[key].trainerbool=true
	  }
    }
    else{
      $course[key].branch = []
    }
  }
  else{ 
    $course[key].branch = []
  }
   // Extract unique branches from courseBranches
   let getCBranches = [];
    if ($coursebranches && $coursebranches.branches) {
      for (let cbr of $coursebranches.branches) {
        let RepeatBranches = true;
        for (let gcbr of getCBranches) {
          if (gcbr && gcbr.id === cbr.branch.id) {
            RepeatBranches = false;
            break;
          }
        }
        if (RepeatBranches) {
          if (cbr && cbr.branch) {
            getCBranches.push({ id: cbr.branch.id, name: cbr.branch.name });
          }
        }
      }
	  $course[key].actualbranch=getCBranches
    branchdata=$course[key].actualbranch
    
    }

};

const clearbranch=(cou,index,data)=>{
  cou.branch=[]
  cou.trainer=null
  cou.trainerbool=false
} 

const resetCourses=()=>{
	course.set([{ course: null, mode: null, mode_class: null, walkin_date: null, trainer: [], trainerbool: false, branch: [], actualbranch: [] }]);
    scourse.set([{ name: null, mode_class: null, branch: [], othercourse: false, other_course: '' }]);
}

console.log("user branchwes",course)
	// Base Classes
	const cBase = 'card p-4 w-full shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold';
	const cButton = 'absolute z-1 btn-icon variant-filled';
	const cForm = 'border border-surface-500 p-4 space-y-4 rounded-container-token';

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
		<!-- Enable for debugging: -->
		<!-- <button class={cButton} on:click={parent.onClose}>✕</button> -->
		<!-- on:click={(course = [{course: null, mode: [], mode_class: null, walkin_date: null,trainer:[],trainerbool:false, branch: [],actualbranch:[]}]) && (scourse = [{name: null, mode_class: null, branch: [],othercourse:false,other_course:''}])}  -->
		<form class="modal-form {cForm}">
			<div class="flex">
			<label class="flex items-center space-x-2">
				<input type="radio" value="regular" class="w-5 h-5 align-middle pl-1 radio radio-info radio-sm" 
				bind:group={formState.course_enquiries}  on:click={resetCourses}/>
				<p>Regular Course Enquiries</p>
			</label>
			<label class="flex items-center space-x-2">
				<input type="radio" value="special" class="w-5 h-5 align-middle pl-1 radio radio-info radio-sm" 
				bind:group={formState.course_enquiries}   on:click={resetCourses} />
				<p>Special Course Enquiries</p>
			</label>
			
			<label class="flex items-center space-x-2">
				<input type="radio" value="both" class="w-5 h-5 align-middle pl-1 radio radio-info radio-sm" 
				bind:group={formState.course_enquiries}   on:click={resetCourses} />
				<p>Both <small class="text-xs">(Regular & Special Course Enquiries) </small></p>
			</label>
		</div>
		
				{#if formState.course_enquiries === 'regular'}
				<div class="bg-transparent">
				<h6 class="text-gray-200 text-base font-medium ">Regular Course Enquiries</h6>
				</div>
				{#each $course as c,i}
				<div class="box-border w-50 p-1 grid xl:grid-cols-4 gap-2 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
						 <Select
						items={$filter_course.courses}
						bind:value={c.course}
						label="name"
						itemId="name"
						class="text-black bg-gray-600"
						--background= "gray transparent"
						--selected-item-color="white"  
						on:clear={() => clearbranch(c)}
						on:change={() => removebranch(i)}
						on:select={() => check_author_branch(c.course?.name, i)}
					/>
					<!-- items={c.actualbranch}  -->
					<Select label="name" itemId="id" 
						 items={branchdata}
						 bind:value={c.branch} 
						 class="text-black"  
						 --background="transparent " 
						 --selected-item-color="white"  
						 --clear-select-color="white"
						 --width="w-full" 
						 multiple
						 on:select={() => trainerbranch(c.branch,i)}
						 on:clear={()=>dis(c.branch,c,i)}
						 on:keydown={()=>dis(c.branch,c)}

						 />
				
						<Select
						items={$mode_class.items}
						bind:value={c.mode_class}						
						label="name"
						itemId="id"	
						class="text-black bg-gray-600"
						--background= "gray transparent"
					--selected-item-color="white"  
						
					/>
					<Select 
					items={$mode_of_enq.items}
					bind:value={c.mode} 
					label="name" itemId="id" 
					class="text-black"  
					--background="transparent " 
					--selected-item-color="white"  
					--width="w-full" 
					on:select={ c.walkin_date=null}
					/>
				
					
				  {#if c.mode && c.mode.name=='walkin'} <label class="label" >
					<!-- <span>Walkin Date</span> -->
					<input class="input" type="datetime-local" bind:value={c.walkin_date} placeholder="Input" step="1" />
				</label>
				 {/if}
				 {#if c.trainerbool===true}
				 <Select
				 items={$branchtrainer}
				 bind:value={c.trainer}
				 label="name"
				 itemId="id"
				 class="text-black bg-gray-600"
				 --background="gray transparent"
				 --selected-item-color="white"  
				
			   />
			   {/if}
			 
       </div>	
					  
		{/each}
		<button type="button" class="btn btn-sm bg-teal-500"   on:click={ addCourse}>
		<Icon icon="mdi:plus" />Add regular course
		</button>

		{#if $course.length>1}
		<button type="button" class="btn btn-sm bg-red-600"   on:click={ removeCourse}>
		<Icon icon="mdi:minus" />Remove regular course
		</button>
		{/if}
				
				{/if}
				{#if formState.course_enquiries === 'special'}
				<div class="bg-transparent">
				<h6 class="text-gray-200 text-base font-medium ">Special Course Enquiries</h6>
				</div>
				{#each $scourse as s,i}
				<div class="box-border w-50 p-1 grid xl:grid-cols-4 gap-2 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
				{#if s.othercourse===false}
				<Select
				items={$special_course.items}
				bind:value={s.name}
				label="name"
				itemId="id"
				class="text-black bg-gray-600"
				--background="gray transparent"
				--selected-item-color="white"  
			   
			    />
			  {/if}
			  
			  <label class="flex items-center space-x-2 box-border w-50 px-1 py-2 border border-gray-300 mb-0 rounded bg-#2c3656" >
				<input type="checkbox" bind:checked={s.othercourse} />
				<!-- <input class="checkbox" type="checkbox" checked  bind:checked={s.othercourse} value=" Other Course"/> -->
				<p> Other Course</p>
			  </label>
				{#if s.othercourse===true}
			   <input class="input" title="Input (text)" type="text" placeholder="input text" bind:value={s.other_course}/>
			  {/if}
			<Select
			items={$branches_min}
			bind:value={s.branch}						
			label="name"
			itemId="id"	
			class="text-black bg-gray-600"
			--background= "gray transparent"
			--selected-item-color="white"  
			multiple
					/>

			<Select
					items={$mode_class.items}
					bind:value={s.mode_class}						
					label="name"
					itemId="id"	
					class="text-black bg-gray-600"
					--background= "gray transparent"
				--selected-item-color="white"  
					
			/>						
		         </div>
		         {/each}
				 <button type="button" class="btn btn-sm bg-teal-500"   on:click={ addSCourse}>
					<Icon icon="mdi:plus" />Add special course
					</button>
			
					{#if $scourse.length>1}
					<button type="button" class="btn btn-sm bg-red-600"   on:click={ removeSCourse}>
						<Icon icon="mdi:minus-box"/>Remove special course
					</button>
		         {/if}
				 {/if}

	
			 {#if formState.course_enquiries === 'both'}
	    <div class="bg-transparent">
		<h6 class="text-gray-200 text-base font-medium ">Regular Course Enquiries</h6>
		</div>
		<div>
		{#each $course as c,i}
		<div class="box-border w-50 p-1 grid xl:grid-cols-4 gap-2 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
				 <Select
				items={$filter_course.courses}
				bind:value={c.course}
				label="name"
				itemId="name"
				class="text-black bg-gray-600"
				--background= "gray transparent"
				--selected-item-color="white"  
				on:clear={() => clearbranch(c)}
				on:change={() => removebranch(i)}
				on:select={() => check_author_branch(c.course?.name, i)}
			/>
			<!-- items={c.actualbranch}  -->
			<Select label="name" itemId="id" 
				 items={branchdata}
				 bind:value={c.branch} 
				 class="text-black"  
				 --background="transparent " 
				 --selected-item-color="white"  
				 --clear-select-color="white"
				 --width="w-full" 
				 multiple
				 on:select={() => trainerbranch(c.branch,i)}
				 on:clear={()=>dis(c.branch,c,i)}
				 on:keydown={()=>dis(c.branch,c)}

				 />
		
				<Select
				items={$mode_class.items}
				bind:value={c.mode_class}						
				label="name"
				itemId="id"	
				class="text-black bg-gray-600"
				--background= "gray transparent"
			--selected-item-color="white"  
				
			/>
			<Select 
			items={$mode_of_enq.items}
			bind:value={c.mode} 
			label="name" itemId="id" 
			class="text-black"  
			--background="transparent " 
			--selected-item-color="white"  
			--width="w-full" 
			on:select={ c.walkin_date=null}
			/>
		
			
		  {#if c.mode && c.mode.name=='walkin'} <label class="label" >
			<!-- <span>Walkin Date</span> -->
			<input class="input" type="datetime-local" bind:value={c.walkin_date} placeholder="Input" step="1" />
		</label>
		 {/if}
		 {#if c.trainerbool===true}
		 <Select
		 items={$branchtrainer}
		 bind:value={c.trainer}
		 label="name"
		 itemId="id"
		 class="text-black bg-gray-600"
		 --background="gray transparent"
		 --selected-item-color="white"  
		
	   />
	   {/if}
	 
        </div>			  
      {/each}
	  <button type="button" class="btn btn-sm bg-teal-500"   on:click={ addCourse}>
		<Icon icon="mdi:plus" />Add regular course
		</button>

		{#if $course.length>1}
		<button type="button" class="btn btn-sm bg-red-600"   on:click={ removeCourse}>
		<Icon icon="mdi:minus" />Remove regular course
		</button>
		{/if}
	</div>
	
	<div class="bg-transparent">
		<h6 class="text-gray-200 text-base font-medium ">Special Course Enquiries</h6>
		</div>
		<div>
			{#each $scourse as s,i}
			<div class="box-border w-50 p-1 grid xl:grid-cols-4 gap-2 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
			{#if s.othercourse===false}
			<Select
			items={$special_course.items}
			bind:value={s.name}
			label="name"
			itemId="id"
			class="text-black bg-gray-600"
			--background="gray transparent"
			--selected-item-color="white"  
		   
			/>
		  {/if}
		  
		  <label class="flex items-center space-x-2 box-border w-50 px-1 py-2 border border-gray-300 mb-0 rounded bg-#2c3656" >
			<input type="checkbox" bind:checked={s.othercourse} />
			<!-- <input class="checkbox" type="checkbox" checked  bind:checked={s.othercourse} value=" Other Course"/> -->
			<p> Other Course</p>
		  </label>
			{#if s.othercourse===true}
		   <input class="input" title="Input (text)" type="text" placeholder="input text" bind:value={s.other_course}/>
		  {/if}
		<Select
		items={$branches_min}
		bind:value={s.branch}						
		label="name"
		itemId="id"	
		class="text-black bg-gray-600"
		--background= "gray transparent"
		--selected-item-color="white"  
		multiple
				/>

		<Select
				items={$mode_class.items}
				bind:value={s.mode_class}						
				label="name"
				itemId="id"	
				class="text-black bg-gray-600"
				--background= "gray transparent"
			--selected-item-color="white"  
				
		/>						
			 </div>
			 {/each} <button type="button" class="btn btn-sm bg-teal-500"   on:click={ addSCourse}>
				<Icon icon="mdi:plus" />Add special course
				</button>
		
				{#if $scourse.length>1}
				<button type="button" class="btn btn-sm bg-red-600"   on:click={ removeSCourse}>
					<Icon icon="mdi:minus-box"/>Remove special course
				</button>
				{/if}
			</div>
             {/if}
       

		</form>
		<!-- prettier-ignore -->
		<footer class="modal-footer {parent.regionFooter}">
			<button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
			<button class="btn {parent.buttonPositive}" on:click={onFormSubmit}>Done</button>
		</footer>
	</div>
{/if}