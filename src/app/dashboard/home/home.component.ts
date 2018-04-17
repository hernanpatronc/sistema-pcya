import {Component, OnInit,trigger,state,style,transition,animate,keyframes, group, OnChanges, OnDestroy} from '@angular/core';
import initDemo from '../../../assets/js/charts.js';
// import initNotify from '../../../assets/js/notify.js';
import { PropiedadesService } from '../../services/propiedades.service';
import { Router } from '@angular/router';

declare var $:any;

@Component({
    moduleId: module.id,
    selector: 'home-cmp',
    templateUrl: 'home.component.html'


})

export class HomeComponent implements OnInit, OnDestroy{
    constructor(private propiedadesService : PropiedadesService, private router : Router){}
    public tasks = []//["Unfollow 5 enemies from twitter", "Read \"Following makes Medium better\"", "Create 4 Invisible User Experiences you Never Knew About","Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit","Lines From Great Russian Literature? Or E-mails From My Boss?","Sign contract for \"What are conference organizers afraid of?\""];
    deleteTask(task) {
        this.tasks.splice(this.tasks.indexOf(task), 1)
    }
    colors = ["#1DC7EA","#9368E9","#FB404B","#87CB16","#FFA534","#1F77D0","#5e5e5e","#3b5998","#55acee","#cc2127","#dd4b39"];
    tipos_inmu = [];
    minutos:Date = new Date();
    lastUpdated:number = 0;
    intervalId;
    async ngOnInit() {
        // $.getScript('../../../assets/js/bootstrap-checkbox-radio-switch.js');
        // $.getScript('../../../assets/js/light-bootstrap-dashboard.js');
        $('[data-toggle="checkbox"]').each(function () {
            if($(this).data('toggle') == 'switch') return;
            
            var $checkbox = $(this);
            $checkbox.checkbox();
        });
        let statistics = await this.propiedadesService.getStatistics()
        initDemo(statistics.FECHA,statistics.TIPO_INMU, statistics.PRODUCT_O, statistics.PRODUCT_R, statistics.TRADER);
        this.tipos_inmu = Object.keys(statistics.TIPO_INMU);
        this.minutos = new Date();
        this.intervalId = setInterval(()=>{this.getCurrentTime()}, 20000)
    }
    getCurrentTime() {
        var now = new Date();
        this.lastUpdated = Math.round((now.getTime() - this.minutos.getTime())/60000);
         
    }
    ngOnDestroy(){
        clearInterval(this.intervalId)
    }
}
