import { MercadoPagoConfig, Preference } from 'mercadopago';

const client = new MercadoPagoConfig({ accessToken: process.env.ACCESS_TOKEN });

export const createPreference = async (req, res) => {
    const { title, quantity, unit_price, numero_alumno, id_apunte } = req.body;

    if (!title || !quantity || !unit_price || !numero_alumno || !id_apunte) {
        return res.status(400).json({ error: 'Faltan campos necesarios: title, quantity, unit_price, numero_alumno, id_apunte' });
    }

    const preference = new Preference(client);

    try {
        const response = await preference.create({
            body: {
                items: [
                    {
                        title: title,
                        quantity: quantity,
                        unit_price: unit_price
                    }
                ],
                payment_methods: {
                    excluded_payment_methods: [],
                    excluded_payment_types: [
                        {
                            id: "credit_card"
                        }
                    ],
                    installments: 1
                },
                back_urls: {
                    success: "http://localhost:4200/success",
                    failure: "http://localhost:4200/home",
                    pending: "https://www.pending.com"
                },
                auto_return: "approved",
                notification_url: "https://www.your-site.com/ipn",
                statement_descriptor: "MEUNEGOCIO",
                external_reference: `${numero_alumno}-${id_apunte}`,
                expires: true,
                expiration_date_from: new Date().toISOString(), 
                expiration_date_to: new Date(new Date().getTime() + 2 * 60 * 60 * 1000).toISOString() 
            }
        });

        return res.json(response);
    } catch (error) {
        console.error('Error al crear la preferencia:', error);
        return res.status(500).json({ error: 'Error al crear la preferencia', details: error.message });
    }
};

export const getFeedback = (req, res) => {
    res.send("Feedback recibido");
};
