<script lang='ts'>
    import Input from "../components/input.svelte";
    import Icon from "../lib/assests/icon-arrow.svg?raw";

    let day: Number = 16;
    let month: Number = 4;
    let year: Number = 2006;

    let calculatedDay: Number;
    let calculatedMonth: Number;
    let calculatedYear: Number;

    let inputs = {'day':day,'month':month,'year':year}
    let keyp = 'day'
    
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
        calculatedDay = day
        calculatedMonth = month
        calculatedYear = year
    }
</script>

<main class='container'>
    <section class='wrapper'>
        <div class='section-1'>
            {#each Object.entries(inputs) as [key, variable], i}
                <Input on:date={(event)=>updateVariable(event.detail)} {key} number={variable} />
            {/each}
        </div>

        
        <div class='bg-gray-300 my-5 h-[1px] relative'> <!--to move to tailwind-->
            <!-- A11y: <div> with click handler must have an ARIA role -->
            <div on:keydown on:click={()=>calculateVariable()} class='cursor-pointer rounded-full inline-block p-2 bg-black absolute mt-[-30px] right-0 top-[50%]'>
                {@html Icon}
            </div>
        </div>

        <div class='section-2'>
            <p><span>{calculatedDay ? calculatedDay : '--'}</span> Days</p> 
            <p><span>{calculatedMonth ? calculatedMonth : '--'}</span> Months</p>
            <p><span>{calculatedYear ? calculatedYear : '--'}</span> Years </p>
        </div>
    </section>
</main>

<style>

</style>