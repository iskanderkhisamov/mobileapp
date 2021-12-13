import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NativeStorage} from '@ionic-native/native-storage/ngx';
import {ActivatedRoute, Router} from '@angular/router';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-update-avatar',
  templateUrl: './update-avatar.page.html',
  styleUrls: ['./update-avatar.page.scss'],
})
export class UpdateAvatarPage implements OnInit {
  token: any;
  images;
  fileData;
  base64textString;

  constructor(
    private http: HttpClient,
    private storage: NativeStorage,
    private router: Router,
    private route: ActivatedRoute,
    private camera: Camera
  ) { }

  cameraImage: string;
  cameraOptions: CameraOptions = {
    quality: 20,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };

  takeSnap() {
    this.camera.getPicture(this.cameraOptions).then((imageData) => {
      const base64Image = 'data:image/jpeg;base64,' + imageData;
      this.cameraImage = base64Image;
    }, (err) => {
      console.log(err);
    });
  }

  ngOnInit() {
    this.cameraImage = '';
  }

  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    const reader = new FileReader();
    reader.onload = this.handleFile.bind(this);
    reader.readAsBinaryString(this.fileData);
  }

  handleFile(event) {
    const binaryString = event.target.result;
    this.base64textString = btoa(binaryString);
    console.log(btoa(binaryString));
  }

  onClickSubmit() {
    this.getToken();
    console.log("token:", this.token);
    console.log("this.base64textString:", this.base64textString);
    const img = this.base64textString;
    this.http.post('http://studentapi.myknitu.ru/updateuserimage/', {token: this.token, img}).subscribe();
    this.router.navigate(['/tabs']);
  }

  onClickSubmitBase64(data) {
    this.getToken();
    console.log("token:", this.token);
    this.http.post('http://studentapi.myknitu.ru/updateuserimage/', {token: this.token, img: data.cameraImage}).subscribe();
    this.router.navigate(['/tabs']);
  }

  getToken() {
    console.log('getToken() in avatar');
    this.storage.getItem('token')
      .then(
        data => {this.token = data; console.log('DATA DATA ДАТА:', data);},
        error => console.error(error)
      );
    console.log('token in avatar: ', this.token);
  }
}
