import React, { useState } from 'react';
import TimeTable from '../solutions/first-solution/TimeTable'
import App from '../solutions/second-solution/App'
import { Button } from 'devextreme-react/button';
import './container.css';

export default function Container() {

   const [view, setView] = useState('firstSolution');
   function changeView(requiredView) {
      setView(requiredView);
   }

   if (view === 'home') {
      // return (
      //    <div className='home-container'>
      //       <Button
      //          text="First Solution"
      //          type="normal"
      //          stylingMode="outlined"
      //          onClick={() => changeView('firstSolution')}
      //       />
      //       <Button
      //          text="Second Solution"
      //          type="normal"
      //          stylingMode="outlined"
      //          onClick={() => changeView('secondSolution')}
      //       />
      //    </div>
      // )
   } else if (view === 'firstSolution') {
      return (
         <div className='soln-container'>
            <Button
               className='soln-btn'
               text="Second Solution"
               type="success"
               stylingMode="contained"
               onClick={() => changeView('secondSolution')}
            />
            <a target="_blank" rel="noopener noreferrer" style={{ paddingRight: '0.5rem' }} href='https://devexpress.github.io/devextreme-reactive/react/scheduler/demos/featured/data-editing/'>
               DevExpress Demo
            </a>
            <a target="_blank" rel="noopener noreferrer" href='https://devexpress.github.io/devextreme-reactive/react/scheduler/docs/guides/date-navigation/'>
               Scheduler Guide & API
            </a>

            <TimeTable />
         </div>
      )
   } else return (
      <div className='soln-container'>
         <Button
            className='soln-btn'
            text="First Solution"
            type="success"
            stylingMode="contained"
            onClick={() => changeView('firstSolution')}
         />
         <a target="_blank" rel="noopener noreferrer" style={{ paddingRight: '0.5rem' }} href='https://js.devexpress.com/Demos/WidgetsGallery/Demo/Scheduler/SimpleArray/React/Light/'>
            DevExtreme Demo
         </a>
         <a target="_blank" rel="noopener noreferrer" href='https://js.devexpress.com/Documentation/ApiReference/Common/Object_Structures/dxSchedulerAppointment/#allDay'>
            Scheduler API
         </a>

         <App />
      </div>
   )
}