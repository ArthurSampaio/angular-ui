'use strict';
(function () {
    var app = angular.module('sadApp');

    app.service("QuestionarioAplicadoService", function ($http, baseUrl, $q) {

        var questionarioService = this;

        const uri = baseUrl + "/questionariosAplicados";

        questionarioService.getQuestionarioAplicadoByID = (id) => {
            let deffered = $q.defer();
            $http.get(`${uri}/${id}`).then(
                function success(response){
                    deffered.resolve(response);
                }, function error(response){
                    deffered.reject(response);
                }
            );
            return deffered.promise;
        };

        questionarioService.aplicarQuestionario = (questionarioId, disciplinaId) => {

            let deffered = $q.defer(); 
            const info = {
                "questionarioId": questionarioId,
                "disciplinaId": disciplinaId
            }
            console.log(info)
            $http.post(`${uri}/aplicar/questionarioId`, disciplinaId).then(
                function success(response){
                    deffered.resolve(response);
                }, function error(response){
                    deffered.reject(response);
                }
            );
            return deffered.promise;

        };

    });
})();
