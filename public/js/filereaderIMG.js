class FileReaderIMG {
    constructor(inputEl, imgEl) {
        this.inputEl = inputEl;
        this.imgEl = imgEl;

        this.initInputEvent();
    }

    initInputEvent() {
        const inputElement = document.querySelector(this.inputEl);
        const imgElement = document.querySelector(this.imgEl);

        if (!inputElement) {
            console.error(`Input element not found: ${this.inputEl}`);
            return;
        }

        if (!imgElement) {
            console.error(`Image element not found: ${this.imgEl}`);
            return;
        }

        inputElement.addEventListener("change", e => {
            if (e.target.files.length > 0) {
                this.reader(e.target.files[0])
                    .then(result => {

                        imgElement.src = result;
                        
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }
        });
    }

    reader(file) {
        return new Promise((resolve, reject) => {
            let reader = new FileReader();

            reader.onload = function() {
                resolve(reader.result); 
            };

            reader.onerror = function() {
                reject('Não foi possível carregar a imagem!');
            };

            reader.readAsDataURL(file);
        });
    }
}
