import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent {

  @Input() val:string; // получаем переменную valString, она будет связана с полем ввода
  @Output() valChange = new EventEmitter<any>() 
  @Input() isReadyToReturn:boolean; // получаем состояние флага для синхронизации


  myForm: FormGroup;
  
  constructor(private fb: FormBuilder) {
    this._createForm()
  }
  // инициируем форму
  private _createForm() {
    this.myForm = this.fb.group({
      val: [
        '',
        [// обозначаем валидацию (поле обязательно, и должно быть массивом JSON объектов)
          Validators.required,
          Validators.pattern(/^\[({(,?\s?"[\wа-яА-ЯёЁ]+"\s?:\s?"[^".?]*")+},?\s?)+\]$/)
        ]
      ]
    })
  }

  btnText:string = 'продолжить' // текст кнопки по умолчанию

  // когда форма сабмититься
  onSubmit() {
    if (this.isReadyToReturn) {// если сабмит происходит когда приложение готово вернуть строку (состояние, когда мы можем работать с карточками)
      this.btnText = 'продолжить';// меняется текст кнопки
      this.valChange.emit();// эмитируется событие (нужно для срабатывания внешних методов)
      setTimeout(() => {
        // таймаут нужен чтобы метод сработал в нужный момент, 
        // без него срабатывает поздно. Подозреваю что это связано с колстеком, такой вот небольшой хак.
        // (вообще я не люблю хаки, но тут не понял как иначе сделать)
        this.myForm.patchValue({val: this.val}) // изменяем содержимое поля ввода формы, в соответствии с обновленными полями ввода карточек
      }, 0)
      this._val.enable(); // делаем поле ввода доступным
    } else { // если сабмит происходит когда приложение готово принять строку (состояние в котором доступно поле ввода и не доступно редактирование карточек)
      this.btnText = 'выгрузить' // меняется текст кнопки
      this.valChange.emit(this._val.value); // передается наружу значение поля ввода, и одновременно эмитируется событие (нужно для срабатывания внешних методов)
      this._val.disable();  // поле ввода становится недоступным
    }
  }

  get _val() {//получаем сокращенную запись доступа к полю ввода (используется много раз)
    return this.myForm.get('val')
  }
}
