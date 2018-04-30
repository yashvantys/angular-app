import { Component, OnInit } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { CommonModule } from '@angular/common';
import 'rxjs/add/operator/map';
import { DataTablesModule } from 'angular-datatables';
import {Http, Headers, RequestOptions} from '@angular/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

class UsersData {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}
class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})

export class UserManagementComponent implements OnInit {
  private publicDealsUrl = 'http://local.lumenapi.com/users/index';
  public data: Object;
  dtOptions: DataTables.Settings = {};
  users: UsersData[];
  formValues:Object; 
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getUserList();
  }

  getUserList(): void {
    
    this.dtOptions = {
       pageLength: 2,
      lengthChange:false,
      serverSide: true,
      processing: true,
      //scrollX: true,          
      "language": {
        "emptyTable": "No data available in Users"
      },
      order : [[1, 'asc']],      
     ajax: {
            url: 'http://local.lumenapi.com/users/index',
            type : 'POST',
            dataType : 'json'           
          },
      columns: [
              {
                title: 'ID',
                data: 'id',
                "orderable": false
              },
              {
                title: 'First Name',
                data: 'first_name'
              },
              {
                title: 'Last Name',
                data: 'last_name'
              },
              {
                title: 'Email',
                data: 'email'
              },
              {
                data: null, render: function (data, type, row) {
                    return `<button type="button" class="btn btn-primary editbutton"  users-id="${data.id}" users-name="${data.name}" users-email="${data.email}">Edit</button>
                            <button type="button" class="btn btn-danger deletebutton" users-id="${data.id}">Delete</button>`;
                },
                "orderable": false
            }
          
          ]
         
        }
          
  }
}

