import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  valString:string // строка получаемая из формы ввода
  valToJSON; // сюда будет записан массив объектов из строки valString, из него отрисовывается наполнение карточек
  titles = []; // здесь будет массив ключей объектов в valToJSON, из него отрисовываются заголовки карточек
  isReadyToReturn = false; // флаг, отражает состояние приложения (ожидает строку от пользователя или готово это строку (возможно видоизмененную) вернуть)
  
  // метод преобразует введенную пользователем строку в карточки с наполнением
  takeMyString() {
    this.valToJSON = JSON.parse(this.valString); // парсим пользовательскую строку, в этот момент отрисовываются карточки
    this.valToJSON.forEach(element => { // заполняем titles, отрисовываюся заголовки карточек
      Object.keys(element).filter((item) => {
        let name = item.slice(0,1).toUpperCase() + item.slice(1)
        this.titles.includes(name)? '': this.titles.push(name);
      })
    })
    this.isReadyToReturn = !this.isReadyToReturn; // переключаем флаг
  }

  // метод возвращает значения из полей обратно в виде строки сохранив все изменения
  giveMyStringBack() {
    // когда пользователь меняет значения в полях - он меняет их в массиве объектов valToJSON,
    // поэтому мы приводим объект к виду строки и присваиваем это значение valString
    this.valString = JSON.stringify(this.valToJSON); 
    this.isReadyToReturn = !this.isReadyToReturn; // переключаем флаг
  }

  // метод определяет в каком состоянии флаг и решает забирать строку или отдавать
  change() {
    this.isReadyToReturn ? this.giveMyStringBack() : this.takeMyString();
  }
}