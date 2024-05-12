import { Component, OnInit ,OnChanges, OnDestroy, TemplateRef, forwardRef } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Subject } from 'rxjs';
import { MonthViewDay, EventColor } from 'calendar-utils';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { startOfDay, subDays, addDays, endOfMonth, isSameMonth, isSameDay, addHours, endOfDay } from 'date-fns';
import {CalendarCommonModule, CalendarDayModule, CalendarMonthModule, CalendarWeekModule, CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { CalendarUtils } from 'angular-calendar';
import { ChangeDetectionStrategy } from '@angular/core';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ColorPickerModule } from 'primeng/colorpicker';
import { SharedModule } from '../../../../../shared/shared.module';
import { ButtonModule } from 'primeng/button';
import { Validators } from '@angular/forms';
import { JoursFeriesConstants } from '../../../../../core/constants/jours.feries.constants';
import { ExportService } from 'app/core/services/export.service';
import { JourFerierControllerService } from 'app/api/services';
import { JourFerierData, JourFerierDemandeRequest } from 'app/api/models';
import { DashboardService } from 'app/core/services/dashboard.service';

const colors: Record<string, EventColor> = {
  red: {
    primary: '#1ab1d9',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

interface CalendarEventPersistent extends CalendarEvent {
  id?: string | number;
  type?: string;
  type_id?: number;
}

interface HashMapString {
  [key: string | number]: string;
}
interface HashMapNumber {
  [key: string | number]: number;
}

@Component({
  selector: 'app-jours-feries',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule,CalendarCommonModule,  CalendarDayModule, CalendarWeekModule, CalendarMonthModule, FormsModule, ReactiveFormsModule,
    NgbModalModule, ScrollPanelModule, ColorPickerModule, SharedModule, ButtonModule],
  templateUrl: './jours-feries.component.html',
  providers: [JourFerierControllerService, CalendarUtils, DatePipe, ExportService]
})
export class JoursFeriesComponent implements OnInit{

  showAddEventModal: boolean = false;
  showAlertModal: boolean = false;

  controls = {
    title: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required])
  }

  addEventForm: FormGroup = new FormGroup({
    title: this.controls.title,
    startDate: this.controls.startDate,
    endDate: this.controls.endDate,
    type: this.controls.type
  });

  jourFerierDemandeRequest: JourFerierDemandeRequest = {endDate: '', jourFerierTypeId: 0, startDate: '', status: '', title: ''};

  syncing: boolean = false;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
      },
    },
  ];

  refresh = new Subject<void>();
  events: CalendarEventPersistent[] = [];
  displayEvents: CalendarEvent[] = [];

  listTypesJoursFeries: string[] = JoursFeriesConstants.map((jourFerie) => jourFerie.nom);


  hashMapTypesJoursFeries: HashMapString = JoursFeriesConstants.reduce((acc: HashMapString, jourFerie) => {
    acc[jourFerie.id] = jourFerie.nom;
    return acc;
  }, {});
  hashMapTypesJoursFeriesId: HashMapNumber = JoursFeriesConstants.reduce((acc: HashMapNumber, jourFerie) => {
    acc[jourFerie.nom] = jourFerie.id;
    return acc;
  }, {});
  joursFeries: FormControl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]);
  

  activeDayIsOpen: boolean = true;

  containerMesures: {[klass: string]: string | any} = {};

  constructor(private exportService: ExportService,private jourFerierControllerService: JourFerierControllerService ,private dashboardService: DashboardService, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.containerMesures = this.dashboardService.getSettingsPageContainerMesures();
    // if no events in local storage, grab data from the server

      if (localStorage.getItem('events') === null){
      this.jourFerierControllerService
      .getAllJourFerier()
      .subscribe({
        next: (response: Array<JourFerierData>) => {
          // Display Event
          if (response.length > 0){
            let randomColor: number = Math.floor(Math.random() * Object.keys(colors).length);
            let responseToCalendarEvents: CalendarEventPersistent[] = response.map((event: JourFerierDemandeRequest): CalendarEventPersistent => {
              return {
                id: undefined,
                title: event.title!,
                start: startOfDay(new Date(event.startDate!)),
                end: endOfDay(new Date(event.endDate!)),
                type: this.hashMapTypesJoursFeries[event.jourFerierTypeId!],
                type_id: event?.jourFerierTypeId,
                color: colors[Object.keys(colors)[randomColor]],
                draggable: true,
                resizable: {
                  beforeStart: true,
                  afterEnd: true,
                }
              }
            });
            this.displayEvents = [...this.events, ...responseToCalendarEvents];


          }
          // localStorage.setItem('events', JSON.stringify(this.events));
        },
        error: (error) => {
          console.log('Error fetching events' + error.error.error);
        }
      });
    }
    

    // sync events from local storage
    this.events = [...this.events, ...this.fixParsedEvents()];
    
    // Parsing and fixing events
    this.displayEvents = this.convertToCalendarEvents();
  }
  ngAfterViewInit(): void {
    this.refreshView();
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });

    // persist to local storage first
    localStorage.setItem('events', JSON.stringify(this.events));
    
  }

  onSelectView(event: any){
      console.log(event.value);
      let selectedValue: string = (event.value as string).toLowerCase();

      if (selectedValue === 'month'){
        this.setView(CalendarView.Month);
      }else if (selectedValue === 'week'){
        this.setView(CalendarView.Week);
      }else if (selectedValue === 'day'){
        this.setView(CalendarView.Day);
      }
  }

  convertToCalendarEvents(): CalendarEvent[] {
    return this.events.map(({type, type_id ,...event}) => event);
  }

  fixParsedEvents(): CalendarEventPersistent[] {
    let parsedEvents = JSON.parse(localStorage.getItem('events') || '[]');
    if (parsedEvents.length === 0) {
      return [];
    }

    return parsedEvents.map((event: any) => {
      event.start = new Date(event.start);
      event.end = new Date(event.end);
      return event;
    });
  }

  toggleAddEventModal(): void {
    this.showAddEventModal = !this.showAddEventModal;
    this.addEventForm.reset();
  }

  addEvent(): void {
    let randomType = Math.floor(Math.random() * this.listTypesJoursFeries.length); 
    let randomColor = Math.floor(Math.random() * Object.keys(colors).length);

    console.log(this.addEventForm.value);
    let {title, startDate, endDate, type} = this.addEventForm.value;
    // find the type_id
    let type_id: number = this.hashMapTypesJoursFeriesId[type];
    
    
    this.events = [
      ...this.events,
      {
        title: title,
        start: startOfDay(new Date(startDate)),
        end: endOfDay(new Date(endDate)),
        type: type,
        type_id: type_id,
        color: colors[Object.keys(colors)[randomColor]],
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];

    // Display Event
    this.displayEvents = this.convertToCalendarEvents();

    // persist to local storage first
    localStorage.setItem('events', JSON.stringify(this.events));

    // close modal
    this.toggleAddEventModal();

    // refresh view
    this.refreshView();

    // Save to database
    this.jourFerierDemandeRequest = {
      title: title,
      startDate: this.datePipe.transform(startDate, 'yyyy-MM-dd')!,
      endDate: this.datePipe.transform(endDate, 'yyyy-MM-dd')!,
      jourFerierTypeId: type_id,
      status: startDate < new Date() ? 'Passé' : 'à venir'
    };


    this.jourFerierControllerService
    .addJourFerier({
      body: this.jourFerierDemandeRequest
    })
    .subscribe({
      next: (response) => {
        console.log('Event saved successfully');
      },
      error: (error) => {
        console.log('Error saving event' + error.error.error);
      }
    });
    

  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  refreshView(): void {
    this.refresh.next();
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }


  syncEvents(){
    console.log('Syncing Events');
    this.syncing = true;

    // Locale Data
    this.events = this.fixParsedEvents();

    // Convert Data to JourFerierDemandeRequest
    let data = this.events.map((event) => {
      return {
        title: event.title,
        startDate: this.datePipe.transform(event.start, 'yyyy-MM-dd')!,
        endDate: this.datePipe.transform(event.end, 'yyyy-MM-dd')!,
        jourFerierTypeId: event.type_id,
        status: event.end! < new Date() ? 'Passé' : 'à venir'
      }
    });

    // Sync to database
    this.jourFerierControllerService
    .syncJourFerier({
      body: data
    })
    .subscribe({
      next: (response) => {
        console.log('Events synced successfully');
      },
      error: (error) => {
        console.log('Error syncing events' + error.error.error);
      }
    });



    
    setTimeout(() => {
      this.syncing = false;
    }, 3000);
  }

  export(){
    // Exportable data
    let exportedData = this.events.map((event) => {
      return {
        title: event.title,
        start: this.datePipe.transform(event.start, 'yyyy-MM-dd'),
        end: this.datePipe.transform(event.end, 'yyyy-MM-dd'),
        type: event.type,
        status: event.end! < new Date() ? 'Passé' : 'à venir'
      }
    });

    this.exportService.downloadCSV(exportedData, 'jours-feries.csv');
  }
}
