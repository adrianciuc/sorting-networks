<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
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
        <link href="../../css/main.css" rel="stylesheet">

        <!-- JQuery -->
        <script type="text/javascript" src="../../js/jquery.js"></script>

        <script type="application/javascript" src="../../js/bootstrap.min.js"></script>

        <%-- Validator for bootstrap form --%>
        <script type="text/javascript" src="../../js/validator.js"></script>

    </head>
    <body>
        <!-- Game title and login form area -->
        <header id="top" class="header">
            <div class="text-vertical-center">
                <h1>Sorting networks game</h1>
                <h3>Try to sort it out</h3>

                <br>
                <div class="container maximus">
                    <form role="form" action="/register" method="post" data-toggle="validator" class="form-horizontal">
                        <div class="form-group">
                            <div class="col-sm-offset-1 col-sm-10">
                                <input type="email" id="email" name="email" placeholder="Enter email" class="form-control" data-error="Invalid email" required>
                                <div class="help-block with-errors"></div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-offset-1 col-sm-10">
                                <input type="password" data-minlength="6" id="password" name="password" placeholder="Enter password" class="form-control" required>
                                <div class="help-block">Minimum 6 characters</div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-offset-1 col-sm-10">
                                <input type="password" data-match="#password" data-match-error="Not same password as above" id="retype-password" name="retype-password" placeholder="Retype password" class="form-control" required>
                                <div class="help-block with-errors"></div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-10">
                                <button type="submit" class="btn btn-dark btn-lg">Register</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </header>
    </body>
</html>
