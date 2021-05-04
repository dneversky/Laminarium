import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "../models/category";


@Injectable()
export class CategoryService {
  private apiBaseUrl = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) {}

  public getAll(): Observable<Category[]>{
    return this.httpClient.get<Category[]>(`${this.apiBaseUrl}/categories/all`);
  }

  public add(category: Category): Observable<Category>{
    return this.httpClient.post<Category>(`${this.apiBaseUrl}/categories/add`, category);
  }

  public update(category: Category): Observable<Category>{
    return this.httpClient.put<Category>(`${this.apiBaseUrl}/categories/update`, category);
  }

  public delete(category: Category): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiBaseUrl}/categories/delete/${category.id}`);
  }
}