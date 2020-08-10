<html class="no-js" lang="">
<head>
    @include('/admin/layouts/head')    
</head>


<body>
    <!--[if lt IE 8]>
            <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->
    <!-- Start Header Top Area -->
    @include('/admin/layouts/header')
    <!-- End Header Top Area -->
    <!-- Mobile Menu start -->
    @include('/admin/layouts/mobile-menu')
    <!-- Mobile Menu end -->
    <!-- Main Menu area start-->
    @include('/admin/layouts/main-menu')
    <!-- Main Menu area End-->
    <!-- Start Status area -->
    @include('/admin/layouts/status-area')
    <!-- End Status area-->
    <!-- Start Sale Statistic area-->
    @include('/admin/layouts/statistic-area')
    <!-- End Sale Statistic area-->
    <!-- Start Email Statistic area-->
    @include('/admin/layouts/email-statistic-area')
    <!-- End Email Statistic area-->
    <!-- Start Realtime sts area-->
    @include('/admin/layouts/realtime')
    <!-- End Realtime sts area-->
    <!-- Start Footer area-->
    @include('/admin/layouts/footer')
    <!-- End Footer area-->
   @include('/admin/layouts/js')
</body>

</html>