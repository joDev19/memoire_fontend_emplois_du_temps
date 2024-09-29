const dateFormatter = (date) => {
    return date < 10 ? '0' + date : date
}
const eventFormToEventToDisplayFormatter = (events, event, id = null) => {
    const start = `${event.date}T${event.start}`
    const end = `${event.date}T${event.end}`
    let _event = {
        id: id ? id : events.length + 1,
        title: event.title,
        start: new Date(start), 
        end: new Date(end),
        backgroundColor: "yellow",
        prof: event.prof,
        salle: event.salle,
        filieres: event.filieres,
        textColor: "black",
        // editable: true,
    }
    return _event;
}
export {
    dateFormatter, eventFormToEventToDisplayFormatter
}