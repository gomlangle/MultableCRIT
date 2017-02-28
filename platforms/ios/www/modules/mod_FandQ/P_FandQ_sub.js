/**
 * Created by guominglong on 2017/2/28.
 */
function FandQ_sub(){
    var data = null;
    var selfinstance = null;
    var currentSelectedIdx = 0;//当前选择的子项
    this.init = function(){
        selfinstance = this;
    }
    //当页面切换完毕
    this.onmainNavPushEnd = function(e){
        document.getElementById('mainNav').removeEventListener(NavigatorEvent.PushEnd,selfinstance.onmainNavPushEnd);
    }

    this.show = function(){

    }

    this.destroy = function(){
    }

    this.hide = function(){
    }

    /**
     * 填充数据
     * */
    this.fillInfo = function(_data){
        this.data = _data;
        //当数据源加载成功后,将数据源绑定到显示对象列表
        selfinstance.makeLazyListDelegate();
        //批量添加点击事件
        var items = $('#ModuleFandQsub_P').find('ons-list-item');
        $(items).each(function(idx,item){
            $(item).click(function(e){
                currentSelectedIdx = parseInt(item.getAttribute('dataid'));
                //添加页面更换完毕的函数
                document.getElementById('mainNav').addEventListener(NavigatorEvent.PushEnd,selfinstance.onmainNavPushEnd)
                //切换详细页面
                new ModuleFactoryProxy().loadModule(mod_fq_details,function(tpath){
                    document.getElementById('mainNav').pushPage(tpath);
                });
            })
        })
    }

    //懒加载list的委托
    this.makeLazyListDelegate = function(){
        var myList = document.getElementById('level2_list');
        myList.delegate = {
            createItemContent: function(i) {
                return ons._util.createElement(
                    '<ons-list-item dataid="'+i+'" style="font-size: 14px;font-family: -apple-system, \'Helvetica Neue\', Helvetica, Arial, \'Lucida Grande\', sans-serif;">' + selfinstance.getGroupinfoByIdx(i).innerHTML + '<ons-toolbar-button class=\"right\"><ons-icon icon=\'md-chevron-right\'></ons-icon></ons-toolbar-button></ons-list-item>'
                );
            },
            countItems: function() {
                return selfinstance.data.length;
            },
            calculateItemHeight: function(idx) {
                return ons.platform.isAndroid() ? 48 : 44;
            }
        };
        //刷新列表
        myList.refresh();
    }


    //获取一条指定索引的数据
    this.getGroupinfoByIdx = function(idx){
        if(this.data == null || this.data.length == 0){
            return null
        }else{
            var titlenode = this.data[idx].getElementsByTagName('div-item-title')[0];
            return titlenode;
        }
    }

    this.getDetilsInfoByIdx = function(idx){
        if(this.data == null || this.data.length == 0){
            return null
        }else{
            return this.data[idx].getElementsByTagName('div-item-list');
        }
    }
}

//向模块map中注册controller
moduleMap[mod_fq_sub]["controller"] = new FandQ_sub();