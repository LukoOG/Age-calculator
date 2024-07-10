let date = {
    'date':9,
    'month':3,
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
    let start = new Date(birthMonth.getFullYear(), birthMonth.getMonth(), 0).getDate() - birthMonth.getDate()
    let nextMonth = birthMonth
    // console.log(nextMonth)
    while(nextMonth.getMonth() <= new Date().getMonth()){ //3 < 6
        if (days < 31){
            break
        }
        days -= start
        monthsCount++
    }
    return [monthsCount, days]
}


const monthChecker = (val) =>{
    let {date, month, year} = val

    let today = new Date()
    let age = new Date(year, month, date)

    let difference = dateConverter(today) - dateConverter(age)
    let noOfLeapYears = LeapRemover(age.getFullYear())
    let noOfDaysonEarth = difference / 8.64e+7

    noOfDaysonEarth-=LeapRemover(age.getFullYear())

    let _date = {}
    let noOfYears =  Math.floor(noOfDaysonEarth / 365)
    let relativeDays = (noOfDaysonEarth - (noOfYears*365))
    _date.calculatedYear = noOfYears

    const [months, days] = monthCounter(relativeDays, age)
    _date.calculatedMonth = months
    _date.calculatedDays = days
    return _date

}
console.log(monthChecker(date))

// ChatGPT
function monthsBetweenDates(birthDate, currentDate) {
    if (birthDate > currentDate) {
        return 0;
    }
    
    let monthsCount = 0;
    let nextMonth = new Date(birthDate.getFullYear(), birthDate.getMonth(), 1);
    
    while (nextMonth <= currentDate) {
        let daysInMonth = new Date(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 0).getDate();
        if (new Date(nextMonth.getFullYear(), nextMonth.getMonth(), nextMonth.getDate() + daysInMonth) > currentDate) {
            break;
        }
        nextMonth = new Date(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 1);
        monthsCount++;
    }
    
    return monthsCount;
}

// Example usage:
const birthday = new Date(2024, 0, 1); // January is month 0
const currentDate = new Date(2024, 6, 9); // July is month 6 (0-based index)
// const months = monthsBetweenDates(birthday, currentDate);
// console.log(`Number of full months between ${birthday.toDateString()} and ${currentDate.toDateString()}: ${months}`);
// console.log(new Date(2004, 3, 0).getDate())
for(let i=0; i < 6 ;i++){
    date.month = i
    let answer = monthChecker(date)
    const months = monthsBetweenDates(birthday, currentDate);
    console.log(`Number of full months between ${birthday.toDateString()} and ${currentDate.toDateString()}: ${months}`);
}    