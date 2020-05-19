import {
  Component,
  ViewChild,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ElementRef,
} from "@angular/core";
import {
  NgMDatatable,
  TextColumn,
  ActionColumn,
  NgMDatatableOptions,
} from "mateh-ng-m-datatable";
import { ApiService } from "./services/api.service";
import { Subscription } from "rxjs";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { FormComponentBase } from "mateh-ng-m-validation";
import { Contact } from "./models/contact.model";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "./components/dialog/dialog.component";
import { SubSink } from "subsink";

// Data pressented in the Datatable
interface ContactData {
  id: string;
  fullName: string;
  phoneNumber: string;
  email: string;
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent extends FormComponentBase
  implements OnInit, AfterViewInit, OnDestroy {
  private subs = new SubSink();

  // Open modal button
  @ViewChild("modalTrigger", { static: false, read: ElementRef })
  modalTrigger: ElementRef;

  // Table and options
  @ViewChild(NgMDatatable)
  Datatable: NgMDatatable<ContactData>;
  ngMDatatableOptions: NgMDatatableOptions<ContactData> = {
    title: "My Contacts",
    columns: [
      { id: "fullName", text: "Name" },
      { id: "phoneNumber", text: "Phone Number" },
      { id: "email", text: "email" },
      {
        id: "action",
        text: "Actions",
        type: "action",
        actions: [
          {
            icon: "create",
            text: "Edit",
            handler: (data) => {
              this.selectedID = data.id;
              this.showForm(data);
            },
          },
          {
            icon: "delete",
            text: "Detele",
            handler: (data) => {
              const ref = this.dialog.open(DialogComponent, {
                width: "250px",
                data: { question: "Are you sure?" },
              });

              this.subs.sink = ref.afterClosed().subscribe((result) => {
                if (result) {
                  this.deleteContact(data.id);
                }
              });
            },
          },
        ],
      },
    ],
    displayedColumns: ["fullName", "phoneNumber", "email", "action"],
    addButton: {
      icon: "add",
      handler: () => {
        this.showForm();
      },
    },
  };
  title = "contacts-crud";
  mode: "add" | "edit";
  selectedID: string;

  data: Array<ContactData> = [];

  // Form Creation and Validation Objects
  contactForm: FormGroup;
  validationMessages = {
    fullName: {
      required: "Full Name is required",
    },
    phoneNumber: {
      required: "Phone Number is required",
    },
    email: {
      email: "Email is not well-formatted",
    },
  };

  formErrors = {
    fullName: "",
    phoneNumber: "",
    email: "",
    process: "", //This field will be used to present server errors into the template
  };

  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    super();
    this.initForm();
  }

  ngOnInit() {
    this.subs.sink = this.api.getContacts().subscribe((contacts) => {
      this.data = contacts.map<ContactData>((c) => ({
        id: c._id,
        email: c.email,
        fullName: c.fullName,
        phoneNumber: c.phoneNumber,
      }));
    });
  }

  // Inits the contact form with with default data when adding and Real data when editting
  initForm(c?: ContactData) {
    this.mode = !c ? "add" : "edit";
    this.contactForm = this.fb.group({
      fullName: [!!c ? c.fullName : "", [Validators.required]],
      phoneNumber: [!!c ? c.phoneNumber : "", [Validators.required]],
      email: [!!c ? c.email : "", [Validators.email]],
    });

    if (!c) this.contactForm.reset();
  }

  // Init form and start monitoring controls for errors.
  showForm(c?: ContactData) {
    this.initForm(c);
    this.modalTrigger.nativeElement.click();
    this.startControlMonitoring(this.contactForm);
  }

  ngAfterViewInit() {}

  // Add and Edit logic
  saveContact() {
    if (this.contactForm.valid) {
      const v = this.contactForm.value;
      const contact: Contact = {
        _id: "",
        email: v.email,
        fullName: v.fullName,
        phoneNumber: v.phoneNumber,
      };

      if (this.mode == "add") {
        this.subs.sink = this.api.saveContact(contact).subscribe(
          (res) => {
            console.log(res);
            if (res.ok) {
              this.data = [
                ...this.data,
                {
                  id: res.addedContact._id,
                  email: res.addedContact.email,
                  fullName: res.addedContact.fullName,
                  phoneNumber: res.addedContact.phoneNumber,
                },
              ];
              this.modalTrigger.nativeElement.click();
            } else {
              this.formErrors["process"] = JSON.stringify(res);
            }
          },
          (err) => {
            console.log(err);
            this.formErrors["process"] = err;
          }
        );
      } else {
        delete contact._id;
        this.subs.sink = this.api
          .updateContact(this.selectedID, contact)
          .subscribe(
            (res) => {
              console.log(res);
              if (res.ok) {
                const index = this.data.findIndex(
                  (x) => x.id == res.updatedContact._id
                );
                this.data[index] = {
                  id: res.updatedContact._id,
                  email: res.updatedContact.email,
                  fullName: res.updatedContact.fullName,
                  phoneNumber: res.updatedContact.phoneNumber,
                };

                this.data = [...this.data];
                this.modalTrigger.nativeElement.click();
                this.selectedID = "";
              } else {
                this.formErrors["process"] = JSON.stringify(res);
              }
            },
            (err) => {
              console.log(err);
              this.formErrors["process"] = err.message;
            }
          );
      }
    }
  }

  deleteContact(id: string) {
    this.subs.sink = this.api.deleteContact(id).subscribe(
      (res) => {
        console.log(res);
        if (res.ok) {
          const index = this.data.findIndex((x) => x.id == id);
          console.log("index", index);
          this.data.splice(index, 1);
          this.data = [...this.data];
        } else {
          this.formErrors["process"] = JSON.stringify(res);
        }
      },
      (err) => {
        console.log(err);
        this.formErrors["process"] = JSON.stringify(err.message);
      }
    );
  }

  ngOnDestroy() {
    // Unsubscribe all supscriptions of the component
    this.subs.unsubscribe();
  }
}
