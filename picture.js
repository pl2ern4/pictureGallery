class Pictures {
    reaction = 0;
    constructor() {
        this.getReactionType;
        this.setReactionType;
        this.getTemplate;
    }

    setReactionType = param => {
        this.reaction = param;
        return this.reaction;
    }

    changeClass = (e, value) => {
        this.setReactionType(value);
        e.target.parentElement.querySelectorAll("span").forEach(obj => obj.classList.remove('highlight'));
        e.target.classList.add("highlight");
    }

    getTemplate = params => {
        let template = document.createElement("div");
        template.setAttribute("class", "table-test");
        let html = `
                    <div class="table-test">    
                        <div class="image-wrapper">
                            <image width="250" height="250" alt="${params.alt_description}" src="${params.urls.regular}"/>
                                <div class="reaction">
                                    <span class="like ${this.reaction === 1 && `highlight` || ``}" id="like_${params.user.id}" class="like">like</span>
                                    <span class="dislike ${this.reaction === -1 && `highlight` || ``}" id="dislike_${params.user.id}">Dislike</span>
                                </div>
                                <div class='blur'></div>
                            </div>
                        </div>
                    </div>`;

        template.innerHTML = html;
        template.querySelector(`#like_${params.user.id}`).addEventListener("click", e => this.changeClass(e, 1));
        template.querySelector(`#dislike_${params.user.id}`).addEventListener("click", e => this.changeClass(e, -1));
        document.getElementById("root").appendChild(template);
    }
}