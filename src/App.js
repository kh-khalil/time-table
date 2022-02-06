import 'devextreme/dist/css/dx.light.css';

import { useState, useCallback } from 'react';

import { Scheduler } from 'devextreme-react/scheduler';

import { appointments } from './appointments';

function App() {
   const [currentDate, setCurrentDate] = useState(new Date());
   const handlePropertyChange = useCallback((e) => {
      if (e.name === 'currentDate') {
         setCurrentDate(e.value);
      }
   }, [])

   return (
      <Scheduler
         currentDate={currentDate}
         onOptionChanged={handlePropertyChange}
         dataSource={appointments}
         textExpr="title"
         allDayExpr="dayLong"
         recurrenceRuleExpr="recurrence"
      >

      </Scheduler>
   );
}

export default App;