import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Contact } from "../models/contact.model";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  URL = "http://localhost:8000/api/contacts";
  constructor(private http: HttpClient) {}

  getContacts() {
    return this.http.get(`${this.URL}/contacts`);
  }

  saveContact(contact: Contact) {
    return this.http.post(`${this.URL}/contacts/`, contact);
  }

  updateContact(id: string, data: Partial<Contact>) {
    return this.http.get(`${this.URL}/contacts/${id}`, data);
  }

  deleteContact(id: string) {
    return this.http.delete(`${this.URL}/contacts/${id}`);
  }
}
