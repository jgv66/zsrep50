export interface MenuComponente {
    title: string;
    menus: {
        icon: string;
        name: string;
        redirectTo: string;
    };
}

export interface Usuario {
    codigo: string;
    nombre: string;
    rut: string;
    email: string;
    modalidad: string;
    listamodalidad: string;
    listacliente: string;
    empresa: string;
    sucursal: string;
    bodega: string;
}


