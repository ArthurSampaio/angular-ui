'use strict';
(function () {
    var app = angular.module('sadApp');

    app.controller("QuestionarioDetalheController", function QuestionarioDetalheController(QuestionarioAplicadoService, DialogService, $state, $stateParams, QuestionarioService, ToastService, DisciplinaService) {

        const NAO_IMPLEMENTADO = "Funcionalidade não implementada";

        var questDetalheCtrl = this;
        questDetalheCtrl.loadQuestionario = () => {
            QuestionarioService.getQuestionarioByID($stateParams.id).then(
                function success(response) {
                    console.log(response.data)
                    questDetalheCtrl.questionario = response.data;
                    console.log(response.data);
                }, function error(response) {
                    console.log(response);
                }
            );
        };

        // questDetalheCtrl.naoFoiAplicado = () => {
        //     return (questDetalheCtrl.questionario.questionariosAplicados != 0 ? false : true);
        // };

        questDetalheCtrl.aplicar = () => {

            const config = {
                controller: DialogController,
                controllerAs: "dialogCtrl",
                templateUrl: './view/listar-turmas-dialog.html',
                parent: angular.element(document.body),
                clickOutsideToClose: true
            };

            DialogService.criaDialogConfiguravel(config).then(
                function (success) {
                    console.log(success);
                    QuestionarioAplicadoService
                        .aplicarQuestionario(questDetalheCtrl.questionario.id,
                        success.id).then(
                            function (response){
                                console.log(response);
                            }, function (error) {
                                console.log(error);
                            }
                        )

                }
            );

            ToastService.criaToastComTema(NAO_IMPLEMENTADO, "orange-toast");

        };

        questDetalheCtrl.editar = () => {
            ToastService.criaToastComTema(NAO_IMPLEMENTADO, "orange-toast");
        };


        function DialogController($mdDialog, DisciplinaService) {

            var dialogCtrl = this;

            DisciplinaService.getTodasAsDisciplinas().then(
                function success(response) {
                    console.log(response);
                    dialogCtrl.turmas = response.data;
                }, function error(response) {
                    console.log(error);
                }
            )

            dialogCtrl.hide = function () {
                $mdDialog.hide();
            };

            dialogCtrl.cancel = function () {
                $mdDialog.cancel();
            };

            dialogCtrl.answer = function (answer) {
                console.log(answer)
                $mdDialog.hide(answer);
            };

            dialogCtrl.aplicar = (data) => {
                $mdDialog.hide(data);
            };
        }

    });
})();