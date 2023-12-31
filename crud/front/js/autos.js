const {createApp} = Vue;

createApp({
    data(){
        return{
            autos: [],
            url: 'https://gonzalospesotcc.pythonanywhere.com/autos',
            cargando: true,
            error: false
        }
    },

    methods: {

        fetchApi(url){
            fetch(url)
            .then(res => res.json())
            .then(data =>{
                this.autos = data;
                this.cargando = false;
            })
            .catch(err=>{
                console.error(err);
                this.error = true;
            })
        },

        eliminar(id){
            const url = this.url+"/"+id
            let options = {
                method: 'DELETE'
            }

            fetch(url,options)
            .then(res => res.json())
            .then(data =>{
                location.reload();
            })
            .catch(err => console.error(err))
        }
    },

    created(){
        this.fetchApi(this.url);
    }
    
}).mount('#app')