import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Contact } from "../models/contact.model";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  // Url of the API to work with.
  URL = environment.apiUrl;
  environ;
  constructor(private http: HttpClient) {}

  // All for methods below return cold observables.

  getContacts() {
    return this.http.get<Contact[]>(`${this.URL}/contacts`);
  }

  saveContact(contact: Contact) {
    return this.http.post<{ ok: boolean; addedContact: Contact }>(
      `${this.URL}/contacts/`,
      contact
    );
  }

  updateContact(id: string, data: Partial<Contact>) {
    return this.http.put<{
      ok: boolean;
      updatedContact: Contact;
    }>(`${this.URL}/contacts/${id}`, data);
  }

  deleteContact(id: string) {
    return this.http.delete<any>(`${this.URL}/contacts/${id}`);
  }
}
