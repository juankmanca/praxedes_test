import { UiService } from '../services/ui/ui.service';
import { IDialogData, IResponse } from './interfaces';
import { optDialog } from './enums';


export class Response {
  constructor(  ) {  }

  public static transformarObjecto(data: any): IDialogData {
    return {
      titulo: data.titulo,
      mensaje: data.mensaje,
      opt: optDialog[data.error ? optDialog.error : optDialog.success]
    }
  }
}