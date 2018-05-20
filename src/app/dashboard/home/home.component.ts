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
    constructor(public propiedadesService : PropiedadesService, public router : Router){}
    public tasks = []//["Unfollow 5 enemies from twitter", "Read \"Following makes Medium better\"", "Create 4 Invisible User Experiences you Never Knew About","Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit","Lines From Great Russian Literature? Or E-mails From My Boss?","Sign contract for \"What are conference organizers afraid of?\""];
    deleteTask(task) {
        this.tasks.splice(this.tasks.indexOf(task), 1)
    }
    colors = [ "#d70206",
        "#f05b4f",
        "#f4c63d",
        "#d17905",
        "#453d3f",
        "#59922b",
        "#0544d3",
        "#6b0392",
        "#f05b4f",
        "#dda458",
        "#eacf7d",
        "#86797d",
        "#b2c326",
        "#6188e2",
        "#a748ca"];
    tipos_inmu = [];
    cod_captacion = [];
    minutos:Date = new Date();
    lastUpdated:number = 0;
    intervalId;
    async ngOnInit() {
        // $.getScript('../../../assets/js/bootstrap-checkbox-radio-switch.js');
        // $.getScript('../../../assets/js/light-bootstrap-dashboard.js');
        // $('[data-toggle="checkbox"]').each(function () {
        //     if($(this).data('toggle') == 'switch') return;
            
        //     var $checkbox = $(this);
        //     $checkbox.checkbox();
        // });
        let statistics = await this.propiedadesService.getStatistics();
        console.log(statistics.FECHA)
        initDemo(statistics.FECHA,statistics.TIPO_INMU, statistics.PRODUCT_O, statistics.PRODUCT_R, statistics.TRADER, statistics.COD_CAP, statistics.COD_CAP2);
        this.tipos_inmu = Object.keys(statistics.TIPO_INMU);
        this.cod_captacion = Object.keys(statistics.COD_CAP);
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
