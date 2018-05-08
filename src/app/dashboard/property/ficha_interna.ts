export const ficha_interna = `
<!DOCTYPE html>
<html>

<head>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
        crossorigin="anonymous">
    <style>
        input,
        select {
            border: none !important;
        }

        label {
            font-weight: bold;
        }
    </style>
</head>

<body onload="window.print();window.close()">
    <div class="row" style="display: flex;align-items: center;">
        <div class="col-md-3 text-center">
            <h4 style="color:white; background-color: green">FICHA TECNICA</h4>
        </div>
        <div class="offset-md-7 col-md-2">
            <img src="../assets/img/LogoPCYA.png" width="100%" />
        </div>
    </div>


    <div class="row" style="display: flex;align-items: center;">
        <div class="col-md-3">
            <div class="form-group">
                <label>Fecha</label>
                <input required type="date" class="form-control" name="fecha">
            </div>
        </div>
        <div class="col-md-3">
            <div class="form-group">
                <label>País</label>
                <input class="form-control" /> </div>
        </div>
        <div class="col-md-5" style="border: green 1px solid;height: 50px;">
            <div class="row" style="display: flex;align-items: center;">
                <div class="col-md-3">
                    <label>
                        OPERACION:
                    </label>

                </div>
                <div class="col-md-2">
                    <label>
                        PA-999
                    </label>

                </div>
                <div class="col-md-2">
                    <label>
                        LEGAJO:
                    </label>

                </div>
                <div class="col-md-4">
                    <label>
                        A-CV-1-CA-BA-1528:
                    </label>

                </div>

            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-2">
            <div class="form-group">
                <label>Operacion</label>
                <input class="form-control" /> </div>
        </div>

        <div class="col-md-2">
            <div class="form-group">
                <label>Tipo Inmueble</label>
                <input class="form-control" /> </div>
        </div>
        <div class="col-md-2">
            <div class="form-group">
                <label>Ofrecimiento</label>
                <input class="form-control" /> </div>
        </div>
        <div class="col-md-2">
            <div class="form-group">
                <label>Provincia</label>
                <input class="form-control" /> </div>
        </div>
        <div class="col-md-2">
            <div class="form-group">
                <label>Cat. x Vínculo</label>
                <input class="form-control" /> </div>
        </div>
        <div class="col-md-2">
            <div class="form-group">
                <label>Estado</label>
                <input class="form-control" /> </div>
        </div>

    </div>
    <hr style="border-color:green;" />
    <div class="row">
        <div class="col-md-9">
            <div class="form-group">
                <label>Nombre Inmueble</label>
                <input required type="text" class="form-control">
            </div>
        </div>
        <div class="col-md-3">
            <div class="form-group">
                <label>Vto. Autorización</label>
                <input class="form-control" type="date" name="VTO_AUTORI" />
            </div>
        </div>
    </div>
    <hr style="border-color:green;" />
    <div class="row">
        <div class="col-md-5">
            <div class="form-group">
                <label>Oferente/Requerente</label>
                <input required type="text" class="form-control">
            </div>
        </div>
        <div class="col-md-3">
            <div class="form-group">
                <label>Telefono</label>
                <input type="text" class="form-control">
            </div>
        </div>

        <div class="col-md-4">
            <div class="form-group">
                <label>Mail</label>
                <input type="text" class="form-control">
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-5">
            <div class="form-group">
                <label>Interlocutor</label>
                <input type="text" class="form-control">
            </div>
        </div>
        <div class="col-md-3">
            <div class="form-group">
                <label>Celular</label>
                <input type="text" class="form-control">
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label>Aclaracion</label>
                <input type="text" class="form-control">
            </div>
        </div>
    </div>
    <hr style="border-color:green;" />
    <div class="row">
        <div class="col-md-2">
            <div class="form-group">
                <label>Trader</label>
                <input class="form-control" /> </div>
        </div>
        <div class="col-md-2" *ngIf="propiedad.OFR == '1'">
            <div class="form-group">
                <label>Repr. Local</label>
                <input class="form-control" />
            </div>
        </div>
        <div class="col-md-2" *ngIf="propiedad.OFR == '1'">
            <div class="form-group">
                <label>Prod. Ofr.</label>
                <input class="form-control" />
            </div>
        </div>
        <div class="col-md-3" *ngIf="propiedad.OFR == '1'">
            <div class="form-group">
                <label>Coprod. Ofr.</label>
                <input type="text" class="form-control">
            </div>
        </div>

        <div class="col-md-3" *ngIf="propiedad.OFR == '1'">
            <div class="form-group">
                <label>Inform. Ofr.</label>
                <input type="text" class="form-control">
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-2" *ngIf="propiedad.OFR == '1'">
            <div class="form-group">
                <label>Co-trader</label>
                <input class="form-control" />
            </div>
        </div>

        <div class="col-md-2" *ngIf="propiedad.OFR == '1'">
            <div class="form-group">
                <label>Repr. Zonal</label>
                <input class="form-control" /> </div>
        </div>
        <div class="col-md-2">
            <div class="form-group">
                <label>Prod. Req.</label>
                <input class="form-control" />
            </div>
        </div>
        <div class="col-md-3">
            <div class="form-group">
                <label>Coprod. Req.</label>
                <input type="text" class="form-control">
            </div>
        </div>

        <div class="col-md-3">
            <div class="form-group">
                <label>Inform. Req.</label>
                <input type="text" class="form-control">
            </div>
        </div>
    </div>
    <hr style="border-color:green;" />

    <div class="row">
        <div class="col-md-3">
            <label>Fuente de Captacion Cliente</label>
        </div>
        <div class="col-md-2">
            <div class="form-group">
                <label>Codigo</label>
                <input type="text" class="form-control">
            </div>
        </div>
        <div class="col-md-2">
            <div class="form-group">
                <label>Sub-Codigo</label>
                <input type="text" class="form-control">
            </div>
        </div>
    </div>
    <hr style="border-color:green;" />
    <div class="row">
        <div class="col-md-2">
            <label>Ubicacion</label>
        </div>
        <div class="col-md-2">
            <div class="form-group">
                <label>Región</label>
                <input type="text" class="form-control">
            </div>
        </div>
        <div class="col-md-2">
            <div class="form-group">
                <label>Partido</label>
                <input type="text" class="form-control">
            </div>
        </div>
        <div class="col-md-2">
            <div class="form-group">
                <label>Lista</label>
                <input type="text" class="form-control">
            </div>
        </div>
    </div>
    <div class="row" style="padding:0;">
        <div class="col-md-1">
            <div class="form-group">
                <label>Sur</label>
                <input type="number" class="form-control">
            </div>
        </div>
        <div class="col-md-1">
            <div class="form-group">
                <label>'</label>
                <input type="number" class="form-control">
            </div>
        </div>
        <div class="col-md-1">
            <div class="form-group">
                <label>''</label>
                <input type="number" class="form-control">
            </div>
        </div>
        <div class="col-md-1">
            <div class="form-group">
                <label>Oeste</label>
                <input type="number" class="form-control">
            </div>
        </div>
        <div class="col-md-1">
            <div class="form-group">
                <label>'</label>
                <input type="number" class="form-control">
            </div>
        </div>
        <div class="col-md-1">
            <div class="form-group">
                <label>''</label>
                <input type="number" class="form-control">
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-2">
            <div class="form-group">
                <label>Tipo Ruta</label>
                <input class="form-control" />
            </div>
        </div>
        <div class="col-md-2">
            <div class="form-group">
                <label>Ruta </label>
                <input type="text" class="form-control">
            </div>
        </div>
        <div class="col-md-2">
            <div class="form-group">
                <label>Distancia a ruta</label>
                <input type="text" class="form-control">
            </div>
        </div>
        <div class="col-md-2">
            <div class="form-group">
                <label>Distancia a asfalto</label>
                <input type="text" class="form-control">
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12">
            <agm-map (mapClick)="placeMarker($event)" style="height: 300px;" [latitude]="lat" [longitude]="long" [zoom]="10" [zoomControl]="true"
                [scrollwheel]="false">
                <agm-marker [latitude]="lat" [longitude]="long"></agm-marker>
            </agm-map>
        </div>
    </div>

</body>

</html>
`;