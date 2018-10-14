var loading = "<img class='loading' src='img/waiting2.gif'</>";
Vue.component('modal', {
  template: '#modal-template'
})
var app = new Vue({
  el: '#app',
  data: {
    url: "",
    size: 100,
    index: 0,
    source: 'collatz',
    type: 'lefttoright',
    factor: 1,
    isLoad: false,
    message: loading,
    items: {},
    showModal: false,
    imageList: ""
      },
  created() {
    this.loadImg(true)
    },
  methods: {
    showList(){
        Object.keys(this.items).forEach(element => {
          this.imageList += element + "\n";
        });
        this.showModal = true;
    },
    loadImg(addToItems) {
    if(this.factor && !isNaN(this.factor) && this.size && !isNaN(this.size) && this.size > 0){
        var newurl = `http://localhost:8080/${this.source}/${this.type}/${this.size}/${this.factor}`;
        if(newurl == this.url)
            return
        this.isLoad = false
        this.url = newurl
        this.message = loading
        if(addToItems){
            var newitem = [this.url,this.source,this.type,this.size,this.factor,"active"]
            var newitemKey = newitem[0]
            if(!Object.keys(this.items).includes(newitem))
                Object.values(this.items).forEach(element => {element[5]=""})
                this.items[newitemKey] = newitem
            }
    } else {
        this.url = ''
        this.isLoad = false
        this.message = 'Size is a number, the width of the image;<br>Factor is any number and impacts the palette.'
    }
      },
      loaded() {
        this.isLoad = true
      },
      reset(source,type,size,factor,item) {
        Object.values(this.items).forEach(element => {element[5]=""})
        item[5] = "active"
        this.source = source
        this.type = type
        this.size = size
        this.factor = factor
        this.loadImg(false)
      }
  }
})
