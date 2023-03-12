import { Component } from '@angular/core';
import { GeneralService } from '../../services/general/general.service';
import { environment } from '../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { http } from 'src/app/helpers/enums';
import { IEpisode, ICharacter, IFavorito } from '../../helpers/interfaces';
import { UiService } from '../../services/ui/ui.service';

@Component({
  selector: 'app-episode',
  templateUrl: './episode.component.html',
  styleUrls: ['./episode.component.css']
})
export class EpisodeComponent {

  public episodeId!: number;
  public personajes: ICharacter[] = [];
  public episode: IEpisode = {
    id: 0,
    characters: []
  };
  private personajesFavoritos: IFavorito[] = [];

  constructor(
    private generalService: GeneralService,
    private route: ActivatedRoute,
    private router: Router,
    private ui: UiService
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.episodeId = this.route.snapshot.params['id'];
    await this.consultarFavoritos();
    this.consultarEpisodio();
  }

  private async consultarEpisodio(): Promise<void> {
    if (!this.episodeId) return;
    const load = await this.ui.loading();
    const promise = await this.generalService.sendRequest(`${environment.consultarEpisodios}/${this.episodeId}`, {}, false, http.get)
    promise.subscribe(
      (data: IEpisode) => {
        load.close();
        this.episode = data;
        this.consultarPersonajes(this.episode.characters)
      }
    )
  }

  private async consultarPersonajes(personajes: string[]): Promise<void> {
    personajes.forEach(async (personaje: string) => {
      const promise = await this.generalService.sendRequest(`${personaje}`, {}, false, http.get)
      promise.subscribe(
        (data: ICharacter) => {
          data.favorite = this.personajesFavoritos.find(x => x.id_caracter == data.id) ? true : false
          this.personajes.push(data)
        }
      )
    });
  }

  private async consultarFavoritos(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      const load = await this.ui.loading();
      const promise = await this.generalService.sendRequest(environment.favoritos, {}, true, http.get)
      promise.subscribe(
        (data: IFavorito[]) => {
          load.close();
          this.personajesFavoritos = data;
          resolve();
        },
        (data: any) => {
          load.close();
          console.log('data >>:', data);
          reject();
        }
      )
    });
  }

  public regresar(): void {
    this.router.navigate(['/home'])
  }

  public async seleccionarFavorito(personajeId: number): Promise<void> {
    const body: IFavorito = {
      id_caracter: personajeId,
      observaciones: "",
      usuario: ""
    }
    const load = await this.ui.loading();
    const p = await this.generalService.sendRequest(environment.favoritos, body, true, http.post)
    p.subscribe(
      (data: any) => {
        load.close();
        const i = this.personajes.findIndex(x => x.id == personajeId);
        if (i != -1) this.personajes[i].favorite = true;
      }
    )
  }

  public async quitarFavorito(personajeId: number): Promise<void> {
    const load = await this.ui.loading();
    const p = await this.generalService.sendRequest(environment.favoritos, { id_caracter: personajeId }, true, http.delete)
    p.subscribe(
      (data: any) => {
        load.close();
        const i = this.personajes.findIndex(x => x.id == personajeId);
        if (i != -1) this.personajes[i].favorite = false;
      }
    )
  }
}
