class HcodeGrid {

   
    constructor(configs){

        configs.listeners = Object.assign({
            afterEventUpdateClick: (e) => {
                $('#modal-update').modal('show');
            },
            afterEventDeleteClick: (e) => {
                window.location.reload();
            },
            afterFormCreate: (e) => {
                window.location.reload();
            },
            afterFormUpdate: (e) => {
                window.location.reload();
            },
            afterFormCreateError: (e) => {
                alert('Não foi possível salvar o formulário!');
            },
            afterFormUpdateError: (e) => {
                alert('Não foi possível salvar o formulário!');
            }

        },configs.listeners);

        this.options = Object.assign({},{
            formCreate: '#modal-create form',
            formUpdate : '#modal-update form',
            btnUpdate: '.btn-update',
            btnDelete: '.btn-delete',
            onUpdateLoad: (formUpdate, name, data) => {
                let input = formUpdate.querySelector(`[name=${name}]`);
                if (input) input.value =  data[name];
              }
        }, configs);
        
        this.initForms();
        this.initButtons();
    }

    initForms(){
        let formCreate = document.querySelector(this.options.formCreate);

        formCreate.save().then(json => {
          this.fireEvent('afterFormCreate');
        }).catch(err =>{
            this.fireEvent('afterFormCreateError');
        });

        let formUpdate = document.querySelector(this.options.formUpdate);

        formUpdate.save().then(json => {
            this.fireEvent('afterFormUpdate');
        }).catch(err =>{
            this.fireEvent('afterFormUpdateError');
        });
    }

    fireEvent(name, args){
        if (typeof this.options.listeners[name] === 'function') this.options.listeners[name].apply(this, args);
    }

    initButtons(){
        [...document.querySelectorAll(this.options.btnUpdate)].forEach(btn => {
            btn.addEventListener('click', e => {

            this.fireEvent('beforeEventUpdateClick', [e]);

            let tr = e.composedPath().find(el => el.tagName && el.tagName.toUpperCase() === 'TR');
            let formUpdate = document.querySelector(this.options.formUpdate);
            
                if (tr) {
                    let data = JSON.parse(tr.dataset.row);

                    for (let name in  data) {
                    
                      this.options.onUpdateLoad(formUpdate, name, data);
                    
                    }
                }

                this.fireEvent('afterEventUpdateClick', [e]);
            });
        });

        [...document.querySelectorAll(this.options.btnDelete)].forEach(btn => {
            btn.addEventListener('click', e => {
                console.log(e.target.value);
                this.fireEvent('beforeEventDeleteClick');

                let tr = e.composedPath().find(el => el.tagName && el.tagName.toUpperCase() === 'TR');
    
                if (tr) {
                let data = JSON.parse(tr.dataset.row);
    
                if (confirm(eval('`' + this.options.deleteMsg + '`'))) {
    
                    fetch(eval('`' + this.options.deleteUrl + '`'), {
                        method: 'DELETE'
                    })
                        .then(response => response.json())
                        .then(json => {
                        
                        this.fireEvent('afterEventDeleteClick');
                        
                        });
                    }        
                }
            });
        });
    }
    
}