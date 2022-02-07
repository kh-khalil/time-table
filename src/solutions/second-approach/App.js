import 'devextreme/dist/css/dx.light.css';

import { useState, useCallback } from 'react';

import { Scheduler, View, Editing } from 'devextreme-react/scheduler';
import notify from 'devextreme/ui/notify';

import { appointmentsDevExtreme } from '../../data/appointments';

function App() {

   const [currentDate, setCurrentDate] = useState(new Date());

   const handlePropertyChange = useCallback((e) => {
      if (e.name === 'currentDate') {
         setCurrentDate(e.value);
      }
   }, [])

   function showToast(event, value, type) {
      notify(`${event} "${value}" task`, type, 800);
   }

   function showAddedToast(e) {
      showToast('Added', e.appointmentData.text, 'success');
   }

   function showUpdatedToast(e) {
      showToast('Updated', e.appointmentData.text, 'info');
   }

   function showDeletedToast(e) {
      showToast('Deleted', e.appointmentData.text, 'warning');
   }

   return (
      <Scheduler
         timeZone="Europe/Berlin"
         currentDate={currentDate}
         onOptionChanged={handlePropertyChange}
         dataSource={appointmentsDevExtreme}
         textExpr="title"
         allDayExpr="dayLong"
         recurrenceRuleExpr="recurrence"
         defaultCurrentView="week"
         // adaptivityEnabled={true} // for mobile view adaptivity
         showCurrentTimeIndicator={true}
         shadeUntilCurrentTime={true}
         allowDragging={true}
         onAppointmentAdded={showAddedToast}
         onAppointmentUpdated={showUpdatedToast}
         onAppointmentDeleted={showDeletedToast}
      >
         <View
            type="day"
            startDayHour={9}
            endDayHour={19}
         />
         <View
            type="week"
            startDayHour={9}
            endDayHour={19}
         />
         <View type="month" />
         <Editing
            allowDragging={true}
            allowTimeZoneEditing={true}
         />
      </Scheduler>
   );
}

export default App;