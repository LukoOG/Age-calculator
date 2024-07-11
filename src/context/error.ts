export let validateDate = (date: number, month:number, year:number) =>{ //I had to be this specific cuz of Feb lol
    let daysInbirthMonth = new Date(year, month, 0).getDate() //no need to subtract cuz of 0-indexing
    if(date > 31){
        return false
    } else if(date > daysInbirthMonth){
        return false
    } else{
        return true
    }
}

export let validateMonth = (month: number) =>{
    if(month > 12){
        return false
    } else{
        return true
    }
}

let currYear = new Date().getFullYear()
export let validateYear = (year: number) =>{
    if(year > currYear){
        return false
    } else{
        return true
    }
}