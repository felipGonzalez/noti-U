import { Component, OnInit } from '@angular/core';
import { Config } from '../model/Config';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
 
  public port;
  public ip;

  constructor() {
    this.port = Config.getInstance().getPort();
    this.ip = Config.getInstance().getIp();
  }

  ngOnInit() {
  }

  public actuallyData() {
    Config.getInstance().setIp(this.ip);
    Config.getInstance().setPort(this.port);
  }
 
}
