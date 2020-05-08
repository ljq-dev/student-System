(function (){

    function TrunPage(options, wrap){
        this.nowPage = options.nowPage || 1;
        this.lastPage = options.lastPage || this.nowPage;
        this.wrap = $(wrap) || $('body');
        this.changePage = options.changePage || function (){};
        this.init = function (){
            this.createDom();
            this.bindEvent();
            
        }
    }
    //创建结构
    TrunPage.prototype.createDom = function (){
        
        var oUl = $('<ul class="trunPage-ul"></ul>');
        //上一页
        if(this.nowPage > 1){
            oUl.append($('<li class="pre-page">上一页</li>'))
        }
        //第一页
        oUl.append($('<li class="num">1</li>').addClass(this.nowPage == 1 ? 'cur-page':''));
        
        //前面的省略
        if(this.nowPage - 2 > 2){
            oUl.append($('<span>...</span>'));
        }
        //中间五页
        for(var i = this.nowPage -2; i <= this.nowPage + 2; i++){
            if(i > 1 && i < this.lastPage){
                oUl.append($(`<li class="num">${i}</li>`).addClass(this.nowPage == i ? 'cur-page':''))
            }
        }
        //后面的省略
        if(this.nowPage + 2 < this.lastPage - 1){
            oUl.append($('<span>...</span>'));
        }
        //最后一页
        if(this.lastPage > 1 ){
            oUl.append($(`<li class="num">${this.lastPage}</li>`).addClass(this.nowPage == this.lastPage ? 'cur-page':''))
        }
        //下一页
        if(this.nowPage < this.lastPage){
            oUl.append($('<li class="next-page">下一页</li>'))
        }
        this.wrap.html(oUl);
    }
    //绑定事件
    TrunPage.prototype.bindEvent = function (){
        var self = this;
        $('.pre-page', this.wrap).on('click', function (){
            console.log('==')
            self.nowPage --;
            self.changePage(self.nowPage)
            self.init();
        })
        $('.next-page', this.wrap).on('click', function (){
            self.nowPage ++;
            self.changePage(self.nowPage);
            self.init();
        })
        $('.num', this.wrap).on('click', function (){
            self.nowPage = parseInt($(this).text());
            self.changePage(self.nowPage);
            self.init();
        })
    }
    
    $.fn.extend({
        trunPage: function (options){
            var obj = new TrunPage(options, this);
            obj.init();
        }
    })
    
    
}())