import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../services/general/general.service';
import { environment } from '../../../environments/environment';
import { http } from '../../helpers/enums';
import { IEpisode, ICharacter, IFavorito } from '../../helpers/interfaces';
import { UiService } from '../../services/ui/ui.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements OnInit {

  public personajes: ICharacter[] = [];

  constructor(
    private generalService: GeneralService,
    private ui: UiService
  ) {
  }

  ngOnInit(): void {
    this.consultarFavoritos();
  }

  private async consultarFavoritos(): Promise<void> {
    const load = await this.ui.loading();
    const promise = await this.generalService.sendRequest(environment.favoritos, {}, true, http.get)
    promise.subscribe(
      (data: IFavorito[]) => {
        load.close();
        this.consultarPersonajes(data);
      },
      (data: any) => {
        load.close();
        console.log('data >>:', data);
      }
    )
  }

  private async consultarPersonajes(favoritos: IFavorito[]): Promise<void> {
    favoritos.forEach(async (personaje: IFavorito) => {
      const promise = await this.generalService.sendRequest(`${environment.consultarPersonajes}/${personaje.id_caracter}`, {}, false, http.get)
      promise.subscribe(
        (data: ICharacter) => {
          this.personajes.push(data)
        }
      )
    });
  }

  public async quitarFavorito(personajeId: number): Promise<void> {
    const p = await this.generalService.sendRequest(environment.favoritos, { id_caracter: personajeId }, true, http.delete)
    p.subscribe(
      (data: any) => {
        const i = this.personajes.findIndex(x => x.id == personajeId);
        if (i != -1) this.personajes.splice(i, 1)
      }
    )
  }
}
