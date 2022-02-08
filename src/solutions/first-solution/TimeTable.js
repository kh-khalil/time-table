import * as React from 'react';
import Paper from '@mui/material/Paper';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import {
   Scheduler,
   Toolbar,
   MonthView,
   WeekView,
   ViewSwitcher,
   Appointments,
   AppointmentTooltip,
   AppointmentForm,
   DragDropProvider,
   EditRecurrenceMenu,
   AllDayPanel,
   TodayButton,
   DateNavigator
} from '@devexpress/dx-react-scheduler-material-ui';
import { connectProps } from '@devexpress/dx-react-core';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

import { appointments } from '../../data/appointments';
import { StyledFab, classes } from "./CustomStyles";
import AppointmentFormContainerBasic from './AppointmentForm'


export default class TimeTable extends React.PureComponent {
   constructor(props) {
      super(props);
      this.state = {
         data: appointments,
         currentDate: new Date().toISOString(),
         confirmationVisible: false,
         editingFormVisible: false,
         deletedAppointmentId: undefined,
         editingAppointment: undefined,
         previousAppointment: undefined,
         addedAppointment: {},
         startDayHour: 9,
         endDayHour: 19,
         isNewAppointment: false,
      };

      this.toggleConfirmationVisible = this.toggleConfirmationVisible.bind(this);
      this.commitDeletedAppointment = this.commitDeletedAppointment.bind(this);
      this.toggleEditingFormVisibility = this.toggleEditingFormVisibility.bind(this);

      this.commitChanges = this.commitChanges.bind(this);
      this.onEditingAppointmentChange = this.onEditingAppointmentChange.bind(this);
      this.onAddedAppointmentChange = this.onAddedAppointmentChange.bind(this);
      this.currentDateChange = (currentDate) => { this.setState({ currentDate }); };
      this.appointmentForm = connectProps(AppointmentFormContainerBasic, () => {
         const {
            editingFormVisible,
            editingAppointment,
            data,
            addedAppointment,
            isNewAppointment,
            previousAppointment,
         } = this.state;

         const currentAppointment = data
            .filter(appointment => editingAppointment && appointment.id === editingAppointment.id)[0]
            || addedAppointment;
         const cancelAppointment = () => {
            if (isNewAppointment) {
               this.setState({
                  editingAppointment: previousAppointment,
                  isNewAppointment: false,
               });
            }
         };

         return {
            visible: editingFormVisible,
            appointmentData: currentAppointment,
            commitChanges: this.commitChanges,
            visibleChange: this.toggleEditingFormVisibility,
            onEditingAppointmentChange: this.onEditingAppointmentChange,
            cancelAppointment,
         };
      });
   }

   componentDidUpdate() {
      this.appointmentForm.update();
   }

   onEditingAppointmentChange(editingAppointment) {
      this.setState({ editingAppointment });
   }

   onAddedAppointmentChange(addedAppointment) {
      this.setState({ addedAppointment });
      const { editingAppointment } = this.state;
      if (editingAppointment !== undefined) {
         this.setState({
            previousAppointment: editingAppointment,
         });
      }
      this.setState({ editingAppointment: undefined, isNewAppointment: true });
   }

   setDeletedAppointmentId(id) {
      this.setState({ deletedAppointmentId: id });
   }

   toggleEditingFormVisibility() {
      const { editingFormVisible } = this.state;
      this.setState({
         editingFormVisible: !editingFormVisible,
      });
   }

   toggleConfirmationVisible() {
      const { confirmationVisible } = this.state;
      this.setState({ confirmationVisible: !confirmationVisible });
   }

   commitDeletedAppointment() {
      this.setState((state) => {
         const { data, deletedAppointmentId } = state;
         const nextData = data.filter(appointment => appointment.id !== deletedAppointmentId);

         return { data: nextData, deletedAppointmentId: null };
      });
      this.toggleConfirmationVisible();
   }

   commitChanges({ added, changed, deleted }) {
      this.setState((state) => {
         let { data } = state;
         if (added) {
            const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
            data = [...data, { id: startingAddedId, ...added }];
         }
         if (changed) {
            data = data.map(appointment => (
               changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
         }
         if (deleted !== undefined) {
            this.setDeletedAppointmentId(deleted);
            this.toggleConfirmationVisible();
         }
         return { data, addedAppointment: {} };
      });
   }

   render() {
      const {
         currentDate,
         data,
         confirmationVisible,
         editingFormVisible,
         startDayHour,
         endDayHour,
      } = this.state;

      return (
         <Paper>
            <Scheduler
               data={data}
               height={660}
               firstDayOfWeek={1}
            >
               <ViewState
                  currentDate={currentDate}
                  onCurrentDateChange={this.currentDateChange}
               />
               <EditingState
                  onCommitChanges={this.commitChanges}
                  onEditingAppointmentChange={this.onEditingAppointmentChange}
                  onAddedAppointmentChange={this.onAddedAppointmentChange}
               />
               <WeekView
                  startDayHour={startDayHour}
                  endDayHour={endDayHour}
               // excludedDays={[5, 6]} //Excluding Friday & Saturday. Accepts an array of zero-based day indexes
               />
               <MonthView />
               <AllDayPanel />
               <EditRecurrenceMenu />
               <Appointments />
               <AppointmentTooltip
                  showOpenButton
                  showCloseButton
                  showDeleteButton
               />
               {/* 
                  Tolbar should be defined before it's elements (view switcher, today btn, date navigator)
                  Ordering from top to bottom will draw the components from right to left 
                */}
               <Toolbar />
               <ViewSwitcher />
               <DateNavigator />
               <TodayButton />

               <AppointmentForm
                  overlayComponent={this.appointmentForm}
                  visible={editingFormVisible}
                  onVisibilityChange={this.toggleEditingFormVisibility}
               />
               <DragDropProvider />
            </Scheduler>

            <Dialog
               open={confirmationVisible}
               onClose={this.cancelDelete}
            >
               <DialogTitle>
                  Delete Appointment
               </DialogTitle>
               <DialogContent>
                  <DialogContentText>
                     Are you sure you want to delete this appointment?
                  </DialogContentText>
               </DialogContent>
               <DialogActions>
                  <Button onClick={this.toggleConfirmationVisible} color="primary" variant="outlined">
                     Cancel
                  </Button>
                  <Button onClick={this.commitDeletedAppointment} color="secondary" variant="outlined">
                     Delete
                  </Button>
               </DialogActions>
            </Dialog>

            <StyledFab
               color="primary"
               className={classes.addButton}
               onClick={() => {
                  this.setState({ editingFormVisible: true });
                  this.onEditingAppointmentChange(undefined);
                  this.onAddedAppointmentChange({
                     startDate: new Date(currentDate).setHours(startDayHour),
                     endDate: new Date(currentDate).setHours(startDayHour + 1),
                  });
               }}
            >
               <AddIcon />
            </StyledFab>
         </Paper>

      );
   }
}
