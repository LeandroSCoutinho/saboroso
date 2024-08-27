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
            btnUpdate: 'btn-update',
            btnDelete: 'btn-delete',
            onUpdateLoad: (formUpdate, name, data) => {
                let input = formUpdate.querySelector(`[name=${name}]`);
                if (input) input.value =  data[name];
              }
        }, configs);
        
        this.rows = [...document.querySelectorAll('table tbody tr')];

        this.initForms();
        this.initButtons();
    }

    initForms(){
        this.formCreate = document.querySelector(this.options.formCreate);

        this.formCreate.save({
            success: () => {
                this.fireEvent('afterFormCreate');
            },
            failure: () => {
                this.fireEvent('afterFormCreateError');
            }        
        });

        this.formUpdate = document.querySelector(this.options.formUpdate);

        this.formUpdate.save({
            success: () => {
                this.fireEvent('afterFormUpdate');
            },
            failure: () => {
                this.fireEvent('afterFormUpdateError');
            }
        });
    }
     
    fireEvent(name, args){
        if (typeof this.options.listeners[name] === 'function') this.options.listeners[name].apply(this, args);
    }

    getTrData(e) {
        let tr = e.composedPath().find(el => el.tagName && el.tagName.toUpperCase() === 'TR');
        if(tr) {
            return JSON.parse(tr.dataset.row);
        }
    }

    btnUpdateClick(e){
        this.fireEvent('beforeEventUpdateClick', [e]);

        let formUpdate = document.querySelector(this.options.formUpdate);
        let data = this.getTrData(e);
         
        for (let name in  data) {
            this.options.onUpdateLoad(formUpdate, name, data);
        
        }
        this.fireEvent('afterEventUpdateClick', [e]);
    }

    btnDeleteClick(e) {
        this.fireEvent('beforeEventDeleteClick');

        let data = this.getTrData(e);

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

    initButtons(){
        this.rows.forEach(row => {

            [...row.querySelectorAll('.btn')].forEach(btn => {

                btn.addEventListener('click', e => {
                    if(e.target.classList.contains(this.options.btnUpdate)) {
                        this.btnUpdateClick(e);

                    }else if (e.target.classList.contains(this.options.btnDelete)){
                        this.btnDeleteClick(e);

                    } else {
                        this.fireEvent('buttonClick', [e.target, this.getTrData(e), e]);
                    }
                });
            });
        });
        
    }
    
}