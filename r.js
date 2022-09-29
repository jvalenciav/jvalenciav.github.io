// https://qlik.dev/tutorials/build-a-simple-web-app
// https://qlik.dev/tutorials/build-a-simple-mashup-using-capability-apis

const qsApp = 'e4a00214-5e7e-4dc5-812e-3cf0bc69b0fd';

const webIntegrationId = 'Cq6djtzH_fHDcjtjTHIXv2QZB-avc13m';

const qlikPath = 'ralca.us.qlikcloud.com';

require.config({
    baseUrl: 'https://'+qlikPath+'/resources',
    webIntegrationId: webIntegrationId
  });

const config = {
    host: qlikPath,
    prefix: '/',
    port: 443,
    isSecure: true,
    webIntegrationId: webIntegrationId
};

const gObjs = [
  
    {o:'bLXP', e:'QV01'},
    {o:'cmHRJ', e:'QV02'},
    {o:'jCFdhS', e:'QV03'},
    {o:'PbaKmds', e:'QV04'}

];

https://ralca.us.qlikcloud.com/resources/assets/external/requirejs/require.js


// funcion interna de apoyo para ejecutar las visualizaciones
function _runQS(){

    require( ["js/qlik"], function ( qlik ) {

        qlik.on( "error", function ( error ) {

            if (error.message == 'ErrorDialog.NoConnectionCreated') {
                alert('Error de conexión. '+
                'Por favor no use sesiones de incognito; limpie sus cookies; '+
                'verifique su conexión de red y en caso necesario consulte sus '+
                'privilegios con el administrador del sistema.');
            } else {
                alert(error.message);
            }
            console.log('Error Qlik.On', error);
        } );

        qlik.setLanguage('es');

        var app = qlik.openApp(qsApp, config);
        
        // Se inicia el proceso de pintar los objetos graficos
        var promises = Array.apply(null, gObjs).map(async function(data /**, index no usado de momento **/) {
                return app.visualization.get(data.o);
            }, this);
            
        // esperar que las promesas se cumplan
        Promise.all(promises).then(function (p){
            // arreglo de promesas cumplidas
            p.forEach(function (vis, i){
                // mostramos la visualizacion
                vis.show(gObjs[i].e);
                
                //solo para las graficas ponemos la opcion de exportar
                if(gObjs[i].e.substr(0,3)!='QVA') {
                    gObjs[i].v = vis;

                }	

            });

        }); 

        // setear el cierre de la app si el usuario abandona la pagina o da F5
        window.addEventListener("beforeunload", function( /** e evento no usado de momento **/){
            app.close();
        }, false);
        
        window.addEventListener("onunload", function( /** e evento no usado de momento **/){
            app.close();
        }, false);		

    } );
        
}

// funcion de arranque
function executeViz() {

    // definicion de funcion interna para redireccion
    function isLoggedIn() {
        return fetch(
            "https://"+qlikPath+"/api/v1/users/me",
            {
            method: "GET",
            mode: "cors",
            credentials: "include",
            headers: {
            "Content-Type": "application/json",
            "qlik-web-integration-id": webIntegrationId
            }
            }
            ).then(function (response){
                return response.status === 200;
            });
    }
    // fin de la definicion
		
    // ejecucion de la funcion interna que redirecciona
    return isLoggedIn().then(function (loggedIn){
		    
			if (!loggedIn) {

					window.location.href =
					"https://"+qlikPath+"/login?qlik-web-integration-id=" +
					webIntegrationId +
					"&returnto=" +
					location.href;

			} else {

				_runQS();

			}
	    });		

}