import axios from 'axios';
import dotEnv from 'dotenv';
import Joi from 'joi';

dotEnv.config()

const AIRTABLE_BASE_URL = 'https://api.airtable.com/v0';
const AIRTABLE_APIKEY = process.env.AIRTABLE_API_KEY;
const tableId = process.env.PROPERTY_TABLE;

axios.defaults.headers.post['Authorization'] = `Bearer ${AIRTABLE_APIKEY}`;
axios.defaults.headers.get['Authorization'] = `Bearer ${AIRTABLE_APIKEY}`;
axios.defaults.headers.delete['Authorization'] = `Bearer ${AIRTABLE_APIKEY}`;

const PropertyJoi = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    size: Joi.number().required()
});

const getAllProperties = async (req, res) => {
    try {

        const response = await axios.get(`${AIRTABLE_BASE_URL}/${tableId}/properties`);
        return res.json({ success: true, data: response.data})

    } catch (err) {
        console.error(err)
        return res.json({success: false ,err})
    }
}

const deleteProperty = async (req, res) => {
    try {

        const id = req.params.id;
        const response = await axios.delete(`${AIRTABLE_BASE_URL}/${tableId}/properties/${id}`);
        return res.json({ success: true, data: response.data})

    } catch (err) {
        console.error(err)
        return res.json({success: false ,err})
    }
}

const addProperty = async (req, res) => {
    try {
        
        await PropertyJoi.validateAsync(req.body);
        const url = `${AIRTABLE_BASE_URL}/${tableId}/properties`;

        const toSend = {
            "records" : [
                {
                    fields : {...req.body}
                }
            ]
        }

        const response = await axios.post(`${AIRTABLE_BASE_URL}/${tableId}/properties`, toSend);
        return res.json({ success: true, data: response.data})

    } catch (err) {
        console.error(err)
        return res.json({success: false ,err})
    }
}

export default {
    getAllProperties,
    addProperty,
    deleteProperty
}