import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { GeneralService } from '../../services/general/general.service';
import { environment } from '../../../environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { http } from 'src/app/helpers/enums';
import { MatPaginator } from '@angular/material/paginator';
import { IEpisode, IAPIResult, IInfo } from '../../helpers/interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {

  // https://rickandmortyapi.com/api/episode?page=2
  displayedColumns: string[] = ['id', 'name', 'episode', 'created', 'characters'];
  dataSource = new MatTableDataSource<IEpisode>();
  registros: IEpisode[] = []
  public episodesInfo: IInfo = {
    count: 0,
    next: '',
    pages: 0,
    prev: ''
  };
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(
    private generalService: GeneralService,
  ) {

  }

  ngAfterViewInit() {
    this.consultarDatos();
    this.dataSource.paginator = this.paginator;
  }

  private async consultarDatos(page: number = 1): Promise<void> {
    const reponseHttp = await this.generalService.sendRequest(`${environment.consultarEpisodios}?page=${page}`, {}, false, http.get);
    reponseHttp.subscribe(
      (data: IAPIResult) => {
        console.log('data.results >>:', data);
        this.registros = data.results
        this.episodesInfo = data.info;
        this.dataSource.data = this.registros
      }
    )
  }


  // public event(event: PageEvent): void {
  //   debugger
  //   const startIndex = (event.pageIndex + 1) * event.pageSize;
  //   const endIndex = startIndex + event.pageSize;
  //   this.dataSource.data = this.registros.slice(startIndex, endIndex);
  //   this.consultarDatos(event.pageIndex + 1)
  // }
}