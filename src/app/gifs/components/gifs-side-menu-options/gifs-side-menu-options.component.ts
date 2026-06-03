import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { GifsService } from '../../services/gifs.services';

interface MenuOption {
  label: string;
  sublabel: string;
  router: string;
  icon: string;
}

@Component({
  selector: 'gifs-side-menu-options',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './gifs-side-menu-options.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideMenuOptionsComponent {

  gifsService = inject(GifsService);

  menuOptions: MenuOption[] = [
    {
      label: 'Trending',
      sublabel: 'Gifs Populares',
      router: '/dashboard/trending',
      icon: 'fa-solid fa-chart-line',
    },
        {
      label: 'Search',
      sublabel: 'Buscar Gifs',
      router: '/dashboard/search',
      icon: 'fa-solid fa-magnifying-glass',
    },
  ]
}
