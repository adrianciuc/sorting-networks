<!DOCTYPE html>

<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<html lang="en">
<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- All this just to include a favicon image, OMG -->
    <link rel="apple-touch-icon" sizes="57x57" href="../../apple-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="../../apple-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="../../apple-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="../../apple-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="../../apple-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="../../apple-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="../../apple-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="../../apple-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="../../apple-icon-180x180.png">
    <link rel="icon" type="image/png" sizes="192x192"  href="../../android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="../../favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="../../favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="../../favicon-16x16.png">
    <link rel="manifest" href="../../manifest.json">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="../../ms-icon-144x144.png">
    <meta name="theme-color" content="#ffffff">

    <title>SNG</title>

    <!-- Bootstrap Core CSS -->
    <link href="../../css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="../../css/font-awesome.min.css">

    <!-- Custom CSS -->
    <link href="../../css/main.css" rel="stylesheet">
    <link href="../../css/productPresentation.css" rel="stylesheet">
    <link href="../../css/arrow.css" rel="stylesheet">

    <!-- JQuery -->
    <script type="text/javascript" src="../../js/jquery-3.2.1.min.js"></script>
    <script type="text/javascript" src="../../js/bootstrap.min.js"></script>

    <!-- P5 JS -->
    <script type="text/javascript" src="../../js/p5.min.js"></script>

    <!-- Custom JS -->
    <script type="text/javascript" src="../../js/topSortingNetworksService.js"></script>
    <script type="text/javascript" src="../../js/productPresentation.js"></script>
    <script type="text/javascript" src="../../js/service.js"></script>
    <script type="text/javascript" src="../../js/sortingNetworkService.js"></script>
    <script type="text/javascript" src="../../js/sortingNetworkP5Canvas.js"></script>

</head>
    <body>

        <!-- Game title login and register area -->
        <header id="top" class="header">
            <div class="text-vertical-center">
                <h1>Sorting networks game</h1>
                <h3>Try to sort it out</h3>

                <br>
                <a href="/login" class="btn btn-dark btn-lg">Login</a>
                <a href="/register" class="btn btn-dark btn-lg">Register</a>
                <div>
                    <div class="arrow arrow-first"></div>
                </div>
            </div>
        </header>

        <!-- Top sorting networks title -->
        <section class="top-name">
            <div class="container">
                <div class="row">
                    <div class="col-sm-4"><img src="../../img/green.gif" class="img-responsive"></a>
                    </div>
                    <div class="col-sm-8">
                        <h2 class="title">SNG is inspired by this story:</h2>
                        <p>
                            Until 1969 the most efficient sorting network known for 16 wires,
                            was one with 63 comparators obtained using Batcher's method.
                            But in that year, M. W. Green discovered an even better one with 60 comparators.
                            He didn't used a computer algorithm for that purpose, but instead, he drawn it and
                            proved that it can sort any input.
                            Since computers don't have until now an algorithm to follow in order to discover the
                            most efficient sorting network for a given number of wires, users of this web application
                            have a chance to find them.
                        </p>
                    </div>
                </div>
                <!-- /.row -->
            </div>
            <!-- /.container -->
        </section>
        <section id="top-name" class="top-name bg-primary">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12 text-center">
                        <h2>Here is the top of the sorting networks found by our players</h2>
                    </div>
                </div>
            </div>
        </section>

        <!-- Top sorting networks -->
        <section id="top-content" class="top-content bg-primary">
            <div class="container">
                <ul id="top-sn-pills-list" class="nav nav-pills center-pills">
                </ul>
                <div class="row text-center">
                    <div id="top-sn-list" class="tab-content col-lg-10 col-lg-offset-1">
                        <!-- /.row (nested) -->
                    </div>
                    <!-- /.col-lg-10 -->
                </div>
                <!-- /.row -->
            </div>
            <!-- /.container -->
        </section>
    </body>
</html>