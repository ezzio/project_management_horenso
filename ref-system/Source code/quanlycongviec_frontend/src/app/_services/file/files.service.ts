import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {AuthService} from '../auth/auth.service';


@Injectable({ providedIn: 'root' })
export class FilesService {
  readonly baseUrl = environment.backendUrl;
  constructor(private http: HttpClient, private authService: AuthService) {
  }
  uploadFile(file){
    return this.http.post(this.baseUrl + '/upload/bangluong', file);
  }
  async uploadImage(code, date, type, file){
    const a = this.http.post(this.baseUrl + '/upload/atld/' + code + '/' + date + '/' + type, file).toPromise();
    return a;
  }
  uploadXecaitienImage(name, type, file){
    const a = this.http.post(this.baseUrl + '/upload1/xecaitien/' + name + '/' + type, file);
    return a;
  }
  async upload2ImageGeneral(folder, type, file){
    const email = this.authService.getEmailUser();
    const a = this.http.post(this.baseUrl + '/upload2/' + folder + '/' + email + '/' + type, file).toPromise();
    return a;
  }
  exportBCNghiepVu(content){
    return this.http.post(this.baseUrl + '/export_report', content);
  }
  saveBCNghiepVu(content) {
    return this.http.get(this.baseUrl + '/reports/' + content);
  }
  async uploadImageGeneral(folder, nameFile, type, file){
      const a = this.http.post(this.baseUrl + '/upload/' + folder + '/' + nameFile + '/' + type, file).toPromise();
      return a;
  }
  async uploadLibrary(nameFile, type, file){
    const a = this.http.post(this.baseUrl + '/upload1/thuvien/' + nameFile + '/' + type, file).toPromise();
    return a;
  }
  exportFoxPro(content){
     return this.http.post(this.baseUrl + '/gop_bao_cao_foxpro', content);
  }
  uploadImageXct(formData){
    return this.http.post(this.baseUrl + '/web_upload_data', formData);
  }
}
