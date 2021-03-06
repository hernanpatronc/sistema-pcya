export const ficha_interna = `
<!DOCTYPE html>
<html>

<head>
    <link rel="stylesheet" href="/assets/css/bootstrap.min.css" 
        crossorigin="anonymous">
    <style>
        input,
        select {
            border: none !important;
        }

        body {
            display: none;
            font-size: 20px;
        }
        input {
            color: black !important;
            
            font-size: 20px !important;
        }
        label {
            font-weight: bold;
        }

        @page {
            margin: 0;
        }

        body {
            margin: 1.6cm;
        }

        @media print {
            body {
                display: inherit;
            }
        }
    </style>
</head>

<body onload="window.print();window.close()">
    <div class="row" style="display: flex;align-items: center;">
        <div class="col-md-3 text-center">
            <h4 style="color:white; background-color: green; -webkit-print-color-adjust: exact;">FICHA INTERNA</h4>
        </div>
        <div class="offset-md-7 col-md-2">
            <img src="../assets/img/LogoPCYA.png" width="100%" />
        </div>
    </div>


    <div class="row" style="display: flex;align-items: center;">
        <div class="col-md-2">
            <div class="form-group">
                <label>Fecha</label>
                <input required type="text" class="form-control" name="fecha" value="{{FECHA}}">
            </div>
        </div>
        <div class="col-md-2">
            <div class="form-group">
                <label>País</label>
                <input class="form-control" value="{{PAIS}}"/> </div>
        </div>
        <div class="col-md-8" style="vertical-align: middle; border: green 1px solid;height: 50px;">
            <div class="row" style="vertical-align: middle; display: flex;align-items: center;">
                <div class="col-md-3" style="vertical-align: middle; ">
                    <label style="vertical-align: middle; ">
                        OPERACION:
                    </label>

                </div>
                <div class="col-md-2">
                    <label>
                        {{OPERACION}}
                    </label>

                </div>
                <div class="col-md-2">
                    <label>
                        LEGAJO:
                    </label>

                </div>
                <div class="col-md-4">
                    <label>
                        {{LEGAJO}}
                    </label>

                </div>

            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-2">
            <div class="form-group">
                <label>Operacion</label>
                <input class="form-control" value="{{TIPO_OPERA}}"/> </div>
        </div>

        <div class="col-md-2">
            <div class="form-group">
                <label>Tipo Inmueble</label>
                <input class="form-control" value="{{TIPO_INMU}}" /> </div>
        </div>
        <div class="col-md-2">
            <div class="form-group">
                <label>Ofrecimiento</label>
                <input class="form-control"  value="{{OFR}}"/> </div>
        </div>
        <div class="col-md-2">
            <div class="form-group">
                <label>Provincia</label>
                <input class="form-control"  value="{{ZONA}}"/> </div>
        </div>
        <div class="col-md-2">
            <div class="form-group">
                <label>Cat. x Vínculo</label>
                <input class="form-control"  value="{{CARACTER}}"/> </div>
        </div>
        <div class="col-md-2">
            <div class="form-group">
                <label>Estado</label>
                <input class="form-control"  value="{{ESTADO}}"/> </div>
        </div>

    </div>
    <hr style="border-color:green;" />
    <div class="row">
        <div class="col-md-9">
            <div class="form-group">
                <label>Nombre Inmueble</label>
                <input required type="text" class="form-control"  value="{{NOMBRE_INM}}">
            </div>
        </div>
        <div class="col-md-3">
            <div class="form-group">
                <label>Vto. Autorización</label>
                <input class="form-control" type="text" name="VTO_AUTORI"  value="{{VTO_AUTORI}}"/>
            </div>
        </div>
    </div>
    <hr style="border-color:green;" />
    <div class="row">
        <div class="col-md-5">
            <div class="form-group">
                <label>Oferente/Requerente</label>
                <input required type="text" class="form-control"  value="{{OFER_REQUE}}">
            </div>
        </div>
        <div class="col-md-3">
            <div class="form-group">
                <label>Telefono</label>
                <input type="text" class="form-control"  value="{{TELEFONO}}">
            </div>
        </div>

        <div class="col-md-4">
            <div class="form-group">
                <label>Mail</label>
                <input type="text" class="form-control" value="{{EMAIL}}">
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-5">
            <div class="form-group">
                <label>Interlocutor</label>
                <input type="text" class="form-control"  value="{{INTERLOCUT}}">
            </div>
        </div>
        <div class="col-md-3">
            <div class="form-group">
                <label>Celular</label>
                <input type="text" class="form-control" value="{{CELULAR}}">
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label>Aclaracion</label>
                <input type="text" class="form-control" value="{{DIRECCION}}">
            </div>
        </div>
    </div>
    <hr style="border-color:green;" />
    <div class="row">
        <div class="col-md-2">
            <div class="form-group">
                <label>Trader</label>
                <input class="form-control"  value="{{TRADER}}"/> </div>
        </div>
        <div class="col-md-2" *ngIf="propiedad.OFR == '1'">
            <div class="form-group">
                <label>Repr. Local</label>
                <input class="form-control"  value="{{AGENT_LOCA}}"/>
            </div>
        </div>
        <div class="col-md-2" *ngIf="propiedad.OFR == '1'">
            <div class="form-group">
                <label>Prod. Ofr.</label>
                <input class="form-control" value="{{PRODUCT_O}}" />
            </div>
        </div>
        <div class="col-md-3" *ngIf="propiedad.OFR == '1'">
            <div class="form-group">
                <label>Coprod. Ofr.</label>
                <input type="text" class="form-control" value="{{INFOR_1}}">
            </div>
        </div>

        <div class="col-md-3" *ngIf="propiedad.OFR == '1'">
            <div class="form-group">
                <label>Inform. Ofr.</label>
                <input type="text" class="form-control" value="{{INFOR_2}}">
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-2" *ngIf="propiedad.OFR == '1'">
            <div class="form-group">
                <label>Co-trader</label>
                <input class="form-control" value="{{TRADER_EO}}"/>
            </div>
        </div>

        <div class="col-md-2" *ngIf="propiedad.OFR == '1'">
            <div class="form-group">
                <label>Repr. Zonal</label>
                <input class="form-control" value="{{REPRES_ZON}}"/> </div>
        </div>
        <div class="col-md-2">
            <div class="form-group">
                <label>Prod. Req.</label>
                <input class="form-control" value="{{PRODUCT_R}}"/>
            </div>
        </div>
        <div class="col-md-3">
            <div class="form-group">
                <label>Coprod. Req.</label>
                <input type="text" class="form-control" value="{{INFORM_REQ}}">
            </div>
        </div>

        <div class="col-md-3">
            <div class="form-group">
                <label>Inform. Req.</label>
                <input type="text" class="form-control" value="{{INFORM_RE2}}">
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
                <input type="text" class="form-control" value="{{COD_CAP}}">
            </div>
        </div>
        <div class="col-md-2">
            <div class="form-group">
                <label>Sub-Codigo</label>
                <input type="text" class="form-control" value="{{COD_CAP2}}">
            </div>
        </div>
    </div>
    <hr style="border-color:green;" />
    <div class="row">
        <div class="col-md-3">
            <label>Ubicacion</label>
        </div>
        <div class="col-md-3">
            <div class="form-group">
                <label>Región</label>
                <input type="text" class="form-control" value="{{REGION}}">
            </div>
        </div>
        <div class="col-md-3">
            <div class="form-group">
                <label>Partido</label>
                <input type="text" class="form-control" value="{{SUB_ZONA}}">
            </div>
        </div>
        <div class="col-md-3">
            <div class="form-group">
                <label>Lista</label>
                <input type="text" class="form-control" value="{{LISTA}}">
            </div>
        </div>
    </div>
    <div class="row" style="padding:0;">
        <div class="col-md-2">
            <div class="form-group">
                <label>Sur</label>
                <input type="number" class="form-control" value="{{COORD_S1}}">
            </div>
        </div>
        <div class="col-md-2">
            <div class="form-group">
                <label>'</label>
                <input type="number" class="form-control" value="{{COORD_S2}}">
            </div>
        </div>
        <div class="col-md-2">
            <div class="form-group">
                <label>''</label>
                <input type="number" class="form-control" value="{{COORD_S3}}">
            </div>
        </div>
        <div class="col-md-2">
            <div class="form-group">
                <label>Oeste</label>
                <input type="number" class="form-control" value="{{COORD_W1}}">
            </div>
        </div>
        <div class="col-md-2">
            <div class="form-group">
                <label>'</label>
                <input type="number" class="form-control" value="{{COORD_W2}}">
            </div>
        </div>
        <div class="col-md-2">
            <div class="form-group">
                <label>''</label>
                <input type="number" class="form-control" value="{{COORD_W3}}">
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-3">
            <div class="form-group">
                <label>Tipo Ruta</label>
                <input class="form-control" value="{{RUTA2}}" />
            </div>
        </div>
        <div class="col-md-3">
            <div class="form-group">
                <label>Ruta </label>
                <input type="text" class="form-control" value="{{RUTA}}">
            </div>
        </div>
        <div class="col-md-3">
            <div class="form-group">
                <label>Distancia a ruta</label>
                <input type="text" class="form-control" value="{{KIL_DESDE_}}">
            </div>
        </div>
        <div class="col-md-3">
            <div class="form-group">
                <label>Distancia a asfalto</label>
                <input type="text" class="form-control" value="{{KIL_A_CAMI}}">
            </div>
        </div>
    </div>

</body>

</html>
`;