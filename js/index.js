var curPage = 1; //当前页码
var size = 4; //一页有size列
var totalPage = 1; //总页数
var tableData = [];
var searchWords = '';

function init() {
    location.hash = 'student-list';   //页面一刷新后要显示第一个tab，所以hash也应该修改
    bindEvent();
}
init();
function bindEvent(){
    
    // 监测屏幕，大于md时把面板自动折叠
    $(window).resize(function (){
        if($(window).innerWidth()>=768 && $('.head .bg .collapse').hasClass('show')){
            $('.head .bg #coll').collapse('hide');
        }
    })
    //改变地址栏上的锚点，页面也跟着改变
    $(window).on('hashchange', function (){
        var hash = location.hash;
        $('.main .leftCon nav a').removeClass('active');
        $('.main .leftCon nav a[href="'+hash+'"]').addClass('active');

        $('.rightCon .tab-pane.active').removeClass('active');
        $(hash).addClass('active');
        
    })
    // 点击菜单，锚点跟着变
    $('nav').click(function (e){
        $('.head .bg #coll').collapse('hide');
        console.log(e.target.hash);
        var id = e.target.hash;
        location.hash = id;
    })

    //新增学生中的提交按钮
    $('#student-add-form button').on('click', function (e){
        e.preventDefault();
        if($(e.target).hasClass('btn-success')){
            // console.log($('#student-add-form').serializeArray());  input里要设置name属性，才能获取到数据
            var formAddData = format($('#student-add-form').serializeArray());
            console.log(formAddData);
            if(formAddData){
                requestAjax('addStudent', formAddData, function (res){
                    alert(res.msg);
                    if(res.status == 'success'){
                        location.hash = 'student-list';
                        // $('.menu dd[data-id="student-list"]').click();
                        // getTableData()
                    }
                })
            }
        }
        $('#student-add-form')[0].reset();
       
    })
}
//获取学生数据
function getTableData(){
    requestAjax('findByPage', {page: curPage, size: size}, function (res){
        console.log(res);
        totalPage = Math.ceil(res.data.cont / size);
        tableData = res.data.findByPage;
        renderPage(tableData);
    })
    
}
getTableData();
// 一开始渲染学生列表页面
function renderPage(data){
    var str = '';
    data.forEach(el=>{
        str += `<tr>
        <td>${el.sNo}</td>
        <td>${el.name}</td>
        <td>${el.sex == 0? '男':'女'}</td>
        <td>${el.email}</td>
        <td>${el.birth}</td>
        <td>${el.phone}</td>
        <td>${el.address}</td>
        <td><button class="btn btn-success edit" data-toggle="modal" data-target="#modal">编辑</button><button class="delete ml-2 btn btn-danger">删除</button></td>
    </tr>`
    })
    $('.rightCon #student-list tbody').html(str);
    $('.rightCon .trun-page').trunPage({
        nowPage: curPage,
        lastPage: totalPage,
        changePage: function (num){
            curPage = num;
            if(searchWords){
                searchData(searchWords);
            }else{
                getTableData();

            }
        }
    })
}
//处理#student-add-form的提交按钮，获取正确的数格式
function format(data){
    // console.log(data);
    var flag = true;
    var obj = {};
    data.forEach((ele, index)=>{
        obj[ele.name] = ele.value;
        if(!ele.value){
            flag = false;
        }
    })
    if(flag){
        return obj;
    }else{
        alert('信息不全！');
        return;
    }
}

//封装ajax请求
function requestAjax(url, data, cb){
    $.ajax({
        type: 'get',
        url: 'https://open.duyiedu.com/api/student/'+url,
        data: $.extend({
            appkey: 'jinqun_1580882594891'
        }, data),
        dataType: 'json',
        success: function (res){
            console.log(res);
            cb(res)
        }
    })
}