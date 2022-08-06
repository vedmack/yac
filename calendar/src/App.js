import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import api from './api'

export default class App extends React.Component {

  state = {
    weekendsVisible: true,
    currentEvents: []
  }

  render() {
    return (
      <div className='demo-app'>
        <div className='demo-app-main'>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay,list'
            }}
            initialView='timeGridWeek'
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={this.state.weekendsVisible}
            select={this.handleDateSelect}
            eventContent={renderEventContent} // custom render function
            eventClick={this.handleEventClick}
            //CRUD
            eventAdd={
              function (evPayload) {
                let payload = {
                  title: evPayload.event.title,
                  start: evPayload.event.startStr,
                  end: evPayload.event.endStr,
                  allDay: evPayload.event.allDay
                }
                api.insertEvent(payload).then((response) => {
                  if (response.status === 201) {
                    //update newly created event with DB id
                    //so we can delete it later on from DB
                    evPayload.event.setProp('id', response.data.id);
                    console.log("insertEvent OK " + evPayload.event.title)

                  }
                })
              }
            }
            eventChange={
              function (evPayload) {
                let payload = {
                  title: evPayload.event.title,
                  start: evPayload.event.startStr,
                  end: evPayload.event.endStr,
                  allDay: evPayload.event.allDay
                }
                api.updateEventById(evPayload.event.id, payload).then((response) => {
                  if (response.status === 200) {
                    console.log("updateEvent OK " + evPayload.event.title)
                  }
                })
              }
            }
            eventRemove={
              function (evPayload) {
                api.deleteEventById(evPayload.event.id).then((response) => {
                  if (response.status === 200) {
                    console.log("eventRemove OK" + evPayload.event.title);
                  }
                })
              }
            }
            events={
              function (info, successCallback, failureCallback) {
                api.getAllEvents().then((response) => {
                  if (response.status === 200 && response.data) {
                    let eventsDB = [];
                    response.data.data.forEach(function (event) {
                      eventsDB.push({
                        id: event._id,
                        title: event.title,
                        start: event.start,
                        end: event.end,
                        allDay: event.allDay

                      });
                    });
                    successCallback(eventsDB);
                  } else {
                    failureCallback("Failed to load events, " + response.status);
                  }
                }, (reason) => {
                  failureCallback("Failed to load events, " + reason);
              })}
            }
          />
        </div>
      </div>
    )
  }

  handleDateSelect = (selectInfo) => {
    let id = 'dummy'
    let title = prompt('Please enter a new title for your event')
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection

    if (title) {
      calendarApi.addEvent({
        id,
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      })
    }
  }

  handleEventClick = (clickInfo) => {
    if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove()
    }
  }

  handleEvents = (events) => {
    this.setState({
      currentEvents: events
    })
  }

}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}
