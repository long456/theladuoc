import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {EventService} from "../../services/event.service";
import {take} from "rxjs";
import {FileManagerService} from "../../../../shared/services/file-manager.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit{
  isCreate: boolean = false;
  isSubmit: boolean = false;
  eventForm!: FormGroup;
  eventId!: number;
  datePipe = new DatePipe('en-US');
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private message: NzMessageService,
    private eventService: EventService,
    private fileManagerService: FileManagerService,
  ) {}

  ngOnInit() {
    this.isCreate = this.route.snapshot.data['isCreate'];
    this.eventForm =  this.fb.group({
      title: [null,[Validators.required]],
      dateOfEvent: [null,[Validators.required]],
      imagePath: [null,[Validators.required]],
      local: [null,[Validators.required]],
      link: [null,[Validators.required]],
      status: [1],
    });

    if (!this.isCreate) {
      this.route.params.pipe().subscribe(params => {
        const {id} = params;
        this.eventId = id;
        this.eventService.getEventById(this.eventId).subscribe({
          next: res => {
            if (res.success)
              this.eventForm.patchValue(res.data);
          }
        })
      })
    }
  }

  onSelectFile():void {
    this.fileManagerService.selectFile();
    this.fileManagerService.selectedFile.pipe(take(1)).subscribe((data) => {
      this.eventForm.get('imagePath')?.patchValue(data);
    });
  }

  edit():void {
    this.isSubmit = true;
    if (this.eventForm.valid) {
      const dataEvent = {
        ...this.eventForm.value,
        dateOfEvent: this.datePipe.transform(this.eventForm.value.dateOfEvent, 'yyyy-MM-ddTHH:mm:ss') + 'Z',
      }

      if (this.isCreate) {
        this.eventService.createEvent(dataEvent).subscribe({
          next: res => {
            if (res.success) {
              this.message.success(res.messages);
              this.navigateBack();
            } else {
              this.message.error(res.errorMessages);
            }
          },
          error: err => {
            this.message.error(err.error);
          }
        });
      } else {
        const updateEventData = {
          ...dataEvent,
          id: this.eventId,
        }
        this.eventService.updateEvent(updateEventData).subscribe({
          next: res => {
            if (res.success) {
              this.message.success(res.messages);
              this.navigateBack();
            } else {
              this.message.error(res.errorMessages);
            }
          },
          error: err => {
            this.message.error(err);
          }
        });
      }
    }
  }

  navigateBack():void {
    this.router.navigate(['/page/event']);
  }
}
