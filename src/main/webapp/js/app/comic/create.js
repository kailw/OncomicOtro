'use strict';

moduleComic.controller('comicCreateController', ['$scope', '$http', '$location', 'toolService', '$routeParams', 'sessionService',
    function ($scope, $http, $location, toolService, $routeParams, sessionService) {
        $scope.id = $routeParams.id;
        $scope.ob1 = "comic";
        $scope.ob2 = "genero";
        $scope.ob3 = "comicgenero";
        $scope.ob4 = "autor";
        $scope.ob5 = "especialidad";
        $scope.ob6 = "autorespecialidad";
        $scope.ob7 = "idioma";
        $scope.ob8 = "comicidioma";
        $scope.ob9 = "editorial";
        $scope.ob10 = "comiceditorial";
        $scope.fechapublicacion = new Date();
        $scope.aparecer = false;
        $scope.aparecer2 = false;

        // The md-select directive eats keydown events for some quick select
        // logic. Since we have a search input here, we don't need that logic.


        $scope.ajaxDatoComic = {
            id: null,
            desc: null
        };

        $http({
            method: 'GET',
            url: '/json?ob=' + $scope.ob2 + '&op=getpage&rpp=1000&page=1'
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDatoComicGenero = response.data.message;
        }, function (response) {
            $scope.ajaxDatoComicGenero = response.data.message || 'Request failed';
            $scope.status = response.status;
        });

        $http({
            method: 'GET',
            url: '/json?ob=' + $scope.ob4 + '&op=getpage&rpp=1000&page=1'
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDatoAutor = response.data.message;
        }, function (response) {
            $scope.ajaxDatoAutor = response.data.message || 'Request failed';
            $scope.status = response.status;
        });

        $http({
            method: 'GET',
            url: '/json?ob=' + $scope.ob5 + '&op=getpage&rpp=1000&page=1'
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDatoAutorEspecialidad = response.data.message;
        }, function (response) {
            $scope.ajaxDatoAutorEspecialidad = response.data.message || 'Request failed';
            $scope.status = response.status;
        });

        $http({
            method: 'GET',
            url: '/json?ob=' + $scope.ob7 + '&op=getpage&rpp=1000&page=1'
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDatoIdioma = response.data.message;
        }, function (response) {
            $scope.ajaxDatoIdioma = response.data.message || 'Request failed';
            $scope.status = response.status;
        });
        
        
//        $http({
//            method: 'GET',
//            url: '/json?ob=' + $scope.ob9 + '&op=getpage&rpp=1000&page=1'
//        }).then(function (response) {
//            $scope.status = response.status;
//            $scope.ajaxDatoEditorial = response.data.message;
//        }, function (response) {
//            $scope.ajaxDatoEditorial = response.data.message || 'Request failed';
//            $scope.status = response.status;
//        });




        $scope.crear = function () {
            $scope.upload();
            var foto = 'default.svg';
            if ($scope.file !== undefined) {
                foto = $scope.file.name;
            }

            if ($scope.color == null || $scope.destacado == undefined) {
                $scope.color = false;
            }
            if ($scope.destacado == null || $scope.destacado == undefined) {
                $scope.destacado = false;
            }

            if ($scope.descuento == null || $scope.descuento == undefined) {
                $scope.descuento = 0;
            }

            var json = {
                id: null,
                titulo: $scope.titulo,
                desc: $scope.desc,
                isbn: $scope.isbn,
                fechapublicacion: $scope.fechapublicacion,
                pagina: $scope.pagina,
                color: $scope.color,
                existencias: $scope.existencias,
                precio: $scope.precio,
                descuento: $scope.descuento,
                foto: foto,
                destacado: $scope.destacado,
                id_coleccion: $scope.ajaxDatoComic.id
            };
            $http({
                method: 'GET',
                withCredentials: true,
                url: '/json?ob=' + $scope.ob1 + '&op=create',
                params: {json: JSON.stringify(json)}
            }).then(function (response) {
                $scope.idCreado = response.data.message.id;
                $scope.status = response.status;
                $scope.mensaje = true;
                $scope.idGenero = 0;
                for (var i = 0; i < $scope.seleccionarGenero.length; i++) {
                    $scope.idGenero = $scope.seleccionarGenero[i];
                    var json1 = {
                        id: null,
                        id_comic: $scope.idCreado,
                        id_genero: $scope.idGenero
                    };
                    $http({
                        method: 'GET',
                        withCredentials: true,
                        url: '/json?ob=' + $scope.ob3 + '&op=create',
                        params: {json: JSON.stringify(json1)}
                    }).then(function (response) {
                        $scope.status = response.status;
                    }, function (response) {
                        $scope.status = response.status;
                    });
                }


                for (var i = 0; i < $scope.seleccionarIdioma.length; i++) {
                    $scope.idIdioma = $scope.seleccionarIdioma[i];
                    var json4 = {
                        id: null,
                        id_comic: $scope.idCreado,
                        id_idioma: $scope.idIdioma
                    };
                    $http({
                        method: 'GET',
                        withCredentials: true,
                        url: '/json?ob=' + $scope.ob8 + '&op=create',
                        params: {json: JSON.stringify(json4)}
                    }).then(function (response) {
                        $scope.status = response.status;
                    }, function (response) {
                        $scope.status = response.status;
                    });
                }

                $scope.idAutor = $scope.seleccionarAutor1;
                for (var i = 0; i < $scope.seleccionarEspecialidad1.length; i++) {
                    $scope.idEspecialidad = $scope.seleccionarEspecialidad1[i];
                    var json2 = {
                        id: null,
                        id_especialidad: $scope.idEspecialidad,
                        id_comic: $scope.idCreado,
                        id_autor: $scope.idAutor
                    };
                    $http({
                        method: 'GET',
                        withCredentials: true,
                        url: '/json?ob=' + $scope.ob6 + '&op=create',
                        params: {json: JSON.stringify(json2)}
                    }).then(function (response) {
                        $scope.status = response.status;
                    }, function (response) {
                        $scope.status = response.status;
                    });
                }

                if ($scope.seleccionarAutor2 > 0) {
                    $scope.idAutor = $scope.seleccionarAutor2;
                    for (var i = 0; i < $scope.seleccionarEspecialidad2.length; i++) {
                        $scope.idEspecialidad = $scope.seleccionarEspecialidad2[i];
                        var json3 = {
                            id: null,
                            id_especialidad: $scope.idEspecialidad,
                            id_comic: $scope.idCreado,
                            id_autor: $scope.idAutor
                        };
                        $http({
                            method: 'GET',
                            withCredentials: true,
                            url: '/json?ob=' + $scope.ob6 + '&op=create',
                            params: {json: JSON.stringify(json3)}
                        }).then(function (response) {
                            $scope.status = response.status;
                        }, function (response) {
                            $scope.status = response.status;
                        });
                    }
                } else if ($scope.seleccionarAutor3 > 0) {
                    $scope.idAutor = $scope.seleccionarAutor3;
                    for (var i = 0; i < $scope.seleccionarEspecialidad3.length; i++) {
                        $scope.idEspecialidad = $scope.seleccionarEspecialidad3[i];
                        var json4 = {
                            id: null,
                            id_especialidad: $scope.idEspecialidad,
                            id_comic: $scope.idCreado,
                            id_autor: $scope.idAutor
                        };
                        $http({
                            method: 'GET',
                            withCredentials: true,
                            url: '/json?ob=' + $scope.ob6 + '&op=create',
                            params: {json: JSON.stringify(json4)}
                        }).then(function (response) {
                            $scope.status = response.status;
                        }, function (response) {
                            $scope.status = response.status;
                        });
                    }
                }
            }, function (response) {
                $scope.status = response.status;
            });

        };

        $scope.variable = 0;
        $scope.model1 = false;
        $scope.model2 = false;
        $scope.otroInput = function () {
            if ($scope.variable === 0) {
                $scope.aparecer = true;
                $scope.model1 = true;
            } else {
                $scope.aparecer2 = true;
                $scope.variable = 0;
                $scope.model2 = true;
            }

            $scope.variable++;
        };


        $scope.quitarInput = function () {
            $scope.aparecer = false;
            $scope.variable = 0;
            $scope.model1 = false;

        };
        $scope.quitarInput2 = function () {
            $scope.aparecer2 = false;
            $scope.variable = 0;
            $scope.model2 = false;
        };








        $scope.isActive = toolService.isActive;



        $scope.tipoProductoRefresh = function (quiensoy, consulta) {
            var form = quiensoy;
            if ($scope.vacio === "") {
                $scope.vacio;
            } else {
                $scope.vacio = "";
            }
            if (consulta) {
                $http({
                    method: 'GET',
                    url: 'json?ob=coleccion&op=get&id=' + $scope.ajaxDatoComic.id
                }).then(function (response) {
                    $scope.ajaxDatoComic = response.data.message;
                    if ($scope.ajaxDatoComic !== null) {
                        form.userForm.id_coleccion.$setValidity('valid', true);
                    } else {
                        form.userForm.id_coleccion.$setValidity('valid', false);
                        $scope.vacio = "Error al acceder a la colección";
                    }

                }, function (response) {
                    form.userForm.id_coleccion.$setValidity('valid', false);
                    $scope.ajaxDatoComic.desc = "Error al acceder al la colección";
                });
            } else {
                form.userForm.id_coleccion.$setValidity('valid', true);
            }
        };

        $scope.upload = function () {
            var file = $scope.file;
            var oformData = new FormData();
            oformData.append('file', file);

            $http({
                headers: {'Content-Type': undefined},
                method: 'POST',
                data: oformData,
                url: 'json?ob=comic&op=loadimage'
            }).then(function (response) {
                console.log(response);
            }, function (response) {
                console.log(response);
            });
        };

    }
]).directive('fileModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;

                element.bind('change', function () {
                    scope.$apply(function () {
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    }]);

