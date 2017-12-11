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
    <link href="../../css/profile.css" rel="stylesheet">
    <link href="../../css/main.css" rel="stylesheet">
    <link href="../../css/productPresentation.css" rel="stylesheet">
    <link href="../../css/sortingNetworkContextMenu.css" rel="stylesheet">

    <!-- JQuery -->
    <script type="text/javascript" src="../../js/jquery-3.2.1.min.js"></script>
    <script type="text/javascript" src="../../js/bootstrap.min.js"></script>

    <!-- P5 JS -->
    <script type="text/javascript" src="../../js/p5.min.js"></script>

    <!-- Custom JS -->
    <script type="text/javascript" src="../../js/navbar.js"></script>
    <script type="text/javascript" src="../../js/sortingNetworkContextMenu.js"></script>
    <script type="text/javascript" src="../../js/topSortingNetworksService.js"></script>
    <script type="text/javascript" src="../../js/profile.js"></script>
    <script type="text/javascript" src="../../js/service.js"></script>
    <script type="text/javascript" src="../../js/sortingNetworkService.js"></script>
    <script type="text/javascript" src="../../js/sortingNetworkP5Canvas.js"></script>

</head>
<body>
<div class="page">
<!-- Navigation bar -->
<nav id="header" class="navbar navbar-fixed-top">
    <div id="header-container" class="container navbar-container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a id="brand" class="navbar-brand" href="#">SNG</a>
        </div>
        <div id="navbar" class="collapse navbar-collapse">
            <ul class="nav navbar-nav">
                <li class="active"><a href="#user-sn-list-container" data-toggle="tab" aria-expanded="true">My networks</a></li>
                <li><a href="#top-sn-list-container" data-toggle="tab" aria-expanded="false">Top</a></li>
                <li><a href="#new-sn-network" data-toggle="tab" aria-expanded="false">New Network</a></li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
                <li class="dropdown">
                    <a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                        <!-- The Profile picture inserted via div class below, with shaping provided by Bootstrap -->
                        <div class="img-rounded profile-img"></div>${firstName} ${lastName}<span class="caret"></span>
                    </a>
                    <ul class="dropdown-menu" role="menu">
                        <li><a href="#">Profile</a></li>
                        <li>
                            <form id="logout-form-id" class="col-sm-offset-1" action="/logout" method="post">
                                <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
                            </form>
                            <a href="#" onclick="$('#logout-form-id').submit()">Log out</a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div><!-- /.nav-collapse -->
    </div><!-- /.container -->
</nav><!-- /.navbar -->

<!-- Navigation tab content: my networks, top and new network -->
<section id="top-content" class="top-content bg-primary">
    <div class="container">
        <div class="row text-center">
            <div class="tab-content">
                <div id="user-sn-list-container" class="tab-pane fade in active col-lg-10 col-lg-offset-1">
                    <ul id="user-sn-pills-list" class="nav nav-pills center-pills">
                    </ul>
                    <div id="user-sn-list" class="tab-content">
                    </div>
                </div>
                <!-- /.col-lg-10 -->
                <div id="top-sn-list-container" class="tab-pane fade in col-lg-10 col-lg-offset-1">
                    <ul id="top-sn-pills-list" class="nav nav-pills center-pills">
                    </ul>
                    <div id="top-sn-list" class="tab-content">
                    </div>
                </div>
                <div id="new-sn-network" class="tab-pane fade in col-lg-10 col-lg-offset-1">
                    <h2>Create new sorting network</h2>
                </div>
            </div>
        </div>
        <!-- /.row -->
    </div>
    <!-- /.container -->
</section>
</div>
</body>
</html>