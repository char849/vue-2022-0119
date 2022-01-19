import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';

createApp({
  data() {
    return {
      url: 'https://vue3-course-api.hexschool.io/v2',
      path: 'charlotte-hexschool',
      products: [],
      temp: {},
    }
  },
  methods: {
    checkApi() {
      const url = `${this.url}/api/user/check`;
      axios.post(url)
        .then(() => {
          this.getData();
        })
        .catch((err) => {
          alert(err.data.message)
          window.location = 'index.html';
        })
    },

    //取得產品總數
    getData() {
      const url = `${this.url}/api/${this.path}/admin/products`;
      axios.get(url)
        .then((res) => {
          this.products = res.data.products;
        })
        .catch((err) => {
          alert(err.data.message);
        })
    },

    //展開單一產品
    showProduct(item) {
      this.temp = item;
    },
    //刪除一個產品
    removeProduct(item) {    
      const id = item.id; 
      const url = `${this.url}/api/${this.path}/admin/product/${id}`;         
      axios.delete(url)
      .then((res) => {
        const index = this.products.finIndex(obj => obj.id === item.id);
        this.products.splice(index, 1);
        alert('刪除成功');
        this.getData();  
        this.temp = {};           
      })
      //失敗結果
      .catch((error) => {
        this.getData();        
      })
    }
    
  },
  
  //初使化
  mounted() {
    // 取出 Token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common.Authorization = token;
    
    //執行驗證登入Token   
    this.checkApi();        
  }
}).mount('#app');
