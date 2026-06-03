import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GifsSideMenu } from "../../components/gifs-side-menu/gifs-side-menu.component";

@Component({
  selector: 'app-dashboard-page',
  imports: [RouterOutlet, GifsSideMenu],
  templateUrl: './dashboard-page.html',
})
export default class DashboardPage {}
