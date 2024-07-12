let date = {
    'date':13,
    'month':0,
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
    let todayRelative = new Date(birthMonth.getFullYear(), new Date().getMonth(), new Date().getDate()) //today relative to birthmonths year
    // console.log(birthMonth > todayRelative, `${birthMonth} > ${todayRelative}?`)
    // console.log(birthMonth < todayRelative,  `${birthMonth} < ${todayRelative}?`)
    if(birthMonth <= todayRelative){
        if(birthMonth.getDate() <= new Date().getDate()){ //when birthdate is before currentdate
            let nextMonth = new Date(birthMonth.getFullYear(), birthMonth.getMonth() + 1, 0) //starts form birthmonth
            let currMonth = nextMonth.getMonth()
            while(currMonth <= new Date().getMonth()-1){
                days -= nextMonth.getDate()
                currMonth++
                nextMonth = new Date(birthMonth.getFullYear(), currMonth + 1, 0) //currMonth+1 to get days of last month
                monthsCount++
            }
        } else if(birthMonth.getDate() > new Date().getDate()){
            let currDay = dateConverter(new Date(birthMonth.getFullYear(), birthMonth.getMonth()+1, 1))
            let nextMonth = dateConverter(new Date(currDay.getFullYear(),currDay.getMonth()+1, 0))
            let currMonth = nextMonth.getMonth()
            let daysOfNextMonth = nextMonth.getDate()
            while(nextMonth.getMonth() <= new Date().getMonth()){
                if(days < 31){
                    break
                }
                days -= daysOfNextMonth
                currMonth++
                // console.log(currMonth)
                daysOfNextMonth = new Date(currDay.getFullYear(), currMonth+1, 0).getDate()
    
                monthsCount++
            }
        }//birthdate hasn't occured
    } else if (todayRelative < birthMonth){
        if(birthMonth.getDate() > new Date().getDate()){
            let nextMonth = dateConverter(new Date(birthMonth.getFullYear(), 1, 0)) //start from currentmonth
            let currMonth = nextMonth.getMonth()
            let monthDiff = nextMonth.getMonth() - new Date().getMonth()
            while(currMonth <= ((11-monthDiff))){ 
                if(days <= -1){
                    break
                }

                days-=nextMonth.getDate()
                currMonth++

                nextMonth = new Date(birthMonth.getFullYear(), currMonth+1, 0)

                monthsCount++;
            }
            monthsCount--
            days+=31 //convert back to days
        }else if(birthMonth.getDate() <= new Date().getDate()){
            let currDay = dateConverter(new Date(birthMonth.getFullYear(), birthMonth.getMonth()+1, 1))
            let nextMonth = dateConverter(new Date(currDay.getFullYear(),currDay.getMonth()+1, 0))
            let currMonth = nextMonth.getMonth()
            let daysOfNextMonth = nextMonth.getDate()
            let monthDiff = birthMonth.getMonth() - new Date().getMonth()
            while(nextMonth.getMonth() <= (12-monthDiff) || nextMonth.getMonth() >= (12-monthDiff)){
                if(days < 31){
                    break
                }
                days -= daysOfNextMonth
                currMonth++
                // console.log(currMonth)
                daysOfNextMonth = new Date(currDay.getFullYear(), currMonth+1, 0).getDate()
    
                monthsCount++
            }
        }
    }

    if(birthMonth.getFullYear() % 4 == 0){
        days++
        console.log(birthMonth.getFullYear() % 4)
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
    _date.calculatedMonth = months ? months : 0
    _date.calculatedDays = days ? days : 0
    return _date//[_date, relativeDays]
}

let answer = monthChecker(date)
// console.log(new Date(date.year, date.month, date.date).toLocaleDateString(), answer[0], answer[1]+' relative days on earth')    
// for(let i=6; i < 12 ;i++){
//     date.month = i
//     let answer = monthChecker(date)
//     console.log(new Date(2024, i, date.date).toLocaleDateString(), answer[0], answer[1]+' relative days on earth')    
// }