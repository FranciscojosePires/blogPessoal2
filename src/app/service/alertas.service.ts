import { Injectable } from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal'
import { AlertasComponent } from '../alertas/alertas.component';

@Injectable({
  providedIn: 'root'
})
export class AlertasService {

  constructor(
    private bsModalService: BsModalService
  ) { }
  private showAlert(menssage:string,tipo:String){
    const bsModalResf: BsModalRef=this.bsModalService.show(AlertasComponent)
    bsModalResf.content.type=tipo
    bsModalResf.content.message=menssage
  }
  showAlertDanger(menssage:string){
    this.showAlert(menssage,'danger')
  }
  showAlertSuccess(menssage:string){
    this.showAlert(menssage,'success')
  }
  showAlertInfo(menssage:string){
    this.showAlert(menssage,'info')
  }
}
