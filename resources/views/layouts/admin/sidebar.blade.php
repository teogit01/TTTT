<!-- Left navbar-header -->
<div class="navbar-default sidebar" role="navigation">
    <div class="sidebar-nav navbar-collapse slimscrollsidebar">
        <ul class="nav" id="side-menu">
            <li class="sidebar-search hidden-sm hidden-md hidden-lg">
                <!-- input-group -->
                <div class="input-group custom-search-form">
                    <input type="text" class="form-control" placeholder="Search...">
                    <span class="input-group-btn">
    <button class="btn btn-default" type="button"> <i class="fa fa-search"></i> </button>
    </span> </div>
                <!-- /input-group -->
            </li>              
                {{-- @if (Auth::check() && Auth::user()->hasRole('Admin')) --}}
            <li> 
                <a href="" class="waves-effect"><i data-icon="P" class="linea-icon linea-basic fa-fw"></i> <span class="hide-menu">QUẢN LÝ ĐIỂM DANH</span></a> 
            </li>
            <li> 
                <a href="" class="waves-effect"><i data-icon="P" class="linea-icon linea-basic fa-fw"></i> <span class="hide-menu">QUẢN LÝ GIÁO VIÊN</span></a> 
            </li>      
            <li> 
                <a href="" class="waves-effect"><i data-icon="P" class="linea-icon linea-basic fa-fw"></i> <span class="hide-menu">lỚP HỌC</span></a> 
            </li>        
                
        
        </ul>
    </div>
</div>
<!-- Left navbar-header end -->
