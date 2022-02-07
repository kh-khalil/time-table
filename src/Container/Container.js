import React, { useState } from 'react';
import TimeTable from '../solutions/first-approach/TimeTable'
import App from '../solutions/second-approach/App'
import { Button } from 'devextreme-react/button';
import './container.css';

export default function Container() {

   const [view, setView] = useState('firstApproach');
   function changeView(requiredView) {
      setView(requiredView);
   }

   if (view === 'home') {
      // return (
      //    <div className='home-container'>
      //       <Button
      //          text="First Approach"
      //          type="normal"
      //          stylingMode="outlined"
      //          onClick={() => changeView('firstApproach')}
      //       />
      //       <Button
      //          text="Second Approach"
      //          type="normal"
      //          stylingMode="outlined"
      //          onClick={() => changeView('secondApproach')}
      //       />
      //    </div>
      // )
   } else if (view === 'firstApproach') {
      return (
         <div className='approach-container'>
            <Button
               className='approach-btn'
               text="Second Approach"
               type="success"
               stylingMode="contained"
               onClick={() => changeView('secondApproach')}
            />
            <a target="_blank" rel="noopener noreferrer" style={{ paddingRight: '0.5rem' }} href='https://devexpress.github.io/devextreme-reactive/react/scheduler/demos/featured/data-editing/'>DevExpress Demo</a>
            <a target="_blank" rel="noopener noreferrer" href='https://devexpress.github.io/devextreme-reactive/react/scheduler/docs/guides/date-navigation/'>Scheduler Guide & API</a>
            <TimeTable />
         </div>
      )
   } else return (
      <div className='approach-container'>
         <Button
            className='approach-btn'
            text="First Approach"
            type="success"
            stylingMode="contained"
            onClick={() => changeView('firstApproach')}
         />
         <a target="_blank" rel="noopener noreferrer" style={{ paddingRight: '0.5rem' }} href='https://js.devexpress.com/Demos/WidgetsGallery/Demo/Scheduler/SimpleArray/React/Light/'>DevExtreme Demo</a>
         <a target="_blank" rel="noopener noreferrer" href='https://js.devexpress.com/Documentation/ApiReference/Common/Object_Structures/dxSchedulerAppointment/#allDay'>Scheduler API</a>
         <App />
      </div>
   )
}