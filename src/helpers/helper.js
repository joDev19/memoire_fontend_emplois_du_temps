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
const getFirstDayOfWeek = (date) => {
    // Clone la date pour éviter de modifier l'originale
    const currentDate = new Date(date);
  
    // Calcule le jour de la semaine (0 = dimanche, 1 = lundi, ..., 6 = samedi)
    let day = currentDate.getDay();
  
    // Si le jour est dimanche (day == 0), on considère qu'il est le 7ème jour de la semaine
    if (day === 0) {
      day = 7;
    }
  
    // Modifie la date pour revenir au lundi
    currentDate.setDate(currentDate.getDate() - (day - 1));
  
    return currentDate;
}
export {
    dateFormatter, eventFormToEventToDisplayFormatter, getFirstDayOfWeek
}