<script lang='ts'>
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher()

    export let number: Number;
    export let key: String;

    const passVariable = (e) =>{
        let allowed = ['1','2','3','4','5','6','7','8','9','0']
        dispatch('date', {[key]:number}) //learn difference btw tis & spread operator: obj ={...obj, [key]:number}
    }

    
</script>

<div>
    <p class='font-light uppercase'>{key}</p>
    <input type='text' bind:value={number} on:input|preventDefault={e=>passVariable(e)}>
</div>