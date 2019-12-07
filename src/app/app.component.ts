import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  valArr = [{"name": "name1", "year": "1864"}, {"name": "name2", "year": "1995", "id": "3"}];
  arr = [];
  val;
  condition = false;
  take:string;
  show() {
    this.val = JSON.stringify(this.valArr);
    this.condition = !this.condition;
  }
  chng() {
    this.valArr = JSON.parse(this.val);
    this.valArr.forEach(element => {
      Object.keys(element).filter((item) => {
        this.arr.includes(item)? '': this.arr.push(item);
      })
    });
    this.condition = !this.condition;
  }
}