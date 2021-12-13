import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  items = [
    {
      text: 'Мое лицо',
      src: '../assets/images/image1.jpg'
    },
    {
      text: 'Мой кот',
      src: '../assets/images/image2.jpg'
    },
    {
      text: 'Мой брат',
      src: '../assets/images/image3.jpg'
    },
    {
      text: 'Картина моего лица',
      src: '../assets/images/image4.jpg'
    },
    {
      text: 'Персонаж',
      src: '../assets/images/image5.jpg'
    },
    {
      text: 'Окно',
      src: '../assets/images/image6.jpg'
    },
  ]

  constructor() {}

}
