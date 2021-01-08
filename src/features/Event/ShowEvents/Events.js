import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { MDBBtn, MDBIcon } from "mdbreact";
import AddEventModal from "../AddEvent/AddEventModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents, selectEvents } from "../eventSlice";
import EditEventModal from "../EditEvent/EditEventModal";
import Clock from "./Clock";

const localizer = momentLocalizer(moment);

function Events() {
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch, refresh]);

  /**hooks for handling ADD and EDIT modal */
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [slot, setSlot] = useState();

  const [edit, setEdit] = useState();
  const [events, setEvents] = useState();
  const eventList = useSelector(selectEvents);
  const newList = [];

  useEffect(() => {
    /**fetch events from redux */
    const func = () => {
      if (eventList) {
        for (let i = 0; i < eventList.length; i++) {
          let sTime = eventList[i].startTime.split(":");
          let eTime = eventList[i].endTime.split(":");
          const obj = {
            event_id: eventList[i].event_id,
            start: moment(eventList[i].eventDate)
              .add(sTime[0], "h")
              .add(sTime[1], "m")
              .toDate(),
            end: moment(eventList[i].eventDate)
              .add(eTime[0], "h")
              .add(eTime[1], "m")
              .toDate(),
            title: eventList[i].title,
            guests: eventList[i].guests,
          };
          newList.push(obj);
        }
      }
      setEvents(newList);
      setRefresh(false);
    };
    func();
    // eslint-disable-next-line
  }, [eventList, refresh]);

  /**Modal for view and edit event details */
  const editThisEvent = (e) => {
    setEdit(e);
    setOpenEditModal(true);
  };
  const openModalFromSlot = (newSlot) => {
    setSlot(newSlot);
    setOpenAddModal(true);
  };

  /**Render Calendar once events are fetched from redux state */
  return (
    <>
      <div className="calendar-container">
        <div className="calendar-div">
          {events ? (
            <Calendar
              popup
              localizer={localizer}
              defaultDate={new Date()}
              defaultView="month"
              selectable="true"
              onSelectSlot={(getSlot) => {
                openModalFromSlot(getSlot);
              }}
              onSelectEvent={(e) => {
                editThisEvent(e);
              }}
              events={events}
              style={{ height: "100vh" }}
            />
          ) : (
            false
          )}
        </div>
        <div className="calendar-div-right">
          {/* Live clock */}
          <Clock />
          {/* Add new event button */}
          <MDBBtn
            floating="true"
            size="lg"
            gradient="aqua"
            onClick={() => {
              setOpenAddModal(true);
            }}
          >
            New Event
            <MDBIcon className="ml-2" size="lg" icon="plus-square" />
          </MDBBtn>
        </div>
      </div>
      {/* Add event modal */}
      <AddEventModal
        slot={slot}
        setSlot={setSlot}
        setRefresh={setRefresh}
        modal={openAddModal}
        setModal={setOpenAddModal}
      />
      {/* edit event modal */}
      {openEditModal ? (
        <EditEventModal
          event={edit}
          confirmModal={confirmModal}
          setConfirmModal={setConfirmModal}
          setRefresh={setRefresh}
          modal={openEditModal}
          setModal={setOpenEditModal}
        />
      ) : (
        false
      )}
    </>
  );
}

export default Events;
