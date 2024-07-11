<script lang='ts'>
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher()

    export let number: Number;
    export let key: String;
    export let error;

    let errorMessage:String;
    $: ({errorValue, errorKey, errorData} = error)
    $: if(error){ errorMessageFunc()}

    const regex = /^[0-9]*$/;
    const passVariable = (e) =>{
        switch(key){
            case 'day': case 'month':
                if(e.target.value.length > 2){
                    e.target.value = e.target.value.substring(0, e.target.value.length - 1)
                }
                break
            case 'year':
                if(e.target.value.length > 4){
                    e.target.value = e.target.value.substring(0, e.target.value.length - 1)
                }
                break
        }

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

    const errorMessageFunc = () =>{
        if(errorKey=='invalid'){
            switch(key){
                case 'month':
                    errorMessage = 'Must be a valid month'
                    break
                case 'year':
                    errorMessage = 'Must be in the past'
                    break
                case 'day':
                    console.log(number)
                    if(number <= 31){
                        errorMessage = 'Must be a valid date'
                    } else if(number > 31){
                        errorMessage = 'Must be a valid day'
                    }
                    break
            }
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