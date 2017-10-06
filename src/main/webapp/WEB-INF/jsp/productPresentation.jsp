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

    <!-- Custom CSS -->
    <link href="../../css/main.css" rel="stylesheet">
    <link href="../../css/productPresentation.css" rel="stylesheet">

    <!-- JQuery -->
    <script type="text/javascript" src="../../js/jquery-3.2.1.min.js"></script>

    <!-- P5 JS -->
    <script type="text/javascript" src="../../js/p5.min.js"></script>

    <!-- Custom JS -->
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
                <a href="#about" class="btn btn-dark btn-lg">Register</a>
            </div>
        </header>

        <!-- Top sorting networks title -->
        <section id="top-name" class="top-name">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12 text-center">
                        <h2>Here is the top of the best sorting networks found by our players</h2>
                    </div>
                </div>
                <!-- /.row -->
            </div>
            <!-- /.container -->
        </section>

        <!-- Top sorting networks -->
        <section id="top-content" class="top-content bg-primary">
            <div class="container">
                <div class="row text-center">
                    <div id="top-list" class="col-lg-10 col-lg-offset-1">
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