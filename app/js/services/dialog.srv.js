'use strict';
(function () {
    var app = angular.module('sadApp');

    app.service("DialogService", function ($mdDialog, $q) {

        var service = this;
        const POSITION = "bottom right";

        service.criaDialogConfiguravel = (config) => {   
            let deffered = $q.defer(); 
            $mdDialog.show(config).then(
                function success(data){
                    deffered.resolve(data);
                }
            );
            return deffered.promise;
        };

    })

})();
