import { Component, ViewChild, OnInit, AfterViewInit } from "@angular/core";
import { NgMDatatable, TextColumn, ActionColumn } from "mateh-ng-m-datatable";

interface ContactData {
  fullName: string;
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild(NgMDatatable) Datatable: NgMDatatable<ContactData>;
  title = "contacts-crud";
  tableColumns: Array<TextColumn | ActionColumn<ContactData>> = [
    { id: "fullName", text: "Name" },
    {
      id: "action",
      text: "Actions",
      type: "action",
      actions: [
        { icon: "create", text: "Edit", handler: () => {} },
        { icon: "delete", text: "Detele", handler: () => {} },
      ],
    },
  ];

  data: Array<ContactData> = [];

  displayedColumns = ["fullName", "action"];

  ngOnInit() {
    setTimeout(() => {
      this.data = [
        {
          fullName: "jklk",
        },
      ];
    }, 2000);
  }

  ngAfterViewInit() {
    this.Datatable.addButton = {
      icon: "add",
      handler: () => {},
    };
  }
}
