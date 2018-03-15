Vue.component('ueditor',{
    name:'ueditor',
    template:'<script type="text/plain" :id="elid"></script>',
    props:{
        content:{
            type:String
        },
        config:{
            type:Object
        }
    },
    data:function(){
        return {
            editor:null,
            elid:"ueditor"+(+new Date())+parseInt(Math.random()*10000),// 一个页面如果多个，需要进行随机ID
            isReady: false,
            isInit: false
        }
    },
    watch: {
      content(val) {
        if (val && this.isReady && val !== this.editor.getContent()) {
          this.editor.setContent(val);
        }
      }
    },
    mounted() {
        var _this = this;
        this.$nextTick(function(){
            _this.editor = UE.getEditor(_this.elid, _this.config); // 初始化UE
            _this.editor.addListener("ready", function () {
                _this.editor.setContent(_this.content); // 确保UE加载完成后，放入内容。
            });
            _this.editor.addListener("contentChange", function(){
                var content = _this.editor.getContent()
                _this.$emit('change', content)
            });
            _this.isReady = true
        })
    },
    methods: {
        getUEContent() { // 获取内容方法
            return this.editor.getContent()
        }
    },
    destroyed() {
        this.editor && this.editor.destroy();
    }
})