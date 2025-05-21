
export default function LastDayButton(props: { onClick: () => void, title: string }) {
    return (
        <>
            <button className='date-days' onClick={props?.onClick}>{props?.title}</button>
        </>
    )
}
