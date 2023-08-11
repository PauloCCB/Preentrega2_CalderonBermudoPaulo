import React from 'react'
const Footer = () => {
    return (
        <section className='flexStart footer ' >
            <div className='flex flex-col gap-12 w-full'>
                <div className="flex flex-wrap gap-28">
                    <p className="text-start text-sm font-normal  max-w-xs">
                        LA PRIMERA CADENA  DE VINOS Y LICORES. "WATP" ES UNA EMPRESA FAMILIAR QUE DESDE HACE 30 AÑOS BRINDA VARIEDAD, SERVICIO Y SOBRE TODO GARANTIA EN CADA UNA DE LAS BOTELLAS QUE VENDE.
                    </p>
                    <div className="flex-1 flex flex-col gap-4">
                        <p>Dirección</p>
                        <p>AVENIDA LOS CONQUISTADORES 875 SAN ISIDRO, LIMA</p>
                        <p>Telefono</p>
                        <p>+51 442 6850</p>
                        <p>Correo</p>
                        <p>COMPRASWEB@WATP.COM.PE</p>
                    </div>
                    <div className="flex-1 flex flex-col gap-4">
                        <p>Sobre nosotros</p>
                        <p>Nuestras Tiendas</p>
                        <p>Contáctenos</p>
                        <p>Términos y condiciones</p>
                    </div>
                    <div className="flex-1 flex flex-col gap-4">
                        <p>Consulta tu factura</p>
                        <p>Libro de reclamaciones</p>
                        <p>Promociones</p>
                        <p>!Lo mas vendido!</p>
                    </div>


                </div>
            </div>



        </section>
    );
}

export default Footer;