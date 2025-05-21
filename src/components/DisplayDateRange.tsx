
export default function DisplayDateRange(props: { startDate: Date | null, endDate: Date | null, setIsCalendarOpen: (isOpen: boolean) => void }) {
  return (
    <>
    <div onClick={() => props.setIsCalendarOpen(true)} className='date-picker'>
                {props?.startDate ? props?.startDate?.toLocaleDateString() : 'MM-dd-yyyy'} -{' '}
                {props?.endDate ? props?.endDate?.toLocaleDateString() : 'MM-dd-yyyy'}
            </div></>
  )
}
