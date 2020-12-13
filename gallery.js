class Gallery{
    constructor(array,pageNumber){
        this.url= "https://api.unsplash.com/photos/?client_id=mNW03mY2k-EPVLz5527fOIDAig10H_vhBjphc00YlFY&page=";
        this.start = 0;
        this.end=1;
        this.page=1;
        this.array=array;
        var _self= this;
        let pictureTemplate = "";
        this.template(pictureTemplate);
        window.addEventListener("scroll", function(){
            if((window.innerHeight+window.pageYOffset)>=document.body.offsetHeight){
                _self.page+=1;
                _self.template();
            }
        })
        
    }
    
    template = function(){
         this.getPictures();       
    }
    
    getPictures=async function(){
        return await fetch(`${this.url}${this.page}`)
                        .then(res=>res.json())
                        .then(res=>{
                            this.array.push(...res);
                            return this.getTemplate(this.array)
                        })
                        .catch(error=>{ throw error; })
    }
    
    getTemplate=function(params){
        if(!params)
        {
            return null;
        }
        for(let obj of params){
            const pictureTemObj = new Pictures();
            pictureTemObj.getTemplate(obj);
        }  
    }
}
