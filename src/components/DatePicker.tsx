
import { useState } from 'react';
import "./DatePicker.css"
import LastDayButton from './LastDayButton';
import { weekDays } from '../constants/days';
import DisplayDateRange from './DisplayDateRange';
interface PropsType {
    label: string
}
const DateRangePicker = (props: PropsType) => {
    const [startDate, setStartDate] = useState<any>(null);
    const [endDate, setEndDate] = useState<any>(null);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [nextMonth, setNextMonth] = useState(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1));
    const [outerCalendar, setOuterCalendar] = useState(false);
    const [isRightOuterCalendar, setIsRightOuterCalendar] = useState(false);
    const [isHandleOk, setIsHandleOk] = useState(false);
    const [selectedRange, setSelectedRange] = useState<string[]>([]);
    const [selectedWeekendDays, setSelectedWeekendDays] = useState<string[]>([]);
    const daysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (month: number, year: number) => new Date(year, month, 1).getDay();
    let weekends: number = 0;
    const generateDays = () => {
        const month = currentMonth.getMonth();
        const year = currentMonth.getFullYear();
        const totalDays = daysInMonth(month, year);
        const firstDay = getFirstDayOfMonth(month, year);
        if (firstDay === 0) weekends = 1;
        if (firstDay === 1) weekends = 7;
        if (firstDay === 2) weekends = 6;
        if (firstDay === 3) weekends = 5;
        if (firstDay === 4) weekends = 4;
        if (firstDay === 5) weekends = 3;
        if (firstDay === 6) weekends = 2;
        let days = [];
        for (let i = 0; i < firstDay; i++) {
            days.push('');
        }
        for (let i = 1; i <= totalDays; i++) {

            days.push(i);
        }

        return days;
    };

    const generateNextMonthDays = () => {
        const month = nextMonth.getMonth();
        const year = currentMonth.getFullYear() + (month > 11 ? 1 : 0);
        const nextMonthIndex = month % 12;
        const totalDays = daysInMonth(nextMonthIndex, year);
        const firstDay = getFirstDayOfMonth(nextMonthIndex, year);
        if (firstDay === 0) weekends = 1;
        if (firstDay === 1) weekends = 7;
        if (firstDay === 2) weekends = 6;
        if (firstDay === 3) weekends = 5;
        if (firstDay === 4) weekends = 4;
        if (firstDay === 5) weekends = 3;
        if (firstDay === 6) weekends = 2;

        let days = [];
        for (let i = 0; i < firstDay; i++) {
            days.push('');
        }
        for (let i = 1; i <= totalDays; i++) {
            days.push(i);
        }
        return days;
    };



    const handleDateClick = (day: any) => {
        if (!day) return;
        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);


        if (!startDate) {
            setStartDate(date);
        } else if (!endDate) {
            if (date < startDate) {
                setEndDate(startDate);
                setStartDate(date);
            } else {
                setEndDate(date);
            }
        } else {
            setStartDate(date);
            setEndDate(null);
        }




    };


    console.log("selctedWeekendsDays", selectedWeekendDays);


    const handleDateClickNextMonth = (day: any) => {
        if (!day) return;
        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, day);
        if (!startDate) {
            setStartDate(date);
        } else if (!endDate) {
            if (date < startDate) {
                setEndDate(startDate);
                setStartDate(date);
            } else {
                setEndDate(date);
            }
        } else {
            setStartDate(date);
            setEndDate(null);
        }
    };

    const handleNextMonth = (isRight: boolean) => {
        if (isRight) {
            setNextMonth(new Date(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 1));
        }
        else {
            if (currentMonth.getMonth() + 1 == nextMonth.getMonth()) {
                setNextMonth(new Date(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 1));
            }
            setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
        }
    };

    const handleDateRange = () => {

        const startDateData = new Date(startDate);
        console.log("startDateData", startDateData);
        const weekends: string[] = [];

        while (startDateData < endDate) {
            const dayOfWeek = startDateData.getDay();
            if (dayOfWeek == 0 || dayOfWeek == 6) {
                const day = startDateData.getDate();
                const month = startDateData.getMonth() + 1;
                const year = startDateData.getFullYear();
                const formattedDate = `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}`;
                weekends.push(formattedDate);
            }
            startDateData.setDate(startDateData.getDate() + 1);
        }
        setSelectedWeekendDays(weekends);

        if (startDate && endDate) {
            setSelectedRange([
                startDate
                    ? `${startDate.getDate().toString().padStart(2, '0')}-${(startDate.getMonth() + 1).toString().padStart(2, '0')}-${startDate.getFullYear()}`
                    : '',
                endDate
                    ? `${endDate.getDate().toString().padStart(2, '0')}-${(endDate.getMonth() + 1).toString().padStart(2, '0')}-${endDate.getFullYear()}`
                    : '',
            ]);
            alert(`Selected date range: ${startDate.getDate().toString().padStart(2, '0')}-${(startDate.getMonth() + 1).toString().padStart(2, '0')}-${startDate.getFullYear()} - ${endDate.getDate().toString().padStart(2, '0')}-${(endDate.getMonth() + 1).toString().padStart(2, '0')}-${endDate.getFullYear()}`);
        }


    }

    const handleLastDays = (days: number) => {
        const date = new Date();
        const startDateData = new Date(date.setDate(date.getDate() - days))
        const endDateData = new Date(date.setDate(date.getDate() + days))
        setStartDate(startDateData);
        setEndDate(endDateData);
        setIsCalendarOpen(!isCalendarOpen);
        setSelectedRange([
            startDateData
                ? `${startDateData.getDate().toString().padStart(2, '0')}-${(startDateData.getMonth() + 1).toString().padStart(2, '0')}-${startDateData.getFullYear()}`
                : '',
            endDateData
                ? `${endDateData.getDate().toString().padStart(2, '0')}-${(endDateData.getMonth() + 1).toString().padStart(2, '0')}-${endDateData.getFullYear()}`
                : '',
        ]);
        setIsHandleOk(true);
    };


    const handlePrevMonth = (isRight: boolean) => {
        if (isRight) {
            if (nextMonth.getMonth() - 1 == currentMonth.getMonth()) {
                setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
            }
            setNextMonth(new Date(nextMonth.getFullYear(), nextMonth.getMonth() - 1, 1));

        } else {
            if (nextMonth.getMonth() - 1 == currentMonth.getMonth()) {
                setNextMonth(new Date(nextMonth.getFullYear(), nextMonth.getMonth() - 1, 1));
            }
            setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
        }
    }


    console.log("selectedRange", selectedRange);


    const isDateSelected = (day: any) => {
        if (!day) return false;
        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);

        return (
            (startDate && date.toDateString() === startDate.toDateString()) ||
            (endDate && date.toDateString() === endDate.toDateString()) ||
            (startDate && endDate && date >= startDate && date <= endDate)
        );
    };

    const isDateNextSelected = (day: any) => {
        if (!day) return false;
        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, day);
        return (
            (startDate && date?.toDateString() === startDate?.toDateString()) ||
            (endDate && date?.toDateString() === endDate?.toDateString()) ||
            (startDate && endDate && date >= startDate && date <= endDate)
        );
    };

    const handleCustomDate = (isRight: boolean, year: number, idx: number) => {
        if (isRight) {
            if (
                currentMonth.getFullYear() === year &&
                currentMonth.getMonth() === idx
            ) {
                return setCurrentMonth(new Date(year, Number(idx) - 1, 1));
            }
        } else {
            if (
                nextMonth.getFullYear() === year &&
                nextMonth.getMonth() === idx
            ) {
                return setNextMonth(new Date(year, Number(idx) + 1, 1));
            }
        }
    };



    return (
        <div>
            <label>{props.label} -  {isHandleOk && startDate && endDate ? `${startDate?.toLocaleDateString()} - ${endDate?.toLocaleDateString()}` : "MM-dd-yyyy - MM-dd-yyyy"}</label>
            <DisplayDateRange startDate={startDate} endDate={endDate} setIsCalendarOpen={() => setIsCalendarOpen(!isCalendarOpen)} />

            {isCalendarOpen && (
                <div className="main">
                    <div style={{ backgroundColor: "aliceblue" }}>

                        {!outerCalendar &&
                            <button onClick={() => handlePrevMonth(false)}>Prev</button>
                        }
                        <span onClick={() => setOuterCalendar(!outerCalendar)} className='calender'>{currentMonth.toLocaleString('default', { month: 'long' })}, {currentMonth.getFullYear()}</span>

                        {outerCalendar && (<>
                            <div style={{ display: "flex", flexDirection: "column", border: "1px solid black", overflow: "scroll", height: "250px", position: "absolute", backgroundColor: "white", zIndex: 9999, width: "225px", borderTop: "1px dotted black" }} >
                                {Array.from({ length: 1125 }).map((_, idx) => {
                                    const year = new Date().getFullYear() - 125 + idx;
                                    return (
                                        <div style={{ display: "flex" }} key={idx}>
                                            <div onClick={() => {
                                                setCurrentMonth(new Date(Number(year), currentMonth.getMonth(), 1));
                                            }} className="select-month" style={{ backgroundColor: currentMonth.getFullYear() == year ? "#3498ff" : "white", display: "flex", justifyItems: "center", borderRight: "1px solid black", width: "50px", alignItems: "center" }}>
                                                {year}
                                            </div>

                                            <div style={{ display: "grid", gridTemplateColumns: 'repeat(4, 1fr)', borderBottom: "1px solid black" }}>
                                                {Array.from({ length: 12 }).map((_, idx) => (
                                                    <div onClick={() => {
                                                        setCurrentMonth(new Date(year, Number(idx), 1)),
                                                            handleCustomDate(false, year, idx),
                                                            setOuterCalendar(!outerCalendar);
                                                    }} className="select-month" style={{
                                                        backgroundColor: year == currentMonth.getFullYear() && currentMonth.getMonth() == idx ? "#3498ff" : "white",
                                                    }} key={idx}>
                                                        {new Date(0, idx).toLocaleString('default', { month: 'short' })}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </>)}


                        {!outerCalendar &&
                            <button onClick={() => handleNextMonth(false)}>Next</button>
                        }
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
                            {weekDays?.map((day) => (
                                <div key={day}>{day}</div>
                            ))}
                            {generateDays().map((day:any, index) => (
                                <div
                                    key={index}
                                    onClick={(day == weekends || day == weekends + 7 || day == weekends + 14 || day == weekends + 21 || day == weekends + 28 || day == weekends - 1 || day == weekends + 7 - 1 || day == weekends + 14 - 1 || day == weekends + 21 - 1 || day == weekends + 28 - 1) ? () => console.log("") : () => handleDateClick(day)}

                                    style={{
                                        backgroundColor: isDateSelected(day) ? '#3498ff' : new Date().toLocaleDateString()==new Date(currentMonth.getFullYear(),currentMonth.getMonth(),day).toLocaleDateString()?'#6aa2dc':'transparent',border: new Date().toLocaleDateString()==new Date(currentMonth.getFullYear(),currentMonth.getMonth(),day).toLocaleDateString()?'1px solid blue':'none',
                                        cursor: (day == weekends || day == weekends + 7 || day == weekends + 14 || day == weekends + 21 || day == weekends + 28 || day == weekends - 1 || day == weekends + 7 - 1 || day == weekends + 14 - 1 || day == weekends + 21 - 1 || day == weekends + 28 - 1) ? 'not-allowed' : "pointer",
                                    }}
                                >
                                    {day}
                                </div>
                            ))}
                        </div>

                        <div style={{ borderTop: "1px solid black" }}></div>
                        <div className="footer">
                            <LastDayButton title='Last 7 Days' onClick={() => handleLastDays(6)} />
                            <LastDayButton title='Last 30 Days' onClick={() => handleLastDays(30)} />
                        </div>

                    </div>



                    <div style={{ backgroundColor: "aliceblue", borderLeft: "1px solid black" }}>
                        <div>
                            {!isRightOuterCalendar &&
                                <button onClick={() => handlePrevMonth(true)}  >Prev</button>
                            }
                            <span onClick={() => setIsRightOuterCalendar(!isRightOuterCalendar)} className='calender'>
                                {nextMonth.toLocaleString('default', { month: 'long' })}, {nextMonth.getFullYear()}
                            </span>

                            {isRightOuterCalendar && (<>
                                <div style={{ display: "flex", flexDirection: "column", border: "1px solid black", overflow: "scroll", height: "250px", position: "absolute", backgroundColor: "white", zIndex: 9999, width: "225px", borderTop: "1px dotted black" }}>
                                    {Array.from({ length: 1125 }).map((_, idx) => {
                                        const year = new Date().getFullYear() - 125 + idx;
                                        return (
                                            <div style={{ display: "flex" }} key={idx}>
                                                <div onClick={() => {
                                                    setNextMonth(new Date(Number(year), nextMonth.getMonth(), 1));
                                                }} className="select-month" style={{ backgroundColor: nextMonth.getFullYear() == year ? "#3498ff" : "white", display: "flex", justifyItems: "center", borderRight: "1px solid black", width: "50px", alignItems: "center" }}>
                                                    {year}
                                                </div>

                                                <div style={{ display: "grid", gridTemplateColumns: 'repeat(4, 1fr)', borderBottom: "1px solid black" }}>
                                                    {Array.from({ length: 12 }).map((_, idx) => (
                                                        <div onClick={() => {
                                                            setNextMonth(new Date(year, Number(idx), 1)), setIsRightOuterCalendar(!isRightOuterCalendar), handleCustomDate(true, year, idx)
                                                        }} className="select-month" style={{
                                                            backgroundColor: year == nextMonth.getFullYear() && nextMonth.getMonth() == idx ? "#3498ff" : "white",
                                                        }} key={idx}>
                                                            {new Date(0, idx).toLocaleString('default', { month: 'short' })}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </>)}
                            {!isRightOuterCalendar &&
                                <button onClick={() => handleNextMonth(true)}>Next</button>
                            }
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
                            {weekDays?.map((day) => (
                                <div key={day}>{day}</div>
                            ))}
                            {generateNextMonthDays().map((day, index) => (
                                <div
                                    key={index}
                                    onClick={(day == weekends || day == weekends + 7 || day == weekends + 14 || day == weekends + 21 || day == weekends + 28 || day == weekends - 1 || day == weekends + 7 - 1 || day == weekends + 14 - 1 || day == weekends + 21 - 1 || day == weekends + 28 - 1) ? () => console.log("") : () => handleDateClickNextMonth(day)}
                                    style={{
                                        backgroundColor: isDateNextSelected(day) ? '#3498ff' : 'transparent',
                                        cursor: (day == weekends || day == weekends + 7 || day == weekends + 14 || day == weekends + 21 || day == weekends + 28 || day == weekends - 1 || day == weekends + 7 - 1 || day == weekends + 14 - 1 || day == weekends + 21 - 1 || day == weekends + 28 - 1) ? 'not-allowed' : "pointer",
                                    }}
                                >
                                    {day}
                                </div>
                            ))}
                        </div>

                        <div style={{ borderTop: "1px solid black" }}></div>
                        <div style={{ borderTop: "1px", display: "flex", justifyItems: "center", justifyContent: "end" }}>

                            <p style={{
                                backgroundColor: startDate && endDate ? "#3498ff" : "#717273", padding: "5px",
                                margin: "5px",
                                cursor: startDate && endDate ? "pointer" : "not-allowed",
                                color: "white",
                                borderRadius: "2px",
                            }} onClick={startDate && endDate ? () => { setIsCalendarOpen(!isCalendarOpen), setIsHandleOk(true), handleDateRange() } : () => ""}>Ok</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DateRangePicker;
