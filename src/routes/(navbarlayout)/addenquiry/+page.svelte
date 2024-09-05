<!-- <form class="modal-form {cForm}"> -->

<div class="relative">
  {#if formLoading}
<div   class="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
  <ProgressRadial width='w-[4%]'/>
   <h2 class="text-center text-white text-xl font-semibold">Loading...</h2>
   <p class="w-1/3 text-center text-white">This may take a few seconds, please wait.</p>
</div>
{/if}
    <div class="bg-transparent mt-5">
      <h6 class="text-gray-200 text-base font-medium">Personal Information</h6>
      </div>

<div class="box-border w-50 p-1 grid xl:grid-cols-4 gap-2 md:grid-cols-3 sm:grid-cols-2 grid-cols-1" >
      <label class="flex items-center space-x-2 box-border w-50 px-1 py-2  border border-gray-300 mb-0 rounded bg-#2c3656" >
        <input type="checkbox" bind:checked={formState.enq_for_someone}   />
        <p> Enquired for someone</p>
      </label> 
      <label class="flex items-center space-x-2 box-border w-50 px-1 py-2 border border-gray-300 mb-0 rounded bg-#2c3656" >
        <input type="checkbox" bind:checked={formState.experienced} />
        <p> Experienced Enquiry</p>
      </label> 
      {#if formState.enq_for_someone}
      <div  class="box-border w-50 p-2 border-2 border-gray-600 h-[74px] text-sm"> <label class="label">
        <!-- <span>Input</span> -->
        <input type="text" placeholder="Input" bind:value={formState.enquiree_name}  class="input {isFieldEmpty(formState.enquiree_name) ? ' border-red-500' : ''}"/>
    </label></div>
     
    {/if}
    <div  class="box-border w-50 p-2 border-2 border-gray-600 h-[74px] text-sm">
       <label class="label">
        <input type="text" placeholder="Student Name" bind:value={formState.name} 
         class="input {isFieldEmpty(formState.name) ? ' border-red-500' : ''}"/>
    </label></div>
   
      </div>


      <div class="box-border w-50 mt-2 p-1 grid xl:grid-cols-4 gap-2 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
        {#each $contact as con}
        <div class="flex box-border w-50 p-2 border-2 border-gray-600 h-[64px] mt-2 sm:mt-0">
        <span >
       <Select
		items={countryCode}
		bind:value={con.code}
		label="code"
        itemId="code"
        class="text-black bg-gray-600"
        --background= "gray transparent"
        --selected-item-color="white" 
        />
    </span>
    <span><label class="label">
        <input type="number" class="input" bind:value={con.number} placeholder="Student Number"/>
    </label></span>   
       <button type="button" class="btn btn-sm bg-teal-500 rounded-md  "   on:click={ addContact}>
        <Icon icon="mdi:plus" width="18"/>
        </button>

        {#if $contact.length>1}
        <button type="button" class="btn btn-sm bg-red-600"   on:click={ removeContact}>
            <Icon icon="mdi:minus-box"/>
        </button>
        {/if}
      </div>  
    {/each}
    
    {#each $email as mail}     
        <div class="flex box-border w-50 p-2 border-2 border-gray-600 h-[64px] mt-2 sm:mt-0" >
            <label class="label">
                <input class="input" type="email" placeholder="Email" bind:value={mail.email}/>
            </label>
            <button type="button" class="btn btn-sm bg-teal-500 rounded-md  "   on:click={ addemail}>
              <Icon icon="mdi:plus" width="18"/>
              </button>
      
              {#if $email.length>1}
              <button type="button" class="btn btn-sm bg-red-600"   on:click={ removemail}>
                  <Icon icon="mdi:minus-box"/>
              </button>
              {/if}  
        </div>
        {/each}
      </div>

      <div class="box-border w-50 mt-4 p-1 grid xl:grid-cols-5 gap-2 md:grid-cols-4 sm:grid-cols-2 grid-cols-1">
       <div class="box-border w-50 p-2 border-2 border-gray-600"> 
        <Select
		items={$classtimings.items}
		bind:value={formState.class_timing}
		label="name"
        itemId="name"
        class={`text-black bg-gray-600 ${isValid ? 'bg-red-600':''}`}
        --background= "gray transparent"
        --selected-item-color="white" 
        placeholder="Select Class Timings"
      
        />
        {#if isValid}
        <span class="text-sm text-red-500">Class Timings</span>
        {:else}
        <span class="text-sm text-orange-400">Class Timings</span>
        {/if}
     

     </div>
        <div class="box-border w-50 p-2 border-2 border-gray-600">
             <Select
            items={$time_Slots.items}
            bind:value={formState.time_slot}
            label="name"
            itemId="name"
            class="text-black bg-gray-600"
            --background= "gray transparent"
            --selected-item-color="white"
        placeholder="Select Time Slots"
            multiple
            /> 
            <span class="text-sm text-orange-400">Time Slots</span>
        </div>

            <div class="box-border w-50 p-2 border-2 border-gray-600">
                <Select
               items={$highest_degree.items}
               bind:value={educ.highest_degree}
               label="name"
               itemId="name"
               class={`text-black bg-gray-600 ${isValid ? 'border-red-500':''}`}
               --background= "gray transparent"
               --selected-item-color="white" 
        placeholder="Select Highest Degree"
         on:select="{clearhighestdegree}"
               /> 
               {#if isValid}
               <span class="text-sm text-red-500">Highest Degree</span>
               {:else}
               <span class="text-sm text-orange-400">Highest Degree</span>
               {/if}

              </div>

               <div class="box-border w-50 p-2 border-2 border-gray-600">
                <Select
               items={years}
               bind:value={educ.yop}
               class="text-black bg-gray-600"
               --background= "gray transparent"
               --selected-item-color="white" 
               /> 
               <span class="text-sm text-orange-400">Highest degree pass out Year</span></div>
             
       {#if !formState.experienced&& educ.highest_degree &&educ.highest_degree.name!='12th/puc'}
       <div class="box-border w-50 p-2 border-2 border-gray-600 ">
               <label class="flex items-center space-x-2 box-border w-50 px-1 py-2 border border-gray-300 mb-0 rounded bg-#2c3656" >
                <input type="checkbox" bind:checked={formState.data_not_taken} />
                <p> Data not taken</p>
              </label> 
              <p class="text-sm text-orange-400"> Data not taken</p>
            </div>  
              {/if}           
 </div>

 <div class="box-border w-50 mt-4  border border-surface-500 p-4 space-y-4 rounded-container-token">
 <div class="flex">
    <label class="flex items-center space-x-2">
        <input type="radio" value="regular" class="w-5 h-5 align-middle pl-1 radio radio-info radio-sm" 
        bind:group={formState.course_enquiries}   on:click={resetCourses}/>
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
   <!-- {#if c.branch[0]}
   {c.branch[0].name}
   {/if} -->
           
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
    <!-- <Select
    items={$branches_min}
    bind:value={s.branch}						
    label="name"
    itemId="id"	
    class="text-black bg-gray-600"
    --background= "gray transparent"
    --selected-item-color="white"  
    multiple
            /> -->

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
    <p> Other Course</p>
  </label>
    {#if s.othercourse===true}
   <input class="input" title="Input (text)" type="text" placeholder="input text" bind:value={s.other_course}/>
  {/if}
<!-- <Select
items={$branches_min}
bind:value={s.branch}						
label="name"
itemId="id"	
class="text-black bg-gray-600"
--background= "gray transparent"
--selected-item-color="white"  
multiple
        /> -->

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
    </div>

    {#if showDiplomaEducation}
    <div class="bg-transparent" > 
      <h6 class="text-gray-200 text-base font-medium" >Diploma Details</h6>    
      </div>
      <div class="box-border w-50 p-1 grid xl:grid-cols-4 gap-2 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
        {#if educ.other_stream===false}
        <div class="box-border w-50 p-2 border-2 border-gray-600">
        <Select
bind:value={educ.stream_object}
loadOptions={loadOptions} 
label="concatname"
itemId="id"
name="name"
id="stream"
class="text-black bg-gray-600"
--background="gray transparent"
--width="w-full"
--selected-item-color="white"
/>
</div>
{/if}
<div class="box-border w-50 p-2 border-2 border-gray-600">
<label class="flex items-center space-x-2 box-border w-50 px-1 py-2 border border-gray-300 mb-0 rounded bg-#2c3656" >
   <input type="checkbox" bind:checked={educ.other_stream} on:input={changingdiplomastream}/>
        <p>Other Stream</p>
 </label> 
</div>
 {#if educ.other_stream===true}
 <div class="box-border w-50 p-2 border-2 border-gray-600">
 <label class="label">
  <input class="input" type="text" placeholder="Stream Name" bind:value={educ.otherstream}/>
</label>
</div>
 {/if}

 {#if educ.other_college===false}
 <div class="box-border w-50 p-2 border-2 border-gray-600">
 <Select
 bind:value={educ.college_object}
 loadOptions={collegeloadOptions} 
 label="concatname"
 itemId="id"
 name="name"
 id="stream"
 class="text-black bg-gray-600"
 --background="gray transparent"
 --width="w-full"
 --selected-item-color="white"
 />
 </div>
 {/if}
<div class="box-border w-50 p-2 border-2 border-gray-600">
 <label class="flex items-center space-x-2 box-border w-50 px-1 py-2 border border-gray-300 mb-0 rounded bg-#2c3656" >
  <input type="checkbox" bind:checked={educ.other_college} on:input={changingdiplomacollege}/>
       <p>Other College</p>
</label>
</div>

{#if educ.other_college===true}
<div  class="box-border w-50 p-2 border-2 border-gray-600">
<label class="label">
 <input class="input" type="text" placeholder="College Name" bind:value={educ.othercollege}/>
</label>
</div>
{/if}

<div  class="box-border w-50 p-2 border-2 border-gray-600">
<div class="flex" >
  <label class="flex items-center space-x-2">
      <input type="radio" value="true" class="w-5 h-5 align-middle pl-1 radio radio-info radio-sm" 
      bind:group={educ.percentage} />
      <p>60% or Greater than 60%</p>
  </label>
  <label class="flex items-center space-x-2">
      <input type="radio" value="false" class="w-5 h-5 align-middle pl-1 radio radio-info radio-sm" 
      bind:group={educ.percentage}  />
      <p>Less than 60%</p>
  </label>
  </div>
</div>
   </div>
 {/if}  


 {#if showItiEducation}
 <div class="bg-transparent" > 
  <h6 class="text-gray-200 text-base font-medium" >ITI Details</h6>    
  </div>

  <div class="box-border w-50 p-1 grid xl:grid-cols-4 gap-2 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
    {#if educ.other_stream===false}
    <div class="box-border w-50 p-2 border-2 border-gray-600">
    <Select
bind:value={educ.stream_object}
loadOptions={loadOptions} 
label="concatname"
itemId="id"
name="name"
id="stream"
class="text-black bg-gray-600"
--background="gray transparent"
--width="w-full"
--selected-item-color="white"
/>
</div>
{/if}
<div class="box-border w-50 p-2 border-2 border-gray-600">
<label class="flex items-center space-x-2 box-border w-50 px-1 py-2 border border-gray-300 mb-0 rounded bg-#2c3656" >
<input type="checkbox" bind:checked={educ.other_stream} on:input={changingitistream}/>
    <p>Other Stream</p>
</label> 
</div>
{#if educ.other_stream===true}
<div class="box-border w-50 p-2 border-2 border-gray-600">
<label class="label">
<input class="input" type="text" placeholder="Stream Name" bind:value={educ.otherstream}/>
</label>
</div>
{/if}

{#if educ.other_college===false}
<div class="box-border w-50 p-2 border-2 border-gray-600">
<Select
bind:value={educ.college_object}
loadOptions={collegeloadOptions} 
label="concatname"
itemId="id"
name="name"
id="stream"
class="text-black bg-gray-600"
--background="gray transparent"
--width="w-full"
--selected-item-color="white"
/>
</div>
{/if}
<div class="box-border w-50 p-2 border-2 border-gray-600">
<label class="flex items-center space-x-2 box-border w-50 px-1 py-2 border border-gray-300 mb-0 rounded bg-#2c3656" >
<input type="checkbox" bind:checked={educ.other_college} on:input={changingiticollege}/>
   <p>Other College</p>
</label>
</div>

{#if educ.other_college===true}
<div  class="box-border w-50 p-2 border-2 border-gray-600">
<label class="label">
<input class="input" type="text" placeholder="College Name" bind:value={educ.othercollege}/>
</label>
</div>
{/if}

<div  class="box-border w-50 p-2 border-2 border-gray-600">
<div class="flex" >
<label class="flex items-center space-x-2">
  <input type="radio" value="true" class="w-5 h-5 align-middle pl-1 radio radio-info radio-sm" 
  bind:group={educ.percentage} />
  <p>60% or Greater than 60%</p>
</label>
<label class="flex items-center space-x-2">
  <input type="radio" value="false" class="w-5 h-5 align-middle pl-1 radio radio-info radio-sm" 
  bind:group={educ.percentage}  />
  <p>Less than 60%</p>
</label>
</div>
</div>
</div>
 {/if}

 {#if showDegreeEducation }
 <div class="bg-transparent" > 
  <h6 class="text-gray-200 text-base font-medium" >Degree Details</h6>    
  </div>

  <div class="box-border w-50 p-1 grid xl:grid-cols-4 gap-2 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
  {#if educ.other_degree===false}
  <Select
  loadOptions={degree} 
  bind:value={educ.name}
on:select={fetchDegreeStream}
  label="concatname"
  itemId="id"
  name="name"
  id="stream"
  class="text-black bg-gray-600"
  --background="gray transparent"
  --width="w-full"
  --selected-item-color="white"
  />
  {/if}

<div class="box-border w-50 p-2 border-2 border-gray-600">
  <label class="flex items-center space-x-2 box-border w-50 px-1 py-2 border border-gray-300 mb-0 rounded bg-#2c3656" >
  <input type="checkbox" bind:checked={educ.other_degree} on:input={changingdegreename}/>
     <p>Other Degree</p>
  </label>
  </div>

    {#if educ.other_degree===true}
<div  class="box-border w-50 p-2 border-2 border-gray-600">
<label class="label">
<input class="input" type="text" placeholder="Degree Name" bind:value={educ.otherdegree}/>
</label>
</div>
{/if}

    {#if educ.other_stream===false}
 <div class="box-border w-50 p-2 border-2 border-gray-600">
  <Select
bind:value={educ.stream_object}
items={StreamItems}
label="concatname"
itemId="id"
name="name"
id="stream"
class="text-black bg-gray-600"
--background="gray transparent"
--width="w-full"
--selected-item-color="white"
/>
</div>
{/if}
{#if show_degreetype===false}
<div class="box-border w-50 p-2 border-2 border-gray-600">
  <label class="flex items-center space-x-2 box-border w-50 px-1 py-2 border border-gray-300 mb-0 rounded bg-#2c3656" >
  <input type="checkbox" bind:checked={educ.other_stream} on:input={changingdegreestream}/>
     <p>Other Stream</p>
  </label>
  </div>
{/if}

{#if educ.other_stream===true}
<div class="box-border w-50 p-2 border-2 border-gray-600">
<label class="label">
<input class="input" type="text" placeholder="Stream Name" bind:value={educ.otherstream}/>
</label>
</div>
{/if}

{#if educ.other_college===false}
<div class="box-border w-50 p-2 border-2 border-gray-600">
<Select
bind:value={educ.college_object}
loadOptions={collegeloadOptions} 
label="concatname"
itemId="id"
name="name"
id="stream"
class="text-black bg-gray-600"
--background="gray transparent"
--width="w-full"
--selected-item-color="white"
/>
</div>
{/if}
<div class="box-border w-50 p-2 border-2 border-gray-600">
<label class="flex items-center space-x-2 box-border w-50 px-1 py-2 border border-gray-300 mb-0 rounded bg-#2c3656" >
<input type="checkbox" bind:checked={educ.other_college} on:input={changingdegreecollege}/>
   <p>Other College</p>
</label>
</div>

{#if educ.other_college===true}
<div  class="box-border w-50 p-2 border-2 border-gray-600">
<label class="label">
<input class="input" type="text" placeholder="College Name" bind:value={educ.othercollege}/>
</label>
</div>
{/if}

<div  class="box-border w-50 p-2 border-2 border-gray-600">
<div class="flex" >
<label class="flex items-center space-x-2">
  <input type="radio" value="true" class="w-5 h-5 align-middle pl-1 radio radio-info radio-sm" 
  bind:group={educ.percentage} />
  <p>60% or Greater than 60%</p>
</label>
<label class="flex items-center space-x-2">
  <input type="radio" value="false" class="w-5 h-5 align-middle pl-1 radio radio-info radio-sm" 
  bind:group={educ.percentage}  />
  <p>Less than 60%</p>
</label>
</div>
</div>
</div>
 {/if}

 {#if showMastersEducation}
 <div class="bg-transparent" > 
  <h6 class="text-gray-200 text-base font-medium" >Masters Details</h6>    
  </div>


  <div class="box-border w-50 p-1 grid xl:grid-cols-4 gap-2 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
    {#if educ.other_degree===false}
    <Select
    loadOptions={masters} 
    bind:value={educ.name}
  on:select={fetchDegreeStream}
    label="concatname"
    itemId="id"
    name="name"
    id="stream"
    class="text-black bg-gray-600"
    --background="gray transparent"
    --width="w-full"
    --selected-item-color="white"
    />
    {/if}
  
    <div class="box-border w-50 p-2 border-2 border-gray-600">
      <label class="flex items-center space-x-2 box-border w-50 px-1 py-2 border border-gray-300 mb-0 rounded bg-#2c3656" >
      <input type="checkbox" bind:checked={educ.other_degree} on:input={changingmastersname}/>
         <p>Other Masters</p>
      </label>
      </div>
  
      {#if educ.other_degree===true}
  <div  class="box-border w-50 p-2 border-2 border-gray-600">
  <label class="label">
  <input class="input" type="text" placeholder="Degree Name" bind:value={educ.otherdegree}/>
  </label>
  </div>
  {/if}
  
      {#if educ.other_stream===false}
   <div class="box-border w-50 p-2 border-2 border-gray-600">
    <Select
  bind:value={educ.stream_object}
  items={StreamItems}
  label="concatname"
  itemId="id"
  name="name"
  id="stream"
  class="text-black bg-gray-600"
  --background="gray transparent"
  --width="w-full"
  --selected-item-color="white"
  />
  </div>
  {/if}
  {#if show_mastertype===false}
  <div class="box-border w-50 p-2 border-2 border-gray-600">
    <label class="flex items-center space-x-2 box-border w-50 px-1 py-2 border border-gray-300 mb-0 rounded bg-#2c3656" >
    <input type="checkbox" bind:checked={educ.other_stream} on:input={changingmastersstream}/>
       <p>Other Stream</p>
    </label>
    </div>
  {/if}

  {#if educ.other_stream===true}
  <div class="box-border w-50 p-2 border-2 border-gray-600">
  <label class="label">
  <input class="input" type="text" placeholder="Stream Name" bind:value={educ.otherstream}/>
  </label>
  </div>
  {/if}
  
  {#if educ.other_college===false}
  <div class="box-border w-50 p-2 border-2 border-gray-600">
  <Select
  bind:value={educ.college_object}
  loadOptions={collegeloadOptions} 
  label="concatname"
  itemId="id"
  name="name"
  id="stream"
  class="text-black bg-gray-600"
  --background="gray transparent"
  --width="w-full"
  --selected-item-color="white"
  />
  </div>
  {/if}
  <div class="box-border w-50 p-2 border-2 border-gray-600">
  <label class="flex items-center space-x-2 box-border w-50 px-1 py-2 border border-gray-300 mb-0 rounded bg-#2c3656" >
  <input type="checkbox" bind:checked={educ.other_college} on:input={changingmasterscollege}/>
     <p>Other College</p>
  </label>
  </div>
  
  {#if educ.other_college===true}
  <div  class="box-border w-50 p-2 border-2 border-gray-600">
  <label class="label">
  <input class="input" type="text" placeholder="College Name" bind:value={educ.othercollege}/>
  </label>
  </div>
  {/if}
  
  <div  class="box-border w-50 p-2 border-2 border-gray-600">
  <div class="flex" >
  <label class="flex items-center space-x-2">
    <input type="radio" value="true" class="w-5 h-5 align-middle pl-1 radio radio-info radio-sm" 
    bind:group={educ.percentage} />
    <p>60% or Greater than 60%</p>
  </label>
  <label class="flex items-center space-x-2">
    <input type="radio" value="false" class="w-5 h-5 align-middle pl-1 radio radio-info radio-sm" 
    bind:group={educ.percentage}  />
    <p>Less than 60%</p>
  </label>
  </div>
  </div>
  </div>
 {/if}

 <div>
 <div class="bg-transparent" > 
  <h6 class="text-gray-200 text-base font-medium" >Referrals</h6>    
  </div>
  {#each $refer as refe}
  <div class="p-2 mt-2 sm:mt-0 flex space-x-3">

    <span class="box-border w-50 p-2 border-2 border-gray-600 h-[64px] mt-2 sm:mt-0">
      <label class="label">
       <input class="input" type="text" placeholder="Name" bind:value={refe.referee_name}/>
   </label>
  </span>
 <div class="flex box-border w-50 p-2 border-2 border-gray-600 h-[64px] mt-2 sm:mt-0">
  
  <span >
  <Select
  items={countryCode}
  bind:value={refe.referee_code}
  label="code"
  itemId="code"
  class="text-black bg-gray-600"
  --background= "gray transparent"
  --selected-item-color="white" 
  />
  </span>
  <span>
  
      {#if refe.referee_code==+91}
      <label class="label">
        <input type="number" class="input" bind:value={refe.referee_number} placeholder="Student Number"/>
      </label>
      {:else}
      <label class="label">
        <input type="number" class="input" bind:value={refe.referee_number} placeholder="Student Number"/>
      </label>
      {/if}
  </span>   
  </div> 
 </div>
 {/each }
 <button type="button" class="btn btn-sm bg-teal-500 rounded-md  "    on:click={ addRefer}>
  <Icon icon="mdi:plus" width="10"/>
  Add referral
  </button>

  {#if $refer.length>1}
  <button type="button" class="btn btn-sm bg-red-600"   on:click={ removeRefer}>
      <Icon icon="mdi:minus-box"/>
      Remove referral
  </button>
  {/if}
</div>
<div>
  <span class="mt-3">
    <span>Comments</span>
  <label>
  <textarea bind:value={formState.comment} placeholder="Comments...." class="bg-gray-600 bg-transparent mt-2"/>
</label>
</span>
</div>
<button type="button" class="btn btn-sm bg-blue-600 rounded-md"   on:click={ submit}>
  <!-- <Icon icon="mdi:minus-box"/> -->
 Submit
</button>
</div>


<!-- </form> -->
<script lang="ts">
  import dayjs from "dayjs"
  import utc from 'dayjs/plugin/utc'
  import { writable ,readable} from 'svelte/store';
  import Select from 'svelte-select'; 
  import Icon from '@iconify/svelte';
  import {counselorstore,classtimings,
    submit_enq,streams_data,degreedata,time_Slots,highest_degree,coursebranches,filter_course,branches_min,special_course,mode_class,mode_of_enq,branchtrainer} from '../../../stores/counselor'
import { onMount } from 'svelte';
import { ProgressRadial} from '@skeletonlabs/skeleton';
import { createEventDispatcher } from 'svelte';
import { Toast, getToastStore } from '@skeletonlabs/skeleton';
import { goto } from '$app/navigation';

// Create an event dispatcher
const dispatch = createEventDispatcher();
  export let data;
  const counselor=counselorstore()
	const toastStore=getToastStore()
  const countryCode =  [{"code":"+91"},
  {"code":"+97"},
  {"code":"+968"},
  {"code":"+1"},
  {"code":"+355"},
  {"code":"+61"},
  {"code":"+93"},
  {"code":"+376"},
  {"code":"+1684"},
  {"code":"+244"},
  {"code":"+1264"},
  {"code":"+1268"},
  {"code":"+54"},
  {"code":"+374"},
  {"code":"+297"},
  {"code":"+43"},
  {"code":"+994"},
  {"code":"+1242"},
  {"code":"+973"},
  {"code":"+880"},
  {"code":"+1246"},
  {"code":"+375"},
  {"code":"+32"},
  {"code":"+501"},
  {"code":"+229"},
  {"code":"+1441"},
  {"code":"+975"},
  {"code":"+591"},
  {"code":"+387"},
  {"code":"+267"},
  {"code":"+55"},
  {"code":"+246"},
  {"code":"+673"},
  {"code":"+1284"},
  {"code":"+226"},
  {"code":"+257"},
  {"code":"+855"},
  {"code":"+237"},
  {"code":"+238"},
  {"code":"+599"},
  {"code":"+1345"},
  {"code":"+236"},
  {"code":"+235"},
  {"code":"+56"},
  {"code":"+86"},
  {"code":"+57"},
  {"code":"+269"},
  {"code":"+977"},
  {"code":"+0046"},
  {"code":"+256"},
  {"code":"+64"},
  {"code":"+44"},
  {"code":"+47"},
  {"code":"+49"},];

// $:branchdata=[]
let branchdata=[]
let formLoading=false
  $: years = [...Array(30)].map((a, b) => (new Date().getFullYear() + 2) - b);
let scourse = writable([{ name: null, mode_class: null, branch: [], othercourse: false, other_course: '' }]);
let course = writable([
    {
      course: null,
    mode: [],
    mode_class: null,
    walkin_date: "",
    time:{
      hours:"",
      minutes:"",
      seconds:"",
      type:''
    },
    branch: [],
    actualbranch:[],
    trainer:[],
    trainerbool:false
    },
  ]);
const contact =writable ([
  { number: null, code: countryCode[0].code, readonly: false },
]);
const email = writable([{ email: "" }]);

let educ={
  stream_object:null,
  other_stream:false,
  otherstream:null,
  college_object:null,
  other_college:false,
  othercollege:null,
  percentage:null,
  other_degree:false,
  otherdegree:null,
  highest_degree:null,
  yop:''
}

let refer = writable([
  { referee_name: "", referee_code: countryCode[0].code, referee_number: "", author:data.author },
]);
  const formState = ({
  name: "",
  enq_for_someone: false,
  enquiree_name: "",
  experienced: false,
  mode: null,
  contact: contact,
  email: email,
  // flexi_timing: null,
  course_enquiries: null,
  class_timing: null,
  time_slot: [],
  data_not_taken: false,
  course: course,
  scourse: scourse,
  education: null,
  refer: refer,
  comment: "",
});

// $:refer={
//   referee_name: "", referee_code: countryCode[0].code, referee_number: "", author:data.author
// }
const addRefer=()=>{
  refer.update(n => {
      return [
        ...n,
        {
          referee_name: "", referee_code: countryCode[0].code, referee_number: "", author:data.author 
        }
      ];
    });
}
const removeRefer=()=>{
  refer.update(refe => {
    if (refe.length === 1) {
      return [
        {
          referee_name: "", 
          referee_code: countryCode[0].code, 
          referee_number: "",
           author:data.author 
        }
      ];
    } else {
      return refe.slice(0, -1);
    }
  }); 
}
const addContact = () => {
  contact.update(n => {
      return [
        ...n,
        {
          number: null,
    code: countryCode[0].code,
    readonly: false,
        }
      ];
    });
};

const removeContact = () => {
  contact.update(con => {
    if (con.length === 1) {
      return [
        {
          number: null,
    code: countryCode[0].code,
    readonly: false,
        }
      ];
    } else {
      return con.slice(0, -1);
    }
  });
};


const addemail=()=>{
  email.update(n => {
      return [
        ...n,
        { email: "" }
      ];
    });
}

const removemail=()=>{
  email.update(mail => {
    if (mail.length === 1) {
      return [
        { email: "" }
      ];
    } else {
      return mail.slice(0, -1);
    }
  });
}

const addCourse = () => {
    course.update(n => {
      return [
        ...n,
        {
          course: null,
    mode: [],
    mode_class: null,
    walkin_date: "",
    time:{
      hours:"",
      minutes:"",
      seconds:"",
      type:''
    },
    branch: [],
    actualbranch:[],
    trainer:[],
    trainerbool:false
        }
      ];
    });
  };

const removeCourse = () => {
	course.update(courses => {
    if (courses.length === 1) {
      return [
        {
          course: null,
    mode: [],
    mode_class: null,
    walkin_date: "",
    time:{
      hours:"",
      minutes:"",
      seconds:"",
      type:''
    },
    branch: [],
    actualbranch:[],
    trainer:[],
    trainerbool:false
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

const checkString = (text) => {
  var letters = /^[a-zA-Z\s]*$/;
  if (text.match(letters)) {
    return true;
  } else {
    return false;
  }
};

const trainerbranch=(branch,key)=>{
const branches =data.branches;
const updatedTrainerbool = branches.some(o1 => branch.some(o2 => o1.id === o2.id));
	$course[key].trainerbool=updatedTrainerbool
}

const dis = (data, c,key) => {
  c.trainerbool = false;
  if(data &&data.branches){
    const branchdata =data.branches.filter(o1 => {
	if(c.branch){
    if (o1.id === c.branch.id) {
		$course[key].trainerbool = true;
    }
}
    return $course[key].trainerbool;
  });

  }

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
  if (data.branches && data.branches.length == 1) {
    if ($coursebranches.branches.filter(e => e.id === data.branches[0].id).length > 0) {
      if($course[key]){
		$course[key].branch =data.branches
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

const resetCourses = () => {
  course.set([{
      course: null,
      mode: [],
      mode_class: null,
      walkin_date: "",
      time: {
        hours: "",
        minutes: "",
        seconds: "",
        type: ''
      },
      branch: [],
      actualbranch: [],
      trainer: [],
      trainerbool: false
    }]);
    scourse.set([{
      name: null,
      mode_class: null,
      branch: [],
      othercourse: false,
      other_course: ''
    }]);
};

let showDiplomaEducation=false
$: {
    // Reset educ properties specific to diploma education
    formState.education = Object.assign({}, formState.education, {
      name: null,
      percentage: null,
      stream_object: null,
      other_stream: false,
      otherstream: "",
      college_object: null,
      other_college: false,
      othercollege: "",
  });
    // Compute 'showDiplomaEducation' based on conditions
    showDiplomaEducation = !formState.experienced &&
                           !formState.data_not_taken &&
                           educ.highest_degree &&
                          educ.highest_degree.name === "diploma";
  }

let showItiEducation=false
$: {
    // Reset educ properties specific to diploma education
    formState.education = {
      ...formState.education,
      name: null,
      percentage: null,
      stream_object: null,
      other_stream: false,
      otherstream: "",
      college_object: null,
      other_college: false,
      othercollege: "",
    };
    // Compute 'showDiplomaEducation' based on conditions
    showItiEducation = !formState.experienced &&
                           !formState.data_not_taken &&
                          educ.highest_degree &&
                          educ.highest_degree.name === "iti";
  }


let showDegreeEducation=false
$: {
    // Reset educ properties specific to diploma education
    formState.education = {
      ...formState.education,
      name: null,
      percentage: null,
      stream_object: null,
      other_stream: false,
      otherstream: "",
      college_object: null,
      other_college: false,
      othercollege: "",
     
    };
    // Compute 'showDiplomaEducation' based on conditions
    showDegreeEducation = !formState.experienced &&
                           !formState.data_not_taken &&
                          educ.highest_degree &&
                          educ.highest_degree.name === "degree";
  }

  let showMastersEducation=false
$: {
    // Reset educ properties specific to diploma education
    formState.education = {
      ...formState.education,
      name: null,
      percentage: null,
      stream_object: null,
      other_stream: false,
      otherstream: "",
      college_object: null,
      other_college: false,
      othercollege: "",
    };
    // Compute 'showDiplomaEducation' based on conditions
    showMastersEducation = !formState.experienced &&
                           !formState.data_not_taken &&
                          educ.highest_degree &&
                          educ.highest_degree.name === "masters";
  }


const cForm = 'border border-surface-500   rounded-container-token';
onMount(async () => {
await counselor.getclasstimings()
await counselor.gettimeslots()
await counselor.gethighestdegree()
await counselor.getfiltercourse();
  await counselor.getcoursebranches();
  await counselor.getModeclass()
  await counselor.getModeEnquiry()
  await counselor.getbranchtrainer()
  await counselor.getspecialcourse()
  await counselor.getdisablebranch()
  await counselor.getdegree();

 
})

async function loadOptions(filterText) {
    return await filterstream(filterText);
  }

  async function collegeloadOptions(filtertext){
    return await filtercollege(filtertext);
  }
async function filterstream(filterText) {
  let query = `name=${filterText}&type=${educ.highest_degree.id}`;
  const response = await counselor.getStreams(query);
  let streams = response.items; 
  return streams.map(strm => ({
    id: strm.id,
    concatname: `${strm.name} - ${strm.shortname}`,
    name: strm.name,
    shortname: strm.shortname,
  }));
}

async function filtercollege(filtertext){
  let query = `name=${filtertext}&type=${educ.highest_degree.id}`;
  const response = await counselor.getColleges(query);
  let college = response.items; 
  return college.map(strm => ({
    id: strm.id,
    concatname: `${strm.name} - ${strm.shortname}`,
    name: strm.name,
    shortname: strm.shortname,
  }));
}

const changingdiplomastream = async () => {
  formState.education=educ
if(formState.education.highest_degree.name==="diploma"){
  formState.education.stream_object=null
  formState.education.otherstream=""
}
};

const changingdiplomacollege = async () => {
  formState.education=educ
if(formState.education.highest_degree.name==="diploma"){
  formState.education.college_object=null
  formState.education.othercollege=""
}

};


const changingitistream = async () => {
  formState.education=educ
if(formState.education.highest_degree.name==="iti"){
 educ.stream_object=null
 educ.otherstream=""
}

};
const changingiticollege = async () => {
  formState.education=educ
if(formState.education.highest_degree.name==="iti"){
  formState.education.college_object=null
  formState.education.othercollege=""
}

};

let show_degreetype = (false)

const changingdegreename = async () => {
  formState.education=educ
  if(formState.education.highest_degree.name==="degree"){
    console.log("adfn",formState.education,formState.education.other_degree)
    formState.education.name=null
    formState.education.otherdegree=""
    formState.education.stream_object=null
    formState.education.otherstream=""
    if(formState.education.other_degree===false){
        formState.education.other_stream = true
        show_degreetype=true
      }
      else{
        formState.education.other_stream = false
        show_degreetype=false
      }
  }
  }
  


const changingdegreestream = async () => {
  formState.education=educ
if(formState.education.highest_degree.name==="degree"){
  formState.education.stream_object=null
  formState.education.otherstream=""
}

};
const changingdegreecollege = async () => {
  formState.education=educ
if(formState.education.highest_degree.name==="degree"){
  formState.education.college_object=null
  formState.education.othercollege=""
}
};

let show_mastertype = (false)

const changingmastersname = async () => {
  formState.education=educ
  if(formState.education.highest_degree.name==="masters"){
    formState.education.name=null
    formState.education.otherdegree=""
    formState.education.stream_object=null
    formState.education.otherstream=""
    if(formState.education.other_degree===false){
        formState.education.other_stream = true
        show_mastertype=true
      }
      else{
        formState.education.other_stream = false
        show_mastertype=false
      }
  }

};

const changingmastersstream = async () => {
  formState.education=educ
if(formState.education.highest_degree.name==="masters"){
  formState.education.stream_object=null
  formState.education.otherstream=""
}

};
const changingmasterscollege = async () => {
  formState.education=educ
if(formState.education.highest_degree.name==="masters"){
  formState.education.college_object=null
  formState.education.othercollege=""
}

};

let StreamItems=null
const fetchDegreeStream=async()=>{
  let query = "name=&degree=" +  educ.name.id
 const stream= await counselor.getStreams(query);
 if(stream && stream.items){
     StreamItems = [];
    stream.items.forEach(stream =>{
    StreamItems.push({id:stream.id,concatname:stream.name+"-"+stream.shortname,name:stream.name,shortname:stream.shortname})
  })
  }
}

const masters = async() => {
  let MasterItems = [];
  console.log("sdgm",$degreedata)
  $degreedata.items.filter(deg =>{
    if(deg.details.qualification_type && deg.details.qualification_type.name === 'masters'){
      MasterItems.push({id:deg.id,concatname:deg.name+"-"+deg.details.shortname,name:deg.name,shortname:deg.details.shortname})
    }
  })
  return MasterItems;
};

const degree = async() => {
  let DegreeItems = [];
  console.log("sdgm",$degreedata)
  $degreedata.items.filter(deg =>{
    if(deg.details.qualification_type && deg.details.qualification_type.name === 'degree'){
      DegreeItems.push({id:deg.id,concatname:deg.name+"-"+deg.details.shortname,name:deg.name,shortname:deg.details.shortname})
    }
  })
  return DegreeItems;
};

const submit=async()=>{
  formState.contact = $contact;
  formState.email = $email;
  refer.subscribe(value => {
    formState.refer = value;
  });
  formState.course = $course;
  formState.scourse = $scourse;

  let formattedDate=null
let formattedTime=null
let valid = true;
formState.education = educ
  
  // formState.education={...educ,formState.education}
  let formValues = JSON.parse(JSON.stringify(formState));
console.log("sgm",formState.education)
  if (formValues["course_enquiries"] === null ){
    valid = false;
    toastStore.trigger( {message: 'Regular/Special/Both Course Enquiries is Required!!'});
  }
  if (formValues["course_enquiries"] === 'regular' && formValues["course"][0].course === null){
    valid = false;
    toastStore.trigger( {message: 'Atleast one Regular course is Required!'});
  }

  if (formValues["course_enquiries"] === 'special'&& (((formValues["scourse"][0].name ===null||formValues["scourse"][0].name.length==0) &&formValues["scourse"][0].othercourse===false)|| formValues["scourse"][0].name ==null && formValues["scourse"][0].other_course.length==0 && formValues["scourse"][0].othercourse==true)){
    valid = false;
    toastStore.trigger( {message: 'Atleast one Special course is Required!'});
  }
  if (formValues["course_enquiries"] === 'both' && formValues["course"][0].course === null){
    valid = false;
    toastStore.trigger( {message: 'Regular course is Required!'});
  }
  if (formValues["course_enquiries"] === 'both' && ((formValues["scourse"][0].name =='' &&formValues["scourse"][0].othercourse===false)|| formValues["scourse"][0].name ==null && formValues["scourse"][0].other_course.length==0 && formValues["scourse"][0].othercourse==true)){
    valid = false;
    toastStore.trigger( {message: 'Special course is Required!'});
  }

  var valueArr = formValues.contact.map(function(item){ 
     var numberStr = item.number ? item.number.toString() : '';
     return numberStr.replace(/\s+/g, "");
  });
var isDuplicate = valueArr.some(function(item, idx){ 
  if(item){
    return valueArr.indexOf(item) != idx 
  }
  });
  if(isDuplicate==true){
    valid=false
    toastStore.trigger( {message: 'Number Already exists!'});
  }
  var valueArr = formValues.email.map(function(item){
     return item.email.replace(/\s+/g, "") });
   var isEmailDuplicate = valueArr.some(function(item, idx){ 
    if(item){
      return valueArr.indexOf(item) != idx 
    }
      });
      if(isEmailDuplicate==true){
        valid= false
        toastStore.trigger( {message: 'Email is Already exists!'});
    }

 for (const key in formValues) {
    if (
      key === "name" &&
      (formValues[key].length <3 || !checkString(formValues[key])||!/\S/.test(formValues[key]))
    ) {
      valid = false;
      toastStore.trigger( {message: 'Student Name is not valid!'});
    }
    if (
      key === "enquiree_name" &&
      formValues["enq_for_someone"] &&
      (formValues[key].length <3 || !checkString(formValues[key])||!/\S/.test(formValues[key]))
    ) {
      valid = false;
      toastStore.trigger( {message: 'Enquiree name is not valid!'});
    }
    if (key === "contact") {
      formValues[key].forEach((element) => {
        let num = element.number ? element.number.toString() : '';
        num.replace(/\s+/g, "");
  console.log("sdfm",element)
        // let num = element.number.replace(/\s+/g, "");
       if(element.number ==null){
        valid = false;
      toastStore.trigger( {message: 'Contact number is required!'});
       }
       console.log("adfn",num.length!=10,element)
        if(element.code.code == +91 && (num.length !=10 ||isNaN(num))){
          valid = false;
      toastStore.trigger( {message: 'Contact number with valid number is required!'});
        }
        if (element.code.code != +91 && (!num.length || isNaN(num)) ){
          valid = false;
      toastStore.trigger( {message: 'Contact number with valid number is required'});
        }
        if (element.code.code === null) {
          valid = false;
      toastStore.trigger( {message: 'Country Code with contact number is required!'});
        }
      });
    }
    if (key === "email") {
      formValues[key].forEach((element) => {
        // if (formValues["enq_for_someone"] ==false ||element.email!='') {
          if (new RegExp("[\s]").test(element.email)&&!validator.validate(element.email)) {
            valid = false;
      toastStore.trigger( {message: 'Email with valid ID is required!'});
          }
        
      });
    }
    if (key === "class_timing" &&formValues[key] === null ) {
      valid = false;
     toastStore.trigger( {message: "Class timing is required!"});
    }

    if (key === "education" &&(formValues[key]["yop"]&& formValues[key]["yop"].length === 0)&&!formValues["experienced"]) {
      if (!formValues["experienced"]) {
        valid = false;
       toastStore.trigger( {message: "Highest degree pass out Year is required!"});
      }
    }

 if (key === "course" && formValues["course"][0].course !== null) {
  console.log("cominh",formValues)
      formValues[key].forEach((element) => {
        if (
          (element.course !== null && element.mode_class === null) 
        ) {
        
          valid = false;
         toastStore.trigger( {message: "Enter regular course details completely!!"});
        }
        console.log("sfm",formValues.course)
        if (element.course !== null && element.branch.length === 0) {
          valid = false;
         toastStore.trigger( {message: "Select branch details for regular course enquiry!"});
        }
        if(element.course !== null &&(element.mode==null||element.mode.length==0)){
          valid = false;
         toastStore.trigger( {message: "Enter mode of enquiry!!"});
        }

        if(element.mode && element.mode.name=='walkin'&&(element.walkin_date==null||element.walkin_date=='')){
          valid = false;
         toastStore.trigger( {message: "Walkin Date is mandatory!!"});
        }
        console.log("dkfm",formValues)
        if(element.mode && element.mode.name=='walkin'&&element.walkin_date!=null&&
        (element.time.hours==null||element.time.minutes==null||element.time.type==null)){
          valid = false;
         toastStore.trigger( {message: "Walkin Time is mandatory!!"});
        }
        else{
          formattedDate =`${element.walkin_date}`
        const { hours, minutes, type } = element.time;
      let convertedHours = hours; 
      if (type === 'PM' && hours < 12) {
        convertedHours += 12;
      } else if (type === 'AM' && hours === 12) {
        convertedHours = 0;
      }   
       formattedTime = `${convertedHours < 10 ? '0' + convertedHours : convertedHours}:${minutes < 10 ? '0' + minutes : minutes}:00`;
       const currentDate = dayjs();
  const currentTimevalue = dayjs().format('HH:mm:ss');  
  if (dayjs(formattedDate).isSame(currentDate, 'day')) {
if (formattedTime > currentTimevalue) {
  valid= false
   toastStore.trigger( {message: "Selected time cannot be greater than current time."})
  }
      }
    }
     
      });
    }


    if (key === "scourse" && ((formValues["scourse"][0].name != null)||(formValues["scourse"][0].other_course&&formValues["scourse"][0].other_course.length != 0))) {
      formValues[key].forEach((element) => {
          if  (element.name === ""||element.mode_class === null) {
          valid = false;
          toastStore.trigger( {message: "Enter special course details completely!!"});
        }
        else if(element.othercourse==true&&(element.other_course==''||!/\S/.test(element.other_course)||element.mode_class === null||element.other_course.length<3)){
          valid = false;
          toastStore.trigger( {message: "Enter special course details completely!!"});
        }
      });
    }
    if (key === "education" && formValues[key]["highest_degree"] === null) {
      valid = false;
      toastStore.trigger( {message: "Highest Degree is required!"});
    }

    if (
      key === "education" &&
      formValues[key]["highest_degree"] !== null &&
      formValues[key]["highest_degree"]["name"] === "diploma" &&
      (formValues[key]["percentage"] === null)
    ) 
    {
      if (!formValues["experienced"] && !formValues["data_not_taken"]) {
        valid = false;
         toastStore.trigger( {message: "Please fill Diploma Percentage!"});
      }
    }
    if (
      key === "education" &&
      formValues[key]["highest_degree"] !== null &&
      formValues[key]["highest_degree"]["name"] === "diploma" &&
      (formValues[key]["stream_object"] === null&&formValues[key]["other_stream"]===false)
    ) 
    {
      if (!formValues["experienced"] && !formValues["data_not_taken"]) {
        valid = false;
         toastStore.trigger( {message: "Please fill Diploma stream details!"});
      }
    }
   
    if (
      key === "education" &&
      formValues[key]["highest_degree"] !== null &&
      formValues[key]["highest_degree"]["name"] === "diploma" &&
      (formValues[key]["otherstream"].replace(/\s/g, '').length<3
      &&formValues[key]["other_stream"]===true)
    ) 
    {
 if (!formValues["experienced"] && !formValues["data_not_taken"]&&(!/\S/.test(formValues['education']["otherstream"])||formValues['education']["otherstream"].replace(/\s/g, '').length<3)) {
        valid = false;
         toastStore.trigger( {message: "Please fill Diploma stream details!"});
      }  
    }
    if (
      key === "education" &&
      formValues[key]["highest_degree"] !== null &&
      formValues[key]["highest_degree"]["name"] === "diploma" &&
      (formValues[key]["college_object"] === null&&formValues[key]["other_college"]===false)
    ) 
    {
      if (!formValues["experienced"] && !formValues["data_not_taken"]) {
        valid = false;
         toastStore.trigger( {message: "Please fill Diploma college details!"});
      }
    }
    if (
      key === "education" &&
      formValues[key]["highest_degree"] !== null &&
      formValues[key]["highest_degree"]["name"] === "diploma" &&
      (formValues[key]["othercollege"].replace(/\s/g, '').length<3
      &&formValues[key]["other_college"]===true)
    ) 
    {
      if (!formValues["experienced"] && !formValues["data_not_taken"]
      &&(!/\S/.test(formValues[key]["othercollege"])||formValues['education']["othercollege"].replace(/\s/g, '').length<3)) {
        valid = false;
         toastStore.trigger( {message: "Please fill Diploma college details!"});
      }
    }
    if (
      key === "education" &&
      formValues[key]["highest_degree"] !== null &&
      formValues[key]["highest_degree"]["name"] === "iti" &&
      (formValues[key]["percentage"] === null)
    )
    {
      if (!formValues["experienced"] && !formValues["data_not_taken"]) {
        valid = false;
         toastStore.trigger( {message: "Please fill ITI Percentage!"});
      }
    }
    if (
      key === "education" &&
      formValues[key]["highest_degree"] !== null &&
      formValues[key]["highest_degree"]["name"] === "iti" &&
      (formValues[key]["stream_object"] === null&&formValues[key]["other_stream"]===false)
    ) 
    {
      if (!formValues["experienced"] && !formValues["data_not_taken"]) {
        valid = false;
         toastStore.trigger( {message: "Please fill ITI stream details!"});
      }
    }
    if (
      key === "education" &&
      formValues[key]["highest_degree"] !== null &&
      formValues[key]["highest_degree"]["name"] === "iti" &&
      (formValues[key]["otherstream"].replace(/\s/g, '').length<3&&formValues[key]["other_stream"]===true)
    ) 
    {
      if (!formValues["experienced"] && !formValues["data_not_taken"]&&
      (!/\S/.test(formValues['education']["otherstream"])||formValues['education']["otherstream"].replace(/\s/g, '').length<3)) {
        valid = false;
         toastStore.trigger( {message: "Please fill ITI stream details!"});
      }
    }
    if (
      key === "education" &&
      formValues[key]["highest_degree"] !== null &&
      formValues[key]["highest_degree"]["name"] === "iti" &&
      (formValues[key]["college_object"] === null&&formValues[key]["other_college"]===false)
    ) 
    {
      if (!formValues["experienced"] && !formValues["data_not_taken"]) {
        valid = false;
         toastStore.trigger( {message: "Please fill ITI college details!"});
      }
    }
    if (
      key === "education" &&
      formValues[key]["highest_degree"] !== null &&
      formValues[key]["highest_degree"]["name"] === "iti" &&
      (formValues[key]["othercollege"].replace(/\s/g, '').length<3&&formValues[key]["other_college"]===true)
    ) 
    {
      if (!formValues["experienced"] && !formValues["data_not_taken"]&&
      (!/\S/.test(formValues['education']["othercollege"])||formValues['education']["othercollege"].replace(/\s/g, '').length<3)) {
        valid = false;
         toastStore.trigger( {message: "Please fill ITI college details!"});
      }
    }
    if (
      key === "education" &&
      formValues[key]["highest_degree"] !== null &&
      formValues[key]["highest_degree"]["name"] === "degree" &&
      (
        formValues[key]["percentage"] === null)
    ) 
    {
      if (!formValues["experienced"] && !formValues["data_not_taken"]) {
        valid = false;
         toastStore.trigger( {message: "Please fill Degree percentage!"});
      }
    }
     if (
      key === "education" &&
      formValues[key]["highest_degree"] !== null &&
      formValues[key]["highest_degree"]["name"] === "degree" &&
      (formValues[key]["name"] === null&&formValues[key]["other_degree"]===false)
    ) 
    {
      if (!formValues["experienced"] && !formValues["data_not_taken"]) {
        valid = false;
         toastStore.trigger( {message: "Please fill degree name details!"});
      }
    }
   
    if (
  key === "education" &&
  formValues[key]?.highest_degree?.name === "degree" &&(
    (formValues[key]?.otherdegree?.replace(/\s/g, '').length < 3 &&
     formValues[key]?.other_degree === true)
  )
) 
    {
      if (!formValues["experienced"] && !formValues["data_not_taken"]&&
      (!/\S/.test(formValues['education']["otherdegree"])||formValues['education']["otherdegree"].replace(/\s/g, '').length<3)) {
        valid = false;
         toastStore.trigger( {message: "Please fill degree name details!"});
      }
    }
    if (
      key === "education" &&
      formValues[key]["highest_degree"] !== null &&
      formValues[key]["highest_degree"]["name"] === "degree" &&
      (formValues[key]["stream_object"] === null&&formValues[key]["other_stream"]===false)
    ) 
    {
      if (!formValues["experienced"] && !formValues["data_not_taken"]) {
        valid = false;
         toastStore.trigger( {message: "Please fill degree stream details!"});
      }
    }
 
    if (
  key === "education" &&
  formValues[key]?.highest_degree?.name === "degree" &&(
    (formValues[key]?.otherstream?.replace(/\s/g, '').length < 3 &&
     formValues[key]?.other_stream === true)
  )
)
    {
      if (!formValues["experienced"] && !formValues["data_not_taken"]&&
      (!/\S/.test(formValues['education']["otherstream"])||formValues['education']["otherstream"].replace(/\s/g, '').length<3)) {
        valid = false;
         toastStore.trigger( {message: "Please fill degree stream details!"});
      }
    }
    if (
      key === "education" &&
      formValues[key]["highest_degree"] !== null &&
      formValues[key]["highest_degree"]["name"] === "degree" &&
      (formValues[key]["college_object"] === null&&formValues[key]["other_college"]===false)
    ) 
    {
      if (!formValues["experienced"] && !formValues["data_not_taken"]) {
        valid = false;
         toastStore.trigger( {message: "Please fill degree college details!"});
      }
    }
    if (
  key === "education" &&
  formValues[key]?.highest_degree?.name === "degree" &&(
    (formValues[key]?.othercollege?.replace(/\s/g, '').length < 3 &&
     formValues[key]?.other_college === true)
  )
)
    {
      if (!formValues["experienced"] && !formValues["data_not_taken"]&&
      (!/\S/.test(formValues['education']["othercollege"])||formValues['education']["othercollege"].replace(/\s/g, '').length<3)) {
        valid = false;
         toastStore.trigger( {message: "Please fill degree college details!"});
      }
    }
    if (
      key === "education" &&
      formValues[key]["highest_degree"] !== null &&
      formValues[key]["highest_degree"]["name"] === "masters" &&
      (
        formValues[key]["percentage"] === null )
    )
    {
      if (!formValues["experienced"] && !formValues["data_not_taken"]) {
        valid = false;
         toastStore.trigger( {message: "Please fill Masters Percentage!"});
      }
    }
    if (
      key === "education" &&
      formValues[key]["highest_degree"] !== null &&
      formValues[key]["highest_degree"]["name"] === "masters" &&
      (formValues[key]["name"] === null&&formValues[key]["other_degree"]===false)
    ) 
    {
      if (!formValues["experienced"] && !formValues["data_not_taken"]) {
        valid = false;
         toastStore.trigger( {message: "Please fill Masters name details!"});
      }
    }

    if (
  key === "education" &&
  formValues[key]?.highest_degree?.name === "degree" &&(
    (formValues[key]?.otherdegree?.replace(/\s/g, '').length < 3 &&
     formValues[key]?.other_degree === true)
  )
)
    {
      if (!formValues["experienced"] && !formValues["data_not_taken"]&&
      (!/\S/.test(formValues['education']["otherdegree"])||formValues['education']["otherdegree"].replace(/\s/g, '').length<3)) {
        valid = false;
         toastStore.trigger( {message: "Please fill Masters name details!"});
      }
    }
    if (
      key === "education" &&
      formValues[key]["highest_degree"] !== null &&
      formValues[key]["highest_degree"]["name"] === "masters" &&
      (formValues[key]["stream_object"] === null&&formValues[key]["other_stream"]===false)
    ) 
    {
      if (!formValues["experienced"] && !formValues["data_not_taken"]) {
        valid = false;
         toastStore.trigger( {message: "Please fill Masters stream details!"});
      }
    }
  
    if (
  key === "education" &&
  formValues[key]?.highest_degree?.name === "degree" &&(
    (formValues[key]?.otherstream?.replace(/\s/g, '').length < 3 &&
     formValues[key]?.other_stream === true)
  )
)
    {
      if (!formValues["experienced"] && !formValues["data_not_taken"]&&
      (!/\S/.test(formValues['education']["otherstream"])||formValues['education']["otherstream"].replace(/\s/g, '').length<3)) {
        valid = false;
         toastStore.trigger( {message: "Please fill Masters stream details!"});
      }
    }
    if (
      key === "education" &&
      formValues[key]["highest_degree"] !== null &&
      formValues[key]["highest_degree"]["name"] === "masters" &&
      (formValues[key]["college_object"] === null&&formValues[key]["other_college"]===false)
    ) 
    {
      if (!formValues["experienced"] && !formValues["data_not_taken"]) {
        valid = false;
         toastStore.trigger( {message: "Please fill Masters college details!"});
      }
    }

     if (
  key === "education" &&
  formValues[key]?.highest_degree?.name === "degree" &&(
    (formValues[key]?.othercollege?.replace(/\s/g, '').length < 3 &&
     formValues[key]?.other_college === true)
  )
   )
    {
      if (!formValues["experienced"] && !formValues["data_not_taken"]&&
      (!/\S/.test(formValues['education']["othercollege"])||formValues['education']["othercollege"].replace(/\s/g, '').length<3)) {
        valid = false;
         toastStore.trigger( {message: "Please fill Masters college details!"});
      }
    }
    

    if (key === "refer") {
      formValues[key].forEach((element) => {
        let num = element.referee_number ? element.referee_number.toString() : '';
        num.replace(/\s+/g, "");
       if((element.referee_name.length > 0&&!/\S/.test(element.referee_name)) ||element.referee_code ===null ){
        valid = false;
        toastStore.trigger( {message: "Please fill referrals properly"});
       }
        if (
          ((element.referee_name.length > 0) &&
         ((element.referee_code === "+91" && (num.length !=10 || isNaN(num)))||(element.referee_code != "+91" && (!num.length || isNaN(num))))) ||
          (element.referee_number.length > 0 &&
            element.referee_name.length === 0)
        ) {
          valid = false;
        toastStore.trigger( {message: "Please fill referrals properly"});
        }
        let rnum = element.referee_number.replace(/\s+/g, "");
      });
    }

    if (key === "contact" && formValues["refer"]) {
      var refernumber = formValues.refer.map(function(item){ return item.referee_number });
      var isreferDuplicate = refernumber.some(function(item, idx){ 
        if(item){
          return refernumber.indexOf(item) != idx 
        }
      });
      if(isreferDuplicate==true){
        valid = false;
        toastStore.trigger( {message: "Referral Number Already exists!"});
       }
      for (var enq_num in formValues[key]) {
        for (var ref_num in formValues["refer"]) {
          let enq_numb =formValues[key][enq_num].number ?formValues[key][enq_num].number.toString() : '';
          enq_numb.replace(/\s+/g, "");
          let ref_numb = formValues["refer"][ref_num].referee_number ? formValues["refer"][ref_num].referee_number.toString() : '';
          ref_numb.replace(/\s+/g, "");
        if(enq_numb.length>0){
          if(ref_numb === enq_numb){
            valid = false;
        toastStore.trigger( {message: "Enquiry contact and Referal contact Should Not be Same"});
          }
        }
      }}
    }
  }
  if (valid) {
    formLoading = true;

    if(formValues.course_enquiries === 'regular'){
      formValues.scourse = [];
    }

    if(formValues.course_enquiries === 'special'){
      formValues.course = [];
    }

    let course_copy = ([]), scourse_copy = ([]);
    let cr = ([]), mc = null, br = ([]),moe=null ,wd=null,tr=null;
    // ocr = ref([])

    let smc = null, sbr = ([]) , sco = (null);
    for (var c in formValues.course) {
      if(formValues.course[c].course && formValues.course[c].course.name){
        cr.push({name:formValues.course[c].course.name})
      }

      if(formValues.course[c].mode_class && formValues.course[c].mode_class.id){
        mc = {id:formValues.course[c].mode_class.id, name:formValues.course[c].mode_class.name}
      }
      if(formValues.course[c].mode && formValues.course[c].mode.id){
        moe = {id:formValues.course[c].mode.id, name:formValues.course[c].mode.name}
      }
      if(formValues.course[c].mode && formValues.course[c].mode.name=='walkin' 
       && formValues.course[c].walkin_date!=''){
        // wd =   dayjs(formValues.course[c].walkin_date).format("YYYY-MM-DD HH:mm:ss")
        formattedDate =`${formValues.course[c].walkin_date}`
        const { hours, minutes, type } = formValues.course[c].time;
      let convertedHours = hours; 
      if (type === 'PM' && hours < 12) {
        convertedHours += 12;
      } else if (type === 'AM' && hours === 12) {
        convertedHours = 0;
      }   
       formattedTime = `${convertedHours < 10 ? '0' + convertedHours : convertedHours}:${minutes < 10 ? '0' + minutes : minutes}:00`;
        wd =   `${formattedDate} ${formattedTime}`
      }
 
      if(formValues.course[c].trainer && formValues.course[c].trainer.id){
        tr=({id:formValues.course[c].trainer.id, name:formValues.course[c].trainer.name})
      }
      if(formValues.course[c].branch && formValues.course[c].branch.length > 0){
        for(const inb in formValues.course[c].branch){
          br.push({id:formValues.course[c].branch[inb].id, name:formValues.course[c].branch[inb].name})
        }
      }

      if (formValues.course[c].mode_class && formValues.course[c].mode_class.name.toLowerCase() == "both") {
        course_copy.push({
          course: cr,
          modeofenquiry: moe,
          mode_class: { id: 1, name: "offline" },
          Walkindate: wd,
          branch: br,
          trainer:tr
        });
        course_copy.push({
          course: cr,
          modeofenquiry: moe,
          mode_class: { id: 2, name: "online" },
          Walkindate: wd,
          branch: br,
          trainer:tr
        });
      } else {
        course_copy.push({
          course: cr,
          modeofenquiry: moe,
          mode_class: mc,
          Walkindate: wd,
          branch: br,
          trainer:tr
        });
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
      sbr=[{"id":22,"name":"corporate online qspiders"}]

      if (formValues.scourse[sc].mode_class && formValues.scourse[sc].mode_class.name.toLowerCase() == "both") {
        scourse_copy.push({
          name:sco,
          othercourse:formValues.scourse[sc].othercourse,
          other_course:formValues.scourse[sc].other_course,
          mode_class: { id: 1, name: "offline" },
          // agreed_date: formValues.scourse[sc].agreed_date,
          branch: sbr,
        });
        scourse_copy.push({
          name: sco,
          othercourse:formValues.scourse[sc].othercourse,
          other_course:formValues.scourse[sc].other_course,
          mode_class: { id: 2, name: "online" },
          // agreed_date: formValues.scourse[sc].agreed_date,
          branch: sbr,
        });
      } else {
        scourse_copy.push({
          name: sco,
          mode_class: smc,
          othercourse:formValues.scourse[sc].othercourse,
          other_course:formValues.scourse[sc].other_course,
          // agreed_date: formValues.scourse[sc].agreed_date,
          branch: sbr,
        });
      }
      sbr = [];
      sco=null;
    }

    // if (formValues.email && formValues.email[0].email === "") {
    //   formValues.email = [];
    // }
    let rem = formValues.email.filter((ele) => ele.email !='')
    formValues.email = rem

    let mode_copy = null, class_timing_copy = null, time_slot_copy = [], refer_copy = [];

    if(formValues.mode && formValues.mode.id){
      mode_copy = { id:formValues.mode.id, name:formValues.mode.name }
    }

    // if(formValues.flexi_timing === true)
    if(formValues.class_timing && formValues.class_timing.id){
      class_timing_copy = { id:formValues.class_timing.id, name:formValues.class_timing.name }
    }

    // if(formValues.flexi_timing === false){
    if(formValues.time_slot && formValues.time_slot.length > 0){
      for(const ts in formValues.time_slot){
        time_slot_copy.push({id:formValues.time_slot[ts].id, name:formValues.time_slot[ts].name})
      }
    }
    // }
    
    // if(formValues.refer && formValues.refer[0] && formValues.refer[0].referee_name.length === 0 && formValues.refer[0].referee_number.length === 0){
    //   formValues.refer = []
    // }
    let refer = formValues.refer.filter((ele) => ele.referee_number!='')
    formValues.refer = refer
    
    if (formValues.education && formValues.education.highest_degree) {
      formValues.education.highest_degree = { id:formValues.education.highest_degree.id, name:formValues.education.highest_degree.name }
      // , shortname:formValues.education.highest_degree.details.shortname
    }

    if (formValues.education && formValues.education.name) {
      formValues.education.name = { id:formValues.education.name.id, name:formValues.education.name.name, shortname:formValues.education.name.shortname }
    }

    if (formValues.education && formValues.education.yop) {
    formValues.education.yop = (formValues.education.yop.value)
    }

    if (formValues.education && formValues.education.stream_object) {
      formValues.education.stream_object = { id:formValues.education.stream_object.id, name:formValues.education.stream_object.name, shortname:formValues.education.stream_object.shortname }
    }

    if (formValues.education && formValues.education.college_object) {
      formValues.education.college_object = { id:formValues.education.college_object.id, name:formValues.education.college_object.name, shortname:formValues.education.college_object.shortname }
    }
    
    let contact_copy = ([]);

for (var ct in formValues.contact) {
  let number_copy =   formValues.contact[ct].number ?  formValues.contact[ct].number.toString() : '';
  number_copy = number_copy.replace(/\s+/g, "");
  contact_copy.push({
    number: number_copy,
    code: formValues.contact[ct].code.code,
    readonly: formValues.contact[ct].readonly,
  });
}
if(formValues.experienced==true || formValues.education.highest_degree&& 
   formValues.education.highest_degree.name== "12th/puc" ){
      formValues.data_not_taken=false 
    }
    if(formValues.enq_for_someone==false){
      formValues.enquiree_name=''
    }
    if(formValues.experienced==true){
      formValues.data_not_taken=false
    }
    let formSubmit = {
      name: formValues.name,
      enquiry: {
        enq_for_someone: formValues.enq_for_someone,
        enquiree_name: formValues.enquiree_name,
        experienced: formValues.experienced,
        mode_of_enquiry: mode_copy,
        // flexi_timing: formValues.flexi_timing,
        class_timing: class_timing_copy,
        time_slot: time_slot_copy,
        data_not_taken: formValues.data_not_taken,
        comment: formValues.comment,
      },
      contact: contact_copy,
      email: formValues.email,
      course: course_copy,
      scourse: scourse_copy,
      education: formValues.education,
      refers: formValues.refer,
      author: data.user,
    };
 console.log("dmgn",formSubmit)
    await counselor.submitEnquiry(formSubmit);
    toastStore.trigger({message:$submit_enq.message})

    // if(mainStore.isSeniorverifier){
      goto("/raterecordlist")
      // }
      // if(mainStore.iscvsverifier){
      //    router.replace("/verify_call")
      // }

  } else {
    formLoading = false;
    // mainStore.pushMessage("Form Error, please fill out mandatory fields");
  }
}

const clearhighestdegree=()=>{
  // educ.yop=null,
  show_degreetype=false,
  show_mastertype=false
 educ= Object.assign({}, educ, {
      name: null,
      percentage: null,
      stream_object: null,
      other_stream: false,
      otherstream: "",
      college_object: null,
      other_college: false,
      othercollege: "",
      other_degree:false,
      otherdegree:null,
      yop:null
  });
}

function isFieldEmpty(value) {
    return value.trim() === '';
  }
  
$: isValid = formState.class_timing ==null;
console.log("sdfmn",isValid)
</script>
 
<style>
  /* Optional: Define a style for the border-red-500 class if not using TailwindCSS */
  .border-red-500 {
    border-color: red; /* TailwindCSS red-500 color */
    --border-color:red;
  }

</style>
