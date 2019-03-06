

Vue.component('dragloading',{
    name:'dragloading',
    template:`<div class="dragloading" :style="'height:'+height" :ref="elid" @scroll="checkBottom">
                <div :ref="elid+'child'">
                    <slot></slot>
                </div>
                <div class="dragloading-footer" v-show="loadstatus">加载中...</div>
                <div class="dragloading-nomore" v-show="!loadhasmore">没有更多</div>
            </div>`,
    props:['loadfunc','loadstatus','loadhasmore','height'],
    data:function(){
        return {
            elid:'dragloading'+(+new Date()),
            timer:null
        }
    },
    mounted() {
        this.initContent();
    },
    methods:{
        initContent(){
            let outerHeight = this.$refs[this.elid].offsetHeight;
            let innerHeight = this.$refs[this.elid+'child'].offsetHeight;
            if(outerHeight > innerHeight && this.loadhasmore ){
                this.loadfunc();
            }
        },
        checkBottom(){
            let that = this;
            if(this.timer) clearTimeout(this.timer);
            this.timer = setTimeout(function(){
                let wrap = that.$refs[that.elid], cont = that.$refs[that.elid+'child'];
                if(wrap.scrollTop + wrap.offsetHeight >= cont.offsetHeight - 20){
                    that.loadfunc();
                }
            },100)
            
        }
    }
})