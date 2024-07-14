module.exports =  {
    getParams(req, param){
        return Object.assign({}, {
            menus: req.menus,
            user: req.session.user
        }, param)
    },
    getMenus(req){
        let menus = [
            {
                text:"Tela Inicial",
                href:"/admin/",
                icon:"home",
                active:false
            },
            {
                text:"Menus",
                href:"/admin/menus",
                icon:"cutlery",
                active:false
            },
            {
                text:"Reservas",
                href:"/admin/reservations",
                icon:"calendar-check-o",
                active:false
            },
            {
                text:"Contatos",
                href:"/admin/contacts",
                icon:"comments",
                active:false
            },
            {
                text:"Usuários",
                href:"/admin/users",
                icon:"users",
                active:false
            },
            {
                text:"E-mails",
                href:"/admin/emails",
                icon:"envelope",
                active:false
            }
    ];

    menus.map(menu => {
        if (menu.href === `/admin${menu.url}`) menu.active = true;
    });

    return menus;
    }
}