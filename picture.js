class Pictures {
    reaction = 0;
    setFn;
    constructor(fn, reacted){
        this.reaction = reacted || "0";
        this.setFn=fn;
    }

    setReactionType = param => {
        this.reaction = param;
        this.isReacted=param;
        return this.reaction;
    }
    
    
    changeClass = (e, params) => {
        this.setReactionType(params.value);
        e.target.parentElement.querySelectorAll("span").forEach(obj => obj.classList.remove('highlight'));
        e.target.classList.add("highlight");
        e.stopPropagation();
        e.preventDefault();
        this.setFn(params);
    }

    clickImage = e => {

        const modal = document.getElementsByClassName("modal")[0];
        modal.querySelector('img').setAttribute("src", e.currentTarget.src);
        modal.style.display = 'block';
        modal.querySelector("#caption").innerHTML = e.currentTarget.alt || "";
        e.stopPropagation();
    }

    getTemplate = params => {
        let template = document.createElement("div");
        template.setAttribute("class", "table-test");
        let html = `<div class="table-test">    
                        <div class="image-wrapper">
                            <img width="250" height="250" alt="${params.alt_description||""}" src="${params.urls.regular}"/>
                                <div class="reaction">
                                    <span class="like ${(this.reaction == 1 && `highlight`) || ``}" id="like_${params.id}" class="like">like</span>
                                    <span class="dislike ${(this.reaction == -1 && `highlight`) || ``}" id="dislike_${params.id}">Dislike</span>
                                </div>
                                <div class='blur'></div>
                            </div>
                        </div>
                    </div>`;

        template.innerHTML = html;
        template.querySelector("img").addEventListener("click", e => this.clickImage(e));
        template.querySelector(`#like_${params.id}`).addEventListener("click", e => this.changeClass(e, {id: params.id, value:1}));
        template.querySelector(`#dislike_${params.id}`).addEventListener("click", e => this.changeClass(e, {id: params.id, value:-1}));
        document.getElementById("root").appendChild(template);
    }
}