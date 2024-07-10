<script lang='ts'>
    import Input from "../components/input.svelte";
    import Icon from "../lib/assests/icon-arrow.svg?raw";
    import { monthChecker } from '../context/date'
    import { createEventDispatcher } from "svelte";
    import { validateDate, validateMonth, validateYear } from '../context/error'

    let dispatch = createEventDispatcher()

    let day: Number;
    let month: Number;
    let year: Number;

    let calculatedDays: Number;
    let calculatedMonth: Number;
    let calculatedYear: Number;

    let inputs = {'day':day,'month':month,'year':year}
    
    let updateVariable = ( variable ) =>{
        const [key, value] = Object.entries(variable)[0]
        switch (key){
            case 'day':
                day = value
                break
            case 'month':
                month = value
                break
            case 'year':
                year = value
                break
        }
    }

    let calculateVariable = () =>{
        let proceed = validateVariable()
        if(!proceed){
            let age ={'date':day, 'month':month-1, 'year':year} //cuz of 0-indexing
            let data = monthChecker(age);
            ({calculatedYear, calculatedMonth, calculatedDays} = data)
        }
    }

    let error = {errorValue:false, errorKey:'', errorData:{} };
    
    let validateVariable = () =>{
        if(!day || !month || !year){
            let data = {'day':!day, 'month':!month, 'year':!year}
            error = {...error, errorValue: true, errorKey:'empty', errorData:data}
        } else if(!validateDate(day, month) || !validateMonth(month) || !validateYear(year)){
            let data = {
                'day':!validateDate(day, month),
                'month':!validateMonth(month), 
                'year':!validateYear(year)
            }
            error = {...error, errorValue: true, errorKey:'invalid', errorData:data}
        } else{
            error = {...error, errorValue: false}
        }
        console.log(error)
        return error.errorValue
    }
</script>

<main class='container'>
    <section class='wrapper'>
        <div class='section-1'>
            {#each Object.entries(inputs) as [key, variable], i (i)}
                <Input on:date={(event)=>updateVariable(event.detail)} {error} {key} number={variable} />
            {/each}
        </div>

        
        <div class='bg-gray-300 my-5 h-[1px] relative'> <!--to move to tailwind-->
            <!-- A11y: <div> with click handler must have an ARIA role -->
            <div on:keydown on:click={()=>calculateVariable()} class='cursor-pointer rounded-full inline-block p-3 bg-black absolute mt-[-30px] right-0 top-[50%]  hover:bg-purple-600'>
                {@html Icon}
            </div>
        </div>

        <div class='section-2'>
            <p class='font-extrabold'><span>{calculatedYear ? calculatedYear : '--'}</span> years </p>
            <p class='font-extrabold'><span>{calculatedMonth ? calculatedMonth : '--'}</span> months</p>
            <p class='font-extrabold'><span>{calculatedDays ? calculatedDays : '--'}</span> days</p> 
        </div>
    </section>
</main>

<style>

</style>