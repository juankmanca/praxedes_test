import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { GeneralService } from '../../services/general/general.service';
import { environment } from '../../../environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { http } from 'src/app/helpers/enums';
import { MatPaginator } from '@angular/material/paginator';
import { IEpisode, IAPIResult, IInfo } from '../../helpers/interfaces';
import { UiService } from '../../services/ui/ui.service';

@Component({
  selector: 'app-episodios',
  templateUrl: './episodios.component.html',
  styleUrls: ['./episodios.component.css']
})
export class EpisodiosComponent implements AfterViewInit {
  public displayedColumns: string[] = ['id', 'name', 'episode', 'created', 'characters'];
  public dataSource = new MatTableDataSource<IEpisode>();
  public registros: IEpisode[] = []
  public episodesInfo: IInfo = {
    count: 0,
    next: '',
    pages: 0,
    prev: ''
  };
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private generalService: GeneralService,
    private ui: UiService
  ) { }

  ngAfterViewInit() {
    this.consultarDatos();
    this.dataSource.paginator = this.paginator;
  }

  private async consultarDatos(page: number = 1): Promise<void> {
    const load = this.ui.loading();
    const reponseHttp = await this.generalService.sendRequest(`${environment.consultarEpisodios}?page=${page}`, {}, false, http.get);
    reponseHttp.subscribe(
      (data: IAPIResult) => {
        load.close();
        this.registros = data.results
        this.episodesInfo = data.info;
        this.dataSource.data = this.registros
      }
    )
  }
}
