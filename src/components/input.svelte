<script lang='ts'>
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher()

    export let number: Number;
    export let key: String;
    export let error;

    $: ({errorValue, errorKey, errorData} = error)
    $: errorMessage = `invalid ${key}`

    const regex = /^[0-9]*$/;
    const passVariable = (e) =>{
        if(!regex.test(e.target.value)){
            if(number){
                e.target.value = number
            }else{
                e.target.value= ''
            }
        }
        else{
            number = e.target.value
        }
        dispatch('date', {[key]:number}) //learn difference btw tis & spread operator: obj ={...obj, [key]:number}
    }

    const placeholder = (key: String) => {
        switch(key){
            case 'day':
                return 'DD'
            case 'month':
                return  'MM'
            case 'year':
                return 'YYYY'
        }
    }    
</script>

<div>
    <p class='text-sm font-light {errorValue ? 'error':''} uppercase'>{key}</p>
    <input class='{errorValue?'error':''}' type='text' on:input|preventDefault={e=>passVariable(e)} placeholder={placeholder(key)}>
    {#if errorValue && errorKey == 'empty' && errorData[key] == true}
        <p class='font-light text-xs text-red-400 italic'>This field is required</p>
    {:else if errorValue && errorKey== 'invalid' && errorData[key] == true}
        <p class='font-light text-xs text-red-400 italic'>{errorMessage}</p>
    {/if}
</div>