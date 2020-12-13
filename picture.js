class Pictures {
    reaction = 0;

    setReactionType = param => {
        this.reaction = param;
        return this.reaction;
    }

    changeClass = (e, value) => {
        this.setReactionType(value);
        e.target.parentElement.querySelectorAll("span").forEach(obj => obj.classList.remove('highlight'));
        e.target.classList.add("highlight");
        e.stopPropagation();
        e.preventDefault();
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
                                    <span class="like ${this.reaction === 1 && `highlight` || ``}" id="like_${params.user.id}" class="like">like</span>
                                    <span class="dislike ${this.reaction === -1 && `highlight` || ``}" id="dislike_${params.user.id}">Dislike</span>
                                </div>
                                <div class='blur'></div>
                            </div>
                        </div>
                    </div>`;

        template.innerHTML = html;
        template.querySelector("img").addEventListener("click", e => this.clickImage(e));
        template.querySelector(`#like_${params.user.id}`).addEventListener("click", e => this.changeClass(e, 1));
        template.querySelector(`#dislike_${params.user.id}`).addEventListener("click", e => this.changeClass(e, -1));
        document.getElementById("root").appendChild(template);
    }
}