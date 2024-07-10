let date = {
    'date':11,
    'month':1,
    'year':2006,
}

const dateConverter = (date) =>{
    let timezoneOffset = date.getTimezoneOffset()
    if(timezoneOffset != 0){
        date.setHours(0 - (timezoneOffset/60))
    }
    date.setMilliseconds(0)
    date.setSeconds(0)
    date.setMinutes(0)

    return date
}

const LeapRemover = (date)=>{
    let currYear = (new Date()).getFullYear();
    let noOfLeapYears = Math.floor((currYear - date)/4)
    if (currYear % 4 == 0 && (new Date).getMonth() > 1){
        noOfLeapYears+=1
    }
    return noOfLeapYears
}

const monthCounter = (days, birthMonth) =>{
    let monthsCount = 0
    //after birthday has occured
    if(birthMonth.getDate() < new Date().getDate()){ //when birthdate is before currentdate
        let nextMonth = new Date(birthMonth.getFullYear(), birthMonth.getMonth() + 1, 0) 
        let currMonth = nextMonth.getMonth()
        while(currMonth <= new Date().getMonth()-1){
            days -= nextMonth.getDate()
            currMonth++
            nextMonth = new Date(birthMonth.getFullYear(), currMonth + 1, 0) //currMonth+1 cuz of how js is
            monthsCount++
        }
    } else if(birthMonth.getDate() >= new Date().getDate()){
        let currDay = new Date(birthMonth.getFullYear(), birthMonth.getMonth()+1, 1)
        let nextMonth = new Date(currDay.getFullYear(),currDay.getMonth()+1, 0)
        let currMonth = nextMonth.getMonth()
        let daysOfNextMonth = nextMonth.getDate()
        // console.log(daysOfNextMonth)
        while(nextMonth.getMonth()-1 <= new Date().getMonth()-1){
            if(days < 31){
                break
            }
            days -= daysOfNextMonth
            currMonth++
            console.log(currMonth)
            daysOfNextMonth = new Date(currDay.getFullYear(), currMonth+1, 0).getDate()

            monthsCount++
        }
    }
    return [monthsCount, days]
}

export const monthChecker = (val) =>{
    let {date, month, year} = val

    let today = new Date()
    let age = new Date(year, month, date)

    let difference = dateConverter(today) - dateConverter(age)
    let noOfDaysonEarth = difference / 8.64e+7

    noOfDaysonEarth-=LeapRemover(age.getFullYear())

    let _date = {}
    let noOfYears =  Math.floor(noOfDaysonEarth / 365)
    let relativeDays = (noOfDaysonEarth - (noOfYears*365))
    _date.calculatedYear = noOfYears

    const [months, days] = monthCounter(relativeDays, age)
    _date.calculatedMonth = months
    _date.calculatedDays = days
    return _date//[_date, relativeDays]
}

// let answer = monthChecker(date)
// console.log(new Date(date.year, date.month, date.date).toLocaleDateString(), answer[0], answer[1]+' relative days on earth')    
// for(let i=0; i < 6 ;i++){
//     date.month = i
//     let answer = monthChecker(date)
//     console.log(new Date(2024, i, date.date).toLocaleDateString(), answer[0], answer[1]+' relative days on earth')    
// }