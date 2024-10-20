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
        backgroundColor: "white",
        prof: event.prof,
        salle: event.salle,
        filieres: event.filieres,
        textColor: "black",
        editable: true,
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

const setDateWhenDragOrResize = (info, events) => {
    console.log(info.event.id)
    console.log(info.event.start)
    // chercher dans le tableau et prendre l'event qui a l'id qu'on veut (1)
    const tmpEvents = [...events.value];
    // remplacer les date de fin et de début par la nouvelle date (1)
    // vider et remplacer le tableau d'events
    tmpEvents.forEach((ev, i) => {
        if (ev.id == info.event.id) {
            tmpEvents[i].start = info.event.start
            tmpEvents[i].end = info.event.end
        }
    });
    //alert(info.event.title + " end is now " + info.event.end);
    return tmpEvents
}

const isResponsable = (roles) => {
    return roles?.find(role => role.label == 'responsable') != undefined
}
const isProfesseur = (roles) => {
    return roles?.find(role => role.label == 'professeur') != undefined
}
const isAdmin = (roles) => {
    return roles?.find(role => role.label == 'admin') != undefined
}
export {
    dateFormatter, eventFormToEventToDisplayFormatter, getFirstDayOfWeek, setDateWhenDragOrResize, isResponsable, isProfesseur
}