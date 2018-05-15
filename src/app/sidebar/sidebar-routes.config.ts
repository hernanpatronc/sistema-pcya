import {  RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
    { path: 'dashboard', title: 'Panel de Control',  icon: 'pe-7s-graph', class: '', privilegesNeeded : [-1] },
    { path: 'property', title: 'Alta Propiedades',  icon:'pe-7s-home', class: '', privilegesNeeded : [1, -1] },
    { path: 'user', title: 'Lista Usuarios',  icon:'pe-7s-user', class: '', privilegesNeeded : [-1] },
    { path: 'table', title: 'Lista Propiedades',  icon:'pe-7s-note2', class: '', privilegesNeeded : [0, 1, -1] },
    // { path: 'icons', title: 'Icons',  icon:'pe-7s-science', class: '' },
    // { path: 'files', title: 'Archivos',  icon:'pe-7s-note2', class: '', privilegesNeeded : ["0", "1", "-1"] },
    //{ path: 'maps', title: 'Maps',  icon:'pe-7s-map-marker', class: '' },
    //{ path: 'notifications', title: 'Notifications',  icon:'pe-7s-bell', class: '' },

];
