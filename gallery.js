class Gallery {
    cookieList = {};
    constructor(array, pageNumber) {
        this.url = "https://api.unsplash.com/photos/?client_id=mNW03mY2k-EPVLz5527fOIDAig10H_vhBjphc00YlFY&page=";
        this.start = 0;
        this.end = 1;
        this.page = 1;
        this.array = array;
        var _self = this;
        let pictureTemplate = "";
        this.template(pictureTemplate);
        const list = this.getCookie();
        this.cookieList = list && JSON.parse(list) || {};
        window.addEventListener("scroll", function () {
            if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
                _self.page += 1;
                _self.template();
            }
        })

    }
    getCookie=()=>{
        let cookies = document.cookie.split(";");
        for(let i=0;i<cookies.length;i++){
            cookies.indexOf("reactedPicture");
            cookies= cookies[i].replace("reactedPictures=","");
            return cookies;
        }
        return null;
    }


    template = function () {
        this.getPictures();
    }

    getPictures = async function () {
        return await fetch(`${this.url}${this.page}`)
            .then(res => res.json())
            .then(res => {
                this.array.push(...res);
                return this.getTemplate(this.array)
            })
            .catch(error => { throw error; })
    }

    setCookie = (params)=>{
        const cookies=this.getCookie();
        let value = "";
        if(!cookies){
            value= {[`${params.id}`]:params.value};
            this.cookieList[`${params.id}`] = params.value;
        }else{
            value = JSON.parse(cookies);
            value[`${params.id}`] = params.value;
            this.cookieList = {...value};
        }
        const date = new Date();
        date.setTime(date.getTime()+3650000000);
        document.cookie = `reactedPictures=${JSON.stringify(value)};expires=${date.toGMTString()};path=/`;
    }

    getTemplate = function (params) {
        if (!params) {
            return null;
        }
        for (let obj of params) {
            const pictureTemObj = new Pictures(this.setCookie, this.cookieList[`${obj.id}`]);
            pictureTemObj.getTemplate(obj);
        }
    }
}
